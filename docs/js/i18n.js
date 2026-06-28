/* ============================================================
   i18n.js -- 中英双语切换 (默认中文)
   Section order: methods -> prediction -> factors -> results
   ============================================================ */
const I18N_DICT = {

  // ---- Nav ----
  'nav.lang_switch':{ zh: 'English', en: '中文' },
  'nav.brand':      { zh: '黄中天', en: 'Huang Zhongtian' },
  'nav.methods':    { zh: '研究方法', en: 'Methods' },
  'nav.prediction': { zh: '预测能力', en: 'Prediction' },
  'nav.factors':    { zh: '因子分析', en: 'Factors' },
  'nav.results':    { zh: '回测结果', en: 'Backtest' },

  // ---- Hero ----
  'hero.name':      { zh: '黄中天', en: 'Huang Zhongtian' },
  'hero.bio':       { zh: '金融硕士 · 暨南大学经济学院 · 资产定价',
                      en: 'M.Sc. Finance · Jinan University · Asset Pricing' },
  'hero.paper':     { zh: '论文PDF', en: 'Paper PDF' },

  // ---- Pitch (EW numbers) ----
  'pitch.one': { zh: '使用<strong>条件自编码器（CA）深度神经网络</strong>对中国A股5000+只股票进行因子建模与量化回测。CA(1-layer) 策略在 2020-2024 年实现<strong style="color:var(--accent2);">+591.5%</strong> 累计收益（等权），同期沪深 300 仅 <strong>+24.2%</strong>。扣除真实交易成本后，年化夏普比率达 <strong>1.86</strong>。',
                 en: 'I apply <strong>Conditional Autoencoder (CA) deep neural networks</strong> to factor-model 5,000+ China A-share stocks. The CA(1-layer) strategy delivers <strong style="color:var(--accent2);">+591.5%</strong> cumulative return (EW, 2020-2024) vs. CSI 300\'s <strong>+24.2%</strong>, with an annualized Sharpe ratio of <strong>1.86</strong> after actual A-share transaction costs.' },

  // ---- Impact cards (EW numbers) ----
  'impact.return':   { zh: '5年累计收益（等权扣费后）<br>沪深300同期：+24%',
                       en: '5yr Cumulative Return (EW, after fees)<br>CSI 300: +24%' },
  'impact.sharpe':   { zh: '年化夏普比率（等权）<br>7个模型中最高',
                       en: 'Annualized Sharpe Ratio (EW)<br>Highest among 7 models' },
  'impact.features': { zh: '公司特征因子<br>10大经济分类',
                       en: 'Firm Characteristics<br>Across 10 categories' },
  'impact.models':   { zh: '类模型系统对比<br>FF·PCA·IPCA·CAx4深度',
                       en: 'Models Compared<br>FF·PCA·IPCA·CAx4 depths' },

  // ---- Section 2: Methods ----
  'sec2.title':           { zh: '研究方法', en: 'Research Methods' },
  'sec2.data_title':      { zh: '数据来源', en: 'Data Sources' },
  'sec2.what_text':       { zh: '从 CSMAR、RESSET 数据库获取 A 股 2011-2024 年 <strong>5447 只股票、87 个公司特征</strong>（估值盈利、成长投资、风险杠杆、动量、流动性交易、会计质量运营效率六大维度），构建 <strong>条件自编码器（CA）深度神经网络</strong>：编码器将特征非线性映射为时变因子暴露，解码器从收益数据中提取潜在因子，联合优化。在 2020-2024 年样本外期间进行 <strong>纯样本外月度调仓回测</strong>，扣除 A 股实际交易成本。',
                            en: 'I sourced <strong>5,447 A-share stocks with 87 firm characteristics</strong> (valuation, growth, risk, momentum, liquidity, accounting quality) from CSMAR & RESSET databases covering 2011-2024. I built a <strong>Conditional Autoencoder (CA) deep neural network</strong> — the encoder nonlinearly maps characteristics to time-varying factor exposures, the decoder extracts latent factors from returns, jointly optimized. I conducted <strong>strictly out-of-sample monthly-rebalanced backtests</strong> (2020-2024), net of actual A-share transaction costs.' },
  'sec2.tech_title':      { zh: '技术栈', en: 'Tech Stack' },
  'sec2.pipeline_title':  { zh: '数据处理流水线', en: 'Data Processing Pipeline' },
  'sec2.factor_title':    { zh: '特征因子', en: 'Characteristic Factors' },
  'sec2.filter.placeholder': { zh: '搜索特征代码或名称...', en: 'Search feature code or name...' },
  'sec2.filter.all':      { zh: '全部分类', en: 'All Categories' },
  'sec2.formula_link':    { zh: '点击查看详细因子构建公式', en: 'View Detailed Factor Construction Formulas' },
  'sec2.model_title':     { zh: '模型体系', en: 'Model Architecture' },
  'sec2.col_model':       { zh: '模型', en: 'Model' },
  'sec2.col_k':           { zh: 'K范围', en: 'K Range' },
  'sec2.col_method':      { zh: '估计方法', en: 'Estimation' },
  'sec2.col_note':        { zh: '特点', en: 'Key Feature' },
  'sec2.model_detail':    { zh: '正则化：L1惩罚 + Early Stopping + BatchNorm + 10种子集成。训练框架：递归扩展窗口（训练期2011-2019，测试期2020-2024），纯样本外。CA0 = IPCA（当激活函数为线性且仅单隐藏层时理论等价）。所有CA模型因子数K=1-6，FF限于K=1-4（仅4个可观测因子）。',
                            en: 'Regularization: L1 penalty + Early Stopping + BatchNorm + 10-seed ensemble. Training: recursive expanding window (train 2011-2019, test 2020-2024), strictly out-of-sample. CA0 ≡ IPCA (when activation is linear with single hidden layer). All CA models K=1–6, FF limited to K=1–4 (only 4 observable factors).' },
  'sec2.robust_title':    { zh: '稳健性检验与异质性', en: 'Robustness & Heterogeneity' },
  'sec2.robust_intro':    { zh: '为确保结论可靠，进行了三项稳健性检验：', en: 'Three robustness checks were conducted to ensure reliability:' },
  'sec2.robust_1':        { zh: '<strong>更换缺失值填充阈值（10/14/18）：</strong>模型相对排序保持稳定，CA0和CA1始终最优。', en: '<strong>Alternative missing-value thresholds (10/14/18):</strong> Model rankings remain stable; CA0 and CA1 consistently optimal.' },
  'sec2.robust_2':        { zh: '<strong>剔除市值最小30%股票：</strong>按 Liu et al. (2019) 去除"壳价值"污染后，CA模型优势依然成立。', en: '<strong>Remove smallest 30% by market cap:</strong> Following Liu et al. (2019) to eliminate shell-value contamination; CA advantage persists.' },
  'sec2.robust_3':        { zh: '<strong>缩短训练期（9年-5年）：</strong>深层网络(CA2/CA3)因过拟合下降更明显，CA0/CA1样本效率最优。', en: '<strong>Shortened training (9yr-5yr):</strong> Deeper networks (CA2/CA3) degrade more due to overfitting; CA0/CA1 show best sample efficiency.' },
  'sec2.hetero_title':    { zh: '<strong>异质性分析：</strong>', en: '<strong>Heterogeneity Analysis:</strong>' },
  'sec2.hetero_text':     { zh: '在不同行业板块（制造业、金融、科技、消费等）分别检验了CA1策略的表现。结果显示模型在各行业间均保持正向超额收益，表明CA提取的因子具有跨行业的定价能力，而非仅由个别行业驱动。行业层面的因子暴露差异反映了不同行业中公司特征定价的异质性。',
                            en: 'We tested the CA1 strategy across different industry sectors (manufacturing, finance, technology, consumer, etc.). Results show consistent positive excess returns across all sectors, indicating that CA-extracted factors capture cross-industry pricing ability rather than being driven by individual sectors. Industry-level differences in factor exposures reflect heterogeneity in how firm characteristics are priced across sectors.' },
  'sec2.pdf_note':        { zh: '完整的稳健性检验细节、异质性分析结果及定价误差诊断，请参见完整论文 PDF。',
                            en: 'For complete robustness test details, heterogeneity analysis results, and pricing error diagnostics, please refer to the full paper PDF.' },
  'sec2.backtest_title':  { zh: '回测设计', en: 'Backtest Design' },
  'sec2.backtest_text':   { zh: '<strong>每月末：</strong>用滚动扩展窗口历史因子收益均值 x 个股前月因子暴露 = 预期收益。全市场股票按预期收益分为十组，<strong>买入最高组（仅做多）</strong>，持有一个月后全部卖出换仓。2020年1月至2024年12月，共60个月。',
                            en: '<strong>Each month-end:</strong> expected return = rolling historical factor return mean × stock factor exposure. Stocks sorted into deciles, <strong>buy the top decile (long-only)</strong>, hold 1 month, sell all and rebalance. Jan 2020 – Dec 2024, 60 months.' },

  // ---- Section 3: Prediction ----
  'sec3.title':      { zh: '预测能力', en: 'Prediction Accuracy' },
  'sec3.indiv_cap':  { zh: '样本外个股预测：predicted vs realized returns。每个子图为模型xK值组合的月度预测散点。CA1在所有K值下均实现最高的样本外R²，验证了非线性编码从87个公司特征中提取的收益相关信息优于线性模型。',
                       en: 'Out-of-sample individual stock prediction: predicted vs realized returns. Each panel is a model×K combination. CA1 achieves the highest out-of-sample R² across all K values, confirming that the nonlinear encoding of 87 characteristics captures return-relevant information that linear models miss.' },
  'sec3.port_cap':   { zh: '组合层面预测（GKX方法）：predicted vs realized portfolio returns 时间序列。CA1的预测值与实际组合收益跟踪最紧密，说明模型的预测信号能从个股层面有效转化为组合层面收益。',
                       en: 'Portfolio-level prediction (GKX method): predicted vs realized portfolio returns time series. CA1\'s predicted values track realized returns most closely, demonstrating that the model\'s signal translates from stock-level predictions to portfolio-level returns.' },

  // ---- Section 4: Factor Analysis ----
  'sec4.title':        { zh: '因子分析', en: 'Factor Analysis' },
  'sec4.imp_cap':      { zh: '归一化特征重要性：87个公司特征中哪些驱动了模型预测？热力图展示了跨模型、跨因子的特征重要性分布。CA1的预测由一个广泛的、跨维度的特征集合驱动（价值、动量、质量、风险），而非依赖单一过拟合信号。',
                         en: 'Normalized feature importance: which of the 87 characteristics drive the predictions? The heatmap shows the feature importance distribution across models and factors. CA1\'s predictions are driven by a broad set of characteristics spanning value, momentum, quality, and risk dimensions — not a single overfit signal.' },
  'sec4.pricing_cap':  { zh: '定价误差诊断：滞后公司特征与组合构建后alpha的关系。如果滞后特征系统性地解释post-formation alpha，说明模型存在遗漏变量偏差。结果显示无系统性关系，验证了模型对横截面收益的定价充分性。',
                         en: 'Pricing error diagnostics: relationship between lagged characteristics and post-formation alphas. If lagged characteristics systematically explain alphas, the model is misspecified. Results show no systematic relationship, confirming that the model adequately prices the cross-section.' },

  // ---- Section 5: Backtest Results ----
  'sec5.title':          { zh: '回测结果', en: 'Backtest Results' },
  'sec5.ew_cap':         { zh: 'K=4，等权加权。CA1（深蓝实线）期末净值约700万元（初始100万），最大回撤仅-20.9%。非线性条件模型（CA0-CA3）全面领先传统线性模型（FF/PCA）。沪深300（黑虚线）几乎未涨。等权结果确认CA1的优势并非由大市值股票拉动。',
                           en: 'K=4, EW. CA1 (dark blue) terminal NAV ~¥7M (from ¥1M), max drawdown only -20.9%. Nonlinear conditional models (CA0-CA3) comprehensively outperform traditional linear models (FF/PCA). CSI 300 (black dashed) barely moves. EW results confirm CA1\'s advantage is not driven by large-cap bias.' },
  'sec5.ew_perf_title':  { zh: '等权表现汇总（2020.01-2024.12，扣除交易成本）', en: 'Equal-Weighted Performance Summary (2020.01-2024.12, After Transaction Costs)' },
  'sec5.vw_title':       { zh: '市值加权结果', en: 'Value-Weighted Results' },
  'sec5.vw_cap':         { zh: 'K=4，市值加权。CA1期末净值约400万元（初始100万），最大回撤-27.3%。非线性条件模型（CA0-CA3）全面领先传统线性模型（FF/PCA）。沪深300（黑虚线）几乎未涨。',
                           en: 'K=4, VW. CA1 terminal NAV ~¥4M (from ¥1M), max drawdown -27.3%. Nonlinear conditional models (CA0-CA3) comprehensively outperform traditional linear models (FF/PCA). CSI 300 (black dashed) barely moves.' },
  'sec5.panel_a':        { zh: '表A：累计收益（%）', en: 'Panel A: Total Return (%)' },
  'sec5.panel_b':        { zh: '表B：年化夏普比率', en: 'Panel B: Annualized Sharpe Ratio' },
  'sec5.panel_c':        { zh: '表C：最大回撤（%）', en: 'Panel C: Maximum Drawdown (%)' },
  'sec5.table_note':     { zh: '注：Top-Decile仅做多组合，月度调仓。扣除A股实际交易成本（印花税0.05%卖方、佣金0.025%双向、过户费0.002%双向）。加粗=列最优，绿=正收益，红=负收益。FF限K≤4。',
                           en: 'Note: Top-decile long-only, monthly rebalancing. After A-share transaction costs (stamp duty 0.05% sell, commission 0.025% both sides, transfer fee 0.002% both sides). Bold=best in column. Green=positive, Red=negative. FF limited to K≤4.' },
  'sec5.gallery_toggle': { zh: 'K=1~6 完整回测图集（市值加权）', en: 'Full Backtest Gallery: K=1–6 (VW)' },

  // ---- Process flow ----
  'process.step1_title':{ zh: '缩尾', en: 'Winsorize' },
  'process.step1_desc': { zh: '月度(5%,95%)', en: 'Monthly (5%,95%)' },
  'process.step2_title':{ zh: '标准化', en: 'Normalize' },
  'process.step2_desc': { zh: 'Min-Max至[-1,1]', en: 'Min-Max to [-1,1]' },
  'process.step3_title':{ zh: '缺失值', en: 'Fill Missing' },
  'process.step3_desc': { zh: '三阶段分层', en: '3-Stage Hierarchical' },
  'process.step4_title':{ zh: '组合构建', en: 'Portfolio' },
  'process.step4_desc': { zh: '特征管理组合', en: 'Managed Portfolio' },

  // ---- Footer ----
  'footer.style': { zh: '学术期刊风格 (Times New Roman, 半去框化, 低饱和度)', en: 'Academic Journal Style (Times New Roman, semi-deboxed, low-saturation)' },
};

let currentLang = 'zh';

function i18n(key) {
  const entry = I18N_DICT[key];
  if (!entry) return key;
  return entry[currentLang] || entry['zh'] || key;
}

function switchLang() {
  currentLang = currentLang === 'zh' ? 'en' : 'zh';
  applyI18n();
}

function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const text = i18n(key);
    if (text) el.innerHTML = text;
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = i18n(key);
  });
  const btn = document.getElementById('lang-switch-btn');
  if (btn) btn.textContent = i18n('nav.lang_switch');
  document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
  if (typeof renderFactorTable === 'function') renderFactorTable();
  if (typeof populateCategoryFilter === 'function') populateCategoryFilter();
}

document.addEventListener('DOMContentLoaded', applyI18n);
