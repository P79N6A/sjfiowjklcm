import request from '@/utils/request'

export function getPages() {
  return request({
    url: '/api/pages',
    method: 'get'
  })
}

export function addPages(data) {
  return request({
    url: '/api/pages',
    method: 'post',
    data
  })
}
export function updatePages(data) {
  return request({
    url: '/api/pages/' + data._id,
    method: 'put',
    data
  })
}

export function deletePages(data) {
  return request({
    url: '/api/pages/' + data._id,
    method: 'delete',
    data
  })
}

export function rememberPages(data) {
  return request({
    url: '/api/pages/' + data._id,
    method: 'post',
    data
  })
}
