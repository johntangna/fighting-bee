<template>
  <view class="scroll container_content" :style="'height:'+ scrollHeight">
    <slot></slot>
  </view>
</template>

<script>
  export default {
    name: "ScrollArea",
    props: {
      needExceptHeight: {
        type: Array,
        default: () => [0]
      }
    },
    watch: {
      needExceptHeight: {
        handler(newV) {
          try{
            this.height = newV.reduce((prev, next) => prev + next)
            const safeAreaBottom = uni.getSystemInfoSync().safeAreaInsets.bottom
            console.info(this.height)
            this.scrollHeight = `calc(100% - ${this.height+safeAreaBottom}rpx)`
          }catch(e){
            //TODO handle the exception
          }
        },
        deep: true,
        immediate: true
      }
    },
    data() {
      return {
        height: 0,
        scrollHeight: 0
      }
    },
    mounted() {
      
    }
  }
</script>

<style lang="scss" scoped>
  .scroll {
    overflow: overlay;
  }
</style>