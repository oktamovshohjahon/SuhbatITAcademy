import { Markup } from "telegraf";

// lessonsOfFrontend
const lessonsOfFrontend = Markup.keyboard([
  ["1-2 darslar", "3-4 darslar"],
  ["5-6 darslar", "7-8 darslar"],
  ["9-10 darslar", "11-12 darslar"],
  ["13-14 darslar", "15-16 darslar"],
  ["17-18 darslar", "19-20 darslar"],
  ["◀️ Orqaga", "🏘 Eng boshiga qaytish"],
]).resize();

export default lessonsOfFrontend;
