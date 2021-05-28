enum StoreAction {
  ADD_MEMO_LIST = 'ADD_MEMO_LIST',
  EDIT_MEMO_LIST = 'EDIT_MEMO_LIST',
  QUERY_MEMO_LIST = 'QUERY_MEMO_LIST',
}

interface Memo {
  id: string;
  text?: string;
  updateTimestamp?: number;
  isDone?: boolean;
}

interface Payload {
  memoList: Memo[];
}

interface MemoStoreEvent {
  action: StoreAction;
  payload?: Payload;
}

export { StoreAction, Memo, Payload, MemoStoreEvent };
