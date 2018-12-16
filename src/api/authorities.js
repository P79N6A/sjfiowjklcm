import request from '@/utils/request'

export function getAuthorities() {
  return request({
    url: '/api/authorities',
    method: 'get'
  })
}