import request from '@/utils/request'

export function getProjects(params) {
  return request({
    url: '/api/projects',
    method: 'get',
    params
  })
}

export function addProjects(data) {
  return request({
    url: '/api/projects',
    method: 'post',
    data
  })
}
export function updateProjects(data) {
  return request({
    url: '/api/projects/' + data._id,
    method: 'put',
    data
  })
}
export function pushProjects(data) {
  return request({
    url: '/api/projects/push/' + data._id,
    method: 'get'
  })
}

export function deleteProjects(data) {
  return request({
    url: '/api/projects/' + data._id,
    method: 'delete',
    data
  })
}
