import OauthFactory from './logic/OauthFactory';
import { OauthType } from './logic/IOauth';
import { CollectionName, getCollection, getTicket } from './common/tcb';

const oauthCollection = getCollection(CollectionName.UserOauth);
const userCollection = getCollection(CollectionName.UserInfo);

interface OauthEvent {
  type: OauthType;
  code: string;
}

async function main(event: OauthEvent) {
  const oauth = OauthFactory.getOauth({
    type: event.type,
    code: event.code,
  });

  const oauthInfo = await oauth.getOauthInfo();
  console.log('oauthInfo', oauthInfo);

  const { data: oauthData = [] } = await oauthCollection
    .where({
      type: event.type,
      oauthId: oauthInfo.id,
    })
    .get();

  let userId;
  if (!oauthData.length) {
    // 新用户
    ({ id: userId } = await userCollection.add({
      name: oauthInfo.nickName,
      avatarUal: oauthInfo.avatarUal,
    }));

    await oauthCollection.add({
      userId,
      type: event.type,
      ...oauthInfo,
    });
  } else {
    // 老用户
    [{ userId }] = oauthData;
  }
  const ticket = getTicket(userId);

  console.log('ticket', ticket);
  return ticket;
}

export { OauthEvent, main };
