const http = require('http')
const https = require('https')

const fs = require('fs')
const path = require('path')
const { promisify } = require('util')
const { dir } = require('console')
const writeFile = promisify(fs.writeFile)

module.exports = async function (src, dir) {
  if(/.(jpg|png|jiff|webp)$/.test(src)) {
    await urlToImg(src, dir)
  } else {
    await base64ToImg(src, dir)
  }
}

const urlToImg = async (url, dir) => {
  let mod = /^https:/.test(url) ? https : http
  const ext = path.extname(url)
  const file = path.join(dir, `原神${Date.now().toString().slice(7)}${ext}`)
  mod.get(url, res => {
    res.pipe(fs.createWriteStream(file))
      .on('finish', () => {
        console.log('图片写入完成!');
      })
  })
}

const base64ToImg = async (str, dir) => {
  const matches = str.match(/^data:(.+);base64,(.+)$/)
  try {
    const ext = matches[1].split('/')[1].replace('jpeg', 'jpg')
    const file = path.join(dir, `原神${Date.now().toString().slice(7)}.${ext}`)
    await writeFile(file, matches[2], 'base64')
    console.log(6666666);
  } catch (err) {
    console.log('文件格式有误!!!');
  }
}