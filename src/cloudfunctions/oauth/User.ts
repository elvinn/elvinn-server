import OauthFactory from './oauth/OauthFactory';
import { OauthParam } from './oauth/IOauth';

export default class User {
  static loginByOauth(param: OauthParam) {
    const oauth = OauthFactory.getOauth(param);
    console.log('---oauth');
  }
}
