import request from '@/utils/request'

export function getModels() {
  return request({
    url: '/api/models?type=content',
    method: 'get'
  })
}

export function addModels(data) {
  return request({
    url: '/api/models',
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
