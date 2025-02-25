<template>
  <view class="acea-row row-between padding32">
    <text class="fontWeight600 fontSize34 colorBlack">{{title}}</text>
    <view @tap="action" class="acea-row items-center">
      <image :src="imageSrc" mode="aspectFill" style="width: 39rpx;height: 51rpx;margin-right: 14rpx;"></image>
      <text class="blueText fontSize28 fontWeight600">{{actionTitle}}</text>
    </view>
  </view>
</template>

<script>
  export default {
    name: 'HeadTitle',
    props: {
      title: {
        type: String
      },
      actionTitle: {
        type: String
      },
      imageSrc: {
        type: String
      }
    },
    methods: {
      action() {
        this.$emit("action")
      }
    }
  }
</script>

<style>
</style>