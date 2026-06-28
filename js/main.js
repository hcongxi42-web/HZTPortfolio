/* ============================================================
   main.js — 通用交互逻辑 (导航高亮、折叠面板、表格渲染)
   ============================================================ */

let performanceData = null;
let factorsData = null;

// ---- Data Loading ----
async function loadJSON(path) {
  try {
    const resp = await fetch(path);
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    return await resp.json();
  } catch (e) {
    console.error(`Failed to load ${path}:`, e);
    return null;
  }
}

async function initData() {
  [performanceData, factorsData] = await Promise.all([
    loadJSON('data/performance.json'),
    loadJSON('data/factors.json'),
  ]);
}

// ---- Navigation ----
function highlightCurrentNav() {
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ---- Accordion ----
function initAccordions() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const body = header.nextElementSibling;
      const isOpen = body.classList.contains('open');
      // Close all in same accordion group
      const accordion = header.parentElement;
      accordion.querySelectorAll('.accordion-body.open').forEach(b => b.classList.remove('open'));
      accordion.querySelectorAll('.accordion-header.open').forEach(h => h.classList.remove('open'));
      if (!isOpen) {
        body.classList.add('open');
        header.classList.add('open');
      }
    });
  });
}

// ---- Performance Tables Rendering ----
function renderPerformanceTables() {
  if (!performanceData) return;

  const metrics = [
    { key: 'total_return', titleKey: 'perf.panel_a', isPct: true },
    { key: 'sharpe', titleKey: 'perf.panel_b', isPct: false },
    { key: 'max_dd', titleKey: 'perf.panel_c', isPct: true },
  ];

  const container = document.getElementById('perf-tables');
  if (!container) return;

  let html = '';
  const models = performanceData.models;
  const kRange = performanceData.k_range;
  const ffKRange = performanceData.ff_k_range;

  for (const metric of metrics) {
    html += `<h3 data-i18n="${metric.titleKey}">${i18n(metric.titleKey)}</h3>`;
    html += '<div class="table-wrap"><table><thead><tr><th>Model</th>';
    for (const k of kRange) {
      html += `<th>K=${k}</th>`;
    }
    html += '</tr></thead><tbody>';

    for (const model of models) {
      if (!performanceData[metric.key][model]) continue;
      html += '<tr>';
      html += `<td>${MODEL_NAMES[model] || model}</td>`;

      for (const k of kRange) {
        const val = performanceData[metric.key][model][String(k)];
        if (val === undefined || val === null) {
          html += '<td>—</td>';
          continue;
        }

        // Determine best in column
        let isBest = true;
        let bestVal = val;
        for (const m of models) {
          const mv = performanceData[metric.key][m]?.[String(k)];
          if (mv !== undefined && mv !== null) {
            if ((metric.key === 'max_dd') ? (mv > bestVal) : (mv > bestVal)) {
              bestVal = mv;
            }
          }
        }
        isBest = (val === bestVal) && (Math.abs(val) > 0.01);

        const cls = (val > 0 ? 'pos' : 'neg') + (isBest ? ' best' : '');
        const formatted = metric.isPct ? `${val >= 0 ? '+' : ''}${val.toFixed(1)}` : val.toFixed(2);
        html += `<td class="${cls}">${formatted}</td>`;
      }
      html += '</tr>';
    }

    // Benchmark row
    html += '<tr style="border-top:2px solid var(--spine);">';
    html += '<td><strong>CSI 300</strong></td>';
    const benchVal = metric.key === 'total_return' ? performanceData.benchmark_return :
                     metric.key === 'sharpe' ? performanceData.benchmark_sharpe :
                     performanceData.benchmark_maxdd;
    for (const k of kRange) {
      const formatted = metric.isPct ? `${benchVal >= 0 ? '+' : ''}${benchVal.toFixed(1)}` : benchVal.toFixed(2);
      html += `<td class="pos">${formatted}</td>`;
    }
    html += '</tr></tbody></table></div>';
  }

  container.innerHTML = html;
}

// ---- Factor Table Rendering (Methodology page) ----
function renderFactorTable() {
  const container = document.getElementById('factor-table-body');
  if (!container || !factorsData) return;

  let html = '';
  for (const cat of factorsData.categories) {
    const catName = currentLang === 'zh' ? cat.name_zh : cat.name_en;
    html += `<tr style="background:#f8f8f8;"><td colspan="3"><strong>${catName}</strong> (${cat.count} features)</td></tr>`;
    for (const feat of cat.features) {
      const stat = factorsData.descriptive_stats.find(s => s.feature === feat);
      const label = stat?.label || feat;
      html += `<tr data-category="${catName}">
        <td><code>${feat}</code></td>
        <td>${label}</td>
        <td>${catName}</td>
      </tr>`;
    }
  }
  container.innerHTML = html;
}

// ---- Descriptive Statistics Table ----
function renderDescStatsTable() {
  const container = document.getElementById('desc-stats-body');
  if (!container || !factorsData) return;

  let html = '';
  for (const stat of factorsData.descriptive_stats) {
    if (stat.mean === null) {
      html += `<tr><td><code>${stat.feature}</code></td><td>${stat.label}</td><td colspan="7" class="neg">N/A</td></tr>`;
      continue;
    }
    html += `<tr>
      <td><code>${stat.feature}</code></td>
      <td>${stat.label}</td>
      <td>${stat.mean.toFixed(4)}</td>
      <td>${stat.std.toFixed(4)}</td>
      <td>${stat.min.toFixed(4)}</td>
      <td>${stat.p5.toFixed(4)}</td>
      <td>${stat.p95.toFixed(4)}</td>
      <td>${stat.max.toFixed(4)}</td>
      <td>${stat.missing_pct.toFixed(1)}%</td>
    </tr>`;
  }
  container.innerHTML = html;
}

// ---- Factor Filter/Search ----
function initFactorFilter() {
  const searchInput = document.getElementById('factor-search');
  const categorySelect = document.getElementById('factor-category-filter');
  if (!searchInput && !categorySelect) return;

  function filter() {
    const query = (searchInput?.value || '').toLowerCase();
    const category = categorySelect?.value || '';

    const tbody = document.getElementById('factor-table-body');
    if (!tbody) return;
    const rows = tbody.querySelectorAll('tr[data-category]');

    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      const cat = row.getAttribute('data-category') || '';
      const matchSearch = !query || text.includes(query);
      const matchCat = !category || category === 'all' || cat === category;
      row.style.display = (matchSearch && matchCat) ? '' : 'none';
    });
  }

  searchInput?.addEventListener('input', filter);
  categorySelect?.addEventListener('change', filter);
}

// ---- Populate Category Filter Dropdown ----
function populateCategoryFilter() {
  const select = document.getElementById('factor-category-filter');
  if (!select || !factorsData) return;

  select.innerHTML = `<option value="all">${i18n('method.filter.all')}</option>`;
  for (const cat of factorsData.categories) {
    const name = currentLang === 'zh' ? cat.name_zh : cat.name_en;
    select.innerHTML += `<option value="${name}">${name}</option>`;
  }
}

// ---- Home Page: Render K-specific charts ----
function renderKCharts() {
  if (!performanceData) return;

  // For each K from 1 to 6
  for (let k = 1; k <= 6; k++) {
    const containerId = `plot-k${k}`;
    const container = document.getElementById(containerId);
    if (!container) continue;

    const kData = generateKData(k, performanceData);
    plotCombined(containerId, kData.cum, kData.dd, kData.mr, `K = ${k}`);
  }
}

// ---- Page Initialization ----
document.addEventListener('DOMContentLoaded', async () => {
  await initData();

  highlightCurrentNav();
  initAccordions();
  initFactorFilter();

  // Home page specific
  if (document.getElementById('perf-tables')) {
    renderPerformanceTables();
    if (performanceData) {
      renderKeyResultChart('key-result-plot', performanceData);
      renderKCharts();
    }
  }

  // Methodology page specific
  if (document.getElementById('factor-table-body')) {
    renderFactorTable();
    renderDescStatsTable();
    populateCategoryFilter();
  }
});

// Re-render on language switch (hook into applyI18n)
const origApplyI18n = applyI18n;
applyI18n = function() {
  origApplyI18n();
  if (document.getElementById('perf-tables')) renderPerformanceTables();
  if (document.getElementById('factor-table-body')) {
    renderFactorTable();
    populateCategoryFilter();
  }
};
