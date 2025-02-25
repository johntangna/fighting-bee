import store from '../store/index.js'

function navigateToMutation(setT){
  store.commit('NAVIGATOR_SETTIME', setT)
}

/**
 * 对navigateTo api进行节流控制，防止点击时多次进入，造成多次返回
 * @param {Object} fn 判断节流函数的依据
 */
function throttleNavigateTo(fn) {
    return (wait) => {
      if (!store.getters.navigateToSetTimeout) {
        let setT = setTimeout(() => {
          fn()
          clearTimeout(setT)
        }, wait)
        navigateToMutation(setT)
        return true
      } else {
        return false;
      }
    }
}

uni.addInterceptor('navigateTo', {
  invoke(e) {
    let fn = () => {
      navigateToMutation(null)
    }
    return throttleNavigateTo(fn)(1500)
  }
})