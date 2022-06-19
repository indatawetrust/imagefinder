#! /usr/bin/env node

const lib = require('../lib')
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

if (argv.keyword) {
  lib({ keyword: argv.keyword, lang: argv.lang }).then(results => console.log(JSON.stringify(results, null, 2)))
} else {
  console.log('keyword is required for search')
}
