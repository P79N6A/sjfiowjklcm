import request from '@/utils/request'

export function getPlatforms(data) {
  return request({
    url: '/api/platforms',
    method: 'get',
    params: data
  })
}
export function getPlatformsOne(data) {
  return request({
    url: '/api/platforms/' + data._id,
    method: 'get'
  })
}
export function addPlatforms(data) {
  return request({
    url: '/api/platforms',
    method: 'post',
    data
  })
}

export function updatePlatforms(data) {
  return request({
    url: '/api/platforms/' + data._id,
    method: 'put',
    data
  })
}

export function deletePlatforms(data) {
  return request({
    url: '/api/platforms/' + data._id,
    method: 'delete',
  })
}
