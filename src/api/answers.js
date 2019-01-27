import request from '@/utils/request'

export function getAnswers(params) {
  console.log(params)
  return request({
    url: '/api/answers',
    method: 'get',
    params
  })
}

export function addAnswers(data) {
  return request({
    url: '/api/answers',
    method: 'post',
    data
  })
}


export function deleteAnswers(data) {
  return request({
    url: '/api/answers/' + data._id,
    method: 'delete',
  })
}
