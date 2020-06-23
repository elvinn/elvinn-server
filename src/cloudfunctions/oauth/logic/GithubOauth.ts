import axios from 'axios';
import { IOauth, OauthInfo, OauthType } from './IOauth';
import { clientId, clientSecret } from '../secrets/github';

export interface UserInfo {
  id: number;
  loginName: string;
  nickName: string;
  email: string;
  avatarUal: string;
}

export interface GithubOauthInfo extends OauthInfo, UserInfo {}

export default class GithubOauth implements IOauth {
  constructor(private code: string) {}

  private async fetchAccessToken() {
    const {
      data: { access_token: accessToken },
    } = await axios({
      method: 'post',
      url:
        'https://github.com/login/oauth/access_token?' +
        `client_id=${clientId}&` +
        `client_secret=${clientSecret}&` +
        `code=${this.code}`,
      headers: {
        accept: 'application/json',
      },
    });

    return accessToken;
  }

  private static async fetchUserInfo(accessToken: string): Promise<UserInfo> {
    const { data: { id, login: loginName, name: nickName, email, avatar_url: avatarUal } = {} } = await axios({
      method: 'get',
      url: `https://api.github.com/user`,
      headers: {
        accept: 'application/json',
        Authorization: `token ${accessToken}`,
      },
    });

    return {
      id,
      loginName,
      nickName,
      email,
      avatarUal,
    };
  }

  async getOauthInfo(): Promise<GithubOauthInfo> {
    const accessToken = await this.fetchAccessToken();
    const userInfo = await GithubOauth.fetchUserInfo(accessToken);
    return {
      type: OauthType.Github,
      ...userInfo,
    };
  }
}
