import request from '@/utils/request'

export function getRoles() {
  return request({
    url: '/api/roles',
    method: 'get'
  })
}

export function addRoles(data) {
  return request({
    url: '/api/roles',
    method: 'post',
    data
  })
}
// 编辑单个角色
export function updateRoleOne(data) {
  return request({
    url: '/api/roles/' + data._id,
    method: 'put',
    data
  })
}

export function deleteRoleOne(data) {
  return request({
    url: '/api/roles/' + data._id,
    method: 'delete',
    data
  })
}
