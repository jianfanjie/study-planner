"use strict";
/* ============================================================
   学业规划 · 三轨智能仪表盘 —— 数据层（每年核查更新此文件即可）
   ============================================================ */
const DATA_VERSION="2026.07";

/* ---------- 目标大学库（门槛按官方口径核查） ---------- */
const UNIS=[
  {id:"hku",  name:"香港大学 HKU",       region:"hk", rank:"QS 17 · Non-JUPAS 内卷", al:"A*AA – A*A*A", ib:"36 – 42（热门 38+）", ap:"GPA 3.8+ / 5门AP 4-5分", req:88, engReq:70, engLabel:"IELTS 6.0 / TOEFL 80（法·医更高）"},
  {id:"cuhk", name:"香港中文大学 CUHK",  region:"hk", rank:"QS 32 · Non-JUPAS", al:"A*AA",       ib:"36 – 40", ap:"GPA 3.7+ / 4门AP 4+",   req:86, engReq:70, engLabel:"IELTS 6.0 / TOEFL 80"},
  {id:"hkust",name:"香港科技大学 HKUST", region:"hk", rank:"QS 44", al:"AAA – A*AA",  ib:"34 – 38", ap:"GPA 3.6+ / 4门AP 4+",   req:84, engReq:70, engLabel:"IELTS 6.0 / TOEFL 80"},
  {id:"imperial",name:"帝国理工 Imperial",region:"uk",rank:"QS 2 · 仅 STEM+商科",  al:"A*A*A（区间 AAA–A*A*A*）",ib:"38 – 42（多为 40+）", ap:"3-4门 AP 5分（不收 SAT）",  req:92, excl:["hum","art"], engReq:85, engLabel:"IELTS 6.5-7.0 / TOEFL 92-100"},
  {id:"oxford",  name:"牛津大学 Oxford",  region:"uk",rank:"QS 3",  al:"AAA – A*A*A（按专业）",ib:"38 – 40（HL 766/776）", ap:"5门+ AP 5分 + SAT 1550",  req:93, engReq:90, engLabel:"IELTS 7.0-7.5 / TOEFL 100-110"},
  {id:"cambridge",name:"剑桥大学 Cambridge",region:"uk",rank:"QS 5",al:"A*AA – A*A*A",ib:"40 – 42（HL 776）", ap:"5门+ AP 5分 + SAT 1550",  req:94, engReq:90, engLabel:"IELTS 7.5（单项 7.0）/ TOEFL 110"},
  {id:"ucl",  name:"伦敦大学学院 UCL",   region:"uk", rank:"QS 9",  al:"A*A*A – ABB（多为 A*AA）", ib:"34 – 38", ap:"4-5门AP 4-5分",         req:88, engReq:85, engLabel:"IELTS 6.5-7.5（按专业分级）"},
  {id:"ivy",  name:"常春藤盟校 Ivy League", region:"us", rank:"哈佛/耶鲁/普林斯顿等 8 校", al:"A*A*A* + 顶级背景", ib:"42 – 45", ap:"GPA 4.0 / 8门AP 5分 / SAT 1550+", req:95, engReq:85, engLabel:"TOEFL 100+（录取者典型 110+）"},
  {id:"us30", name:"美国 Top 30（综合）", region:"us", rank:"US News Top 30", al:"—", ib:"预估 40+", ap:"GPA 3.9+ / 5-8门AP 5分 / SAT 1500+", req:90, engReq:85, engLabel:"TOEFL 100+"},
  {id:"toronto",name:"多伦多大学 Toronto", region:"ca", rank:"QS 25", al:"AAA – AAB", ib:"33 – 40", ap:"GPA 3.8+ / 3-4门AP 4+", req:85, engReq:78, engLabel:"IELTS 6.5 / TOEFL 100（写作 22）"},
  {id:"mcgill", name:"麦吉尔大学 McGill",  region:"ca", rank:"QS 27", al:"AAB",       ib:"34 – 38", ap:"GPA 3.8+ / AP 4+",      req:84, engReq:78, engLabel:"IELTS 6.5 / TOEFL 90-100"},
  {id:"melbourne",name:"墨尔本大学 Melbourne",region:"au",rank:"QS 13",al:"AAB – AAA",ib:"36 – 40（热门专业）",ap:"3-4门AP 4+ / SAT 1350+",req:84, engReq:78, engLabel:"IELTS 6.5（部分专业写作 7.0）"},
  {id:"sydney",  name:"悉尼大学 Sydney",     region:"au",rank:"QS 18",al:"ABB – AAB", ib:"33 – 38", ap:"3门AP 4+ / SAT 1300+", req:82, engReq:78, engLabel:"IELTS 6.5"},
];

/* ---------- 港三所 Non-JUPAS 硬指标 Cut-off（HKU 最难 → HKUST）---------- */
const HK_CUT={hku:{ib:39,al:92,apN:4,gpa:3.9,band:"IB≥39 / A*A*A / AP 4门5分+GPA3.9"},
              cuhk:{ib:38,al:89,apN:4,gpa:3.85,band:"IB≥38 / A*AA / AP 4门5分+GPA3.85"},
              hkust:{ib:37,al:87,apN:3,gpa:3.8,band:"IB≥37 / AAA / AP 3门5分+GPA3.8"}};

/* ---------- 软实力：竞赛金字塔数据库（Tier 1 国际顶级 → Tier 4 校内参与，附真实赛历；hk:1 = 香港本土项目） ---------- */
const COMP_DB=[
  /* 商科 / 经济 */
  {id:"nec_f", cat:"bus", t:1, core:1, n:"NEC 全美经济学挑战赛（中国站决赛 / 全球站）", m:"12 月区域站 → 3 月中国站 → 5 月全球站"},
  {id:"ieo",   cat:"bus", t:1, n:"IEO 国际经济学奥林匹克（国家队 / 国际赛）", m:"春季国内选拔 → 7 月国际赛"},
  {id:"ja",    cat:"bus", t:2, hk:1, n:"JA Company Program 香港青年成就计划", m:"9 月组队 → 次年 4 月路演"},
  {id:"hksec", cat:"bus", t:2, hk:1, n:"HKSEC 香港社会企业挑战赛", m:"全年赛季 · 春季决赛"},
  {id:"sic",   cat:"bus", t:2, core:1, n:"SIC 中学生投资挑战赛（全国奖）", m:"9 月 – 次年 4 月赛季"},
  {id:"kwhs",  cat:"bus", t:2, n:"沃顿全球投资挑战 WGHS（原 KWHS）", m:"9 – 12 月比赛季"},
  {id:"fbla",  cat:"bus", t:2, n:"FBLA 美国未来商业领袖挑战（全国奖）", m:"12 月初选 → 次年 4 月全国"},
  {id:"biz_s", cat:"bus", t:3, n:"校级商赛 / 商业社团项目", m:"全年"},
  /* 工程 / CS */
  {id:"usamo", cat:"stem",t:1, n:"USAMO 美国数学奥林匹克（AIME 晋级后）", m:"11 月 AMC → 2 月 AIME → 3 月 USAMO"},
  {id:"bpho_g",cat:"stem",t:1, n:"BPhO 英国物理奥赛 Top Gold（超金）", m:"11 月 Round 1"},
  {id:"usaco_g",cat:"stem",t:1,n:"USACO 美国信息学奥赛（金组 / 铂金）", m:"12 – 2 月月赛升组 + 3 月公开赛"},
  {id:"aime",  cat:"stem",t:2, core:1, n:"AMC12 前 5% → AIME 晋级（美国数学竞赛）", m:"11 月 AMC → 次年 2 月 AIME"},
  {id:"yau",   cat:"stem",t:2, n:"丘成桐中学科学奖（入围以上）", m:"4 月报名 → 12 月总决赛"},
  {id:"hkmo",  cat:"stem",t:2, hk:1, n:"HKMO 香港数学竞赛（决赛级）", m:"春季"},
  {id:"hkoi",  cat:"stem",t:2, hk:1, n:"HKOI 香港信息学奥赛", m:"11 月初赛 → 2 月决赛"},
  {id:"hkysic",cat:"stem",t:2, hk:1, n:"HKYSIC 香港青少年科技创新大赛", m:"9 月申报 → 3 月终审"},
  {id:"euclid",cat:"stem",t:3, core:1, n:"Euclid 欧几里得数学竞赛（滑铁卢）", m:"4 月"},
  {id:"pbowl", cat:"stem",t:3, n:"Physics Bowl 物理碗", m:"3 月下旬"},
  {id:"stem_s",cat:"stem",t:4, n:"校级数学 / 科学竞赛 · STEM 社团", m:"全年"},
  /* 理科 / 生化 */
  {id:"isef",  cat:"sci", t:1, n:"ISEF 国际科学与工程大奖赛（决赛入围）", m:"秋冬附属赛 → 5 月全球总决赛"},
  {id:"igem",  cat:"sci", t:1, n:"iGEM 国际基因工程机器大赛（金牌）", m:"春季组队 → 10 月总决赛"},
  {id:"bbo",   cat:"sci", t:2, core:1, n:"BBO 英国生物奥赛（金 / 银）", m:"4 月"},
  {id:"usabo", cat:"sci", t:2, n:"USABO 美国生物奥赛（半决赛以上）", m:"2 月公开赛 → 3 月半决赛"},
  {id:"ukcho", cat:"sci", t:2, n:"UKChO 英国化学奥赛（金 / 银）", m:"1 月"},
  {id:"bbee",  cat:"sci", t:2, n:"Brain Bee 脑科学大赛（全国奖）", m:"1 – 3 月"},
  {id:"sci_s", cat:"sci", t:3, n:"校内实验项目 / 科学展", m:"全年"},
  /* 人文 / 社科 */
  {id:"jlocke",cat:"hum", t:1, core:1, n:"John Locke 论文竞赛（Shortlist / 获奖）", m:"4 月报名 → 6 月底提交"},
  {id:"concord",cat:"hum",t:1, n:"Concord Review 历史论文（发表）", m:"季刊制 · 全年投稿"},
  {id:"marshall",cat:"hum",t:2, n:"剑桥 Marshall Society 经济论文赛", m:"暑期截稿"},
  {id:"nyt",   cat:"hum", t:2, n:"纽约时报 NYT 中学生写作 / 社论竞赛", m:"分赛道全年滚动"},
  {id:"nhd",   cat:"hum", t:2, n:"NHD 美国国家历史日（全国赛）", m:"校 / 区赛 → 6 月全国"},
  {id:"hkssdc",cat:"hum", t:2, hk:1, n:"HKSSDC 香港英文辩论赛", m:"10 月 – 次年 3 月赛季"},
  {id:"hkmun", cat:"hum", t:2, hk:1, n:"HKMUN 香港模联", m:"3 月会期"},
  {id:"mun",   cat:"hum", t:2, n:"哈佛 / 耶鲁模联（最佳代表）", m:"1 – 3 月会期"},
  {id:"schol", cat:"hum", t:2, n:"Scholastic 学术艺术与写作奖（金 / 银钥匙）", m:"12 月截稿"},
  {id:"hum_s", cat:"hum", t:3, n:"校级辩论 / 模联 / 校刊", m:"全年"},
];
