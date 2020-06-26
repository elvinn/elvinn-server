import { main } from './index';
import { OauthType } from './logic/IOauth';

async function test() {
  console.log(await main({ type: OauthType.Github, code: '83148d880270e2a7e4cd' }));
}

test();
