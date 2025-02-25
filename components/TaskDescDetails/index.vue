<template>
	<view>
		<view class="acea-row row-between row-middle marginBottom32">
			<view class="fontSize34 fontWeight600 colorBlack90 hiddenText">{{item.content}}</view>
		</view>
		<view class="divider"></view>
		<view class="marginTop32">
			<view class="fontSize30 fontWeight400 colorBlack65 center">
				<view>任务进度：{{item.progress || 0}}%</view>
				<view class="center">开始时间：{{dateFormatter(item.startTime)}}</view>
				<view>结束时间：{{dateFormatter(item.endTime)}}</view>
			</view>
		</view>
		<view class="divider marginBottom42"></view>
		<view class="fontSize28 fontWeight400 colorBlack70 acea-row row-between items-center">
			<view class="flex flex1" style="overflow: overlay;">
				<view style="width: 100rpx" class="acea-row row-column items-center" v-for="(user, userIndex) in item.userinfo" :key="userIndex">
					<image :src="computedAvatar(user) || '../../static/image/f.png'" mode="aspectFit"
						style="width: 48rpx;height: 48rpx;border-radius: 50%;"></image>
					<view class="fontSize30 fontWeight400 colorBlack65 userinfo" style="padding: 8rpx 8rpx 0 12rpx;width: 120rpx">{{user.realname}}</view>
					<!-- <text class="fontSize30 fontWeight400 colorBlack65">{{item.userinfo.jobTitle || ""}}</text> -->
				</view>
			</view>
			<view class="fontSize24 fontWeight400" :style="'color:' + color">{{stateFilter(item.status)}}</view>
		</view>
	</view>
</template>

<script>
	import dayjs from 'dayjs';
	import {
		mapGetters
	} from "vuex"
	// 运输卡片共用组件
	import {
		IMG_HTTP_REQUEST_HEAD,
		IMG_REQUEST_URL
	} from "@/config/app.js"
	export default {
		name: 'TransferDetails',
		props: {
			item: {
				type: Object,
				default: () => {}
			},
			stateList: {
				type: Array
			}
		},
		data() {
			return {
				color: ""
			}
		},
		filters: {
			
		},
		async mounted() {
			switch (this.item.status) {
				case "0":
					this.color = "#FF6A1F"
					break;
				case "1":
					this.color = "#2E6CF5"
					break;
				case "2":
					this.color = "#0FB325;"
					break;
			}
		},
		computed: {
			...mapGetters(["postArray"]),
			dateFormatter() {
				return (item) => {
					return item ? dayjs(item).format("MM月DD日 HH:mm") : "暂未设置"
				}
			},
			computedAvatar(item) {
				return (item) => {
					try {
						return IMG_HTTP_REQUEST_HEAD + IMG_REQUEST_URL + item.avatar
					} catch(e) {
						
					}
				}
			}
		},
		methods: {
			stateFilter(item) {
				try{
					return this.stateList.find(cb => cb.itemValue == item).itemText
				}catch(e){
					//TODO handle the exception
				}
			},
			formatterCountryName(port) {
				try {
					return this.postArray.find(item => item.name == port).country
				} catch (e) {
					//TODO handle the exception
				}
			},
			copy($event, id) {
				$event.stopPropagation()
				uni.setClipboardData({
					data: id
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.center {
		font-size: 30rpx;
		font-weight: 400;
		color: rgba(0, 0, 0, 0.65);
		margin: 24rpx 0;
	}
	.userinfo {
		text-align: center;
	}
	.userinfo+.userinfo {
		margin-left: 10rpx;
	}
</style>