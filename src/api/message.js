import request from '@/utils/request'

export function getMessages(params) {
  return request({
    url: '/api/messages',
    method: 'get',
    params: params
  })
}
export function getMessageOne(data) {
  return request({
    url: '/api/messages/' + data._id,
    method: 'get'
  })
}
export function addMessages(data) {
  return request({
    url: '/api/messages',
    method: 'post',
    data
  })
}
export function deleteMessages(data) {
  return request({
    url: '/api/messages/' + data._id,
    method: 'delete'
    // params: data
  })
}

export function updateMessages(data) {
  return request({
    url: '/api/messages/' + data._id,
    method: 'put',
    data
  })
}
