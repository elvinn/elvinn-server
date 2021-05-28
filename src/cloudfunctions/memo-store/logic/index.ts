import { getUserInfo, getCollection, CollectionName } from '../common/tcb';
import { Payload } from '../types';

const memoCollection = getCollection(CollectionName.MemoStore);

const addMemoList = async (payload: Payload) => {
  const { memoList } = payload;
  const { customUserId } = await getUserInfo();
  console.log('准备添加数据', customUserId, memoList);
  const dataList = memoList.map((memo) => {
    return {
      customUserId,
      id: memo.id,
      text: memo.text,
      updateTimestamp: Date.now(),
      updateTime: new Date(),
    };
  });
  const res = await memoCollection.add(dataList);

  console.log('添加成功', res);
};

// const deleteMemoList: ListFunc = async (memo: Memo[]) => {
//   const { customUserId } = await getUserInfo();
//   const { code, message } =
//     (await memoCollection
//       .where({
//         customUserId, // 通过 customUserId 保证只有用户本人可以删除
//         id: memo.id,
//       })
//       .update({
//         isDeleted: 1,
//       })
//       .catch((e: Error) => {
//         console.error('删除失败', e);
//       })) || {};

//   if (code) {
//     console.error(`删除失败，${code} : ${message}`);
//     return null;
//   }

//   return { id: memo.id };
// };

// const editMemo: ItemFunc = async (memo: Memo) => {
//   const { customUserId } = await getUserInfo();
//   const { code, message } =
//     (await memoCollection
//       .where({
//         customUserId, // 通过 customUserId 保证只有用户本人可以删除
//         id: memo.id,
//       })
//       .update(memo)
//       .catch((e: Error) => {
//         console.error('更新失败', e);
//       })) || {};

//   if (code) {
//     console.error(`更新失败，${code} : ${message}`);
//     return null;
//   }

//   return { id: memo.id };
// };

export {
  // eslint-disable-next-line import/prefer-default-export
  addMemoList,
  // queryMemoList,
  // deleteMemoList,
  // editMemo,
};
