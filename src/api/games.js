import request from '@/utils/request'

export function getGames(params) {
  return request({
    url: '/api/games',
    method: 'get',
    params
  })
}

export function addGames(data) {
  return request({
    url: '/api/games',
    method: 'post',
    data
  })
}
export function updateGames(data) {
  return request({
    url: '/api/games/' + data._id,
    method: 'put',
    data
  })
}

export function deleteGames(data) {
  return request({
    url: '/api/games/' + data._id,
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
