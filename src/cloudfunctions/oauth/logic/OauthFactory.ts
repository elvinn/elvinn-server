import { OauthType, OauthParam, IOauth } from './IOauth';
import GithubOauth from './GithubOauth';

export default class OauthFactory {
  static getOauth(param: OauthParam): IOauth {
    switch (param.type) {
      case OauthType.Github:
        return new GithubOauth(param.code);
      default:
        throw new Error(`不支持的 Oauth 类型: ${param.type}`);
    }
  }
}
