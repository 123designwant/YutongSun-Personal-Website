import React, { useState } from "react";
import {
  Mail,
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  ArrowUpRight,
  Play,
  BookOpen,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- 答案之书 原始数据 ---
const ANSWERS_DATA = [
  "", // placeholder
  "You life will find it's way", "自由的去体会", "所有外界发生的事情都是来陪你体验你自己的", "好像其实都没有人懂 有的",
  "变成一个 更圆满的人", "再做做看 再试试看", "嬉皮笑脸的活在 这个世界上", "在万物之中 辨识自己", "但这都不重要啊",
  "you are not alone", "没什么好期待的了", "为自己去做实验去印证", "你是对的", "你永远都可以坚持自己",
  "轻轻挥走就好了", "你只要完成自己就好", "其实我们生下来就被赋予一份祝福 就是我们做得到", "只专心的去照顾 自己的选择",
  "不去想ta的意义", "光是能遇见就已经好了不起了", "无常才留下了人生有意义的事情", "知道太多就会开始烦恼", "不妥协的幸运 很难遇到",
  "日子该是不同形状", "领悟或看开些什么真得需要时间", "那样不错", "把精雕细琢的成品抛空", "别怕", "不要让眼泪成为生活的客串",
  "别回头去想", "这不是不好的事", "你很好 现在别开始遗憾", "其实谁不这样", "相信自己值得", "Gonna Stop", "You will try it out someday",
  "慢慢地来", "就让它走", "似乎问题答案都相反", "把吊着的自己 放下来", "做回原本模样", "仍旧叛逆", "亲爱的你  想念自己吗",
  "觉悟，留恋和坚强", "不去寻找，只因爱所以相遇", "Waiting for a joy ride", "天空和路一样远", "不要担心", "你不喜欢的 也如今它们四散无寻",
  "你的人生其实不是因为获得他人的祝福所以才在等你", "希望大家所有的期待都会找到圆满的方式", "这些都是屁话", "希望你能像我一样 喜欢你们自己",
  "不去想自由反而更轻松", "明天我们好好的过", "成功没那么严重做自己反而比较心安理得", "You are to be shining so bright shining bright",
  "尽情不求自由", "然后转头", "任好坏开花结果", "想透了能有多轻松", "请永远开心的去找你自己是谁 不要去当一个什么样的人",
  "这个世界其实比你想象的大", "人生很多发生的事情都是值得觉得幸福的", "不要放弃思索的过程", "去体验", "你就已经很棒了",
  "自由就是一瞬间", "不会有答案", "希望你能永远都张牙舞爪", "别忘了要快乐", "都不必心慌", "在苦心之后看潮汐的永恒", "容忍它发生",
  "总有的", "今天就是今天", "深遂的未知会浅一点", "Don't be afraid to let things happen", "时光是坟场", "没有尽头是一切的终点",
  "故事慢慢讲", "欲望的生活里 考卷都交的太早", "你拥抱的 并不总是也拥抱你 而我想说的 谁也不可惜", "去挥霍和珍惜 是同一件事情",
  "何必", "请随时准备好 拥抱", "你渴望的一切都将来到", "心是一地草野 唯一的家乡", "快乐悲伤都放肆", "拿剪刀奔向三千个烦恼",
  "下一秒会更轻松", "一切值得快乐", "放着欲望不管", "有时候问题和答案无关", "有时候爱只和自己有关", "成长的滋味说起来并不算坏",
  "这世界如此美好", "这世界即将美好", "在活与不活之间找还行的路", "顺其自然以后再也不会遗憾", "袖手旁观", "去表达感觉上的需要",
  "思考什么不必得到", "眼前全在这里", "超脱和追求时常是混在一起", "没有多大意思", "You ought to face it", "有它自个儿的样子",
  "你多难得", "始终无法决定方向", "你将看见飞鱼与鸟的艳阳天", "这个世界其实是异常立体, 可是声音是极为复杂的", "至少我们还在感受",
  "这些都没有关系", "快逃啊！别试了快逃啊！", "偶尔叹口气", "自己才是唯一可以有耐心带着自己活到下一秒的那个人", "我们都尽力了",
  "你们都辛苦了", "不必流浪", "活着疯癫的", "你说胜利就是胜利", "go and waste it", "不如成全它本可能造的悲剧",
  "吃呀，吃不完就剩 剩的拣去噎死人生", "别祈祷我们先闹", "也许在梦的出口", "你会快乐", "是梦也快乐", "此刻灿烂", "原谅所有遗憾",
  "能如何便如何", "像所有人一样谦卑", "后来不是未来 而是从此现在", "你是一个世界", "别停下来", "看见你想看见的",
  "真诚的去面对人生的每一个选择", "不用更好，可是要值得", "It's always good that something happen in your life"
];
// 补齐到 140 页
while (ANSWERS_DATA.length <= 140) {
  ANSWERS_DATA.push("去更深的答案里");
}

// --- 沙盒交互组件 ---
function AnswerBookSandbox() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [question, setQuestion] = useState("");
  const [pageNum, setPageNum] = useState("");
  const [result, setResult] = useState<{ text: string; page: number } | null>(null);
  const [error, setError] = useState("");

  const handleReveal = () => {
    setError("");
    let targetPage = parseInt(pageNum, 10);
    
    if (!pageNum || isNaN(targetPage)) {
      targetPage = Math.floor(Math.random() * 140) + 1;
      setPageNum(targetPage.toString());
    } else if (targetPage < 1 || targetPage > 140) {
      setError("页码需在 1 ～ 140 之间哦");
      return;
    }

    setResult({
      text: ANSWERS_DATA[targetPage],
      page: targetPage,
    });
  };

  return (
    <div className="mt-12 rounded-2xl border border-slate-200 bg-slate-50/50 p-6 shadow-sm">
      <h4 className="mb-6 flex items-center gap-2 text-lg font-bold text-slate-800">
        <Sparkles className="h-5 w-5 text-blue-600" />
        沉浸体验答案之书
      </h4>
      
      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.button
            key="ask-button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, height: 0, overflow: "hidden" }}
            onClick={() => setIsExpanded(true)}
            className="w-full rounded-xl border-2 border-dashed border-blue-200 bg-white py-8 text-center text-sm font-bold text-blue-500 transition hover:border-blue-400 hover:bg-blue-50"
          >
            ✨ 问一个心中的疑问吧 ✨
          </motion.button>
        ) : (
          <motion.div
            key="sandbox-content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="space-y-5 overflow-hidden"
          >
            <div>
              <label className="mb-2 block text-xs font-bold text-slate-500">写下你心中的一个疑惑 (或直接翻页)</label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                placeholder="例如：今天要去健身房吗？"
              />
            </div>
            
            <div className="flex flex-col gap-4 md:flex-row md:items-end">
              <div className="flex-1">
                <label className="mb-2 block text-xs font-bold text-slate-500">指定映射页码 (1-140)</label>
                <input
                  type="number"
                  value={pageNum}
                  onChange={(e) => setPageNum(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  placeholder="1-140随机输入数字"
                  min="1"
                  max="140"
                />
              </div>
              <button
                onClick={handleReveal}
                className="flex h-12 w-full flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 font-bold text-white transition hover:bg-blue-600 md:w-auto"
              >
                <BookOpen className="h-4 w-4" /> 翻开这一页
              </button>
            </div>
            
            {error && <p className="text-sm text-red-500">{error}</p>}

            <AnimatePresence mode="wait">
              {result && (
                <motion.div
                  key={result.page}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 rounded-xl border border-blue-100 bg-white p-6 shadow-sm"
                >
                  <div className="mb-3 flex items-center justify-between text-xs font-bold text-slate-400">
                    <span>PAGE {result.page}</span>
                    <span>出自《安溥·时寐》</span>
                  </div>
                  <p className="font-serif text-2xl font-bold italic text-blue-600 md:text-3xl">
                    “{result.text}”
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- 基础数据配置 ---
const RESUME_DATA = {
  name: "孙雨彤",
};

// 1. 内容与产品实践
const CONTENT_PRACTICES = [
  {
    id: "newspaper",
    caseNo: "PRACTICE 01",
    title: "《时寐日报》内容产品",
    subtitle: "将热烈和爱转化为可触摸的情绪载体",
    type: "线下产品 / 内容策划",
    cover: "/时寐照片.png", 
    link: "https://6a463974aa14151017dd13af--radiant-pudding-7ad1d2.netlify.app/", 
    linkLabel: "在线翻阅《时寐日报》",
    theme: "bg-[#f5ebd9]",
    tags: ["用户洞察", "纸媒设计", "内容策划", "线下落地"],
    summary:
      "基于粉丝群体的情感诉求洞察，独立策划并落地高收藏价值的纸质报纸，累计完成近 2500 份的实物交付。",
    sections: [
      {
        title: "D1：用户洞察与产品定义",
        text: "通过社群观察发现，粉丝群体对纸质媒介、访谈文字和歌词有较强依赖, 因此决定采用报纸, 既是文青偏爱的文艺复古, 又兼具了文字的传达和陪伴，满足其情感代偿与互动需求。",
      },
      {
        title: "D2：内容重组与视觉排版",
        text: "围绕成长、孤独、选择等主题，独立完成数万字访谈与演出素材的筛选、图片选取和文字整理，并独立负责视觉设计与整体排版适配。",
      },
      {
        title: "D3：生产闭环与真实验证",
        text: "独立对接印刷供应商，把控尺寸、纸张与交付节奏。首批 500 份迅速落地交付，根据真实反馈追加印制近 2000 份，成功验证了高情绪价值实物产品的市场需求。",
      },
    ],
    pitch:
      "在这个数字时代，物理实体的触感往往能提供稀缺的情绪价值。这次实践完整的经历了从‘无形概念’到‘有形产品’的全供应链闭环。",
  },
  {
    id: "answer-book",
    caseNo: "PRACTICE 02",
    title: "“答案之书”互动网页",
    subtitle: "把情感诉求转化为线上轻互动",
    type: "线上互动产品",
    // 换成淡色系的书本/桌面
    cover:
      "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=1400&q=85",
    link: "https://share.htmlput.com/p/2pr6vrfakn?lang=zh",
    linkLabel: "在线体验《答案之书》",
    theme: "bg-[#eaf4ff]",
    tags: ["AIGC", "网页开发", "内容运营", "轻交互"],
    isInteractive: true, 
    summary:
      "利用 AI 工具辅助全链路开发，上线半月独立访客 2000+，全项目累计触达用户 4000+。",
    sections: [
      {
        title: "D1：从陪伴感出发的轻量设计",
        text: "提取用户渴望互动与安抚的心理，设计 140 条具有随机回应特点的文案，通过答案之书的输入和随机翻页动效，强化获取答案的和互动的仪式感。",
      },
      {
        title: "D2：沉淀 AIGC 协作工作流",
        text: "独立完成需求拆解、主题聚类、文案生成等任务, 运用 GPT、Claude 等工具，辅助完成页面开发和校准。。",
      },
      {
        title: "D3：数据反馈与持续迭代",
        text: "发布后经社群自然传播，上线半月点击率破两千，平均停留时间大于2分钟。",
      },
    ],
    pitch:
      "如何理解需求、拆分需求、如何设计提示命令词让 AI 赋能项目。在这个项目中完全体现了vibecoding的应用及落地。",
  },
  {
    id: "debate-team",
    caseNo: "EXP 02",
    title: "校辩论队创始",
    subtitle: "创始人 & 现任教练",
    type: "组织统筹",
    cover:
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1400&q=85",
    theme: "bg-[#f8f9fa]",
    tags: ["架构搭建", "活动统筹", "团队管理"],
    summary:
      "独立完成校队全套规划与架构搭建，统筹 500 人规模的市级赛事，有极强的组织协调能力。",
    sections: [
      {
        title: "从 0 到 1 的组织架构搭建",
        text: "独立撰写全套《发展规划》《组织章程》《考核标准》，推动辩论队正式挂牌成立，实现了管理上的规范化与持续化运营。",
      },
      {
        title: "大型赛事统筹与落地",
        text: "主办芜湖市 500 人以上规模的三校辩论赛。全面负责活动策划、赛程编排、宣传海报、评委邀请及 12 支参赛队伍的现场调度，活动满意度高达99%。",
      },
      {
        title: "梯队建设与人才管理",
        text: "建立标准化的招新、培训、选拔和复盘机制，带领队伍参加校级、省级、国家级比赛，培养 40 余名核心队员，冠军选手超过50%。",
      },
    ],
  },
];

// 2. 数据与科研实践
const DATA_RESEARCH = [
  {
    id: "churn-model",
    caseNo: "DATA 01",
    title: "游戏用户流失预测与策略建模",
    subtitle: "用数据识别高风险用户，并制定精准干预方案",
    type: "数据分析 / 业务策略",
    // 换成淡色/白色的游戏手柄概念图
    cover:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1400&q=85",
    theme: "bg-[#e8fbfb]",
    tags: ["Python", "SQL", "数据分析", "用户分层"],
    summary:
      "构建包含流失预测、用户分群与干预优化的分析框架，设计最优策略预计平均挽留成功率达 61.7%。",
    sections: [
      {
        title: "D1：特征工程与前兆提取",
        text: "面向 1 万名游戏用户、90 万条日行为日志、7千多条付费记录和 三万五千多条好友关系数据，使用 SQL / Python 完成清洗处理，提取流失前兆特征。",
      },
      {
        title: "D2：流失预测与精细化分群",
        text: "构建逻辑回归、XGBoost等融合模型评估流失风险。结合特征重要性，将用户划分为‘付费沉默型’、‘长期沉默型’等具体群体。",
      },
      {
        title: "D3：资源约束下的干预策略",
        text: "更进一步在预算和干预人数约束下，为不同分群匹配最优干预策略，设计最优策略预计平均挽留成功率达 61.7%。",
      },
    ],
    pitch:
      "数据分析的终点永远不是模型本身，而是策略的落地。",
  },
  {
    id: "rl-portfolio",
    caseNo: "RESEARCH 01",
    title: "动态投资组合策略研究",
    subtitle: "基于强化学习的连续时间金融模型",
    type: "科研经历 / 算法应用",
    // 换成淡色背景的数据图表/屏幕
    cover:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=85",
    theme: "bg-[#f3f0ff]",
    tags: ["强化学习", "PyTorch", "大模型算法"],
    summary:
      "独立完成论文从理论推导到算法模拟的全链路落地，误差控制在2.31% 以内，在1000+篇投稿里入选系统科学大会口头汇报。",
    sections: [
      {
        title: "D1：算法设计与大模型协作",
        text: "深度掌握主流大模型AI能力边界，将复杂的金融任务拆解为定制化提示词，高效完成理论推导与难点定位。",
      },
      {
        title: "D2：环境搭建与代码调优",
        text: "完成从环境搭建到 PyTorch 代码实现与参数调优的全流程，最终模型预测误差控制在 2.31% 以内，展现了强大的算法落地执行力。",
      },
      {
        title: "D3：学术认可与产出",
        text: "论文从第十届中国系统科学大会 1000+ 篇投稿中脱颖而出，获选为口头汇报论文，完成现场 15 分钟报告并获专家高度认可。",
      },
    ],
    pitch:
      "科研培养了我面对不确定性问题的拆解能力，高效高质完成新任务新问题便成为我的核心竞争力。",
  },
];

// 3. 实习经历
const INTERNSHIPS_ORG = [
  {
    id: "hns-internship",
    caseNo: "EXP 01",
    title: "上海花楠珊文化传播",
    subtitle: "大数据处理与分析岗位",
    type: "实习经历",
    // 换成了淡色系、有光泽的电脑和办公桌图
    cover:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85",
    theme: "bg-[#fff4e8]",
    tags: ["SPSS/R/SQL", "多场景分析", "报告交付", "需求拆解"],
    summary:
      "参与跨行业的多份数据分析项目，快速拆解模糊需求，输出高效的分析与策略的规划。",
    sections: [
      {
        title: "多领域业务需求拆解",
        text: "覆盖心理测评、品牌满意度、餐饮消费、医疗健康等多元场景。能快速理解客户核心诉求，将模糊的业务目的转译为用户画像、满意度归因等可量化问题。",
      },
      {
        title: "高效高质的数据处理与分析",
        text: "三个月内经手过200+份数据、包含清晰、处理、分析。熟练使用 SPSS、Excel、R 完成描述性统计、主成分分析与显著性检验；运用 Python 和 SQL 进行数据清洗与基础查询，正确率大于99%，平均交付时间小于2天。",
      },
      {
        title: "分析报告与建议",
        text: "将分析结果转化为客户可理解的结构化商业报告。指出潜在优化方向，为产品迭代和运营策略提供改进方向，客户满意度高于90%。",
      },
    ],
  },
];

// 4. 核心能力数据
const ABILITIES_DATA = [
  {
    id: "ab-ai",
    caseNo: "SKILL 01",
    title: "AIGC与提示词工程",
    subtitle: "将大模型深度融入工作与研发流",
    theme: "bg-[#f8fbff]",
    tags: ["GPT", "Claude", "Gemini", "AI Workflow"],
    summary: "熟悉AI模型能力边界，具备任务拆解与分阶段 Prompt 设计能力。能熟练应用 AI 于拆解任务、内容生成、代码辅助等，显著提高个人能效边界。"
  },
  {
    id: "ab-data",
    caseNo: "SKILL 02",
    title: "数据分析",
    subtitle: "统计学底蕴 + 全链路开发能力",
    theme: "bg-[#fff9f0]",
    tags: ["Python", "SQL", "SPSS", "PyTorch"],
    summary: "熟练运用 Python/SQL/SPSS 进行数据清洗、提取和分析。掌握 PyTorch 框架及 MATLAB、R语言。"
  },
  {
    id: "ab-content",
    caseNo: "SKILL 03",
    title: "业务洞察与内容转化",
    subtitle: "理性分析驱动的感性表达",
    theme: "bg-[#f0f9ff]",
    tags: ["需求拆解", "指标转换", "用户画像"],
    summary: "能够快速理解新业务场景，善于将数据结论与模型结果翻译为具体的运营建议，让数据服务于真实的商业价值转化。"
  },
  {
    id: "ab-execute",
    caseNo: "SKILL 04",
    title: "综合素质",
    subtitle: "从 0 到 1 的破局与闭环力",
    theme: "bg-[#fbf5ff]",
    tags: ["多线程并行", "项目管理", "跨界沟通"],
    summary: "责任心强、抗压能力极强，拥有丰富的统筹与沟通经验，可保持高频稳定交付。"
  },
];

// --- 动画配置 ---
const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.65 },
};

// --- 公共组件 ---
function SectionHeading({ eyebrow, title, desc }: any) {
  return (
    <motion.div {...fadeInUp} className="mb-12">
      <p className="mb-3 text-xs font-black uppercase tracking-[0.5em] text-blue-600">
        {eyebrow}
      </p>
      <h2 className="font-serif text-4xl font-bold italic leading-none text-slate-950 md:text-6xl">
        {title}
      </h2>
      {desc && (
        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-500">
          {desc}
        </p>
      )}
    </motion.div>
  );
}

function DataCard({ item, onOpen }: any) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen && onOpen(item)}
      whileHover={onOpen ? { y: -8 } : {}}
      transition={{ duration: 0.25 }}
      className={`group overflow-hidden rounded-[2rem] ${item.theme} text-left shadow-[0_18px_45px_rgba(50,90,130,0.12)] transition ${onOpen ? 'hover:shadow-[0_24px_60px_rgba(37,99,235,0.18)] cursor-pointer' : 'cursor-default'}`}
    >
      {item.cover && (
        <div className="aspect-[16/9] overflow-hidden border-b border-black/5 bg-white">
          <img
            src={item.cover}
            alt={item.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-7 md:p-8">
        <div className="mb-7 flex items-center justify-between">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-slate-400">
            {item.caseNo}
          </p>
          {onOpen && (
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white/80 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
              <ExternalLink className="h-4 w-4" />
            </span>
          )}
        </div>
        <h3 className="text-2xl font-black leading-snug text-slate-950 md:text-3xl">
          {item.title}
        </h3>
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-slate-500">
          {item.summary}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {item.tags.slice(0, 3).map((tag: string) => (
            <span
              key={tag}
              className="rounded-full bg-white/70 px-3 py-1 text-xs font-bold text-slate-500"
            >
              {tag}
            </span>
          ))}
        </div>
        {onOpen && (
          <p className="mt-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-blue-600">
            {item.isInteractive || item.link ? "View Details & Demo" : "Read Details"}
            <ChevronRight className="h-4 w-4" />
          </p>
        )}
      </div>
    </motion.button>
  );
}

function DataModal({ item, onClose }: any) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 px-4 py-8 backdrop-blur-md md:py-14"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.article
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.28 }}
            onMouseDown={(e: any) => e.stopPropagation()}
            className="relative mx-auto min-h-[86vh] max-w-4xl rounded-[2rem] bg-white p-5 shadow-2xl md:rounded-[2.5rem] md:p-10"
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-700 transition hover:bg-slate-950 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
            
            {/* 顶部展示封面图 */}
            {item.cover && (
              <div className="overflow-hidden rounded-[1.5rem] shadow-[0_16px_40px_rgba(15,23,42,0.16)]">
                <img
                  src={item.cover}
                  alt={item.title}
                  className="h-64 w-full object-cover md:h-80"
                />
              </div>
            )}

            <div className="mt-8">
              <p className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-blue-600">
                {item.type}
              </p>
              <h2 className="font-serif text-4xl font-bold italic leading-tight text-blue-600 md:text-5xl">
                {item.title}
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-500">
                {item.subtitle}
              </p>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-2">
              {item.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full bg-blue-50 px-4 py-2 text-xs font-bold text-blue-600"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* 如果项目包含 interactive 标识，展示互动沙盒 */}
            {item.isInteractive && <AnswerBookSandbox />}
            
            {item.sections && (
              <div className="mt-10 space-y-8">
                {item.sections.map((sec: any) => (
                  <div
                    key={sec.title}
                    className="border-l-4 border-blue-600 pl-5"
                  >
                    <h3 className="text-lg font-black text-slate-950">
                      {sec.title}
                    </h3>
                    <p className="mt-3 text-sm leading-8 text-slate-600">
                      {sec.text}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* 动态渲染的高亮跳转按钮 */}
            {item.link && (
              <div className="mt-10 flex justify-center">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-sm font-bold text-white shadow-lg transition hover:-translate-y-1 hover:bg-blue-600"
                >
                  <BookOpen className="h-5 w-5" />
                  {item.linkLabel || "查看在线项目"}
                </a>
              </div>
            )}
            
            {item.pitch && (
              <div className="mt-12 rounded-[1.5rem] border border-blue-200 bg-blue-50 p-7">
                <h3 className="mb-3 flex items-center gap-2 text-lg font-black text-slate-950">
                  <Sparkles className="h-5 w-5 text-blue-600" />
                  延伸思考
                </h3>
                <p className="text-sm leading-8 text-slate-600">{item.pitch}</p>
              </div>
            )}
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// --- 页面布局组件 ---
function Navbar({}: any) {
  const [open, setOpen] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [copied, setCopied] = useState(false);

  const navItems = [
    { label: "Content Practices", href: "#content-practices" },
    { label: "Data & Research", href: "#data-research" },
    { label: "Internships", href: "#internships" },
    { label: "Abilities", href: "#abilities" },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText("18805571318");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <nav className="fixed left-0 top-4 z-40 w-full px-4">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full border border-white/70 bg-white/75 px-4 shadow-[0_12px_40px_rgba(80,120,180,0.16)] backdrop-blur-xl">
        <a
          href="#top"
          className="flex items-center gap-2 rounded-full text-sm font-black tracking-tight text-slate-900"
        >
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-blue-600 text-white">
            S
          </span>
          SYT.AI
        </a>
        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500 transition hover:text-blue-600"
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <a
            href="mailto:18805571318@163.com"
            className="rounded-full bg-blue-50 px-5 py-2 text-xs font-black uppercase tracking-[0.12em] text-blue-600 transition hover:bg-blue-100"
          >
            Contact Me
          </a>
          <button
            onClick={() => setShowContact(true)}
            className="grid h-9 w-9 place-items-center rounded-full bg-slate-950 text-white transition hover:bg-blue-600"
          >
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="grid h-9 w-9 place-items-center rounded-full bg-slate-950 text-white lg:hidden"
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>
      
      {/* 手机端下拉菜单 */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-auto mt-3 max-w-5xl rounded-3xl border border-white/70 bg-white/90 p-4 shadow-xl backdrop-blur-xl lg:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 定制化的联系方式高级弹窗 */}
      <AnimatePresence>
        {showContact && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 px-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={() => setShowContact(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              onMouseDown={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm rounded-[2rem] bg-white p-8 text-center shadow-2xl"
            >
              <button
                onClick={() => setShowContact(false)}
                className="absolute right-5 top-5 grid h-8 w-8 place-items-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-950 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
              
              <div className="mx-auto mb-5 grid h-14 w-14 place-items-center rounded-full bg-blue-50 text-blue-600">
                <Mail className="h-6 w-6" />
              </div>
              
              <h3 className="mb-2 text-2xl font-black text-slate-950">联系我</h3>
              <p className="text-lg font-bold text-slate-700">微信号：18805571318</p>
              <p className="mt-1 text-sm text-slate-500">（手机号同）</p>
              
              <button
                onClick={handleCopy}
                className="mt-8 w-full rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                {copied ? "微信号已复制！" : "一键复制微信号"}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Hero({}: any) {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-end overflow-hidden bg-[#dbeffc] px-5 pb-16 pt-28"
    >
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=85"
          alt=""
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-white/30" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white via-white/65 to-transparent" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto w-full max-w-5xl text-center"
      >
        <p className="mb-4 text-xs font-black uppercase tracking-[0.55em] text-white drop-shadow">
          AI Product · Data Analysis · Growth
        </p>
        <h1 className="mx-auto max-w-4xl font-serif text-6xl italic leading-[0.88] text-white drop-shadow-md md:text-8xl">
          {RESUME_DATA.name}
          <br />
          Little Universe
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base font-medium leading-8 text-white/95 drop-shadow md:text-lg">
          处理算法与数据，也洞察情绪与人性。<br/>用 AIGC 加速效率，也用内容引发共鸣。
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <a
            href="#content-practices"
            className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-7 py-3 text-sm font-black text-white shadow-lg shadow-blue-600/25 transition hover:-translate-y-0.5 hover:bg-blue-700"
          >
            <Play className="h-4 w-4 fill-white" /> Explore Portfolio
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function Quote({}: any) {
  return (
    <section className="bg-[#f7fbff] px-5 py-28 md:py-36">
      <motion.div {...fadeInUp} className="mx-auto max-w-4xl text-center">
        <h2 className="font-serif text-4xl font-bold italic leading-tight text-slate-950 md:text-6xl">
          “用数据支撑判断，
          <br className="hidden md:block" />
          用结论分析决策。”
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-slate-500">
          无论是分析表格里跌宕的转化率，还是报纸上铅字印刷的访谈，背后都指向同一个命题：如何更精准地理解业务，理解用户，并把想法实实在在地交付出来。
        </p>
      </motion.div>
    </section>
  );
}

function Footer({}: any) {
  return (
    <footer className="bg-white px-5 py-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <h2 className="mb-2 font-serif text-4xl font-bold italic tracking-tight text-blue-600 md:text-5xl">
              Sun Yutong®
            </h2>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
              Based in China / Available Worldwide
            </p>
          </div>
          <div className="text-left md:text-right">
            <p className="mb-4 text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
              18805571318@163.com
            </p>
            <div className="flex items-center gap-5 text-slate-300 md:justify-end">
              <a
                href="mailto:18805571318@163.com"
                className="transition hover:text-blue-600"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 md:flex-row">
          <p>© 2026 SUN YUTONG® ALL RIGHTS RESERVED</p>
          <p>CRAFTED WITH EMOTION & DATA</p>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="min-h-screen scroll-smooth bg-[#f7fbff] font-sans text-slate-800 selection:bg-blue-200/70">
      <Navbar />
      <Hero />
      <Quote />

      {/* 1. 内容与产品实践 */}
      <section id="content-practices" className="px-5 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="Section 01"
            title="内容、产品与协调"
            desc="把需求落地，把思考精雕细琢。"
          />
          <div className="grid gap-7 md:grid-cols-2">
            {CONTENT_PRACTICES.map((p) => (
              <DataCard key={p.id} item={p} onOpen={setSelectedItem} />
            ))}
          </div>
        </div>
      </section>

      {/* 2. 数据与科研实践 */}
      <section id="data-research" className="bg-white px-5 py-24 md:py-32">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="Section 02"
            title="项目与科研实践"
            desc="用数据建模解释现象，将理论与算法结合落地。"
          />
          <div className="grid gap-7 md:grid-cols-2">
            {DATA_RESEARCH.map((p) => (
              <DataCard key={p.id} item={p} onOpen={setSelectedItem} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. 实习经历 (已独立为一个章节) */}
      <section id="internships" className="px-5 py-24 md:py-32 bg-[#f8f9fa]">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="Section 03"
            title="实习经历"
            desc="在真实的工作交付中，验证质量与效率。"
          />
          <div className="grid gap-7 md:grid-cols-2">
            {INTERNSHIPS_ORG.map((exp) => (
              <DataCard key={exp.id} item={exp} onOpen={setSelectedItem} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. 核心能力展示区 */}
      <section id="abilities" className="px-5 py-24 md:py-32 bg-white">
        <div className="mx-auto max-w-5xl">
          <SectionHeading
            eyebrow="Section 04"
            title="核心能力"
            desc="从数据基础到 AI 应用，从思维到行为。"
          />
          <div className="grid gap-7 md:grid-cols-2">
            {ABILITIES_DATA.map((ab) => (
              <DataCard key={ab.id} item={ab} onOpen={null} /> 
            ))}
          </div>
        </div>
      </section>

      <Footer />
      
      {/* 统一的模态框组件，用于渲染点击后的详情、画廊和沙盒 */}
      <DataModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}