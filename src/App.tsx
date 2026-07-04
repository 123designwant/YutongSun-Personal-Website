import { useState } from "react";
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
  "",
  "You life will find it's way",
  "自由的去体会",
  "所有外界发生的事情都是来陪你体验你自己的",
  "好像其实都没有人懂 有的",
  "变成一个 更圆满的人",
  "再做做看 再试试看",
  "嬉皮笑脸的活在 这个世界上",
  "在万物之中 辨识自己",
  "但这都不重要啊",
  "you are not alone",
  "没什么好期待的了",
  "为自己去做实验去印证",
  "你是对的",
  "你永远都可以坚持自己",
  "轻轻挥走就好了",
  "你只要完成自己就好",
  "其实我们生下来就被赋予一份祝福 就是我们做得到",
  "只专心的去照顾 自己的选择",
  "不去想ta的意义",
  "光是能遇见就已经好了不起了",
  "无常才留下了人生有意义的事情",
  "知道太多就会开始烦恼",
  "不妥协的幸运 很难遇到",
  "日子该是不同形状",
  "领悟或看开些什么真得需要时间",
  "那样不错",
  "把精雕细琢的成品抛空",
  "别怕",
  "不要让眼泪成为生活的客串",
  "别回头去想",
  "这不是不好的事",
  "你很好 现在别开始遗憾",
  "其实谁不这样",
  "相信自己值得",
  "Gonna Stop",
  "You will try it out someday",
  "慢慢地来",
  "就让它走",
  "似乎问题答案都相反",
  "把吊着的自己 放下来",
  "做回原本模样",
  "仍旧叛逆",
  "亲爱的你  想念自己吗",
  "觉悟，留恋和坚强",
  "不去寻找，只因爱所以相遇",
  "Waiting for a joy ride",
  "天空和路一样远",
  "不要担心",
  "你不喜欢的 也如今它们四散无寻",
  "你的人生其实不是因为获得他人的祝福所以才在等你",
  "希望大家所有的期待都会找到圆满的方式",
  "这些都是屁话",
  "希望你能像我一样 喜欢你们自己",
  "不去想自由反而更轻松",
  "明天我们好好的过",
  "成功没那么严重做自己反而比较心安理得",
  "You are to be shining so bright shining bright",
  "尽情不求自由",
  "然后转头",
  "任好坏开花结果",
  "想透了能有多轻松",
  "请永远开心的去找你自己是谁 不要去当一个什么样的人",
  "这个世界其实比你想象的大",
  "人生很多发生的事情都是值得觉得幸福的",
  "不要放弃思索的过程",
  "去体验",
  "你就已经很棒了",
  "自由就是一瞬间",
  "不会有答案",
  "希望你能永远都张牙舞爪",
  "别忘了要快乐",
  "都不必心慌",
  "在苦心之后看潮汐的永恒",
  "容忍它发生",
  "总有的",
  "今天就是今天",
  "深遂的未知会浅一点",
  "Don't be afraid to let things happen",
  "时光是坟场",
  "没有尽头是一切的终点",
  "故事慢慢讲",
  "欲望的生活里 考卷都交的太早",
  "你拥抱的 并不总是也拥抱你 而我想说的 谁也不可惜",
  "去挥霍和珍惜 是同一件事情",
  "何必",
  "请随时准备好 拥抱",
  "你渴望的一切都将来到",
  "心是一地草野 唯一的家乡",
  "快乐悲伤都放肆",
  "拿剪刀奔向三千个烦恼",
  "下一秒会更轻松",
  "一切值得快乐",
  "放着欲望不管",
  "有时候问题和答案无关",
  "有时候爱只和自己有关",
  "成长的滋味说起来并不算坏",
  "这世界如此美好",
  "这世界即将美好",
  "在活与不活之间找还行的路",
  "顺其自然以后再也不会遗憾",
  "袖手旁观",
  "去表达感觉上的需要",
  "思考什么不必得到",
  "眼前全在这里",
  "超脱和追求时常是混在一起",
  "没有多大意思",
  "You ought to face it",
  "有它自个儿的样子",
  "你多难得",
  "始终无法决定方向",
  "你将看见飞鱼与鸟的艳阳天",
  "这个世界其实是异常立体, 可是声音是极为复杂的",
  "至少我们还在感受",
  "这些都没有关系",
  "快逃啊！别试了快逃啊！",
  "偶尔叹口气",
  "自己才是唯一可以有耐心带着自己活到下一秒的那个人",
  "我们都尽力了",
  "你们都辛苦了",
  "不必流浪",
  "活着疯癫的",
  "你说胜利就是胜利",
  "go and waste it",
  "不如成全它本可能造的悲剧",
  "吃呀，吃不完就剩 剩的拣去噎死人生",
  "别祈祷我们先闹",
  "也许在梦的出口",
  "你会快乐",
  "是梦也快乐",
  "此刻灿烂",
  "原谅所有遗憾",
  "能如何便如何",
  "像所有人一样谦卑",
  "后来不是未来 而是从此现在",
  "你是一个世界",
  "别停下来",
  "看见你想看见的",
  "真诚的去面对人生的每一个选择",
  "不用更好，可是要值得",
  "It's always good that something happen in your life",
];
while (ANSWERS_DATA.length <= 140) {
  ANSWERS_DATA.push("去更深的答案里");
}

// --- 沙盒交互组件 (已更新为暖白+明黄质感) ---
function AnswerBookSandbox() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [question, setQuestion] = useState("");
  const [pageNum, setPageNum] = useState("");
  const [result, setResult] = useState<{ text: string; page: number } | null>(
    null
  );
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
    <div className="mt-12 rounded-xl border border-stone-200 bg-[#FEFCF6] p-6 shadow-sm">
      <h4 className="mb-6 flex items-center gap-2 text-lg font-serif font-bold italic text-stone-900">
        <Sparkles className="h-5 w-5 text-[#F5A623]" />
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
            className="w-full rounded-lg border-2 border-dashed border-[#FDE6A8] bg-white py-8 text-center text-sm font-bold text-[#F5A623] transition hover:border-[#F5A623] hover:bg-[#FFF9EB]"
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
              <label className="mb-2 block text-xs font-bold text-stone-500">
                写下你心中的一个疑惑 (或直接翻页)
              </label>
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="w-full rounded-lg border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623]"
                placeholder="例如：我会一切顺利吗？"
              />
            </div>

            <div className="flex flex-col gap-4 md:flex-row md:items-end">
              <div className="flex-1">
                <label className="mb-2 block text-xs font-bold text-stone-500">
                  指定映射页码 (1-140)
                </label>
                <input
                  type="number"
                  value={pageNum}
                  onChange={(e) => setPageNum(e.target.value)}
                  className="w-full rounded-lg border border-stone-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#F5A623] focus:ring-1 focus:ring-[#F5A623]"
                  placeholder="1-140随机输入数字"
                  min="1"
                  max="140"
                />
              </div>
              <button
                onClick={handleReveal}
                className="flex h-12 w-full flex-1 items-center justify-center gap-2 rounded-lg bg-stone-900 px-6 font-bold tracking-widest text-[#FEFCF6] transition hover:bg-[#F5A623] md:w-auto"
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
                  className="mt-6 rounded-lg border-l-4 border-[#F5A623] bg-white p-6 shadow-sm"
                >
                  <div className="mb-3 flex items-center justify-between text-xs font-bold text-stone-400">
                    <span>PAGE {result.page}</span>
                    <span>出自《安溥·时寐》</span>
                  </div>
                  <p className="font-serif text-2xl font-bold italic text-stone-800 md:text-3xl">
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
    subtitle: "把演唱会前后的期待与余温，转化为可触碰的纸质内容产品",
    type: "线下产品 / 内容策划",
    // 【已修复照片】：换成了极具质感的排版/报纸杂志图
    cover:
      "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=1400",
    link: "https://6a463974aa14151017dd13af--radiant-pudding-7ad1d2.netlify.app/",
    linkLabel: "在线翻阅《时寐日报》",
    theme: "bg-[#FEFAEF]",
    tags: ["用户洞察", "纸媒设计", "内容策划"],
    summary:
      "围绕演唱会前后的情绪节点，独立完成《时寐日报》的素材筛选、内容策划、视觉排版、印刷对接与。首批 500 份快速发放，后续追加印制近 2000 份；一周内账号粉丝量增长约 20 倍，相关内容热度达到官方粉丝账号约 3 倍。",
    sections: [
      {
        title: "D1：用户洞察",
        text: "观察到粉丝会在演唱会前后反复翻看、收藏演出的 talking 和现场图文记录，对“可反复阅读、可留存”的内容形式有明确偏好。因此选择报纸作为载体，把分散素材整理成可收藏、可分享、可线下传递的实体记忆。",
      },
      {
        title: "D2：内容策划与交付推进",
        text: "围绕成长、孤独、选择、自由等主题，筛选并整理数万字访谈与演出素材，完成主题归类、栏目安排、图片选取、视觉排版和版面适配；同时对接印刷供应商，确认尺寸、纸张、价格和交付时间。",
      },
      {
        title: "D3：传播结果",
        text: "抓住演唱会 IP 的时间节点，推动报纸在粉丝圈层持续扩散。首批 500 份快速交付，后续追加印制 2000 份；一周内账号粉丝量增长约 20 倍，相关内容线上热度达到官方粉丝账号约 3 倍。",
      },
    ],
    pitch:
      "我喜欢报纸这种形式，是因为它让一场演唱会不只停在当天。那些期待、回声、谈话和金句，被重新放进纸页里以后，就有了可以保存、转赠和再次打开的形状。",
  },
  {
    id: "answer-book",
    caseNo: "PRACTICE 02",
    title: "“答案之书”互动网页",
    subtitle: "把一句随机的情绪回应，做成可以反复打开的轻量互动",
    type: "线上互动产品",
    cover:
      "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=1400&q=85",
    link: "https://share.htmlput.com/p/2pr6vrfakn?lang=zh",
    linkLabel: "在线体验《答案之书》",
    theme: "bg-[#FDFBF7]",
    tags: ["AIGC", "交互设计", "内容策划"],
    isInteractive: true,
    summary:
      "独立策划并开发“答案之书”轻互动网页，设计了从输入问题到答案揭示的完整闭环，并使用 AI 辅助前端代码落地。上线半月独立访客 2000+，累计触达用户 4000+。",
    sections: [
      {
        title: "D1：互动设计",
        text: "将“提问 - 等待 - 翻页 - 获得答案”的过程设计成一条低门槛互动路径……页面重点放在移动端体验、答案出现的节奏和结果的可分享性上。",
      },
      {
        title: "D2： Vibe Coding 实践",
        text: "独立完成需求拆解、主题聚类、文案生成和页面校准，并使用 GPT、Claude 辅助前端代码生成与调试。形成“用户需求拆解 - 内容主题聚类 - 文案生成 - 人工风格校准 - 页面开发 - 测试反馈优化”的 AI 协作流程。",
      },
      {
        title: "D3：成果反馈",
        text: "网页上线后通过社交平台自然扩散，半月独立访客 2000+，累计触达用户 4000+，用户围绕抽到的答案产生自发分享与反馈。",
      },
    ],
    pitch:
      "我想做的不是一个复杂工具，而是一个很轻的入口：用户打开它、问一句话、翻到一个答案，然后带着那句话离开，或者把它分享给别人。",
  },
  {
    id: "debate-team",
    caseNo: "EXP 02",
    title: "校辩论队创始与长期运营",
    subtitle: "创始人 & 现任教练",
    type: "组织建设 / 活动统筹",
    cover:
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1400&q=85",
    theme: "bg-[#F9F8F6]",
    tags: ["组织建设", "赛事统筹", "团队管理"],
    summary:
      "从 0 到 1 创立并长期运营校辩论队，建立组织制度、招新培训、选拔复盘和赛事管理机制；主导 500 人规模市级辩论赛，培养 40+ 核心队员。",
    sections: [
      {
        title: "从 0 到 1 的组织架构搭建",
        text: "独立撰写全套《发展规划》《组织章程》《考核标准》，推动辩论队正式挂牌成立，实现了管理上的规范化与持续化运营；同时建立招新、培训、选拔和复盘机制，让队伍从兴趣社群转变为可持续运转的校级组织。",
      },
      {
        title: "大型赛事统筹与落地",
        text: "主办 500 人以上规模“芜湖市辩论赛”，负责活动策划、宣传推广、赛程编排、评委邀请、现场执行及 12 支队伍协调，活动满意度超过90%。",
      },
      {
        title: "梯队建设与人才管理",
        text: "招募并培养 40+ 核心队员，建立从招新、基础训练、选拔组队到赛后复盘的培养机制；超过半数队员为冠军选手。",
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
    subtitle: "用行为数据识别高风险用户，并制定分群干预策略",
    type: "数据分析 / 业务策略",
    cover:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1400&q=85",
    theme: "bg-[#FCFBF8]",
    tags: ["Python", "SQL", "干预策略", "用户分层"],
    summary:
      "围绕手游用户活跃下降问题，基于 1 万名用户、90 万条日行为日志、7872 条付费记录和 35082 条好友关系数据，构建“流失预测 - 用户分群 - 干预优化”的运营分析框架，最终方案预计平均挽留成功率达 61.7%。",
    sections: [
      {
        title: "D1：数据处理",
        text: "使用 SQL 与 Python 清洗并整理包含 90 万条行为日志在内的万级用户数据，提取登录、付费、社交等维度的关键特征，用于捕捉流失前兆。",
      },
      {
        title: "D2：用户分层",
        text: "训练逻辑回归与 XGBoost 等模型评估流失风险，并结合特征重要性识别关键流失信号，根据流失风险和行为特征，将用户划分为付费沉默型、长期沉默型等群体。",
      },
      {
        title: "D3：干预策略",
        text: "在预算和干预人数约束下匹配不同干预策略，最终方案预计平均挽留成功率达 61.7%。",
      },
    ],
    pitch: "数据分析的终点永远不是模型本身，而是策略的落地。",
  },
  {
    id: "rl-portfolio",
    caseNo: "RESEARCH 01",
    title: "动态投资组合策略研究",
    subtitle: "基于强化学习的连续时间金融模型",
    type: "科研经历 / 算法应用",
    cover:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1400&q=85",
    theme: "bg-[#FBF9F6]",
    tags: ["强化学习", "PyTorch", "大模型算法"],
    summary:
      "独立完成论文从理论推导到算法模拟的全链路落地，误差控制在2.31% 以内，在1000+篇投稿里入选系统科学大会口头汇报。",
    sections: [
      {
        title: "D1：理论推导与模型创新",
        text: "基于连续时间金融理论，独立完成了投资组合模型的数理推导与核心创新点的构建，确保了底层金融逻辑的严密性与学术价值。",
      },
      {
        title: "D2：环境搭建与代码调优",
        text: "将复杂的数学公式精准拆解为工程需求，借助大模型 AI 高效完成了基于 PyTorch 的强化学习环境搭建、代码实现与超参数调优，最终将模型误差精准控制在 2.31% 以内。",
      },
      {
        title: "D3：学术认可与产出",
        text: "论文从第十届中国系统科学大会 1000+ 篇投稿中入选口头汇报，完成 15 分钟现场报告并获得专家认可。",
      },
    ],
    pitch:
      "这篇论文对我来说最重要的不是把公式写完，而是把一套抽象模型真正跑起来。理论、代码和结果之间能互相对上，才算完成了一次有效的研究。",
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
    cover:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85",
    theme: "bg-[#FEFBF5]",
    tags: ["SPSS/R/SQL", "多场景分析", "报告交付", "需求拆解"],
    summary:
      "参与跨行业的多份数据分析项目，快速拆解模糊需求，输出高效的分析与策略的规划。",
    sections: [
      {
        title: "多领域业务需求拆解",
        text: "覆盖心理测评、品牌满意度、餐饮消费、医疗健康等多元场景。能快速理解客户核心诉求，将模糊的业务目的转译为用户画像、满意度归因等可量化问题。",
      },
      {
        title: "数据处理与统计分析",
        text: "熟练运用 SPSS、R、Excel 完成主成分分析、显著性检验等工作，并使用 SQL/Python 进行数据清洗与基础查询，在三个月内稳定交付了 200+ 份数据需求。",
      },
      {
        title: "分析报告与建议",
        text: "将分析结果整理为结构化报告，提炼用户特征、行为差异和潜在优化方向，为后续用户分层、内容优化、产品体验改进和运营策略制定提供参考。相关项目客户满意度高于 90%。",
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
    theme: "bg-[#FAFAFA]",
    tags: ["GPT", "Claude", "Gemini", "AI Workflow"],
    summary:
      "熟悉各类主流大语言模型，能将其深度嵌入内容策划、代码开发和数据处理环节，并具备结果校验与风格把控能力。",
  },
  {
    id: "ab-data",
    caseNo: "SKILL 02",
    title: "数据分析",
    subtitle: "统计学底蕴 + 全链路开发能力",
    theme: "bg-[#FDFBF7]",
    tags: ["Python", "SQL", "SPSS", "PyTorch"],
    summary:
      "熟练使用 Python、SQL、SPSS、Excel、R 完成数据清洗、字段筛选、统计检验、特征工程和结果解释；能够将数据分析结果转化为用户洞察、运营建议和策略优化方向。",
  },
  {
    id: "ab-content",
    caseNo: "SKILL 03",
    title: "业务洞察与内容转化",
    subtitle: "把情绪、文本和用户需求变成可体验的作品",
    theme: "bg-[#FCFBF8]",
    tags: ["需求拆解", "指标转换", "用户画像"],
    summary:
      "能从社群观察、用户交流、反馈收集和数据结果中识别需求，把抽象情绪、内容偏好或业务目标转化为具体内容形式、产品机制和传播动作。",
  },
  {
    id: "ab-execute",
    caseNo: "SKILL 04",
    title: "综合素质",
    subtitle: "从 0 到 1 的破局与闭环力",
    theme: "bg-[#FBF9F6]",
    tags: ["多线程并行", "项目管理", "跨界沟通"],
    summary:
      "具备从 0 到 1 推进项目的经验，能同时处理需求拆解、时间管理、跨方沟通、现场执行和结果复盘。",
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
      <p className="mb-3 text-xs font-black uppercase tracking-[0.5em] text-[#F5A623]">
        {eyebrow}
      </p>
      <h2 className="font-serif text-4xl font-bold italic leading-none text-stone-900 md:text-6xl">
        {title}
      </h2>
      {desc && (
        <p className="mt-5 max-w-2xl text-base leading-8 text-stone-500 font-sans">
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
      className={`group overflow-hidden rounded-[2rem] border border-stone-200/60 ${
        item.theme
      } text-left shadow-sm transition ${
        onOpen
          ? "hover:shadow-lg hover:border-[#FDE6A8] cursor-pointer"
          : "cursor-default"
      }`}
    >
      {item.cover && (
        <div className="aspect-[16/9] overflow-hidden border-b border-stone-200/50 bg-[#FEFCF6]">
          <img
            src={item.cover}
            alt={item.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-7 md:p-8">
        <div className="mb-7 flex items-center justify-between">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-stone-400">
            {item.caseNo}
          </p>
          {onOpen && (
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white text-stone-400 shadow-sm transition group-hover:bg-[#F5A623] group-hover:text-white group-hover:shadow-md">
              <ExternalLink className="h-4 w-4" />
            </span>
          )}
        </div>
        <h3 className="font-serif text-2xl font-bold italic leading-snug text-stone-900 md:text-3xl">
          {item.title}
        </h3>
        <p className="mt-4 line-clamp-3 text-sm leading-7 text-stone-500 font-sans">
          {item.summary}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {item.tags.slice(0, 3).map((tag: string) => (
            <span
              key={tag}
              className="rounded-full bg-white border border-stone-200 px-3 py-1 text-xs font-bold text-stone-500"
            >
              {tag}
            </span>
          ))}
        </div>
        {onOpen && (
          <p className="mt-8 inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-[#F5A623]">
            {item.isInteractive || item.link
              ? "View Details & Demo"
              : "Read Details"}
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
          className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 px-4 py-8 backdrop-blur-md md:py-14"
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
            className="relative mx-auto min-h-[86vh] max-w-4xl rounded-[2rem] bg-[#FEFCF6] p-5 shadow-2xl md:rounded-[2.5rem] md:p-10 border border-[#E3E0D8]"
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 z-10 grid h-10 w-10 place-items-center rounded-full bg-stone-100 text-stone-500 transition hover:bg-stone-900 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {/* 顶部展示封面图 */}
            {item.cover && (
              <div className="overflow-hidden rounded-[1.5rem] shadow-sm border border-stone-200/50">
                <img
                  src={item.cover}
                  alt={item.title}
                  className="h-64 w-full object-cover md:h-80"
                />
              </div>
            )}

            <div className="mt-10">
              <p className="mb-4 text-xs font-black uppercase tracking-[0.35em] text-[#F5A623]">
                {item.type}
              </p>
              <h2 className="font-serif text-4xl font-bold italic leading-tight text-stone-900 md:text-5xl">
                {item.title}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-stone-500 font-sans">
                {item.subtitle}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-2">
              {item.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#FFF9EB] px-4 py-2 text-xs font-bold text-[#F5A623]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* 如果项目包含 interactive 标识，展示互动沙盒 */}
            {item.isInteractive && <AnswerBookSandbox />}

            {item.sections && (
              <div className="mt-12 space-y-10">
                {item.sections.map((sec: any) => (
                  <div
                    key={sec.title}
                    className="border-l-4 border-[#F5A623] pl-6"
                  >
                    <h3 className="text-lg font-serif font-bold italic text-stone-900">
                      {sec.title}
                    </h3>
                    <p className="mt-3 text-sm leading-8 text-stone-600 font-sans">
                      {sec.text}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* 动态渲染的高亮跳转按钮 */}
            {item.link && (
              <div className="mt-12 flex justify-center border-t border-stone-200/50 pt-10">
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-8 py-4 text-sm font-bold text-[#FEFCF6] shadow-lg transition hover:-translate-y-1 hover:bg-[#F5A623]"
                >
                  <BookOpen className="h-5 w-5" />
                  {item.linkLabel || "查看在线项目"}
                </a>
              </div>
            )}

            {item.pitch && (
              <div className="mt-12 rounded-[1.5rem] border border-[#FDE6A8] bg-[#FFF9EB] p-8">
                <h3 className="mb-3 flex items-center gap-2 text-lg font-serif font-bold italic text-stone-900">
                  <Sparkles className="h-5 w-5 text-[#F5A623]" />
                  延伸思考
                </h3>
                <p className="text-sm leading-8 text-stone-600 font-sans">
                  {item.pitch}
                </p>
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
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full border border-white/70 bg-[#FEFCF6]/80 px-4 shadow-[0_12px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl">
        <a
          href="#top"
          className="flex items-center gap-2 rounded-full text-sm font-black tracking-tight text-stone-900"
        >
          <span className="grid h-8 w-8 place-items-center rounded-xl bg-[#F5A623] text-white">
            S
          </span>
          SYT.Wb
        </a>
        <div className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs font-bold uppercase tracking-[0.16em] text-stone-500 transition hover:text-[#F5A623]"
            >
              {item.label}
            </a>
          ))}
        </div>
        <div className="hidden items-center gap-2 lg:flex">
          <a
            href="mailto:18805571318@163.com"
            className="rounded-full bg-[#FFF9EB] px-5 py-2 text-xs font-black uppercase tracking-[0.12em] text-[#F5A623] transition hover:bg-[#FDE6A8]"
          >
            Contact Me
          </a>
          <button
            onClick={() => setShowContact(true)}
            className="grid h-9 w-9 place-items-center rounded-full bg-stone-900 text-white transition hover:bg-[#F5A623]"
          >
            <ArrowUpRight className="h-4 w-4" />
          </button>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className="grid h-9 w-9 place-items-center rounded-full bg-stone-900 text-white lg:hidden"
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
            className="mx-auto mt-3 max-w-5xl rounded-3xl border border-white/70 bg-[#FEFCF6]/95 p-4 shadow-xl backdrop-blur-xl lg:hidden"
          >
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm font-bold text-stone-700 hover:bg-[#FFF9EB] hover:text-[#F5A623]"
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 px-4 backdrop-blur-md"
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
              className="relative w-full max-w-sm rounded-[2rem] bg-[#FEFCF6] p-8 text-center shadow-2xl border border-[#E3E0D8]"
            >
              <button
                onClick={() => setShowContact(false)}
                className="absolute right-5 top-5 grid h-8 w-8 place-items-center rounded-full bg-stone-100 text-stone-500 transition hover:bg-stone-900 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="mx-auto mb-6 grid h-16 w-16 place-items-center rounded-full bg-[#FFF9EB] text-[#F5A623]">
                <Mail className="h-7 w-7" />
              </div>

              <h3 className="mb-2 font-serif text-3xl font-bold italic text-stone-900">
                联系我
              </h3>
              <p className="text-lg font-bold text-stone-700 mt-4">
                微信号：18805571318
              </p>
              <p className="mt-1 text-sm text-stone-500">（手机号同）</p>

              <button
                onClick={handleCopy}
                className="mt-8 w-full rounded-xl bg-[#F5A623] py-4 text-sm font-bold tracking-widest text-white transition hover:bg-[#E09612]"
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
      className="relative flex min-h-screen items-end overflow-hidden bg-[#FEFCF6] px-5 pb-16 pt-28"
    >
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=2200&q=85"
          alt="Creative Workspace"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#FEFCF6] via-[#FEFCF6]/80 to-transparent" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto w-full max-w-5xl text-center"
      >
        <p className="mb-5 text-xs font-black uppercase tracking-[0.55em] text-[#F5A623] drop-shadow-sm">
          AIGC · Data Analysis · Growth
        </p>
        <h1 className="mx-auto max-w-4xl font-serif text-6xl italic font-bold leading-[0.95] text-stone-900 drop-shadow-sm md:text-8xl">
          {RESUME_DATA.name}
          <br />
          Little Universe
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-stone-600 font-sans md:text-lg">
          处理算法与数据，也洞察情绪与人性。
          <br />用 AIGC 加速效率，也用内容引发共鸣。
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a
            href="#content-practices"
            className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-8 py-4 text-sm font-bold tracking-widest text-[#FEFCF6] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#F5A623]"
          >
            <Play className="h-4 w-4 fill-[#FEFCF6]" /> Explore Portfolio
          </a>
        </div>
      </motion.div>
    </section>
  );
}

function Quote({}: any) {
  return (
    <section className="bg-[#FEFCF6] px-5 py-28 md:py-36">
      <motion.div {...fadeInUp} className="mx-auto max-w-4xl text-center">
        <h2 className="font-serif text-4xl font-bold italic leading-tight text-stone-900 md:text-6xl">
          “用数据支撑判断，
          <br className="hidden md:block" />
          用结论分析决策。”
        </h2>
        <p className="mx-auto mt-8 max-w-2xl text-base leading-8 text-stone-500 font-sans">
          无论是分析表格里跌宕的转化率，还是报纸上铅字印刷的访谈，背后都指向同一个命题：如何更精准地理解业务，理解用户，并把想法实实在在地交付出来。
        </p>
      </motion.div>
    </section>
  );
}

function Footer({}: any) {
  return (
    <footer className="bg-[#FEFCF6] px-5 py-12 md:py-16 border-t border-stone-200/50">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <h2 className="mb-2 font-serif text-4xl font-bold italic tracking-tight text-stone-900 md:text-5xl">
              Sun Yutong®
            </h2>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400">
              Based in China
            </p>
          </div>
          <div className="text-left md:text-right">
            <p className="mb-4 text-2xl font-black tracking-tight text-stone-900 md:text-3xl">
              18805571318@163.com
            </p>
            <div className="flex items-center gap-5 text-stone-400 md:justify-end">
              <a
                href="mailto:18805571318@163.com"
                className="transition hover:text-[#F5A623]"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 border-t border-stone-200/50 pt-6 text-[10px] font-black uppercase tracking-[0.2em] text-stone-400 md:flex-row">
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
    <div className="min-h-screen scroll-smooth bg-[#FEFCF6] font-sans text-stone-800 selection:bg-[#F5A623]/20">
      {/* 注入全局的衬线/无衬线高级字体规则 */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,100..900;1,9..144,100..900&family=Noto+Serif+SC:wght@400;700;900&display=swap');
        .font-serif { font-family: 'Fraunces', 'Noto Serif SC', 'Songti SC', serif; }
        .font-sans { font-family: 'Inter', 'Noto Sans SC', 'PingFang SC', sans-serif; }
      `,
        }}
      />

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

      {/* 3. 实习经历 */}
      <section id="internships" className="px-5 py-24 md:py-32 bg-[#F9F8F6]">
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

      {/* 统一的模态框组件 */}
      <DataModal item={selectedItem} onClose={() => setSelectedItem(null)} />
    </div>
  );
}
