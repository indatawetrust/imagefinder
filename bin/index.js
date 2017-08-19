#! /usr/bin/env node

const { exec } = require('child_process')

exec(`bash ${__dirname}/../replace.sh ${process.argv.slice(2).join('+')}`, () => {
  
  exec(`bash ${process.cwd()}/curl.sh`, (error, stdout, stderr) => {
    
    stdout = JSON.parse(stdout)

    let images = decodeURIComponent(encodeURIComponent(stdout[1][1])).match(/imgurl?=(.*?)&amp;/g)

    console.log(JSON.stringify(images.map(image => image.slice(7).replace('&amp;', ''))))
    
    exec(`rm ${process.cwd()}/curl.sh`)

  })

})
