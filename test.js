import test from 'ava';
import imagefinder from './lib/index';

test('#1', async t => {

  let images = await imagefinder({
    keyword: 'javascript'
  })
  
  t.is(images.length, 8)

})
