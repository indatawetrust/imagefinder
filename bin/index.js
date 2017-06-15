#! /usr/bin/env node

const { exec } = require('child_process')

exec(`sh ${__dirname}/../replace.sh ${process.argv.slice(2).join('+')}`, () => {
  
  exec(`sh ${process.cwd()}/curl.sh`, (error, stdout, stderr) => {
    
    stdout = JSON.parse(stdout)

    let images = decodeURIComponent(encodeURIComponent(stdout[1][1])).match(/imgurl?=(.*?)&amp;/g)

    console.log(images.map(image => image.slice(7).substr(0, image.length-12).split('%')[0]))
    
    exec(`rm ${process.cwd()}/curl.sh`)

  })

})
