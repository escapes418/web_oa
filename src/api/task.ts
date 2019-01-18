import request from '@/utils/request'

export function getTodoList(parmas) {
  return request({
    url:'/webExpenseFlow/todo',
    method:'post',
    data:parmas
  })
}

export function getDoneList(parmas) {
  return request({
    url:'/webExpenseFlow/historic',
    method:'post',
    data:parmas
  })
}