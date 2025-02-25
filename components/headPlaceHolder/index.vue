<template>
  <view class="head_place_holder">
    <view class="sys-head" :style="{height:sysHeight}"></view>
  </view>
</template>

<script>
	// 头部占位符共用组件
  let statusBarHeight = uni.getSystemInfoSync().statusBarHeight + 'px';
  export default {
    data() {
      return {
        sysHeight: statusBarHeight,
      };
    },
    mounted() {
    }
  }
</script>

<style lang="scss">
  .head_place_holder {
    position: relative;
    width: 100%;
    left: 0;
    top: 0;
  }
</style>