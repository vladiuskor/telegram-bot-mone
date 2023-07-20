require('dotenv').config();
const express = require('express');
const {Telegraf, Markup} = require('telegraf');

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
const app = express();

const PORT = process.env.PORT || 3001;
bot.start(async (ctx) => await ctx.reply('Привіт. Я - віртуальний помічник кухні в кафе "Моне". \nОбери, будь ласка, кого ти хочеш викликати на кухню.',
    Markup.inlineKeyboard([
        Markup.button.callback('Офіціанти', 'waiters'),
        Markup.button.callback('Адміністратори', 'managers')
    ])));
bot.command('test', (ctx) => {
        console.log(ctx.from.id);
        console.log(ctx.from);
        ctx.reply('Test message after "/test" command!')
    }
);

bot.action('waiters', async ctx => {
    await ctx.reply('You click to waiters buttons!');
    await ctx.reply('Second message after click!');
})

bot.action('waiters', async ctx => {
    await ctx.reply('You click to waiters buttons!');
    await ctx.reply('Second message after click!');
})

bot.action('managers', (ctx) => {
    ctx.telegram.sendMessage('USERID', 'Hello from telegram bot!')
});

bot.launch();
app.listen(PORT, () => {
   console.log(`Server is running on ${PORT} port ...`);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));