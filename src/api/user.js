import request from '@/utils/request'

export function getUsers() {
  return request({
    url: '/api/admin-users',
    method: 'get'
  })
}

export function addUsers(data) {
  return request({
    url: '/api/admin-users',
    method: 'post',
    data
  })
}
// 编辑单个用户
export function updateUserOne(data) {
  return request({
    url: '/api/admin-users/' + data._id,
    method: 'put',
    data
  })
}

export function deleteUserOne(data) {
  return request({
    url: '/api/admin-users/' + data._id,
    method: 'delete',
    data
  })
}
