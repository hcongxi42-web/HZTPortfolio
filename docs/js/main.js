/* ============================================================
   main.js — Tab切换、因子表格渲染、数据加载
   ============================================================ */

let factorsData = null;

// ---- Tab switching ----
function switchTab(tabName) {
  // Update buttons
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

  const btn = document.querySelector(`.tab-btn[onclick*="${tabName}"]`);
  const panel = document.getElementById('tab-' + tabName);
  if (btn) btn.classList.add('active');
  if (panel) panel.classList.add('active');

  // Lazy load factor table when methodology tab is first opened
  if (tabName === 'methodology' && factorsData && !document.getElementById('factor-table-body')?.children.length) {
    renderFactorTable();
    populateCategoryFilter();
  }
}

// ---- Data Loading ----
async function loadJSON(path) {
  try {
    const resp = await fetch(path);
    if (!resp.ok) throw new Error('HTTP ' + resp.status);
    return await resp.json();
  } catch (e) {
    console.error('Failed to load ' + path + ':', e);
    return null;
  }
}

// ---- Factor Table ----
function renderFactorTable() {
  const tbody = document.getElementById('factor-table-body');
  if (!tbody || !factorsData) return;

  let html = '';
  for (const cat of factorsData.categories) {
    const name = (typeof currentLang !== 'undefined' && currentLang === 'zh') ? cat.name_zh : cat.name_en;
    html += '<tr style="background:#f8f8f8;"><td colspan="3"><strong>' + name + '</strong> (' + cat.count + ' features)</td></tr>';
    for (const feat of cat.features) {
      const stat = factorsData.descriptive_stats.find(s => s.feature === feat);
      const label = stat ? stat.label : feat;
      html += '<tr data-category="' + name + '"><td><code>' + feat + '</code></td><td>' + label + '</td><td>' + name + '</td></tr>';
    }
  }
  tbody.innerHTML = html;
}

function populateCategoryFilter() {
  const select = document.getElementById('factor-category-filter');
  if (!select || !factorsData) return;

  const lang = (typeof currentLang !== 'undefined') ? currentLang : 'zh';
  const allLabel = lang === 'zh' ? '全部分类' : 'All Categories';
  select.innerHTML = '<option value="all">' + allLabel + '</option>';
  for (const cat of factorsData.categories) {
    const name = lang === 'zh' ? cat.name_zh : cat.name_en;
    select.innerHTML += '<option value="' + name + '">' + name + '</option>';
  }
}

// ---- Factor Search/Filter ----
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

// ---- Init ----
document.addEventListener('DOMContentLoaded', async () => {
  // Load factor data for methodology tab
  factorsData = await loadJSON('data/factors.json');

  if (factorsData) {
    renderFactorTable();
    populateCategoryFilter();
  }

  initFactorFilter();
});
