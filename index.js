const { exec } = require('child_process')

exec(`sh ${process.cwd()}/replace.sh ${process.argv[2]}`, () => {

  exec(`sh ${process.cwd()}/curl.sh`, (error, stdout, stderr) => {
    stdout = JSON.parse(stdout)

    let images = decodeURIComponent(encodeURIComponent(stdout[1][1])).match(/imgurl?=(.*?)&amp;/g)

    console.log(images.map(image => image.slice(7).substr(0, image.length-12)))

  })

})
