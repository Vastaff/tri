import { Bot } from "grammy";

let sendTel = async () => {
  const token = process.env.TG_KEY;
  //console.log('Привет на Хабе и ${token}');
  //console.log(token);
  const messageText = 'Пивет с ГИТХАБа';
  const bot = new Bot(token);  
  const message = bot.api.sendMessage(-1002091143933, messageText, {parse_mode: "HTML"});
  

}
sendTel();
