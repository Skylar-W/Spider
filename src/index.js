const puppeteer = require('puppeteer');
const path = require('path')
const srcToImg = require('./utils/srcToImg');

(async function() {
  const browser = await puppeteer.launch({
    slowMo: 300,
    devtools: true
  })
  const page = await browser.newPage()
  console.log('打开页面.....');
  await page.goto('http://image.baidu.com')
  await page.focus('#kw')
  await page.keyboard.sendCharacter('原神 1920*1080')
  await page.click('.s_newBtn')
  console.log('页面跳转搜索 --- "原神"');
  page.on('load', async function() {
    const source = await page.evaluate(async () => {
      const imgs = document.getElementsByClassName('main_img')
      return [...imgs].map(img => img.src)
    })
    console.log(source);
    for (let src of source) {
      await srcToImg(src, path.resolve(__dirname, 'image'))
    }
  })

})()