import { getUserInfo, getCollection, CollectionName } from '../common/tcb'
import { Memo } from '../types';

const memoCollection = getCollection(CollectionName.MemoStore);

async function addMemo(memo: Memo) {
  const { customUserId } = await getUserInfo();
  console.log('准备添加数据', memo);
  const { id } = await memoCollection.add({
    customUserId,
    ...memo
  }).catch((e) => {
    console.error('添加失败', e);
  }) || {};

  if (!id) {
    return;
  }

  console.log('添加成功', id);
  return { id };
}

async function deleteMemo(memo: Memo) {
  
}

async function editMemo(memo: Memo) {
  
}

export {
  addMemo,
  deleteMemo,
  editMemo,
}

