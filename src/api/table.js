import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/table/list',
    method: 'get',
    params
  })
}

export function getRoomId(params) {
  return request({
    url: '/table/roomId',
    method: 'get',
    params
  })
}

