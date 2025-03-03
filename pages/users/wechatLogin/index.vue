<template>
  <view>
    <view class="system-height" :style="{ height: statusBarHeight }"></view>
    <!-- #ifdef MP -->
    <view class="title-bar" style="height: 43px;">
      <view class="icon" @click="back" v-if="!isHome">
        <image src="@/static/image/left.png"></image>
      </view>
      <view class="icon" @click="home" v-else>
        <image src="@/static/image/left.png"></image>
      </view>
      账户登录
    </view>
    <!-- #endif -->
    <view class="wechat_login">
      <view class="img">
        <image src="@/static/image/new_logo.png" mode="widthFix"></image>
      </view>
      <view class="btn-wrapper">
        <!-- #ifdef MP -->
        <button v-if="canUseGetUserProfile && code" type="primary" hover-class="none" @tap="getUserProfile"
          class="bg-green btn1">微信登录</button>
        <button v-else hover-class="none" type="primary" open-type="getUserInfo" @getuserinfo="setUserInfo"
          class="bg-green btn1">微信登录</button>
        <!-- #endif -->
      </view>
    </view>
    <block v-if="isPhoneBox">
      <routinePhone :isPhoneBox="isPhoneBox" @close="bindPhoneClose" :authKey="authKey">
      </routinePhone>
    </block>
  </view>
</template>

<script>
  const app = getApp();
  let statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
  import routinePhone from '@/components/loginMobile/index.vue';
  import {
    silenceAuth,
  } from '@/api/public';
  import {
    LOGO_URL,
    EXPIRES_TIME,
    USER_INFO,
    STATE_R_KEY
  } from '@/config/cache';
  import {
    getUserInfo
  } from '@/api/user.js';
  import Routine from '@/libs/routine';
  export default {
    data() {
      return {
        statusBarHeight: statusBarHeight,
        isPhoneBox: false,
        code: '',
        authKey: '',
        options: '',
        userInfo: {},
        codeNum: 0,
        canUseGetUserProfile: false
      };
    },
    components: {
      routinePhone
    },
    onLoad(options) {
      if (uni.getUserProfile) {
        this.canUseGetUserProfile = true
      }
      let that = this;
      // #ifdef MP
      Routine.getCode()
        .then(code => {
          console.log(code)
          this.code = code
        })
      // #endif
      let pages = getCurrentPages();
      let prePage = pages[pages.length - 2];
      if (prePage && prePage.route == 'pages/user/bookBoat/component/BookSuccess') {
        this.isHome = true;
      } else {
        this.isHome = false;
      }
    },
    methods: {
      back() {
        uni.navigateBack();
      },
      home() {
        uni.navigateTo({
          url: '/pages/user/bookBoat/index'
        })
      },
      // 弹窗关闭
      maskClose() {
        this.isUp = false;
      },
      // #ifdef MP
      // 小程序获取手机号码
      getphonenumber(e) {
        uni.showLoading({
          title: '正在登录中'
        });
        Routine.getCode()
          .then(code => {
            this.getUserPhoneNumber(e.detail.encryptedData, e.detail.iv, code);
          })
          .catch(error => {
            uni.$emit('closePage', false);
            uni.hideLoading();
          });
      },
      // 小程序获取手机号码回调
      getUserPhoneNumber(encryptedData, iv, code) {
        getUserPhone({
            encryptedData: encryptedData,
            iv: iv,
            code: code,
            spread_spid: app.globalData.spid,
            spread_code: app.globalData.code
          })
          .then(res => {
            let time = res.data.expires_time - this.$Cache.time();
            this.$store.commit('LOGIN', {
              token: res.data.token,
              time: time
            });
            this.userInfo = res.data.userInfo;
            this.$store.commit('UPDATE_USERINFO', res.data.userInfo);
            this.$Cache.clear('snsapiKey');
            this.$util.Tips({
              title: '登录成功',
              icon: 'success'
            }, {
              tab: 3
            });
          })
          .catch(res => {
            uni.hideLoading();
          });
      },
      /**
       * 获取个人用户信息
       */
      getUserInfo: function() {
        let that = this;
        getUserInfo().then(res => {
          uni.hideLoading();
          that.userInfo = res.data;
          that.$util.Tips({
            title: '登录成功',
            icon: 'success'
          }, {
            tab: 3
          });
        });
      },
      setUserInfo(e) {
        
        uni.showLoading({
          title: '正在登录中'
        });
        Routine.getCode()
          .then(code => {
            this.getWxUser(code);
          })
          .catch(res => {
            uni.hideLoading();
          });
      },
      //小程序授权api替换 getUserInfo
      getUserProfile() {
        
        uni.showLoading({
          title: '正在登录中'
        });
        let self = this;
        Routine.getUserProfile()
          .then(res => {
            let userInfo = res.userInfo;
            Routine.authUserInfo({code: this.code})
              .then(res => {
                uni.hideLoading();
                let time = res.expires_time - self.$Cache.time();
                self.$store.commit('LOGIN', {
                  token: res.token,
                  time: time
                });
                self.$util.Tips({
                  title: '登录成功',
                  icon: 'success'
                }, {
                  tab: 3,
                });
              })
              .catch(res => {
                uni.hideLoading();
                uni.showToast({
                  title: res.msg,
                  icon: 'none',
                  duration: 2000
                });
              });
          })
          .catch(res => {
            uni.hideLoading();
          });
      },
      getWxUser(code) {
        let self = this;
        Routine.getUserInfo()
          .then(res => {
            let userInfo = res.userInfo;
            Routine.authUserInfo({code: code})
              .then(res => {
                uni.hideLoading();
                let time = res.expires_time - self.$Cache.time();
                self.$store.commit('LOGIN', {
                  token: res.token,
                  time: time
                });
                self.$util.Tips({
                  title: res.msg,
                  icon: 'success'
                }, {
                  tab: 3
                });
              })
              .catch(res => {
                uni.hideLoading();
                uni.showToast({
                  title: res.msg,
                  icon: 'none',
                  duration: 2000
                });
              });
          })
          .catch(res => {
            uni.hideLoading();
          });
      },

      // #endif
    }
  };
</script>

<style lang="scss">
  page {
    background: #fff;
  }

  .wechat_login {

    .img image {
      width: 100%;
    }

    .btn-wrapper {
      margin-top: 86rpx;
      padding: 0 66rpx;

      button {
        width: 100%;
        height: 86rpx;
        line-height: 86rpx;
        margin-bottom: 40rpx;
        border-radius: 120rpx;
        font-size: 30rpx;

        &.btn1 {
          color: #fff;
        }

        &.btn2 {
          color: #666666;
          border: 1px solid #666666;
        }
      }
    }
  }

  .title-bar {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36rpx;
  }

  .icon {
    position: absolute;
    left: 0rpx;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 86rpx;
    height: 86rpx;

    image {
      width: 50rpx;
      height: 50rpx;
    }
  }
</style>