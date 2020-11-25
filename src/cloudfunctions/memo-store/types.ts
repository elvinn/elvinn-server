enum StoreAction {
  QUERY_MEMO_LIST = 'QUERY_MEMO_LIST',
  ADD_MEMO = 'ADD_MEMO',
  DELETE_MEMO = 'DELETE_MEMO',
  EDIT_MEMO = 'EDIT_MEMO',
}

interface Memo {
  id: string;
  text?: string;
  ts?: number;
  isDone?: boolean;
}

interface MemoStoreEvent {
  action: StoreAction;
  state?: Memo;
  pageNum?: number;
}

export { StoreAction, Memo, MemoStoreEvent };
