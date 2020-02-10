const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  global_corporation_id: state => state.app.globalSelected.corporationId,
  global_farm_id: state => state.app.globalSelected.farmId,
  corporation_list: state => state.app.corporationList,
  farm_list: state => state.app.farmList,
  management_corporation_id: state => state.app.managementSelected.corporationId,
  management_farm_id: state => state.app.managementSelected.farmId,

  // 获取集团养殖场嵌套列表
  corporationFarmList: state => {
    if (!state.app.corporationList.length || !state.app.farmList.length) {
      return []
    }
    // console.log('开始制造farmList')
    const vCorpList = JSON.parse(JSON.stringify(state.app.corporationList))
    vCorpList.forEach(function (value) {
      value.children = []
    })
    state.app.farmList.map((value, index, array) => {
      const i = vCorpList.findIndex((item) => {
        return item.id === value.corporationId
      })
      if (i === -1) {
        return
      }
      vCorpList[i].children.push(value)
    })
    // console.log(vCorpList)
    return vCorpList
  }
}
export default getters
