import request from '@/utils/request'

export function getItems(params) {
  return request({
    url: '/api/items',
    method: 'get',
    params
  })
}

export function addItems(data) {
  return request({
    url: '/api/items',
    method: 'post',
    data
  })
}
export function updateItems(data) {
  return request({
    url: '/api/items/' + data._id,
    method: 'put',
    data
  })
}

export function deleteItems(data) {
  return request({
    url: '/api/items/' + data._id,
    method: 'delete',
    data
  })
}
