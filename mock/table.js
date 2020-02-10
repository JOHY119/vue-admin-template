import Mock from 'mockjs'

// const data = Mock.mock({
//   'items|30': [{
//     'id|+1': 1,
//     title: '@sentence(10, 20)',
//     'status|1': ['published', 'draft', 'deleted'],
//     author: 'name',
//     display_time: '@datetime',
//     pageviews: '@integer(300, 5000)'
//   }]
// })
// const data = Mock.mock({
//   'items|30': [{
//     'id|+1': 1,
//     days: '@integer(300, 5000)',
//     temperature: '@integer(300, 5000)',
//     moisture: '@integer(300, 5000)',
//     pressure: '@integer(300, 5000)',
//     num_fans: '@integer(300, 5000)',
//     angle_window: '@integer(300, 5000)',
//     angle_door: '@integer(300, 5000)',
//     is_pump: '@boolean',
//     is_heating: '@boolean',
//     is_light: '@boolean',
//     numbers: '@integer(300, 5000)',
//     update_time: '@datetime'
//   }]
// })

export default [
  {
    url: '/table/list',
    type: 'get',
    response: config => {
      const data = Mock.mock({
        'items|12': [{
          'id|+1': 1,
          'uuid|+1': 1001001,
          'name|+1': 1001001,
          days: '@integer(300, 5000)',
          temperature: '@integer(10, 50)',
          moisture: '@integer(20, 100)',
          pressure: '@integer(300, 5000)',
          num_fans: '@integer(300, 5000)',
          angle_window: '@integer(300, 5000)',
          angle_door: '@integer(300, 5000)',
          is_pump: '@boolean',
          is_heating: '@boolean',
          is_light: '@boolean',
          numbers: '@integer(300, 5000)',
          update_time: '@datetime'
        }]
      })
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  },
  {
    url: '/table/roomId',
    type: 'get',
    response: config => {
      const data = Mock.mock({
        'items|30': [{
          'id|+1': 1,
          'uuid|+1': 1001001
        }]
      })
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]
