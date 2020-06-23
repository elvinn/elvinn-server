import OauthFactory from './logic/OauthFactory';
import { OauthType } from './logic/IOauth';

export interface OauthEvent {
  type: OauthType;
  code: string;
}

export async function main(event: OauthEvent) {
  const oauth = OauthFactory.getOauth({
    type: event.type,
    code: event.code,
  });

  const oauthInfo = await oauth.getOauthInfo();
  console.log(oauthInfo);
}
