import request from '@/utils/request'

export function getImgs(params) {
  return request({
    url: '/api/imgs',
    method: 'get',
    params
  })
}

export function addImgs(data) {
  return request({
    url: '/api/imgs',
    method: 'post',
    data
  })
}
export function updateImgs(data) {
  return request({
    url: '/api/imgs/' + data._id,
    method: 'put',
    data
  })
}

export function deleteImgs(data) {
  return request({
    url: '/api/imgs/' + data._id,
    method: 'delete',
    data
  })
}

