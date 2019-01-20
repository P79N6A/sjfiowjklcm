import request from '@/utils/request'

export function getRequirements(params) {
  return request({
    url: '/api/requiresment',
    method: 'get',
    params: params
  })
}
export function getRequiresmentOne(data) {
  return request({
    url: '/api/requiresment/' + data._id,
    method: 'get'
  })
}
export function addRequiresments(data) {
  return request({
    url: '/api/requiresment',
    method: 'post',
    data
  })
}
export function deleteRequiresments(data) {
  return request({
    url: '/api/requiresment/' + data._id,
    method: 'delete'
    // params: data
  })
}

export function updateRequiresments(data) {
  return request({
    url: '/api/requiresment/' + data._id,
    method: 'put',
    data
  })
}
