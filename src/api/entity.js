import request from '@/utils/request'

export function getCorporationList(params) {
  return request({
    url: '/entity/corporation',
    method: 'get',
    params
  })
}

export function getFarmList(params) {
  return request({
    url: '/entity/farm',
    method: 'get',
    params
  })
}

export function getHouseList(params) {
  return request({
    url: '/entity/house',
    method: 'get',
    params
  })
}
