import request from '@/utils/request'

export function getGames() {
  return request({
    url: '/api/games',
    method: 'get'
  })
}

export function addGames(data) {
  return request({
    url: '/api/projects',
    method: 'post',
    data
  })
}
export function updateGames(data) {
  return request({
    url: '/api/projects/' + data._id,
    method: 'put',
    data
  })
}

export function deleteGames(data) {
  return request({
    url: '/api/projects/' + data._id,
    method: 'delete',
    data
  })
}

export function rememberGames(data) {
  return request({
    url: '/api/projects/' + data._id,
    method: 'post',
    data
  })
}
