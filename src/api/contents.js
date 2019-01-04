import request from '@/utils/request'

export function getContents(params) {
  return request({
    url: '/api/contents',
    method: 'get',
    params
  })
}

export function getContentOne(data) {
  return request({
    url: '/api/contents/' + data._id,
    method: 'get'
  })
}

export function addContents(data) {
  return request({
    url: '/api/contents',
    method: 'post',
    data
  })
}
export function updateContents(data) {
  return request({
    url: '/api/contents/' + data._id,
    method: 'put',
    data
  })
}

export function deleteContents(data) {
  return request({
    url: '/api/contents/' + data._id,
    method: 'delete'
    // data
  })
}
