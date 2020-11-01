import OauthFactory from './logic/OauthFactory';
import { OauthType, OauthInfo } from './logic/IOauth';
import { CollectionName, getCollection, getTicket } from './common/tcb';

const oauthCollection = getCollection(CollectionName.UserOauth);
const userCollection = getCollection(CollectionName.UserInfo);

interface OauthEvent {
  type: OauthType;
  code: string;
}

async function getUserId(oauthInfo: OauthInfo) {
  const { data: oauthData = [] } = await oauthCollection
    .where({
      type: oauthInfo.type,
      id: oauthInfo.id,
    })
    .get();

  if (oauthData.length) {
    // 老用户
    return oauthData[0].userId;
  }

  // 新用户
  const { id: userId } = await userCollection.add({
    name: oauthInfo.nickName || oauthInfo.loginName,
    avatarUal: oauthInfo.avatarUal,
    email: oauthInfo.email,
  });

  await oauthCollection.add({
    userId,
    type: oauthInfo.type,
    ...oauthInfo,
  });

  return userId;
}

async function main(event: OauthEvent) {
  console.log('event', event);

  const oauth = OauthFactory.getOauth({
    type: event.type,
    code: event.code,
  });

  const oauthInfo = await oauth.getOauthInfo();
  console.log('oauthInfo', oauthInfo);

  const userId = await getUserId(oauthInfo);
  console.log('userId', userId);

  return {
    ret: 0,
    data: {
      ...oauthInfo,
      userId,
      ticket: getTicket(userId),
    },
  };
}

export { OauthEvent, main };
