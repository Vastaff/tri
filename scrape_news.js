import puppeteer from 'puppeteer';
// Or import puppeteer from 'puppeteer-core';

export let scrape = async () => {
    // Launch the browser and open a new blank page
    const browser = await puppeteer.launch(/* {headless: false} */);
                // const ua = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36";
                //await page.setUserAgent(ua);
                //await page.goto(yourURL); Для установки header(обход блокировок) ссылка https://stackoverflow.com/questions/63818869/why-does-headless-need-to-be-false-for-puppeteer-to-work
    const page = await browser.newPage();
    // Navigate the page to a URL.
    await page.goto('https://www.therobotreport.com/category/news/', {'timeout': 150000});
    // Set screen size.
    await page.setViewport({width: 1080, height: 1024}); 
    // извлечение атрибута href, первой ссылки на странице 
    await page.waitForSelector('.entry-title a[href]', {timeout: 0});
    const href = await page.evaluate(() => document.querySelector('.entry-title a[href]').getAttribute('href'));
    await page.waitForSelector('.entry-title a', {timeout: 0});
    const title = await page.evaluate(() => document.querySelector('.entry-title a').innerText);
    /* console.log(`описание товара: "${title}"`);
    console.log('ссылка:', href); */
    const page1 = await browser.newPage();
    // Navigate the page to a URL.
    await page1.goto(href, {'timeout': 150000});
    // Set screen size.
    await page1.setViewport({width: 1080, height: 1024});
    // загрузка тела новости
    const text_new = await page1.evaluate(() =>  Array.from(document.querySelectorAll('.entry-content p'), p => p.innerText));
    const text = text_new.join("\n");
    await browser.close();
  
  return {title, text, href}  
}

//scrape()