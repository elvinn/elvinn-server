import { getUserInfo, getCollection, CollectionName } from '../common/tcb';
import { Memo, ItemFunc, ListFunc } from '../types';

const memoCollection = getCollection(CollectionName.MemoStore);

const queryMemoList: ListFunc = async (pageNum: number) => {
  return null;
};

const addMemo: ItemFunc = async (memo: Memo) => {
  const { customUserId } = await getUserInfo();
  console.log('准备添加数据', memo);
  // const { id } =
  const res = (await memoCollection
    .add({
      ...memo,
      customUserId,
    })
    .catch((e: Error) => {
      console.error('添加失败', e);
    })) || { id: '' };

  console.log('add res', res);
  const { id } = res;

  if (!id) {
    console.error(`添加失败`);
    // console.error(`添加失败，${code} : ${message}`);
    return null;
  }

  console.log('添加成功', id);
  return { id };
};

const deleteMemo: ItemFunc = async (memo: Memo) => {
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
};

const editMemo: ItemFunc = async (memo: Memo) => {
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
};

export { ItemFunc, queryMemoList, addMemo, deleteMemo, editMemo };
