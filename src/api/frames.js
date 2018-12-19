import request from '@/utils/request'

export function getFrames() {
  return request({
    url: '/api/frames?type=content',
    method: 'get'
  })
}

export function addFrames(data) {
  return request({
    url: '/api/frames',
    method: 'post',
    data
  })
}
export function updateFrames(data) {
  return request({
    url: '/api/frames/' + data._id,
    method: 'put',
    data
  })
}

export function deleteFrames(data) {
  return request({
    url: '/api/frames/' + data._id,
    method: 'delete',
    data
  })
}
