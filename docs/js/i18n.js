/* ============================================================
   i18n.js — 中英双语切换 (默认中文)
   ============================================================ */
const I18N_DICT = {
  'nav.lang_switch': { zh: 'English', en: '中文' },

  // Header
  'hero.name':       { zh: '黄中天', en: 'Huang Zhongtian' },
  'hero.bio':        { zh: '金融硕士 · 暨南大学经济学院 · 量化金融与资产定价方向',
                       en: 'M.Sc. Finance · Jinan University · Quantitative Finance & Asset Pricing' },
  'hero.email_label':{ zh: '邮箱', en: 'Email' },
  'hero.paper':      { zh: '论文PDF', en: 'Paper PDF' },

  // Tabs
  'tab.results':     { zh: '核心成果', en: 'Key Results' },
  'tab.methodology': { zh: '研究方法', en: 'Methodology' },

  // Pitch
  'pitch.one': { zh: '使用<strong>条件自编码器（CA）深度神经网络</strong>对中国A股5000+只股票进行因子建模与量化回测。CA(1-layer) 策略在 2020–2024 年实现<strong style="color:var(--accent2);">+312.1%</strong> 累计收益，同期沪深 300 仅 <strong>+24.2%</strong>。扣除真实交易成本后，年化夏普比率达 <strong>1.30</strong>。',
                 en: 'I apply <strong>Conditional Autoencoder (CA) deep neural networks</strong> to factor-model 5,000+ China A-share stocks. The CA(1-layer) strategy delivers <strong style="color:var(--accent2);">+312.1%</strong> cumulative return (2020–2024) vs. CSI 300\'s <strong>+24.2%</strong>, with an annualized Sharpe ratio of <strong>1.30</strong> after actual A-share transaction costs.' },

  // Impact cards
  'impact.return':   { zh: '5年累计收益（扣费后）<br>沪深300同期：+24%',
                       en: '5yr Cumulative Return (after fees)<br>CSI 300: +24%' },
  'impact.sharpe':   { zh: '年化夏普比率<br>7个模型中最高',
                       en: 'Annualized Sharpe Ratio<br>Highest among 7 models' },
  'impact.features': { zh: '公司特征因子<br>10大经济分类',
                       en: 'Firm Characteristics<br>Across 10 categories' },
  'impact.models':   { zh: '类模型系统对比<br>FF·PCA·IPCA·CA×4深度',
                       en: 'Models Compared<br>FF·PCA·IPCA·CA×4 depths' },

  // Results section
  'results.key_title':   { zh: '核心结果：回测净值曲线（市值加权，扣费后）', en: 'Key Result: Backtest Equity Curves (VW, After Fees)' },
  'results.k2_cap': { zh: '▲ K=2，市值加权。CA1（深蓝实线）持续领跑，期末净值约400万元（初始100万）。IPCA（灰蓝）和CA0（青绿）表现次之。FF（黄）和PCA（橙）长期低于基准线。沪深300（黑虚线）仅微涨。',
                      en: 'K=2, VW. CA1 (dark blue) leads throughout, final NAV ~¥4M (from ¥1M). IPCA and CA0 follow. FF and PCA stay below baseline. CSI 300 barely gains.' },
  'results.k4_cap': { zh: '▲ K=4，市值加权。CA1期末净值约400万元，最大回撤仅-27.3%。非线性条件模型（CA0-CA3）全面领先传统线性模型（FF/PCA）。',
                      en: 'K=4, VW. CA1 final NAV ~¥4M, max drawdown only -27.3%. Nonlinear conditional models (CA0-CA3) comprehensively outperform traditional linear models (FF/PCA).' },
  'results.perf_title': { zh: '表现汇总（2020.01–2024.12，市值加权，扣除交易成本）', en: 'Performance Summary (2020.01–2024.12, VW, After Transaction Costs)' },
  'results.panel_a': { zh: '表A：累计收益（%）', en: 'Panel A: Total Return (%)' },
  'results.panel_b': { zh: '表B：年化夏普比率', en: 'Panel B: Annualized Sharpe Ratio' },
  'results.panel_c': { zh: '表C：最大回撤（%）', en: 'Panel C: Maximum Drawdown (%)' },
  'results.table_note': { zh: '注：Top-Decile仅做多组合，月度调仓，市值加权。扣除A股实际交易成本（印花税0.05%卖方、佣金0.025%双向、过户费0.002%双向）。加粗=列最优，绿=正收益，红=负收益。FF限K≤4。',
                          en: 'Note: Top-decile long-only, monthly rebalancing, VW. After A-share transaction costs (stamp duty 0.05% sell, commission 0.025% both sides, transfer fee 0.002% both sides). Bold=best in column. Green=positive, Red=negative. FF limited to K≤4.' },
  'results.gallery': { zh: '回测图集（K=1~6，市值加权）', en: 'Backtest Chart Gallery (K=1–6, VW)' },

  // Methodology section
  'method.what':       { zh: '这篇文章做了什么', en: 'What I Did' },
  'method.what_text':  { zh: '从 CSMAR、RESSET 数据库获取 A 股 2011–2024 年 <strong>5447 只股票、87 个公司特征</strong>（估值盈利、成长投资、风险杠杆、动量、流动性交易、会计质量运营效率六大维度），构建 <strong>条件自编码器（CA）深度神经网络</strong>——编码器将特征非线性映射为时变因子暴露 β，解码器从收益数据中提取潜在因子，联合优化。在 2020–2024 年样本外期间进行 <strong>纯样本外月度调仓回测</strong>，扣除 A 股实际交易成本。',
                         en: 'I sourced <strong>5,447 A-share stocks with 87 firm characteristics</strong> (valuation, growth, risk, momentum, liquidity, accounting quality) from CSMAR & RESSET databases covering 2011–2024. I built a <strong>Conditional Autoencoder (CA) deep neural network</strong> — the encoder nonlinearly maps characteristics to time-varying factor exposures β, the decoder extracts latent factors from returns, jointly optimized. I conducted <strong>strictly out-of-sample monthly-rebalanced backtests</strong> (2020–2024), net of actual A-share transaction costs.' },
  'method.tech':       { zh: '技术栈', en: 'Tech Stack' },
  'method.pipeline_title': { zh: '数据处理流水线', en: 'Data Processing Pipeline' },
  'method.model_title':{ zh: '模型体系', en: 'Model Architecture' },
  'method.col_model':  { zh: '模型', en: 'Model' },
  'method.col_k':      { zh: 'K范围', en: 'K Range' },
  'method.col_method': { zh: '估计方法', en: 'Estimation' },
  'method.col_note':   { zh: '特点', en: 'Key Feature' },
  'method.model_detail':{ zh: '正则化：L1惩罚 + Early Stopping + BatchNorm + 10种子集成。训练框架：递归扩展窗口（训练期2011-2019，测试期2020-2024），纯样本外。CA0 = IPCA（当激活函数为线性且仅单隐藏层时理论等价）。所有CA模型因子数K=1-6，FF限于K=1-4（仅4个可观测因子）。',
                          en: 'Regularization: L1 penalty + Early Stopping + BatchNorm + 10-seed ensemble. Training: recursive expanding window (train 2011-2019, test 2020-2024), strictly out-of-sample. CA0 ≡ IPCA (when activation is linear with single hidden layer). All CA models K=1–6, FF limited to K=1–4 (only 4 observable factors).' },
  'method.factor_title':{ zh: '87个特征因子 · 10大分类', en: '87 Characteristics · 10 Categories' },
  'method.filter.placeholder': { zh: '搜索特征代码或名称...', en: 'Search feature code or name...' },
  'method.filter.all': { zh: '全部分类', en: 'All Categories' },
  'method.backtest_title':{ zh: '回测方法', en: 'Backtest Design' },
  'method.backtest_text':{ zh: '<strong>每月末：</strong>用滚动扩展窗口历史因子收益均值 λ̂<sub>t−1</sub> × 个股前月因子暴露 β̂<sub>i,t−1</sub> = 预期收益 r̂<sub>i,t</sub>。全市场股票按预期收益分为十组，<strong>买入最高组（仅做多）</strong>，持有一个月后全部卖出换仓。2020年1月至2024年12月，共60个月。',
                           en: '<strong>Each month-end:</strong> expected return r̂<sub>i,t</sub> = rolling historical factor return mean λ̂<sub>t−1</sub> × stock factor exposure β̂<sub>i,t−1</sub>. Stocks sorted into deciles, <strong>buy the top decile (long-only)</strong>, hold 1 month, sell all and rebalance. Jan 2020 – Dec 2024, 60 months.' },
  'method.attr_title': { zh: '因子归因：模型提取的因子是否有经济含义？', en: 'Factor Attribution: Do the Extracted Factors Have Economic Meaning?' },
  'method.attr_ipca_cap':{ zh: '▲ <strong>IPCA 六因子归因（三重识别后）。</strong>Factor 1 = 价值+规模；Factor 2 = 波动率+换手；Factor 3 = 流动性；Factor 4 = 极端收益；Factor 5 = 动量（专属）；Factor 6 = 特质波动率。<strong>数据驱动提取的因子与经典资产定价文献高度吻合。</strong>',
                           en: '▲ <strong>IPCA six-factor attribution (after 3-step identification).</strong> Factor 1 = Value+Size; Factor 2 = Volatility+Turnover; Factor 3 = Liquidity; Factor 4 = Extreme Returns; Factor 5 = Momentum (pure); Factor 6 = Idiosyncratic Volatility. <strong>Data-driven factors align closely with classical asset pricing literature.</strong>' },
  'method.attr_ca1_cap':{ zh: '▲ <strong>CA1 Integrated Gradients 归因。</strong>归因方向与IPCA一致（Factor 1仍是价值+规模，Factor 5仍是动量），但分布更分散——非线性网络将特征信息拆分重组到各因子中，解释了CA1的预测增益来源。',
                          en: '▲ <strong>CA1 Integrated Gradients attribution.</strong> Attribution directions align with IPCA (Factor 1 = Value+Size, Factor 5 = Momentum), but distributions are more dispersed — the nonlinear network splits and recombines feature information across factors, explaining CA1\'s prediction gain.' },
  'method.robustness_title':{ zh: '稳健性检验', en: 'Robustness Checks' },
  'method.robust_text':{ zh: '为确保结论可靠，进行了三项稳健性检验：', en: 'Three robustness checks were conducted to ensure reliability:' },
  'method.robust_1': { zh: '<strong>更换缺失值填充阈值（10/14/18）：</strong>模型相对排序保持稳定，CA0和CA1始终最优。', en: '<strong>Alternative missing-value thresholds (10/14/18):</strong> Model rankings remain stable; CA0 and CA1 consistently optimal.' },
  'method.robust_2': { zh: '<strong>剔除市值最小30%股票：</strong>按 Liu et al. (2019) 去除"壳价值"污染后，CA模型优势依然成立。', en: '<strong>Remove smallest 30% by market cap:</strong> Following Liu et al. (2019) to eliminate shell-value contamination; CA advantage persists.' },
  'method.robust_3': { zh: '<strong>缩短训练期（9年→5年）：</strong>深层网络(CA2/CA3)因过拟合下降更明显，CA0/CA1样本效率最优。', en: '<strong>Shortened training (9yr→5yr):</strong> Deeper networks (CA2/CA3) degrade more due to overfitting; CA0/CA1 show best sample efficiency.' },

  // Process flow
  'process.step1_title':{ zh: '缩尾', en: 'Winsorize' },
  'process.step1_desc': { zh: '月度(5%,95%)', en: 'Monthly (5%,95%)' },
  'process.step2_title':{ zh: '标准化', en: 'Normalize' },
  'process.step2_desc': { zh: 'Min-Max至[-1,1]', en: 'Min-Max to [-1,1]' },
  'process.step3_title':{ zh: '缺失值', en: 'Fill Missing' },
  'process.step3_desc': { zh: '三阶段分层', en: '3-Stage Hierarchical' },
  'process.step4_title':{ zh: '组合构建', en: 'Portfolio' },
  'process.step4_desc': { zh: '特征管理组合', en: 'Managed Portfolio' },

  // Footer
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
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.textContent = i18n('nav.lang_switch');
  });
  document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
  if (typeof renderFactorTable === 'function') renderFactorTable();
  if (typeof populateCategoryFilter === 'function') populateCategoryFilter();
}

document.addEventListener('DOMContentLoaded', applyI18n);
