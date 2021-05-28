import { MemoStoreEvent, StoreAction } from './types';
import { addMemoList } from './logic';

async function main(event: MemoStoreEvent) {
  const { action, payload } = event;

  const actionToFuncMap: {
    [index in StoreAction]?: typeof addMemoList;
  } = {
    [StoreAction.ADD_MEMO_LIST]: addMemoList,
  };

  const func = actionToFuncMap[action];

  if (!func) {
    return {
      ret: -1,
      msg: 'action 值错误',
    };
  }

  try {
    await func(payload);
  } catch (error) {
    console.error('执行失败', error);

    return {
      ret: -2,
      msg: '请求失败',
    };
  }

  return {
    ret: 0,
  };
}

// eslint-disable-next-line import/prefer-default-export
export { main };
