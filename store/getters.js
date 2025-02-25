export default {
  token: state => state.app.token,
  isLogin: state => !!state.app.token,
	userInfo: state => state.app.userInfo,
  isAdmin: state => state.app.userInfo.isAdmin,
  openId: state => state.app.userInfo.openId,
  userId: state => state.app.userInfo.id,
  dictionary: state => state.app.dictionary,
	postArray: state => state.app.portList,
	countryArray: state => state.app.countryList,
  navigateToSetTimeout: state => state.app.navigateToSetTimeout
}