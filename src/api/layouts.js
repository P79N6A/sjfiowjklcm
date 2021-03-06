import request from '@/utils/request'

export function getLayouts(data) {
  return request({
    url: '/api/layouts',
    method: 'get',
    params: data
  })
}
export function getLayoutsShortId(data) {
  return request({
    url: '/api/layouts/ShortId/' + data.shortId,
    method: 'get'
  })
}
export function buyLayouts(data) {
  return request({
    url: '/api/layouts/buy/' + data._id,
    method: 'get'
  })
}
export function getLayoutsOne(data) {
  return request({
    url: '/api/layouts/' + data._id,
    method: 'get'
  })
}
export function addLayouts(data) {
  return request({
    url: '/api/layouts',
    method: 'post',
    data
  })
}

export function updateLayouts(data) {
  return request({
    url: '/api/layouts/' + data._id,
    method: 'put',
    data
  })
}

export function deleteLayouts(data) {
  return request({
    url: '/api/layouts/' + data._id,
    method: 'delete'
  })
}
