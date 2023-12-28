import { Markup } from "telegraf";

// typesOfVideoEditing
const typesOfVideoEditing = Markup.keyboard([
  ["Word", "Excel"],
  ["Powerpoint"],
  ["◀️ Orqaga", "🏘 Eng boshiga qaytish"],
]).resize();

export default typesOfVideoEditing;
