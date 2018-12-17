import request from '@/utils/request'

export function getCategories() {
  return request({
    url: '/api/categories',
    method: 'get'
  })
}

export function addCategories(data) {
  return request({
    url: '/api/categories',
    method: 'post',
    data
  })
}
export function updateCategories(data) {
  return request({
    url: '/api/categories/' + data._id,
    method: 'put',
    data
  })
}

export function deleteCategories(data) {
  return request({
    url: '/api/categories/' + data._id,
    method: 'delete',
    data
  })
}
