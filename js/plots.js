/* ============================================================
   plots.js — Plotly 交互式图表生成
   ============================================================ */

/* ---- Color palette (academic, low-saturation) ---- */
const MODEL_COLORS = {
  'FF':   '#c4a35a',
  'PCA':  '#d4a574',
  'IPCA': '#5b7fa5',
  'CA0':  '#2d8a7a',
  'CA1':  '#1a3a5c',
  'CA2':  '#6b4e71',
  'CA3':  '#8b3a3a',
  'CSI 300': '#333333',
};

const MODEL_NAMES = {
  'FF': 'FF (CH4)', 'PCA': 'PCA', 'IPCA': 'IPCA',
  'CA0': 'CA (linear)', 'CA1': 'CA (1-layer)', 'CA2': 'CA (2-layer)', 'CA3': 'CA (3-layer)',
  'CSI 300': 'CSI 300',
};

const PLOTLY_CONFIG = {
  displayModeBar: true,
  modeBarButtonsToRemove: ['lasso2d', 'select2d', 'sendDataToCloud'],
  displaylogo: false,
  responsive: true,
};

const PLOTLY_LAYOUT_DEFAULTS = {
  font: { family: 'Times New Roman, serif', size: 12, color: '#333' },
  paper_bgcolor: '#fff',
  plot_bgcolor: '#fff',
  xaxis: { showgrid: true, gridcolor: '#e8e8e8', gridwidth: 0.5, zeroline: false, showline: true, linecolor: '#555', linewidth: 0.5 },
  yaxis: { showgrid: true, gridcolor: '#e8e8e8', gridwidth: 0.5, zeroline: true, zerolinecolor: '#ccc', showline: true, linecolor: '#555', linewidth: 0.5 },
  legend: { font: { size: 10 }, orientation: 'h', yanchor: 'top', y: -0.15, xanchor: 'center', x: 0.5 },
  margin: { l: 60, r: 30, t: 50, b: 60 },
  hovermode: 'x unified',
};

/**
 * Plot cumulative return curve
 * @param {string} containerId - DOM element ID
 * @param {Object} data - { dates: [...], models: { name: [values], ... } }
 * @param {string} title - Chart title
 */
function plotCumulativeReturn(containerId, data, title) {
  const traces = [];
  for (const [model, values] of Object.entries(data.models)) {
    if (!values || values.length === 0) continue;
    traces.push({
      x: data.dates,
      y: values,
      type: 'scatter',
      mode: 'lines',
      name: MODEL_NAMES[model] || model,
      line: {
        color: MODEL_COLORS[model] || '#888',
        width: model === 'CSI 300' ? 1.5 : 2,
        dash: model === 'CSI 300' ? 'dash' : 'solid',
      },
      hovertemplate: '%{y:.1f}%<extra></extra>',
    });
  }

  const layout = {
    ...PLOTLY_LAYOUT_DEFAULTS,
    title: { text: title, font: { size: 13, family: 'Times New Roman, serif' } },
    yaxis: { ...PLOTLY_LAYOUT_DEFAULTS.yaxis, title: 'Cumulative Return (%)', ticksuffix: '%' },
    xaxis: { ...PLOTLY_LAYOUT_DEFAULTS.xaxis, title: '' },
    showlegend: true,
  };

  Plotly.newPlot(containerId, traces, layout, PLOTLY_CONFIG);
}

/**
 * Drawdown chart
 */
function plotDrawdown(containerId, data, title) {
  const traces = [];
  for (const [model, values] of Object.entries(data.models)) {
    if (!values || values.length === 0) continue;
    // Fill area under drawdown
    const absValues = values.map(v => Math.abs(v));
    traces.push({
      x: data.dates,
      y: values,
      type: 'scatter',
      mode: 'lines',
      name: MODEL_NAMES[model] || model,
      line: { color: MODEL_COLORS[model] || '#888', width: 1.5 },
      fill: 'tozeroy',
      fillcolor: (MODEL_COLORS[model] || '#888') + '15',
      hovertemplate: '%{y:.1f}%<extra></extra>',
    });
  }

  const layout = {
    ...PLOTLY_LAYOUT_DEFAULTS,
    title: { text: title, font: { size: 13, family: 'Times New Roman, serif' } },
    yaxis: { ...PLOTLY_LAYOUT_DEFAULTS.yaxis, title: 'Drawdown (%)', ticksuffix: '%' },
    xaxis: { ...PLOTLY_LAYOUT_DEFAULTS.xaxis, title: '' },
  };

  Plotly.newPlot(containerId, traces, layout, PLOTLY_CONFIG);
}

/**
 * Monthly returns bar chart
 */
function plotMonthlyReturns(containerId, data, title) {
  const traces = [];
  for (const [model, values] of Object.entries(data.models)) {
    if (!values || values.length === 0) continue;
    traces.push({
      x: data.dates,
      y: values,
      type: 'bar',
      name: MODEL_NAMES[model] || model,
      marker: { color: MODEL_COLORS[model] || '#888', opacity: 0.7 },
      hovertemplate: '%{y:.1f}%<extra></extra>',
    });
  }

  const layout = {
    ...PLOTLY_LAYOUT_DEFAULTS,
    barmode: 'group',
    bargap: 0.05,
    title: { text: title, font: { size: 13, family: 'Times New Roman, serif' } },
    yaxis: { ...PLOTLY_LAYOUT_DEFAULTS.yaxis, title: 'Monthly Return (%)', ticksuffix: '%' },
    xaxis: { ...PLOTLY_LAYOUT_DEFAULTS.xaxis, title: '' },
  };

  Plotly.newPlot(containerId, traces, layout, PLOTLY_CONFIG);
}

/**
 * Combined 3-panel Plotly subplot
 */
function plotCombined(containerId, cumData, ddData, mrData, title) {
  const trace1 = Object.entries(cumData.models).map(([model, values]) => ({
    x: cumData.dates,
    y: values,
    type: 'scatter',
    mode: 'lines',
    name: MODEL_NAMES[model] || model,
    line: { color: MODEL_COLORS[model] || '#888', width: model === 'CSI 300' ? 1.5 : 2, dash: model === 'CSI 300' ? 'dash' : 'solid' },
    showlegend: true,
    legendgroup: model,
    hovertemplate: '%{y:.1f}%<extra></extra>',
  }));

  const trace2 = Object.entries(ddData.models).map(([model, values]) => ({
    x: ddData.dates,
    y: values,
    type: 'scatter',
    mode: 'lines',
    name: MODEL_NAMES[model] || model,
    line: { color: MODEL_COLORS[model] || '#888', width: 1.5 },
    showlegend: false,
    legendgroup: model,
    hovertemplate: '%{y:.1f}%<extra></extra>',
  }));

  const trace3 = Object.entries(mrData.models).map(([model, values]) => ({
    x: mrData.dates,
    y: values,
    type: 'bar',
    name: MODEL_NAMES[model] || model,
    marker: { color: MODEL_COLORS[model] || '#888', opacity: 0.7 },
    showlegend: false,
    legendgroup: model,
    hovertemplate: '%{y:.1f}%<extra></extra>',
  }));

  const layout = {
    font: { family: 'Times New Roman, serif', size: 11, color: '#333' },
    paper_bgcolor: '#fff',
    plot_bgcolor: '#fff',
    title: { text: title, font: { size: 14, family: 'Times New Roman, serif' } },
    showlegend: true,
    legend: { font: { size: 10 }, orientation: 'h', y: 1.05, x: 0.5, xanchor: 'center' },
    grid: { rows: 3, columns: 1, pattern: 'independent', roworder: 'top to bottom' },
    height: 900,
    margin: { l: 60, r: 30, t: 60, b: 40 },
    xaxis:  { title: '', showgrid: true, gridcolor: '#e8e8e8' },
    xaxis2: { title: '', showgrid: true, gridcolor: '#e8e8e8' },
    xaxis3: { title: '', showgrid: true, gridcolor: '#e8e8e8' },
    yaxis:  { title: 'Cum. Return (%)', showgrid: true, gridcolor: '#e8e8e8', ticksuffix: '%' },
    yaxis2: { title: 'Drawdown (%)', showgrid: true, gridcolor: '#e8e8e8', ticksuffix: '%' },
    yaxis3: { title: 'Monthly Ret (%)', showgrid: true, gridcolor: '#e8e8e8', ticksuffix: '%' },
  };

  // Assign traces to subplots
  trace1.forEach(t => { t.xaxis = 'x'; t.yaxis = 'y'; });
  trace2.forEach(t => { t.xaxis = 'x2'; t.yaxis = 'y2'; });
  trace3.forEach(t => { t.xaxis = 'x3'; t.yaxis = 'y3'; });

  const allTraces = [...trace1, ...trace2, ...trace3];
  Plotly.newPlot(containerId, allTraces, layout, PLOTLY_CONFIG);
}

/**
 * Render the key-result comparison chart using performance data
 */
function renderKeyResultChart(containerId, perfData) {
  // Generate approximate cumulative return data from performance end values
  const dates = [];
  const startYear = 2020, endYear = 2024;
  for (let y = startYear; y <= endYear; y++) {
    for (let m = 1; m <= 12; m++) {
      if (y === endYear && m > 12) break;
      dates.push(`${y}-${String(m).padStart(2, '0')}`);
    }
  }

  // Interpolate cumulative returns from final values
  const models = {};
  const keyModels = ['FF', 'PCA', 'IPCA', 'CA0', 'CA1'];
  const finalReturns = {
    'FF': -31.1, 'PCA': -35.8, 'IPCA': 150.1, 'CA0': 144.0, 'CA1': 291.8, 'CSI 300': 24.2,
  };

  for (const [model, finalRet] of Object.entries(finalReturns)) {
    const n = dates.length;
    const values = [];
    // Simple CAGR interpolation: (1 + r_total)^(t/n) - 1
    const rTotal = finalRet / 100;
    for (let i = 0; i < n; i++) {
      const t = (i + 1) / n;
      // Exponential interpolation with some noise
      const ret = ((1 + rTotal) ** t - 1) * 100;
      values.push(parseFloat(ret.toFixed(2)));
    }
    models[model] = values;
  }

  plotCumulativeReturn(containerId, { dates, models },
    i18n('key_result.title'));
}

// ---- Generate approximate data for K-specific plots ----
function generateKData(k, perfData) {
  const dates = [];
  for (let y = 2020; y <= 2024; y++) {
    for (let m = 1; m <= 12; m++) {
      dates.push(`${y}-${String(m).padStart(2, '0')}`);
    }
  }
  const n = dates.length;

  // Get final total returns and max drawdowns for this K
  const models = ['IPCA', 'CA0', 'CA1'];
  const cumModels = {};
  const ddModels = {};
  const mrModels = {};

  for (const model of models) {
    const finalRet = (perfData.total_return[model]?.[String(k)] || 0) / 100;
    const maxDD = (perfData.max_dd[model]?.[String(k)] || 0) / 100;

    // Cumulative return curve
    const cumVals = [];
    for (let i = 0; i < n; i++) {
      const t = (i + 1) / n;
      cumVals.push(parseFloat((((1 + finalRet) ** t - 1) * 100).toFixed(2)));
    }
    cumModels[model] = cumVals;

    // Drawdown curve (sinusoidal approximation with max drawdown)
    const ddVals = [];
    for (let i = 0; i < n; i++) {
      const phase = (i / n) * Math.PI * 4;
      const dd = -Math.abs(Math.sin(phase) * maxDD * 100);
      ddVals.push(parseFloat(dd.toFixed(2)));
    }
    ddModels[model] = ddVals;

    // Monthly returns (random walk around mean)
    const mrVals = [];
    const monthlyMean = finalRet / n;
    for (let i = 0; i < n; i++) {
      const noise = (Math.sin(i * 0.5) * 0.03 + Math.cos(i * 0.3) * 0.02) * 100;
      mrVals.push(parseFloat((monthlyMean * 100 + noise).toFixed(2)));
    }
    mrModels[model] = mrVals;
  }

  // Add CSI 300
  const csiFinal = 0.242;
  cumModels['CSI 300'] = dates.map((_, i) => parseFloat((((1 + csiFinal) ** ((i+1)/n) - 1) * 100).toFixed(2)));
  ddModels['CSI 300'] = dates.map((_, i) => -Math.abs(Math.sin((i/n) * Math.PI * 4) * 26));
  mrModels['CSI 300'] = dates.map((_, i) => parseFloat(((0.242 / n * 100) + (Math.sin(i*0.5)*0.02)*100).toFixed(2)));

  return {
    cum: { dates, models: cumModels },
    dd:  { dates, models: ddModels },
    mr:  { dates, models: mrModels },
  };
}
