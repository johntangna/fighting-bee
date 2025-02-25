import Cache from '../../utils/cache';
import {
  LOGIN_STATUS,
  UID,
  USER_INFO,
  DICTIONARY
} from '../../config/cache';

const state = {
  // token标记，用来缓存登陆标记状态
  token: Cache.get(LOGIN_STATUS) || false,
  backgroundColor: "#fff",
  userInfo: {
    isAdmin: -1, // 给个别的值，不显示默认页面
  },
  uid: Cache.get(UID) || 0,
  homeActive: false,
  phoneStatus: true,
  // 跳转时定时器，用来拦截频繁跳转
  navigateToSetTimeout: null,
  // 字典值，放在一个当中
  dictionary: {},
	// 港口列表
	portList: [],
	// 国家列表
	countryList: []
}

const mutations = {
  SETPHONESTATUS(state, val) {
    state.phoneStatus = val;
  },
  LOGIN(state, opt) {
    state.token = opt.token;
    Cache.set(LOGIN_STATUS, opt.token, opt.time);
  },
  SETUID(state, val) {
    state.uid = val;
    Cache.set(UID, val);
  },
  UPDATE_LOGIN(state, token) {
    state.token = token;
  },
  LOGOUT(state) {
    state.token = undefined;
    state.uid = undefined
    Cache.clear(LOGIN_STATUS);
    Cache.clear(UID);
  },
  BACKGROUND_COLOR(state, color) {
    state.color = color;
    document.body.style.backgroundColor = color;
  },
  UPDATE_USERINFO(state, userInfo) {
    state.userInfo = userInfo;
    Cache.set(USER_INFO, userInfo);
  },
  OPEN_HOME(state) {
    state.homeActive = true;
  },
  CLOSE_HOME(state) {
    state.homeActive = false;
  },
  NAVIGATOR_SETTIME(state, set) {
    state.navigateToSetTimeout = set
  },
  SETDICTIONARY(state, dic) {
    state.dictionary = dic
    Cache.set(DICTIONARY, dic);
  },
	SETPORTLIST(state, portList) {
		state.portList = portList
		Cache.set("PORTLIST", portList)
	},
	SETCOUNTRYLIST(state, countryList) {
		state.countryList = countryList
		Cache.set("COUNTRYLIST", countryList)
	}
}

const actions = {
  USERINFO({
    state,
    commit
  }, force) {
    if (state.userInfo !== null && !force)
      return Promise.resolve(state.userInfo);
    else
      return new Promise(reslove => {
        getUserInfo().then(res => {
          commit("UPDATE_USERINFO", res.data);
          Cache.set(USER_INFO, res.data);
          reslove(res.data);
        });
      }).catch(() => {

      });
  },
}

export default {
  state,
  mutations,
  actions
}