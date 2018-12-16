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
export function updateModels(data) {
  return request({
    url: '/api/models/' + data._id,
    method: 'put',
    data
  })
}

export function deleteModels(data) {
  return request({
    url: '/api/models/' + data._id,
    method: 'delete',
    data
  })
}
