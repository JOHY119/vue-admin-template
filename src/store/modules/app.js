import Cookies from 'js-cookie'

const state = {
  sidebar: {
    opened: Cookies.get('sidebarStatus') ? !!+Cookies.get('sidebarStatus') : true,
    withoutAnimation: false
  },
  device: 'desktop',
  // 记录全局集团id
  corporationId: '',
  // 用于记录全局厂id
  farmId: ''
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
  CHANGE_CORPORATION_ID: (state, corporationId) => {
    state.corporationId = corporationId
  },
  CLEAN_CORPORATION_ID: state => {
    state.corporationId = ''
  },
  CHANGE_FARM_ID: (state, farmId) => {
    state.farmId = farmId
  },
  CLEAN_FARM_ID: state => {
    state.farmId = ''
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
  // 设置当前所选厂
  changeCurrentFarm({commit}, {corporationId, farmId}) {
    commit('CHANGE_CORPORATION_ID', corporationId)
    commit('CHANGE_FARM_ID', farmId)
  },
  // 清空所设置厂
  cleanCurrentFarm({commit}) {
    commit('CLEAN_CORPORATION_ID')
    commit('CLEAN_FARM_ID')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
