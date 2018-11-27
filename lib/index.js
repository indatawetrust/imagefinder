const puppeteer = require('puppeteer');
const delay = require('delay');
const url = require('url');
const querystring = require('querystring');

module.exports = async ({keyword}) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    `https://www.google.com/search?q=${keyword.replace(/ /g, '+')}&hl=en`,
  );

  await page.waitForSelector('#hdtb-msb-vis');

  const links = await page.evaluate(() => {
    const links = Array.from(
      document.querySelectorAll('#hdtb-msb-vis .hdtb-mitem'),
    );
    return links.map(link => link.innerText);
  });
  const index = links.indexOf('Images');
  await page.click(`#hdtb-msb-vis > div:nth-child(${index+1}) > a`);

  await delay(1000);

  await page.waitForSelector('#search a');
  const stories = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('#search a'));
    return links.map(link => link.href);
  });

  await browser.close();

  const imgs = stories
    .map(link => querystring.parse(url.parse(link).query).imgurl)
    .filter(img => img);

  return await Promise.resolve(imgs);
};
