require('dotenv').config();
const express = require('express');
const {Telegraf, Markup} = require('telegraf');

const bot = new Telegraf(process.env.TELEGRAM_TOKEN);
const app = express();

const PORT = process.env.PORT || 3000;
bot.start(async (ctx) => {
        if(ctx.from.username === process.env.ADMIN_USERNAME) {
            await ctx.reply(
                `Привіт, мій творець - ${ctx.from.first_name.toString()} ${ctx.from.last_name.toString()} 👑👑👑 \nТільки тобі доступний розширений функціонал. \nОбери необхідну опцію.`,
                Markup.inlineKeyboard([
                    [Markup.button.callback('Показати усіх користувачів', 'show_all_users')],
                    [Markup.button.callback('Оновити усіх користувачів', 'update_all_users')],
                    [Markup.button.callback('Викликати офіціанта', 'call_waiter')],
                    [Markup.button.callback('Викликати адміністратора', 'call_cafe_admin')]
                ])
            );
            return;
        }
    }
);
bot.command('test', (ctx) => {
        console.log(ctx.from.id);
        console.log(ctx.from);
        ctx.reply('Test message after "/test" command!')
    }
);

bot.action('call_waiter', async ctx => {
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