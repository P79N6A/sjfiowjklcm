import request from '@/utils/request'

export function getMedias(params) {
  return request({
    url: '/api/media',
    method: 'get',
    params: params
  })
}

export function deleteMedias(data) {
  return request({
    url: '/api/media/' + data._id,
    method: 'delete'
    // params: data
  })
}

export function updateMedias(data) {
  return request({
    url: '/api/media/' + data._id,
    method: 'put',
    data
  })
}
