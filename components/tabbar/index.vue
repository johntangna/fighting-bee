<template>
  <view :key="delta">
    <view class="uni-tabbar acea-row row-around row-middle">
      <view class="uni-tabbar_item" v-for="(item,index) in (isAdmin ? serviceTabbar : userTabbar)" :key="item.name" @tap="($event, item) => changeTab(index, item)">
        <view class="uni-tabbar_icon">
          <image v-if="item.link == pagePath" mode="aspectFit" :src="item.imgList[0]" class="tabActive"></image>
          <image v-else mode="aspectFit" :src="item.imgList[1]"></image>
        </view>
        <view class="uni-tabbar_label marginTop9" :class="{'active': item.link == pagePath}">
          {{item.name}}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  let app = getApp();
  import {
    mapGetters
  } from "vuex"
  export default {
    name: 'tabBar',
    props: {
      pagePath: null,
    },
    watch: {},
    data() {
      return {
        name: this.$options.name,
        page: '/pages/home/index',
        userTabbar: [{
            name: "首页",
            link: '/pages/home/index',
            imgList: [
              "/static/image/home_selected.png",
              "/static/image/home.png"
            ]
          },
          {
            name: "课程",
            link: '/pages/course/index',
            imgList: [
              "/static/image/course_selected.png",
              "/static/image/course.png"
            ]
          },
					{
					  name: "练习",
					  link: '/pages/course/index',
					  imgList: [
					    "/static/image/pratice_selected.png",
					    "/static/image/pratice.png"
					  ]
					},
					{
					  name: "我的",
					  link: '/pages/user/index',
					  imgList: [
					    "/static/image/mine_selected.png",
					    "/static/image/mine.png"
					  ]
					}
        ],
        delta: 0, //使用key强制刷新页面
      };
    },
    created() {

    },
    mounted() {

    },
    onShow() {

    },
    methods: {
      changeTab(index, item) {
        let result = this.userTabbar
        this.page = result.find((item, itemIndex) => itemIndex == index).link;
        // 这里使用reLaunch关闭所有的页面，打开新的栏目页面
        uni.reLaunch({
          url: this.page
        });
      },
    }
  }
</script>

<style lang="scss" scoped>
  .borderShow {
    position: fixed;
  }

  .borderShow .uni-tabbar::after {
    content: ' ';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    border: 1px dashed #007AFF;
    box-sizing: border-box;
  }

  .uni-tabbar {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 9999;
    width: 100%;
    height: 126rpx;
    height: calc(126rpx+ constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
    height: calc(126rpx + env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
    padding-bottom: calc(constant(safe-area-inset-bottom)); ///兼容 IOS<11.2/
    padding-bottom: calc(env(safe-area-inset-bottom)); ///兼容 IOS>11.2/
    box-sizing: border-box;
    border-top: solid 1rpx #F3F3F3;
    background: rgba($color: #fff, $alpha: 0.95);
    box-shadow: 0px 0px 17rpx 1rpx rgba(206, 206, 206, 0.32);

    .uni-tabbar_item {
      font-size: 20rpx;
      text-align: center;
    }

    .uni-tabbar_icon {
      height: 50rpx;
      width: 50rpx;
      text-align: center;
      margin: 0 auto;

      image {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }

      .tabActive {
        transform: scale(1);
      }
    }

    .uni-tabbar_label {
      font-size: 22rpx;
      color: #ADADAD;
      font-weight: 600;

      &.active {
        color: #333;
      }
    }
  }
</style>