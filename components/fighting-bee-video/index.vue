<template>
	<view class="video-container">
		<video ref="fightingBeeVideo" id="myVideo" src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4"
			@timeupdate="checkPlayTime" controls></video>
		<div v-if="showPayTip" class="pay_tip">
			<p>试看已结束，请付费购买资料（视频为赠送部分）</p>
			<u-button @click="submit" type="primary" throttleTime="1000">付费观看</u-button>
		</div>
		<!-- 倍速选择菜单（鼠标悬停显示） -->
		<view class="speed-control" v-show="showSpeedMenu" @mouseenter="cancelHide" @mouseleave="delayHide">
			<button v-for="rate in speedOptions" :key="rate" @click="changeSpeed(rate)"
				:class="{ active: rate === currentSpeed }">
				{{ rate }}x
			</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: "FightingBeeVideo",
		components: {},
		props: {},
		computed: {},
		watch: {

		},
		onLoad(options) {},
		onShow() {},
		data() {
			return {
				showPayTip: false,
				hasPaid: false,
				currentSpeed: 1.0, // 默认倍速
				speedOptions: [0.5, 1.0, 1.5, 2.0], // 倍速选项
				showSpeedMenu: false, // 控制菜单显示
				hideTimer: null, // 记录定时器
			}
		},
		methods: {
			// 切换倍速
			changeSpeed(rate) {
				// #ifdef MP
				this.$nextTick(() => {
					const videoContext = uni.createVideoContext("#myVideo", this)
					videoContext.playbackRate(rate)
					this.currentSpeed = rate
				})
				// #endif

				// #ifdef H5
				const video = this.$refs.fightingBeeVideo;
				if (video) {
					video.playbackRate = rate;
					this.currentSpeed = rate;
				}
				// #endif
			},
			// 触摸开始时显示菜单
			showMenu() {
				this.showSpeedMenu = true;
			},
			// 触摸结束后延迟隐藏
			delayHide() {
				this.hideTimer = setTimeout(() => {
					this.showSpeedMenu = false;
				}, 1000); // 1 秒后隐藏
			},
			// 触摸开始时取消隐藏
			cancelHide() {
				if (this.hideTimer) {
					clearTimeout(this.hideTimer);
					this.hideTimer = null;
				}
			},
			checkPlayTime(event) {
				const currentTime = event.detail.currentTime
				console.log("当前播放时间:", currentTime);
				this.$nextTick(() => {
					// #ifdef MP
					const videoContext = uni.createVideoContext("#myVideo", this)
					if (!this.hasPaid && currentTime >= 5) {
						videoContext.pause();
						this.showPayTip = true;
					}
					// #endif

					// #ifdef H5
					const videoRef = this.$refs.fightingBeeVideo
					if (!this.hasPaid && videoRef.currentTime >= 60) {
						videoRef.pause()
						this.showPayTip = true
					}
					// #endif
				})
			},
		},
		mounted() {}

	}
</script>

<style scoped lang="scss">
	.video-container {
		position: relative;
		max-width: 600px;
		margin: auto;
	}

	/* 倍速选择菜单 */
	.speed-control {
		position: absolute;
		bottom: 10px;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
		background: rgba(0, 0, 0, 0.6);
		padding: 5px;
		border-radius: 5px;
		transition: opacity 0.3s ease-in-out;
	}

	.speed-control button {
		color: white;
		background: transparent;
		border: none;
		padding: 5px 10px;
		font-size: 14px;
		cursor: pointer;
	}

	.speed-control button.active {
		color: yellow;
		font-weight: bold;
	}
</style>