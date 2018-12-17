import request from '@/utils/request'
// 列表
export function getCategories() {
  return request({
    url: '/api/categories',
    method: 'get'
  })
}
// 具体某个
export function getCategoryOne(data) {
  return request({
    url: '/api/categories/' + data._id,
    method: 'get'
  })
}
// 添加
export function addCategories(data) {
  return request({
    url: '/api/categories',
    method: 'post',
    data
  })
}
// 更新
export function updateCategories(data) {
  return request({
    url: '/api/categories/' + data._id,
    method: 'put',
    data
  })
}
// 删除
export function deleteCategories(data) {
  return request({
    url: '/api/categories/' + data._id,
    method: 'delete',
    data
  })
}
