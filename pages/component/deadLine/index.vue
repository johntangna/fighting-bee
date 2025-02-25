<template>
	<view class="dead_line">
		<view class="marginBottom32 fontSize34 fontWeight600 colorRed90 text-center ">到期预警</view>
		<view class="order_wrapper height100">
			<scroll-view-page :noNeedComputed="false" :needExceptHeight="needExceptHeight" :needBottomSafe="false"
				:noNeedHeight="taskList.length ? false : true">
				<view class="list" v-if="taskList.length">
					<view class="item cardStyle borderRadius16 whiteBg" v-for="(item, index) in taskList" :key="index">
						<view @click="getDetails(item.id, isAdmin)" class="width100 padding32 acea-row items-center row-between bgColorLightGrey">
							<!-- <view class="borderRadius6">
								<view class="acea-row fontSize32 fontWeight550 colorBlack90 paddingBottom34">
									<text >{{item.content}}</text>
									<text class="paddingLeft12">任务即将到期</text>
								</view>
								<view class="acea-row items-center">
									<image src="../../../static/image/我的_选中.png" mode="aspectFit" style="width: 40rpx;height: 40rpx;"></image>
									<text class="fontSize30 fontWeight400 colorBlack65" style="padding: 0 8rpx 0 12rpx;">{{item.name}}</text>
									<text class="fontSize30 fontWeight400 colorBlack65">{{item.job}}</text>
								</view>
							</view> -->
							<view class="borderRadius6 flex1" style="width: 90%;">
								<view style="width: 100%;white-space: nowrap;overflow: overlay;" class="paddingBottom34 fontSize32 fontWeight550 colorBlack90">{{item.content}}任务即将到期</view>
								<view class="fontSize30 fontWeight400 colorBlack65">{{computedTime(item)}}</view>
							</view>
							<uni-icons style="text-align: right;" type="forward" color="#191919" size="18"></uni-icons>
						</view>
					</view>
				</view>
			</scroll-view-page>
			<view v-if="!taskList.length">
				<emptyPage :title="'暂无到期任务~'"></emptyPage>
			</view>
		</view>
	</view>
</template>

<script>
	import ScrollViewPage from "@/components/scrollViewPage/index.vue"
	import EmptyPage from "@/components/emptyPage/index.vue"
	import { deadLineList } from "@/api/public.js"
	import { DEADLINE_EXPIRE,DEADLINE_EXPIRE_ADMIN } from "@/config/app.js"
	import dayjs from "dayjs"
  import {
    mapGetters
  } from "vuex"
	export default {
		name: "DeadLine",
		props: {
		},
		components: {
			ScrollViewPage,
			EmptyPage,
		},
		computed: {
			computedTime(item) {
				return (item) => {
					return `${dayjs(item.startTime).format("YYYY-MM-DD")} 至 ${dayjs(item.endTime).format("YYYY-MM-DD")}`
				}
			},
      ...mapGetters(["isAdmin"])
		},
		watch: {

		},
		onLoad(options) {},
		onShow() {},
		data() {
			return {
				taskList: [
				],
				needExceptHeight: [13]
			}
		},
		methods: {
			getDetails(id, isAdmin) {
				if (!id)
				  return this.$util.Tips({
				    title: '缺少任务号无法查看任务详情'
				  });
				// #ifdef MP
				uni.showLoading({
				  title: '正在加载'
				});
				uni.hideLoading();
				uni.navigateTo({
				  url: `/pages/services/taskDetails/index?id=${id}&isAdmin=${isAdmin}`
				})
				// #endif
			},
			/**
			 * 获取列表
			 * @param {flag} boolean
			 * true为当前页面被唤醒使用时
			 * false为其他情况  
			 * @param {reachType} boolean
			 * true为下拉刷新时使用
			 * false为其他情况
			 */
			deadLineList: async function() {
				await deadLineList()
					.then(res => {
						this.taskList = res.data
						if (this.taskList.length) {
							if (this.$Cache.get("DEADLINE")) {
								if (new Date().getTime() - this.$Cache.get("DEADLINE") > (this.isAdmin ? DEADLINE_EXPIRE_ADMIN : DEADLINE_EXPIRE)) {
									this.$emit("openDeadLine")
								}
							} else {
								this.$emit("openDeadLine")
							}
						}
					})
			}
		},
		async mounted() {
			this.deadLineList()
		}

	}
</script>

<style scoped lang="scss">
	.dead_line {
		padding: 40rpx;
		width: 640rpx;
		height: 720rpx;
		.list {
			.item + .item {
				margin-top: 16rpx;
			}
		}
	}
</style>