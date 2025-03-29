<template>
	<view class="container_mini">
		<view class="darkBg container_mini_header">
			<HeadPlaceHolder></HeadPlaceHolder>
			<view class="darkBg uni-flex">
				<image src="/static/image/未标题-1.png" mode="aspectFit" style="width: 70px;height: 45px;border-radius: 20rpx;">
				</image>
				<text class="header_title">墨铃铛教育</text>
			</view>
			<view class="search_header">
				<uni-easyinput class="search_input" suffixIcon="search" v-model="value" placeholder="搜索课程" borderRadius={true}
					width="92%" padding="30rpx 0" :styles="inputStyles" @iconClick="iconClick" suffixIconColor="rgba(255, 255, 255, 0.6)" :whiteText="true"></uni-easyinput>
			</view>
		</view>
		<!-- <view class="task_list_wrapper height100">
			<TaskLists ref="taskList" :stateList="stateList"></TaskLists>
		</view> -->
		<FightingBeeVideo></FightingBeeVideo>
		<Tabbar :pagePath="'/pages/home/index'"></Tabbar>
	</view>
</template>

<script>
	import HeadPlaceHolder from "@/components/headPlaceHolder/index.vue"
	import Tabbar from "@/components/tabbar/index.vue"
	import TaskLists from "@/pages/component/taskLists/index.vue"
	import FightingBeeVideo from "@/components/fighting-bee-video/index.vue"
	import {
		mapGetters
	} from "vuex"
	export default {
		components: {
			HeadPlaceHolder,
			Tabbar,
			TaskLists,
			FightingBeeVideo
		},
		data() {
			return {
				mutiState: [],
				stateList: [],
				inputStyles: {
					color: "rgba(255, 255, 255, 0.6)",
					backgroundColor: "rgba(255, 255, 255, 0.1)",
					disableColor: '#F7F6F6',
					borderColor: "rgba(255, 255, 255, 0.1)",
				}
			};
		},
		props: {},
		async mounted() {
			// this.$refs.popup.open("center")
		},
		onShow() {

			this.$refs.taskList.init()
		},
		methods: {
			goDistributeTask() {
				uni.navigateTo({
					url: `/pages/services/distributeTask/index`
				})
			},
			openDeadLine() {
				this.$refs.popup.open("center")
			},
			closeDeadLine() {
				this.$Cache.set("DEADLINE", new Date().getTime())
				this.$refs.popup.close()
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e;
			},
			/**
			 * 生命周期函数--监听页面加载
			 */
			onLoad: function(options) {
				if (options.status) {
					const {
						status,
						type
					} = options

				}

			},
			getTaskList(v) {
				this.$refs.taskList.stateOrderSearch(v)
			},
			getTaskListByName(v) {
				this.$refs.taskList.search(v)
			}
		},
	};
</script>

<style scoped lang="scss">
	.header_title {
		font-family: "katong";
		font-size: 32rpx;
		font-weight: bold;
		color: #ffd200;
	}
	.task_list_wrapper {
		padding: 32rpx;

		&>view:not(:first-child) {
			padding: 32rpx;
		}

		&>view {
			margin-bottom: 28rpx;
		}
	}

	.search_header {
		background-color: #4b2802;
	}
</style>