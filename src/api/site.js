import request from '@/utils/request'

export function getSummary(query) {
  return request({
    url: '/api/summary',
    method: 'get',
    params: query
  })
}

export function siteInfoGet(query) {
  return request({
    url: '/api/site-info',
    method: 'get',
    params: query
  })
}

export function siteInfoPut(data) {
  return request({
    url: '/api/site-info',
    method: 'put',
    data
  })
}
// 等级信息
