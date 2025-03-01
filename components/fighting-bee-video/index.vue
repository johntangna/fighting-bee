<template>
	<view class="video-container">
		<video ref="fightingBeeVideo" id="myVideo" src="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/2minute-demo.mp4"
		@timeupdate="checkPlayTime"	controls></video>
		<div v-if="showPayTip" class="pay_tip">
			<p>试看已结束，请付费购买资料（视频为赠送部分）</p>
			<u-button @click="submit" type="primary" throttleTime="1000">付费观看</u-button>
		</div>
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
			}
		},
		methods: {
			checkPlayTime() {
				const videoRef = this.$refs.fightingBeeVideo
				if (!this.hasPaid && videoRef.currentTime >= 60) {
					videoRef.pause()
					this.showPayTip = true
				}
			},
			submit() {
				this.showPayTip = false
				this.hasPaid = true
				this.$refs.fightingBeeVideo.play()
			}
		},
		mounted() {}

	}
</script>

<style scoped lang="scss">
</style>