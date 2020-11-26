import { MemoStoreEvent, StoreAction } from './types';
import { queryMemoList, addMemo, deleteMemo, editMemo } from './logic';

// 处理批量请求
async function handleListRequest(event: MemoStoreEvent) {
  const { action, pageNum } = event;

  const actionToFuncMap = {
    [StoreAction.QUERY_MEMO_LIST]: queryMemoList,
  };

  const func = actionToFuncMap[action];

  if (!func) {
    return {
      ret: -1,
      msg: 'action 值错误',
    };
  }

  const { list } = (await func(pageNum)) || {};

  if (!list) {
    return {
      ret: -2,
      msg: '请求失败',
    };
  }

  return {
    ret: 0,
    data: {
      list,
    },
  };
}

// 处理单个请求
async function handleItemRequest(event: MemoStoreEvent) {
  const { action, state } = event;

  const actionToFuncMap: {
    [index in StoreAction]?: typeof addMemo;
  } = {
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

  const { id } = (await func(state)) || {};
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

async function main(event: MemoStoreEvent) {
  if (StoreAction.QUERY_MEMO_LIST === event.action) {
    return handleListRequest(event);
  }

  return handleItemRequest(event);
}

// eslint-disable-next-line import/prefer-default-export
export { main };
