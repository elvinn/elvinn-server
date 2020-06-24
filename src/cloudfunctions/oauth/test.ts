import { main } from './index';
import { OauthType } from './logic/IOauth';

console.log(main({ type: OauthType.Github, code: '123' }));
