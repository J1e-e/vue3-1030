import kungpaoImg from "../assets/宫保鸡丁.jpg";
import tomatoEggsImg from "../assets/番茄炒蛋.jpg";
import sweetSourRibsImg from "../assets/糖醋排骨.jpg";
import braisedPorkImg from "../assets/红烧肉.jpg";
import friedRiceImg from "../assets/扬州炒饭.jpg";
import mapoTofuImg from "../assets/麻婆豆腐.jpg";
import eggplantImg from "../assets/红烧茄子.jpg";
import mushroomSoupImg from "../assets/菌菇鲜汤.jpg";
import cucumberSaladImg from "../assets/爽口拍黄瓜.jpg";
import lemonChickenImg from "../assets/柠香脆皮鸡.jpg";

export const dishCategories = [
  {
    id: "recommended",
    name: "商家推荐",
    emoji: "⭐",
    description: "店长精选，值得一试",
    dishes: [
      {
        id: "kung-pao-chicken",
        name: "宫保鸡丁",
        description: "鸡肉鲜嫩，花生香脆，酸甜微辣",
        price: 32,
        sales: 328,
        emoji: kungpaoImg,
        tag: "招牌",
        tone: "peach",
      },
      {
        id: "tomato-eggs",
        name: "番茄炒蛋",
        description: "家常经典，酸甜可口又下饭",
        price: 22,
        sales: 256,
        emoji: tomatoEggsImg,
        tag: "人气",
        tone: "cream",
      },
      {
        id: "sweet-sour-ribs",
        name: "糖醋排骨",
        description: "外酥里嫩，浓郁糖醋汁包裹",
        price: 42,
        sales: 198,
        emoji: sweetSourRibsImg,
        tag: "",
        tone: "lavender",
      },
    ],
  },
  {
    id: "popular",
    name: "人气菜品",
    emoji: "🔥",
    description: "大家都爱吃的经典美味",
    dishes: [
      {
        id: "mapo-tofu",
        name: "麻婆豆腐",
        description: "嫩豆腐配秘制麻辣酱，鲜香过瘾",
        price: 26,
        sales: 412,
        emoji: mapoTofuImg,
        tag: "热销",
        tone: "cream",
      },
      {
        id: "braised-pork",
        name: "红烧肉",
        description: "肥瘦相间，慢火焖煮入口即化",
        price: 46,
        sales: 367,
        emoji: braisedPorkImg,
        tag: "",
        tone: "peach",
      },
      {
        id: "fried-rice",
        name: "扬州炒饭",
        description: "粒粒分明，搭配虾仁与时令蔬菜",
        price: 24,
        sales: 289,
        emoji: friedRiceImg,
        tag: "",
        tone: "mint",
      },
    ],
  },
  {
    id: "new",
    name: "新品上市",
    emoji: "✨",
    description: "新鲜上架，尝尝新滋味",
    dishes: [
      {
        id: "lemon-chicken",
        name: "柠香脆皮鸡",
        description: "金黄酥脆，清新柠檬香气",
        price: 38,
        sales: 86,
        emoji: lemonChickenImg,
        tag: "新品",
        tone: "mint",
      },
      {
        id: "mushroom-soup",
        name: "菌菇鲜汤",
        description: "多种菌菇慢炖，鲜美暖胃",
        price: 18,
        sales: 64,
        emoji: mushroomSoupImg,
        tag: "新品",
        tone: "lavender",
      },
    ],
  },
  {
    id: "special",
    name: "限时特惠",
    emoji: "🏷️",
    description: "今日优惠，错过再等一天",
    dishes: [
      {
        id: "cucumber-salad",
        name: "爽口拍黄瓜",
        description: "清脆爽口，蒜香微辣开胃小菜",
        price: 12,
        sales: 173,
        emoji: cucumberSaladImg,
        tag: "特惠",
        tone: "mint",
      },
      {
        id: "eggplant",
        name: "鱼香茄子",
        description: "软糯入味，经典鱼香风味",
        price: 20,
        sales: 151,
        emoji: eggplantImg,
        tag: "特惠",
        tone: "lavender",
      },
    ],
  },
];