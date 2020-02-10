import Cookies from 'js-cookie'
import {fetchCorporationList, fetchFarmList} from '@/api/entity'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  // 设置全局厂选择框默认值， 调试方便
  globalSelected: {
    // 记录全局集团id
    corporationId: 'd42cf40c-825d-4b88-b5d6-f823006e6427',
    // 用于记录全局厂id
    farmId: 'cc8dd38c-d328-45a6-9b37-ae1eb73c0f47'
  },
  corporationList: [],
  farmList: [],
  // 实体管理页面的选择值
  managementSelected: {
    // 记录管理界面 集团id
    corporationId: '',
    // 用于记录管理界面 厂id
    farmId: ''
  }
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 0)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },
  // -----------修改全局已选择集团 厂id--------------------
  CHANGE_GLOBAL_CORPORATION_ID: (state, corporationId) => {
    state.globalSelected.corporationId = corporationId
  },
  CHANGE_GLOBAL_FARM_ID: (state, farmId) => {
    state.globalSelected.farmId = farmId
  },
  // -----------修改管理页面已选择集团 厂id-----------------
  CHANGE_MANAGEMENT_CORPORATION_ID: (state, corporationId) => {
    state.managementSelected.corporationId = corporationId
  },
  CHANGE_MANAGEMENT_FARM_ID: (state, farmId) => {
    state.managementSelected.farmId = farmId
  },
  // ------------获取集团列表-----------------------------
  CHANGE_CORPORATION_LIST: (state, corporationList) => {
    state.corporationList = corporationList
  },
  // 获取厂列表
  CHANGE_FARM_LIST: (state, farmList) => {
    state.farmList = farmList
  }
}

const actions = {
  toggleSideBar({commit}) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({commit}, {withoutAnimation}) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({commit}, device) {
    commit('TOGGLE_DEVICE', device)
  },
  // 设置当前全局所选厂
  changeGlobalSelected({commit}, {corporationId, farmId}) {
    commit('CHANGE_GLOBAL_CORPORATION_ID', corporationId)
    commit('CHANGE_GLOBAL_FARM_ID', farmId)
  },
  // 清空全局所设置厂
  cleanGlobalSelected({commit}) {
    commit('CHANGE_GLOBAL_CORPORATION_ID', '')
    commit('CHANGE_GLOBAL_FARM_ID', '')
  },
  // 设置管理页面所选集团
  changeManagementSelectedCorporationId({commit}, {corporationId}) {
    commit('CHANGE_MANAGEMENT_CORPORATION_ID', corporationId)
  },
  // 设置管理页面所选厂
  changeManagementSelectedFarmId({commit}, {farmId}) {
    commit('CHANGE_MANAGEMENT_FARM_ID', farmId)
  },
  // 设置当前管理页面所选集团和厂
  changeManagementSelected({commit}, {corporationId, farmId}) {
    commit('CHANGE_MANAGEMENT_CORPORATION_ID', corporationId)
    commit('CHANGE_MANAGEMENT_FARM_ID', farmId)
  },
  // 清空管理页面所设置厂
  cleanManagementSelected({commit}) {
    commit('CHANGE_MANAGEMENT_CORPORATION_ID', '')
    commit('CHANGE_MANAGEMENT_FARM_ID', '')
  },
  getCorporationFarmList({commit}) {
    fetchCorporationList().then(response => {
      commit('CHANGE_CORPORATION_LIST', response.data.items)
    })
    fetchFarmList().then(response => {
      commit('CHANGE_FARM_LIST', response.data.items)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
