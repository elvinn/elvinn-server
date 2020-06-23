import OauthFactory from './logic/OauthFactory';
import { OauthType } from './logic/IOauth';

interface OauthEvent {
  type: OauthType;
  code: string;
}
exports.main = async function (event: OauthEvent) {
  const oauth = OauthFactory.getOauth({
    type: event.type,
    code: event.code,
  });

  const oauthInfo = await oauth.getOauthInfo();
  console.log(oauthInfo);
};
