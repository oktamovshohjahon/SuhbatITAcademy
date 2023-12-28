// Import packages
import { Telegraf, Markup, Scenes, session } from "telegraf";
import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

// import keyboards
import coursesKeyboard from "./keyboards/mainCourses.js";
import typesOfCoding from "./keyboards/typesOfCoding.js";
import lessonsOfFrontend from "./keyboards/lessonsOfFrontend.js";
import typesOfDesign from "./keyboards/typesOfDesign.js";
import typesOfModelling from "./keyboards/typesOfModelling.js";
import typesOfTelegramBot from "./keyboards/typesOfTelegramBot.js";
import typesOfVideoEditing from "./keyboards/typesOfVideoEdiring.js";
import typesOfMicrosoftOffice from "./keyboards/typesOfMicrosoftOffice.js";

// courses
let coding = false;
let graphic = false;
let modelling = false;
let smm = false;
let telegramBot = false;
let videoEditing = false;
let microsoftOffice = false;
let specialLessons = false;

// typesOfCoding
let frontend = false;
let backend = false;
let mobileDev = false;

// typesOfDesign
let photoshop = false;
let figma = false;

// typesOfModelling
let blender = false;

// typesOfTelegramBot
let telegraf = false;
let pyogram = false;

// typesOfVideoEditing
let premierPro = false;
let capCut = false;
let filmora = false;

// typesOfMicrosoftOffice
let word = false;
let excel = false;
let powerPoint = false;

// Set bot token
const bot = new Telegraf(process.env.TOKEN);

// connect
mongoose.connect(process.env.MONGO_URI);

// models
const UserSchema = new Schema({
  id: Number,
});

const User = model("User", UserSchema);

// Set commands
const commands = [
  { command: "start", description: "Botni ishga tushirish" },
  { command: "info", description: "Bot haqida ma'lumot olish" },
];

bot.telegram.setMyCommands(commands);

// check subscribe
const check = async (ctx, message) => {
  const channelId = "-1001922530566";
  const userId = ctx.from.id;

  try {
    const chatMember = await ctx.telegram.getChatMember(channelId, userId);

    if (
      chatMember.status === "member" ||
      chatMember.status === "administrator" ||
      chatMember.status === "creator"
    ) {
      ctx.reply(message);
    } else {
      const inlineKeyboard = Markup.inlineKeyboard([
        Markup.button.url("Suhbat IT Academy", "https://t.me/suhbatitacademy"),
      ]);

      ctx.reply(
        "Bot da davom etish uchun kanalimizga obuna bo'ling, obuna bo'lgach /start buyrug'ini bosing",
        inlineKeyboard
      );
    }
  } catch (error) {
    const inlineKeyboard = Markup.inlineKeyboard([
      Markup.button.url("Suhbat IT Academy", "https://t.me/suhbatitacademy"),
    ]);

    ctx.reply(
      "Bot da davom etish uchun kanalimizga obuna bo'ling, obuna bo'lgach /start buyrug'ini bosing",
      inlineKeyboard
    );
  }
};

// Start command
bot.start(async (ctx) => {
  const users = await User.find();
  const userIds = [];
  const id = ctx.from.id;
  let c = 0;

  users.forEach((user) => {
    userIds.push(user.id);
  });

  if (!userIds.includes(id)) {
    User.create({ id: id });
  }

  check(
    ctx,
    "Assalomu alaykum " +
      ctx.from.first_name +
      " IT Academy telegram botiga xush kelibsiz. O'rganishni hohlagan sohangizni tanlang:",
    coursesKeyboard
  );
});

// Info command
bot.command("info", (ctx) => {
  check(
    ctx,
    "✅ Siz bu @suhbatitacademybot orqali 8 dan ortiq sohalar bo'yicha mutlaqo bepul videodarslarni tomosha qilishingiz mumkin. O'rganishni boshlash uchun /start buyrug'ini bosing"
  );
});

// admin command

const adminCommand = async (ctx) => {
  const chatId = ctx.from.id;
  if (chatId == 2095960669) {
    const users = await User.find();
    const userIds = [];
    users.forEach((user) => {
      userIds.push(user.id);
    });
    userIds.forEach((id) => {
      if (
        ctx.message.text != "/translate" &&
        ctx.message.text != "/lotinkirill" &&
        ctx.message.text != "/start" &&
        ctx.message.text != "/xato" &&
        ctx.message.text != "/count" &&
        ctx.message.text != "/admin"
      ) {
        const messagePhoto = ctx.message.photo
          ? ctx.message.photo[ctx.message.photo.length - 1].file_id
          : null; // Xabarga oid rasm
        const videoId = ctx.message.video ? ctx.message.video.file_id : null; // Videoning file_id si
        const messageCaption = ctx.message.caption ? ctx.message.caption : null; // Xabarga oid sarlavha
        const buttonOptions = ctx.message.reply_markup
          ? JSON.stringify(ctx.message.reply_markup)
          : null;
        const messageText = ctx.message.text;

        if (messagePhoto && messageCaption && !buttonOptions) {
          console.log(1);
          ctx.telegram.sendPhoto(id, messagePhoto, { caption: messageCaption });
        } else if (messagePhoto && buttonOptions && !messageCaption) {
          ctx.telegram.sendPhoto(id, messagePhoto, {
            reply_markup: buttonOptions,
          });
        } else if (messagePhoto && buttonOptions && messageCaption) {
          console.log(3);
          ctx.telegram.sendPhoto(id, messagePhoto, {
            reply_markup: buttonOptions,
            caption: messageCaption,
          });
          return 0;
        } else if (messageText && buttonOptions) {
          ctx.telegram.sendMessage(id, messageText, {
            reply_markup: buttonOptions,
          });
          return 0;
        }
        if (videoId && messageCaption && !buttonOptions) {
          ctx.telegram.sendVideo(id, videoId, { caption: messageCaption });
          return 0;
        } else if (videoId && buttonOptions && !messageCaption) {
          console.log(1);
          ctx.telegram.sendVideo(id, messagePhoto, {
            reply_markup: buttonOptions,
          });
          return 0;
        } else if (videoId && buttonOptions && messageCaption) {
          ctx.telegram.sendVideo(id, videoId, {
            reply_markup: buttonOptions,
            caption: messageCaption,
          });
          return 0;
        } else if (messagePhoto && !buttonOptions && !messageCaption) {
          ctx.telegram.sendPhoto(id, messagePhoto);
          return 0;
        } else if (videoId && !buttonOptions && !messageCaption) {
          ctx.telegram.sendVideo(id, videoId);
          return 0;
        } else if (messageText) {
          ctx.telegram.sendMessage(id, messageText);
          return 0;
        }
      }
    });
  } else {
    bot.sendMessage("Siz admin emassiz !");
  }
};

const stage = new Scenes.Stage();

const scene3 = new Scenes.BaseScene("scene3");
scene3.enter((ctx) => ctx.reply("Reklamani kiriting"));
scene3.on("message", (ctx) => {
  if (
    ctx.message.text != "/translate" &&
    ctx.message.text != "/lotinkirill" &&
    ctx.message.text != "/start" &&
    ctx.message.text != "/xato" &&
    ctx.message.text != "/count" &&
    ctx.message.text != "/admin"
  ) {
    adminCommand(ctx);
    ctx.scene.leave();
  }
  // } else {
  //   if (ctx.message.text == "/translate") {
  //     translateCommand(ctx);
  //   } else if (ctx.message.text == "/lotinkirill") {
  //     lotinkirillCommand(ctx);
  //   } else if (ctx.message.text == "/start") {
  //     startCommand(ctx);
  //   } else if (ctx.message.text == "/xato") {
  //     xatoCommand(ctx);
  //   } else if (ctx.message.text == "/count") {
  //     countCommand(ctx);
  //   } else if (ctx.message.text == "/admin") {
  //     adminCommand(ctx);
  //   } else if(ctx.message.text != "Dasturlash")
  //   ctx.scene.leave();
  // }
});

stage.register(scene3);

bot.use(session());
bot.use(stage.middleware());

bot.command("admin", (ctx) => {
  ctx.scene.enter("scene3");
  console.log("admin joined");
});

// coding course
bot.hears("Dasturlash", (ctx) => {
  coding = true;
  graphic = false;
  modelling = false;
  smm = false;
  telegramBot = false;
  videoEditing = false;
  microsoftOffice = false;
  specialLessons = false;
  frontend = false;
  backend = false;
  mobileDev = false;
  photoshop = false;
  figma = false;
  blender = false;
  telegraf = false;
  pyogram = false;
  premierPro = false;
  capCut = false;
  filmora = false;
  word = false;
  excel = false;
  powerPoint = false;

  ctx.reply("Qaysi dasturlash turini o'rganishni hohlaysiz:", typesOfCoding);
});

// frontend course
bot.hears("Frontend", (ctx) => {
  coding = false;
  graphic = false;
  modelling = false;
  smm = false;
  telegramBot = false;
  videoEditing = false;
  microsoftOffice = false;
  specialLessons = false;
  frontend = true;
  backend = false;
  mobileDev = false;
  photoshop = false;
  figma = false;
  blender = false;
  telegraf = false;
  pyogram = false;
  premierPro = false;
  capCut = false;
  filmora = false;
  word = false;
  excel = false;
  powerPoint = false;

  ctx.reply("Nechanchi darsni o'rganmoqchisiz:", lessonsOfFrontend);
});

// backend course
bot.hears("Backend", (ctx) => {
  coding = false;
  graphic = false;
  modelling = false;
  smm = false;
  telegramBot = false;
  videoEditing = false;
  microsoftOffice = false;
  specialLessons = false;
  frontend = false;
  backend = true;
  mobileDev = false;
  photoshop = false;
  figma = false;
  blender = false;
  telegraf = false;
  pyogram = false;
  premierPro = false;
  capCut = false;
  filmora = false;
  word = false;
  excel = false;
  powerPoint = false;

  ctx.reply("Nechanchi darsni o'rganmoqchisiz:", lessonsOfFrontend);
});

// mobile dev course
bot.hears("Mobil dasturlash", (ctx) => {
  coding = false;
  graphic = false;
  modelling = false;
  smm = false;
  telegramBot = false;
  videoEditing = false;
  microsoftOffice = false;
  specialLessons = false;
  frontend = false;
  backend = false;
  mobileDev = true;
  photoshop = false;
  figma = false;
  blender = false;
  telegraf = false;
  pyogram = false;
  premierPro = false;
  capCut = false;
  filmora = false;
  word = false;
  excel = false;
  powerPoint = false;

  ctx.reply("Nechanchi darsni o'rganmoqchisiz:", lessonsOfFrontend);
});

// graphic design course
bot.hears("Grafik dizayn", (ctx) => {
  coding = false;
  graphic = true;
  modelling = false;
  smm = false;
  telegramBot = false;
  videoEditing = false;
  microsoftOffice = false;
  specialLessons = false;
  frontend = false;
  backend = false;
  mobileDev = false;
  photoshop = false;
  figma = false;
  blender = false;
  telegraf = false;
  pyogram = false;
  premierPro = false;
  capCut = false;
  filmora = false;
  word = false;
  excel = false;
  powerPoint = false;

  ctx.reply("Qaysi dasturda ishlashni o'rganishni hohlaysiz:", typesOfDesign);
});

// photoshop course
bot.hears("Photoshop", (ctx) => {
  coding = false;
  graphic = false;
  modelling = false;
  smm = false;
  telegramBot = false;
  videoEditing = false;
  microsoftOffice = false;
  specialLessons = false;
  frontend = false;
  backend = false;
  mobileDev = false;
  photoshop = true;
  figma = false;
  blender = false;
  telegraf = false;
  pyogram = false;
  premierPro = false;
  capCut = false;
  filmora = false;
  word = false;
  excel = false;
  powerPoint = false;

  ctx.reply("Qaysi darsni o'rganishni hohlaysiz:", lessonsOfFrontend);
});

// figma course
bot.hears("Figma", (ctx) => {
  coding = false;
  graphic = false;
  modelling = false;
  smm = false;
  telegramBot = false;
  videoEditing = false;
  microsoftOffice = false;
  specialLessons = false;
  frontend = false;
  backend = false;
  mobileDev = false;
  photoshop = false;
  figma = true;
  blender = false;
  telegraf = false;
  pyogram = false;
  premierPro = false;
  capCut = false;
  filmora = false;
  word = false;
  excel = false;
  powerPoint = false;

  ctx.reply("Qaysi darsni o'rganishni hohlaysiz:", lessonsOfFrontend);
});

// 3D Modelling course
bot.hears("3D Modelling", (ctx) => {
  coding = false;
  graphic = false;
  modelling = true;
  smm = false;
  telegramBot = false;
  videoEditing = false;
  microsoftOffice = false;
  specialLessons = false;
  frontend = false;
  backend = false;
  mobileDev = false;
  photoshop = false;
  figma = false;
  blender = false;
  telegraf = false;
  pyogram = false;
  premierPro = false;
  capCut = false;
  filmora = false;
  word = false;
  excel = false;
  powerPoint = false;

  ctx.reply(
    "Qaysi dasturda ishlashni o'rganishni hohlaysiz:",
    typesOfModelling
  );
});

// Blender course
bot.hears("Blender", (ctx) => {
  coding = false;
  graphic = false;
  modelling = false;
  smm = false;
  telegramBot = false;
  videoEditing = false;
  microsoftOffice = false;
  specialLessons = false;
  frontend = false;
  backend = false;
  mobileDev = false;
  photoshop = false;
  figma = false;
  blender = true;
  telegraf = false;
  pyogram = false;
  premierPro = false;
  capCut = false;
  filmora = false;
  word = false;
  excel = false;
  powerPoint = false;

  ctx.reply("Qaysi darsni o'rganishni hohlaysiz:", lessonsOfFrontend);
});

// smm course
bot.hears("SMM va Marketing", (ctx) => {
  coding = false;
  graphic = false;
  modelling = false;
  smm = true;
  telegramBot = false;
  videoEditing = false;
  microsoftOffice = false;
  specialLessons = false;
  frontend = false;
  backend = false;
  mobileDev = false;
  photoshop = false;
  figma = false;
  blender = false;
  telegraf = false;
  pyogram = false;
  premierPro = false;
  capCut = false;
  filmora = false;
  word = false;
  excel = false;
  powerPoint = false;

  ctx.reply("Qaysi darsni o'rganishni hohlaysiz:", lessonsOfFrontend);
});

// Telegram bot course
bot.hears("Telegram Bot yaratish", (ctx) => {
  coding = false;
  graphic = false;
  modelling = false;
  smm = false;
  telegramBot = true;
  videoEditing = false;
  microsoftOffice = false;
  specialLessons = false;
  frontend = false;
  backend = false;
  mobileDev = false;
  photoshop = false;
  figma = false;
  blender = false;
  telegraf = false;
  pyogram = false;
  premierPro = false;
  capCut = false;
  filmora = false;
  word = false;
  excel = false;
  powerPoint = false;

  ctx.reply(
    "Qaysi dasturda ishlashni o'rganishni hohlaysiz:",
    typesOfTelegramBot
  );
});

// telegraf course
bot.hears("Telegraf", (ctx) => {
  coding = false;
  graphic = false;
  modelling = false;
  smm = false;
  telegramBot = false;
  videoEditing = false;
  microsoftOffice = false;
  specialLessons = false;
  frontend = false;
  backend = false;
  mobileDev = false;
  photoshop = false;
  figma = false;
  blender = false;
  telegraf = true;
  pyogram = false;
  premierPro = false;
  capCut = false;
  filmora = false;
  word = false;
  excel = false;
  powerPoint = false;

  ctx.reply("Qaysi darsni o'rganishni hohlaysiz:", lessonsOfFrontend);
});

// pyogram course
bot.hears("Pyogram", (ctx) => {
  coding = false;
  graphic = false;
  modelling = false;
  smm = false;
  telegramBot = false;
  videoEditing = false;
  microsoftOffice = false;
  specialLessons = false;
  frontend = false;
  backend = false;
  mobileDev = false;
  photoshop = false;
  figma = false;
  blender = false;
  telegraf = false;
  pyogram = true;
  premierPro = false;
  capCut = false;
  filmora = false;
  word = false;
  excel = false;
  powerPoint = false;

  ctx.reply("Qaysi darsni o'rganishni hohlaysiz:", lessonsOfFrontend);
});

// video editing course
bot.hears("Video montaj", (ctx) => {
  coding = false;
  graphic = false;
  modelling = false;
  smm = false;
  telegramBot = false;
  videoEditing = true;
  microsoftOffice = false;
  specialLessons = false;
  frontend = false;
  backend = false;
  mobileDev = false;
  photoshop = false;
  figma = false;
  blender = false;
  telegraf = false;
  pyogram = false;
  premierPro = false;
  capCut = false;
  filmora = false;
  word = false;
  excel = false;
  powerPoint = false;

  ctx.reply(
    "Qaysi video montaj qilish dasturini o'rganishni hohlaysiz:",
    typesOfVideoEditing
  );
});

// Premier Pro course
bot.hears("Premier Pro", (ctx) => {
  coding = false;
  graphic = false;
  modelling = false;
  smm = false;
  telegramBot = false;
  videoEditing = false;
  microsoftOffice = false;
  specialLessons = false;
  frontend = false;
  backend = false;
  mobileDev = false;
  photoshop = false;
  figma = false;
  blender = false;
  telegraf = false;
  pyogram = false;
  premierPro = true;
  capCut = false;
  filmora = false;
  word = false;
  excel = false;
  powerPoint = false;

  ctx.reply("Nechanchi darsni o'rganmoqchisiz:", lessonsOfFrontend);
});

// Filmora course
bot.hears("Filmora", (ctx) => {
  coding = false;
  graphic = false;
  modelling = false;
  smm = false;
  telegramBot = false;
  videoEditing = false;
  microsoftOffice = false;
  specialLessons = false;
  frontend = false;
  backend = false;
  mobileDev = false;
  photoshop = false;
  figma = false;
  blender = false;
  telegraf = false;
  pyogram = false;
  premierPro = false;
  capCut = false;
  filmora = true;
  word = false;
  excel = false;
  powerPoint = false;

  ctx.reply("Nechanchi darsni o'rganmoqchisiz:", lessonsOfFrontend);
});

// CapCut course
bot.hears("CapCut", (ctx) => {
  coding = false;
  graphic = false;
  modelling = false;
  smm = false;
  telegramBot = false;
  videoEditing = false;
  microsoftOffice = false;
  specialLessons = false;
  frontend = false;
  backend = false;
  mobileDev = false;
  photoshop = false;
  figma = false;
  blender = false;
  telegraf = false;
  pyogram = false;
  premierPro = false;
  capCut = true;
  filmora = false;
  word = false;
  excel = false;
  powerPoint = false;

  ctx.reply("Nechanchi darsni o'rganmoqchisiz:", lessonsOfFrontend);
});

// microsoft office course
bot.hears("Microsoft Office", (ctx) => {
  coding = false;
  graphic = false;
  modelling = false;
  smm = false;
  telegramBot = false;
  videoEditing = false;
  microsoftOffice = true;
  specialLessons = false;
  frontend = false;
  backend = false;
  mobileDev = false;
  photoshop = false;
  figma = false;
  blender = false;
  telegraf = false;
  pyogram = false;
  premierPro = false;
  capCut = false;
  filmora = false;
  word = false;
  excel = false;
  powerPoint = false;

  ctx.reply(
    "Qaysi Microsoft Office dasturini o'rganishni hohlaysiz:",
    typesOfMicrosoftOffice
  );
});

// Premier Pro course
bot.hears("Word", (ctx) => {
  coding = false;
  graphic = false;
  modelling = false;
  smm = false;
  telegramBot = false;
  videoEditing = false;
  microsoftOffice = false;
  specialLessons = false;
  frontend = false;
  backend = false;
  mobileDev = false;
  photoshop = false;
  figma = false;
  blender = false;
  telegraf = false;
  pyogram = false;
  premierPro = false;
  capCut = false;
  filmora = false;
  word = true;
  excel = false;
  powerPoint = false;

  ctx.reply("Nechanchi darsni o'rganmoqchisiz:", lessonsOfFrontend);
});

// Excel courses
bot.hears("Excel", (ctx) => {
  coding = false;
  graphic = false;
  modelling = false;
  smm = false;
  telegramBot = false;
  videoEditing = false;
  microsoftOffice = false;
  specialLessons = false;
  frontend = false;
  backend = false;
  mobileDev = false;
  photoshop = false;
  figma = false;
  blender = false;
  telegraf = false;
  pyogram = false;
  premierPro = false;
  capCut = false;
  filmora = false;
  word = false;
  excel = true;
  powerPoint = false;

  ctx.reply("Nechanchi darsni o'rganmoqchisiz:", lessonsOfFrontend);
});

bot.hears("Maxsus darslar", (ctx) => {
  coding = false;
  graphic = false;
  modelling = false;
  smm = false;
  telegramBot = false;
  videoEditing = false;
  microsoftOffice = false;
  specialLessons = true;
  frontend = false;
  backend = false;
  mobileDev = false;
  photoshop = false;
  figma = false;
  blender = false;
  telegraf = false;
  pyogram = false;
  premierPro = false;
  capCut = false;
  filmora = false;
  word = false;
  excel = false;
  powerPoint = false;

  ctx.reply("Nechanchi darsni o'rganmoqchisiz:", lessonsOfFrontend);
});

// CapCut course
bot.hears("PowerPoint", (ctx) => {
  coding = false;
  graphic = false;
  modelling = false;
  smm = false;
  telegramBot = false;
  videoEditing = false;
  microsoftOffice = false;
  specialLessons = false;
  frontend = false;
  backend = false;
  mobileDev = false;
  photoshop = false;
  figma = false;
  blender = false;
  telegraf = false;
  pyogram = false;
  premierPro = false;
  capCut = false;
  filmora = false;
  word = false;
  excel = false;
  powerPoint = true;

  ctx.reply("Nechanchi darsni o'rganmoqchisiz:", lessonsOfFrontend);
});

// send video function
const sendVideo = (caption, path, ctx) => {
  const pathToVideoFile = path;

  const options = {
    caption: caption,
  };

  ctx.replyWithVideo({ source: pathToVideoFile }, options);
};

// watch lesson
bot.hears("1-2 darslar", (ctx) => {
  sendVideo("1 chi dars", "./videos/video-1.mp4", ctx);
  sendVideo("2 chi dars", "./videos/video-2.mp4", ctx);
});

bot.hears("3-4 darslar", (ctx) => {
  sendVideo("3 chi dars", "./videos/video-1.mp4", ctx);
  sendVideo("4 chi dars", "./videos/video-2.mp4", ctx);
});

bot.hears("5-6 darslar", (ctx) => {
  sendVideo("5 chi dars", "./videos/video-1.mp4", ctx);
  sendVideo("6 chi dars", "./videos/video-2.mp4", ctx);
});

bot.hears("7-8 darslar", (ctx) => {
  sendVideo("7 chi dars", "./videos/video-1.mp4", ctx);
  sendVideo("8 chi dars", "./videos/video-2.mp4", ctx);
});

bot.hears("9-10 darslar", (ctx) => {
  sendVideo("9 chi dars", "./videos/video-1.mp4", ctx);
  sendVideo("10 chi dars", "./videos/video-2.mp4", ctx);
});

bot.hears("11-12 darslar", (ctx) => {
  sendVideo("11 chi dars", "./videos/video-1.mp4", ctx);
  sendVideo("12 chi dars", "./videos/video-2.mp4", ctx);
});

bot.hears("13-14 darslar", (ctx) => {
  sendVideo("13 chi dars", "./videos/video-1.mp4", ctx);
  sendVideo("14 chi dars", "./videos/video-2.mp4", ctx);
});

bot.hears("15-16 darslar", (ctx) => {
  sendVideo("15 chi dars", "./videos/video-1.mp4", ctx);
  sendVideo("16 chi dars", "./videos/video-2.mp4", ctx);
});

bot.hears("17-18 darslar", (ctx) => {
  sendVideo("17 chi dars", "./videos/video-1.mp4", ctx);
  sendVideo("18 chi dars", "./videos/video-2.mp4", ctx);
});

bot.hears("19-20 darslar", (ctx) => {
  sendVideo("19 chi dars", "./videos/video-1.mp4", ctx);
  sendVideo("20 chi dars", "./videos/video-2.mp4", ctx);
});

// go to main
bot.hears("🏘 Eng boshiga qaytish", (ctx) => {
  const firstName = ctx.from.first_name;
  ctx.reply(
    "Assalomu alaykum " +
      firstName +
      " IT Academy telegram botiga xush kelibsiz. O'rganishni hohlagan sohangizni tanlang:",
    coursesKeyboard
  );
});

// go back
bot.hears("◀️ Orqaga", (ctx) => {
  if (
    coding ||
    graphic ||
    modelling ||
    smm ||
    telegramBot ||
    videoEditing ||
    microsoftOffice ||
    specialLessons
  ) {
    const firstName = ctx.from.first_name;
    ctx.reply(
      "Assalomu alaykum " +
        firstName +
        " IT Academy telegram botiga xush kelibsiz. O'rganishni hohlagan sohangizni tanlang:",
      coursesKeyboard
    );
    coding = false;
    graphic = false;
    modelling = false;
    smm = false;
    telegramBot = false;
    videoEditing = false;
    microsoftOffice = false;
    specialLessons = false;
    frontend = false;
    backend = false;
    mobileDev = false;
    photoshop = false;
    figma = false;
    blender = false;
    telegraf = false;
    pyogram = false;
    premierPro = false;
    capCut = false;
    filmora = false;
    word = false;
    excel = false;
    powerPoint = false;
  } else if (frontend || backend || mobileDev) {
    ctx.reply("Qaysi dasturlash turini o'rganishni hohlaysiz:", typesOfCoding);
    coding = true;
    graphic = false;
    modelling = false;
    smm = false;
    telegramBot = false;
    videoEditing = false;
    microsoftOffice = false;
    specialLessons = false;
    frontend = false;
    backend = false;
    mobileDev = false;
    photoshop = false;
    figma = false;
    blender = false;
    telegraf = false;
    pyogram = false;
    premierPro = false;
    capCut = false;
    filmora = false;
    word = false;
    excel = false;
    powerPoint = false;
  } else if (photoshop || figma) {
    coding = false;
    graphic = true;
    modelling = false;
    smm = false;
    telegramBot = false;
    videoEditing = false;
    microsoftOffice = false;
    specialLessons = false;
    frontend = false;
    backend = false;
    mobileDev = false;
    photoshop = false;
    figma = false;
    blender = false;
    telegraf = false;
    pyogram = false;
    premierPro = false;
    capCut = false;
    filmora = false;
    word = false;
    excel = false;
    powerPoint = false;

    ctx.reply("Qaysi dasturda ishlashni o'rganishni hohlaysiz:", typesOfDesign);
  } else if (blender) {
    coding = false;
    graphic = false;
    modelling = true;
    smm = false;
    telegramBot = false;
    videoEditing = false;
    microsoftOffice = false;
    specialLessons = false;
    frontend = false;
    backend = false;
    mobileDev = false;
    photoshop = false;
    figma = false;
    blender = false;
    telegraf = false;
    pyogram = false;
    premierPro = false;
    capCut = false;
    filmora = false;
    word = false;
    excel = false;
    powerPoint = false;

    ctx.reply(
      "Qaysi dasturda ishlashni o'rganishni hohlaysiz:",
      typesOfModelling
    );
  } else if (telegraf || pyogram) {
    coding = false;
    graphic = false;
    modelling = false;
    smm = false;
    telegramBot = true;
    videoEditing = false;
    microsoftOffice = false;
    specialLessons = false;
    frontend = false;
    backend = false;
    mobileDev = false;
    photoshop = false;
    figma = false;
    blender = false;
    telegraf = false;
    pyogram = false;
    premierPro = false;
    capCut = false;
    filmora = false;
    word = false;
    excel = false;
    powerPoint = false;

    ctx.reply(
      "Qaysi dasturda ishlashni o'rganishni hohlaysiz:",
      typesOfTelegramBot
    );
  } else if (premierPro || filmora || capCut) {
    coding = false;
    graphic = false;
    modelling = false;
    smm = false;
    telegramBot = false;
    videoEditing = true;
    microsoftOffice = false;
    specialLessons = false;
    frontend = false;
    backend = false;
    mobileDev = false;
    photoshop = false;
    figma = false;
    blender = false;
    telegraf = false;
    pyogram = false;
    premierPro = false;
    capCut = false;
    filmora = false;
    word = false;
    excel = false;
    powerPoint = false;

    ctx.reply(
      "Qaysi video montaj qilish dasturini o'rganishni hohlaysiz:",
      typesOfVideoEditing
    );
  } else if (word || excel || powerPoint) {
    coding = false;
    graphic = false;
    modelling = false;
    smm = false;
    telegramBot = false;
    videoEditing = false;
    microsoftOffice = true;
    specialLessons = false;
    frontend = false;
    backend = false;
    mobileDev = false;
    photoshop = false;
    figma = false;
    blender = false;
    telegraf = false;
    pyogram = false;
    premierPro = false;
    capCut = false;
    filmora = false;
    word = false;
    excel = false;
    powerPoint = false;

    ctx.reply(
      "Qaysi Microsoft Office dasturini o'rganishni hohlaysiz:",
      typesOfMicrosoftOffice
    );
  }
});

// Launch bot
bot.launch(() => console.log("Bot started succesfully"));
