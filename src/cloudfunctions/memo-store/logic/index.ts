import { getUserInfo, getCollection, CollectionName } from '../common/tcb';
import { Memo } from '../types';

const memoCollection = getCollection(CollectionName.MemoStore);

async function addMemo(memo: Memo) {
  const { customUserId } = await getUserInfo();
  console.log('准备添加数据', memo);
  const { code, message, id } =
    (await memoCollection
      .add({
        ...memo,
        customUserId,
      })
      .catch((e: Error) => {
        console.error('添加失败', e);
      })) || {};

  if (!id || code) {
    console.error(`添加失败，${code} : ${message}`);
    return null;
  }

  console.log('添加成功', id);
  return { id };
}

async function deleteMemo(memo: Memo) {
  const { customUserId } = await getUserInfo();
  const { code, message } =
    (await memoCollection
      .where({
        customUserId, // 通过 customUserId 保证只有用户本人可以删除
        id: memo.id,
      })
      .update({
        isDeleted: 1,
      })
      .catch((e: Error) => {
        console.error('删除失败', e);
      })) || {};

  if (code) {
    console.error(`删除失败，${code} : ${message}`);
    return null;
  }

  return { id: memo.id };
}

async function editMemo(memo: Memo) {
  const { customUserId } = await getUserInfo();
  const { code, message } =
    (await memoCollection
      .where({
        customUserId, // 通过 customUserId 保证只有用户本人可以删除
        id: memo.id,
      })
      .update(memo)
      .catch((e: Error) => {
        console.error('更新失败', e);
      })) || {};

  if (code) {
    console.error(`更新失败，${code} : ${message}`);
    return null;
  }

  return { id: memo.id };
}

export { queryMemo, addMemo, deleteMemo, editMemo };
