<template>
  <view class="header">
    <view class="mp-header">
      <view class="log-box" style="width: 100%;height: 344px">
        <view class="logo-wrapper acea-row row-middle">
          <view class="logo">
            <image src="/static/image/boat.png" model="aspectFit"></image>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
	// 头部logo共用组件
  let statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
  export default {
    name: 'HeadLogo',
    props: {},
    data() {
      return {
        sysHeight: statusBarHeight,
      };
    },
    watch: {},
    mounted() {
      
    },
    methods: {}
  }
</script>

<style lang="scss">
  .mp-header {
    z-index: 0;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 344px;

    .logo-wrapper {
      height: 100%;
      padding: 0;

      .logo {
        width: 100%;
        height: 100%;

        image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
</style>