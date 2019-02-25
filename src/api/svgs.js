import request from '@/utils/request'

export function getSvgs(params) {
  return request({
    url: '/api/svgs',
    method: 'get',
    params
  })
}

export function addSvgs(data) {
  return request({
    url: '/api/svgs',
    method: 'post',
    data
  })
}
export function updateSvgs(data) {
  return request({
    url: '/api/svgs/' + data._id,
    method: 'put',
    data
  })
}

export function deleteSvgs(data) {
  return request({
    url: '/api/svgs/' + data._id,
    method: 'delete',
    data
  })
}

