import request from '@/utils/request'

export function getComponents(params) {
  return request({
    url: '/api/components',
    method: 'get',
    params
  })
}

export function addComponents(data) {
  return request({
    url: '/api/components',
    method: 'post',
    data
  })
}
export function buyComponents(data) {
  return request({
    url: '/api/components/buy/' + data._id,
    method: 'get'
  })
}
export function updateComponents(data) {
  return request({
    url: '/api/components/' + data._id,
    method: 'put',
    data
  })
}

export function deleteComponents(data) {
  return request({
    url: '/api/components/' + data._id,
    method: 'delete'
    // data
  })
}
