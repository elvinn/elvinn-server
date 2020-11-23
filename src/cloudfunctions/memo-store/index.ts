import { MemoStoreEvent, StoreAction } from './types';
import { addMemo, deleteMemo, editMemo } from './logic'

async function main(event: MemoStoreEvent) {
  const {
    action,
    state,
  } = event;

  const actionToFuncMap = {
    [StoreAction.ADD_MEMO]: addMemo,
    [StoreAction.DELETE_MEMO]: deleteMemo,
    [StoreAction.EDIT_MEMO]: editMemo,
  };

  const func = actionToFuncMap[action];

  if (!func) {
    return {
      ret: -1,
      msg: 'action 值错误',
    };
  }

  const { id } = await func(state) || {};
  if (!id) {
    return {
      ret: -2,
      msg: '请求失败',
    };
  }
  
  return {
    ret: 0,
    data: {
      id,
    },
  };
}

export { main };
