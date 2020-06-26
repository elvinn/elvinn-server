import { main } from './index';
import { OauthType } from './logic/IOauth';

async function test() {
  console.log(await main({ type: OauthType.Github, code: '126441323b3517f7d84d' }));
}

test();
