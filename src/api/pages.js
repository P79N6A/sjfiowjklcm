import request from '@/utils/request'

export function getPages(data) {
  return request({
    url: '/api/pages',
    method: 'get',
    params: data
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
  console.log(data)
  return request({
    url: '/api/pages/' + data._id,
    method: 'delete'
  })
}

export function rememberPages(data) {
  return request({
    url: '/api/pages/' + data._id,
    method: 'post',
    data
  })
}
