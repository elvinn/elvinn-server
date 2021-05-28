#  memo-store 接口

## 使用项目

- [memo](https://elvinn.cn/memo-vue)

## 说明

1. 提供的均是批量接口，对于单个数据的变更通过长度为 1 的数组传递即可
2. 暂未考虑批量修改的事务性，后续如需增加相关能力，可以参考 [云开发 - 数据库事务](https://docs.cloudbase.net/database/transaction.html)

## 批量添加 memo

### Request

- action: `string` = 'ADD_MEMO_LIST'
- payload: `object`
  - memoList: `object[]` 要添加的 memo 数据列表
    - id: `string`
    - text: `string`

``` json
{
  "action": "ADD_MEMO_LIST",
  "payload": {
    "memoList": [
      {
        "id": "xxx",
        "text": "测试1"
      }
    ]
    
  }
}
```

### Response

- ret: `number`，返回码

``` json
{
  "ret": 0
}
```

## 批量修改 memo

### Request

- action = 'EDIT_MEMO'
- payload: `object`
  - memoList: `object[]` 要添加的 memo 数据列表
    - id: `string`
    - text?: `string`
    - isDone?: `bool`
    - isDeleted?: `bool`

```json
{
  "action": "UPDATE_MEMO_LIST",
  "payload": {
    "memoList": [
      {
        "id": "xxxx",
        "text": "新的内容"
      },
      {
        "id": "yyyy",
        "isDone": true
      },
      {
        "id": "zzzz",
        "isDeleted": true
      }
    ]
  }
}
```

### Response

- ret: `number`，返回码
- data: `object`
  - id: `string`

``` json
{
  "ret": 0
}
```

## 批量查询 memo

### Request

- action = 'QUERY_MEMO_LIST'

``` json
{
  "action": "QUERY_MEMO_LIST"
}
```

### Response

- ret: `number`，返回码
- data: `Object[]` memo 数据的列表
  - id: `string`
  - text: `string`
  - ts: `number`，

``` json
{
  "ret": 0,
  "data": [
    {
      "id": "xxx",
      "text": "测试1",
      "ts": 1622090921132,
      "isDone": false
    }
  ]
}
```

## 返回码

- 0: 成功
- -1: action 值错误
- -2: 请求失败yar

## 本地调试

1. 批量添加 `tcb fn run --name memo-store --params '{"action":"ADD_MEMO_LIST","payload":{"memoList":[{"id":"xxx","text":"测试1"}]}}'`