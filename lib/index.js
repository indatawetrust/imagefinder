const { exec } = require('child_process');

module.exports = ({ keyword, lang = 'en' }) => {
  return new Promise((resolve, reject) => {
    exec(`
  curl 'https://www.google.com/search?q=${encodeURI(keyword)}&sourceid=chrome&ie=UTF-8' \
    -H 'authority: www.google.com' \
    -H 'accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9' \
    -H 'accept-language: ${lang}' \
    -H 'cache-control: max-age=0' \
    -H 'cookie: 1P_JAR=2025-06-19-19;' \
    -H 'sec-ch-ua: " Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"' \
    -H 'sec-ch-ua-arch: "arm"' \
    -H 'sec-ch-ua-bitness: "64"' \
    -H 'sec-ch-ua-full-version: "102.0.5005.61"' \
    -H 'sec-ch-ua-full-version-list: " Not A;Brand";v="99.0.0.0", "Chromium";v="102.0.5005.61", "Google Chrome";v="102.0.5005.61"' \
    -H 'sec-ch-ua-mobile: ?0' \
    -H 'sec-ch-ua-model: ""' \
    -H 'sec-ch-ua-platform: "macOS"' \
    -H 'sec-ch-ua-platform-version: "11.5.2"' \
    -H 'sec-ch-ua-wow64: ?0' \
    -H 'sec-fetch-dest: document' \
    -H 'sec-fetch-mode: navigate' \
    -H 'sec-fetch-site: same-origin' \
    -H 'sec-fetch-user: ?1' \
    -H 'upgrade-insecure-requests: 1' \
    -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.61 Safari/537.36' \
    --compressed
  `, (err, stdout) => {
      if (err) {
        reject(err);

        return;
      }

      try {
        const results = stdout
          .match(/\[\\x22(.*?)\\x22,[0-9]{1,},[0-9]{1,}\]/g)
          .filter(i => i.match(/^\[\\x22https:\/\/(?!encrypted-)/))
          .map(i => JSON.parse(i.replace(/\\x22/g, '"'))[0])

        resolve(
          results
        )
      } catch (error) {
        reject(error);
      }
    })
  })
};
