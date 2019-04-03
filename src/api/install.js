import request from '@/utils/request'

export function checkInstall(params) {
  return request({
    url: '/api/install',
    method: 'get',
    params
  })
}

export function postInstall(data) {
  return request({
    url: '/api/install',
    method: 'post',
    data
  })
}


export function tryInstall(data) {
  return request({
    url: '/api/install/test-database',
    method: 'put',
    data
  })
}
