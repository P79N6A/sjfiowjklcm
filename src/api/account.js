import request from '@/utils/request'

export function getAccount() {
  return request({
    url: '/api/account',
    method: 'get'
  })
}
export function updateAccount(data) {
  return request({
    url: '/api/account',
    method: 'put',
    data
  })
}
export function logout(data) {
  return request({
    url: '/api/account/sign-out',
    method: 'get',
    data
  })
}

