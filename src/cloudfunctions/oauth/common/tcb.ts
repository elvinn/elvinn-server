import tcb from '@cloudbase/node-sdk';
import { CollectionReference } from '@cloudbase/database';
import { envId, secretId, secretKey, privateKey, privateKeyId } from '../secrets/tcb';

enum CollectionName {
  UserOauth = 'user-oauth',
  UserInfo = 'user-info',
}

const app = tcb.init({
  env: envId,
  secretId,
  secretKey,
  credentials: {
    env_id: envId,
    private_key: privateKey,
    private_key_id: privateKeyId,
  },
});
const auth = app.auth();
const db = app.database();

const collectionCache = new Map<string, CollectionReference>();

function getCollection(name: string) {
  if (collectionCache.has(name)) {
    return collectionCache.get(name);
  }

  const result = db.collection(name);
  collectionCache.set(name, result);
  return result;
}

function getTicket(customUserId: string) {
  return auth.createTicket(customUserId);
}

export { app, auth, db, getCollection, getTicket, CollectionName };
