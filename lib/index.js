const { exec } = require('child_process')

module.exports = ({keyword}) => {

  return new Promise((resolve, reject) => {
    
    exec(`bash ${__dirname}/../replace.sh ${keyword.replace(/ /g, '+')}`, (error) => {
      
      if (error) reject(error)

      exec(`bash ${process.cwd()}/curl.sh`, (error, stdout, stderr) => {

        if (error) reject(error)

        stdout = JSON.parse(stdout)

        let images = decodeURIComponent(encodeURIComponent(stdout[1][1])).match(/imgurl?=(.*?)&amp;/g)

        resolve(images.map(image => image.slice(7).replace('&amp;', '')))
        
        exec(`rm ${process.cwd()}/curl.sh`)

      })

    })

  })

}
