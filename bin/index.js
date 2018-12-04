#! /usr/bin/env node

const puppeteer = require('puppeteer');
const delay = require('delay');
const url = require('url');
const querystring = require('querystring');

(async () => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto(
    `https://www.google.com/search?q=${process.argv
      .slice(2)
      .join('+')
      .replace(/ /g, '+')}&source=lnms&tbm=isch&sa=X`,
  );

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

  console.log(JSON.stringify(imgs));
})();
