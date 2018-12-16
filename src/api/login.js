import request from '@/utils/request'

export function loginByUsername(data) {
  return request({
    url: '/api/account/sign-in',
    method: 'put',
    data
  })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo() {
  return request({
    url: '/api/account',
    method: 'get'
  })
}

