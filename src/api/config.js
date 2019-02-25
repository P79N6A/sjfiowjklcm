import request from '@/utils/request'

export function getConfigOne(data) {
  console.log(data)
  return request({
    url: '/api/config/' + data.name,
    method: 'get'
  })
}
export function saveConfig(data) {
  return request({
    url: '/api/config', // 配置修改
    method: 'post',
    data
  })
}
