<template>
	<view class="empty-box relative" :style="'margin-top: ' + marginTop + 'rpx'">
		<image :src="src" mode="aspectFit"></image>
		<view class="txt">{{title}}</view>
	</view>
</template>

<script>
	export default{
		props: {
			title: {
				type: String,
				default: '暂无记录',
			},
      src: {
        type: String,
        default: '../../static/image/empty-box.png'
      },
			marginTop: {
				type: Number,
				default: 200
			}
		},
	}
	
</script>

<style lang="scss">
	.empty-box{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		image{
			width: 200rpx;
			height: 200rpx;
		}
		.txt{
			font-size: 30rpx;
			font-weight: 400;
			color: rgba(0,0,0,0.7);
      margin-top: 24rpx;
		}
	}
</style>
