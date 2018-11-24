const puppeteer = require('puppeteer');
const delay = require('delay');
const url = require('url');
const querystring = require('querystring');

module.exports = async ({keyword}) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    `https://www.google.com/search?q=${keyword.replace(/ /g, '+')}`,
  );
  await page.click('div[role="navigation"] a:nth-child(1)');
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
