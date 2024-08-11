import {scrape} from './scrape_news.js';
import { Bot } from "grammy";
import { hfInf } from './hf_inf.js';

let sendTel = async () => {
    const token = process.env.TG_KEY;
    const data = await scrape(); // Получаем объект с данными 
    //console.log(data.text);
    // переводим заголовок
    const sendTitle = await hfInf(data.title);
    console.log(sendTitle);
    // переводим текст разбивая на части по 500 символов
    var parts = data.text.match(/[\s\S]{1,300}/g);
    const tex_ch1 = parts[0];
    //console.log(tex_ch);
    const sendText1 = await hfInf(tex_ch1);
    const tex_ch2 = parts[1];
    const sendText2 = await hfInf(tex_ch2);
    const tex_ch3 = parts[2];
    const sendText3 = await hfInf(tex_ch3);
    
    // подготовка и отправка сообщения
    const messageText = '<b>'+sendTitle+'</b>\n\n'+sendText1+'\n\n'+sendText2+'\n\n'+sendText3+'\n\n<a href="' + data.href +'">источник</a>';
    //const bot = new Bot('6958130498:AAFV06nREvAD_ibfyWH-Tb2FzrlLJEJg7PQ'); // Api token
    const bot = new Bot(token);  
    const message = bot.api.sendMessage(-1002091143933, messageText, {parse_mode: "HTML"});
  

}

sendTel();
