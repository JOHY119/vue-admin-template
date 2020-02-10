import request from '@/utils/request'

export function fetchCorporationList(params) {
  return request({
    url: '/entity/corporation',
    method: 'get',
    params
  })
}

export function fetchFarmList(params) {
  return request({
    url: '/entity/farm',
    method: 'get',
    params
  })
}

export function fetchHouseList(params) {
  return request({
    url: '/entity/house',
    method: 'get',
    params
  })
}
