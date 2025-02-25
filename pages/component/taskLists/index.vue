<template>
	<view class="height100">
		<view class="task-details height100">
			<view class="task_wrapper height100">
				<scroll-view-page :noNeedComputed="false" :needExceptHeight="needExceptHeight"
					:noNeedHeight="taskList.length ? false : true">
					<view class="list" v-if="taskList.length">
						<view class="item cardStyle borderRadius16 whiteBg padding40" v-for="(item, index) in taskList"
							:key="index">
							<view @click="getTaskDetails(item.id)">
								<TaskDescDetails :stateList="stateList" :item="item"></TaskDescDetails>
							</view>
						</view>
					</view>
					<view class="loadingicon acea-row row-center-wrapper fontSize26 colorBlack90 fontWeight550"
						v-if="taskList.length > 0">
						<text class="loading iconfont icon-jiazai" :hidden="loading == false" @tap="next()"></text>
						<text @tap="next()">{{ loadTitle }}</text>
					</view>
				</scroll-view-page>
				<view v-if="!taskList.length">
					<emptyPage :title="'暂无任务~'"></emptyPage>
				</view>
			</view>
		</view>
		<view class="noCart" v-if="taskList.length == 0 && page > 1">
			<view class="pictrue">
				<image src="@/static/image/noOrder.png"></image>
			</view>
		</view>
	</view>
</template>

<script>
	import ScrollViewPage from "@/components/scrollViewPage/index.vue"
	import TaskDescDetails from "@/components/TaskDescDetails/index.vue"
	import Input from "@/components/input/index.vue"
	// import ProvideService from "@/components/provideService/index.vue"
	import {
		getUserInfo,
		myOrder
	} from '@/api/user.js';
	import {
		toLogin
	} from '@/libs/login.js';
	import {
		mapGetters
	} from 'vuex';
	// #ifdef MP
	import authorize from '@/components/Authorize';
	// #endif
	import emptyPage from '@/components/emptyPage/index.vue';
	import { myTask } from "@/api/user.js"
	import { getTaskListAdmin } from "@/api/taskCenter.js"
	const app = getApp()
	export default {
		components: {
			emptyPage,
			// #ifdef MP
			authorize,
			// #endif
			ScrollViewPage,
			TaskDescDetails,
			Input
		},
		props: {
			stateList: {
				type: Array
			}
		},
		data() {
			return {
				loading: false, //是否加载中
				loadend: false, //是否加载完毕
				loadTitle: '加载更多', //提示语
				page: 1,
				limit: 20,
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				header: [],
				needExceptHeight: [0, 33],
				inputValue: "",
				taskList: [],
				mutiState: ""
			};
		},
		computed: mapGetters(['isLogin', 'isAdmin', 'userId']),
		created() {
			
		},
		async mounted() {
			const res = await this.$util.getSelectorQueryInfo('.container_mini_header')
			this.needExceptHeight.push(res.height)
			
		},
		onShow() {
			
		},
		methods: {
			init() {
				this.loadend = false
				this.getTaskList(true)
			},
			onLoadFun() {
				this.getOrderList();
				this.getUserInfo();
			},
			// 授权关闭
			authColse: function(e) {
				this.isShowAuth = e;
			},
			/**
			 * 事件回调
			 *
			 */
			onChangeFun: function(e) {
				let opt = e;
				let action = opt.action || null;
				let value = opt.value != undefined ? opt.value : null;
				action && this[action] && this[action](value);
			},
			/**
			 * 获取用户信息
			 *
			 */
			getUserInfo: function() {
				let that = this;
				getUserInfo().then(res => {});
			},
			/**
			 * 生命周期函数--监听页面加载
			 */
			onLoad: function(options) {

			},
			// 状态查询
			stateOrderSearch(value){
			  this.loadend = false
			  this.mutiState = value
			  this.taskList.length = 0;
			  this.page = 1
			  this.getTaskList()
			},
			// 输入框查询事件，与原有的列表查询相区分，因为不需要叠加查询
			search(value) {
			  this.loadend = false
			  this.inputValue = value
			  this.taskList.length = 0;
			  this.page = 1
			  this.getTaskList()
			},
			next() {
			  this.page = this.page + 1
			  this.getTaskList()
			},
			/**
			 * 获取任务列表
			 * @param {flag} boolean
			 * true为当前页面被唤醒使用时
			 * false为其他情况  
			 * @param {reachType} boolean
			 * true为下拉刷新时使用
			 * false为其他情况
			 */
			getTaskList: async function(flag = false, reachType = false) {
			  let that = this;
			  if (that.loadend) return;
			  if (that.loading) return;
			  that.loading = true;
			  that.loadTitle = '加载更多';
				let queryFunction = this.isAdmin == 0 ? myTask : getTaskListAdmin
			  await queryFunction(this.$util.serviceOrderQueryString(this.mutiState, this.page, this.limit
			  ,this.inputValue, this.userId))
			    .then(res => {
			      let list = res.data.records || [];
			      if (!list.length) {
			        this.$util.showToast({title: '没有新数据了哦', icon: 'error'})
			      }
			      let loadend = res.data.totalRow < that.limit;
			      that.taskList = flag ? list : that.$util.SplitArray(list, that.taskList);
			      that.$set(that, 'taskList', that.taskList);
			      that.loadend = loadend;
			      that.loading = false;
			      that.loadTitle = loadend ? '' : '加载更多';
			    })
			    .catch(err => {
			      that.loading = false;
			      that.loadTitle = '加载更多';
			    });
			},
			/**
			 * 去订单详情
			 */
			getTaskDetails: function(id) {
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
					url: `/pages/services/taskDetails/index?id=${id}`
				})
				// #endif
			},
		},
		onReachBottom: function() {
			this.getOrderList(false, true);
		}
	};
</script>

<style scoped lang="scss">
	.task_wrapper {

		&>view:not(:first-child) {
			padding: 32rpx;
		}

		&>view {
			margin-bottom: 28rpx;
		}
	}

	.task-details .header {
		height: 512rpx;
		padding: 0 30rpx;
	}

	.task-details .header .picTxt {
		height: 190rpx;
	}

	.task-details .header .picTxt .text {
		color: rgba(255, 255, 255, 0.8);
		font-size: 26rpx;
		font-family: 'Guildford Pro';
	}

	.task-details .header .picTxt .text .name {
		font-size: 34rpx;
		font-weight: bold;
		color: #fff;
		margin-bottom: 20rpx;
	}

	.task-details .header .picTxt .pictrue {
		width: 122rpx;
		height: 109rpx;
	}

	.task-details .header .picTxt .pictrue image {
		width: 100%;
		height: 100%;
	}

	.task-details .nav .item {
		text-align: center;
		padding: 8rpx 0;
		font-size: 30rpx;
		font-weight: 550;
		color: rgba(255, 255, 255, 0.8);
		line-height: 30rpx;
	}

	.task-details .nav .item.on {
		color: #fff;
		position: relative;

		&::after {
			content: '';
			height: 8rpx;
			width: 32rpx;
			position: absolute;
			bottom: -8rpx;
			left: 50%;
			background-color: #fff;
			border-radius: 4rpx;
			border-top-left-radius: 2px;
			border-top-right-radius: 2px;
			border-bottom-right-radius: 2px;
			border-bottom-left-radius: 2px;
			transform: translateX(-50%);
		}
	}

	.task-details .nav .item .num {
		margin-top: 18rpx;
	}

	.task-details .list {}

	.task-details .list .item {
		background-color: #fff;
		margin-bottom: 28rpx;
	}

	.task-details .list .item .title {
		height: 84rpx;
		padding: 0 30rpx;
		border-bottom: 1rpx solid #eee;
		font-size: 28rpx;
		color: #282828;
	}

	.task-details .list .item .title .sign {
		font-size: 24rpx;
		padding: 0 7rpx;
		height: 36rpx;
		margin-right: 15rpx;
	}

	.task-details .list .item .item-info {
		padding: 0 30rpx;
		margin-top: 22rpx;
	}

	.task-details .list .item .item-info .pictrue {
		width: 120rpx;
		height: 120rpx;
	}

	.task-details .list .item .item-info .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 6rpx;
	}

	.task-details .list .item .item-info .text {
		width: 486rpx;
		font-size: 28rpx;
		color: #999;
		margin-top: 6rpx;
	}

	.task-details .list .item .item-info .text .name {
		width: 306rpx;
		color: #282828;
	}

	.task-details .list .item .item-info .text .money {
		text-align: right;
	}

	.task-details .list .item .item-info .text .refund {
		text-align: right;
		width: 100%;
		margin-top: 10rpx;
	}

	.task-details .list .item .totalPrice {
		font-size: 26rpx;
		color: #282828;
		text-align: right;
		padding: 30rpx 30rpx 30rpx 0;
		border-bottom: 1rpx solid #eee;
	}

	.task-details .list .item .totalPrice .money {
		font-size: 28rpx;
		font-weight: bold;
	}

	.task-details .list .item .bottom {
		height: 107rpx;
		padding: 0 30rpx;
	}

	.task-details .list .item .bottom .bnt {
		width: 176rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		color: #fff;
		border-radius: 50rpx;
		font-size: 27rpx;
	}

	.task-details .list .item .bottom .bnt.cancelBnt {
		border: 1rpx solid #ddd;
		color: #aaa;
	}

	.task-details .list .item .bottom .bnt~.bnt {
		margin-left: 17rpx;
	}

	.noCart {
		margin-top: 171rpx;
		padding-top: 0.1rpx;
	}

	.noCart .pictrue {
		width: 414rpx;
		height: 336rpx;
		margin: 78rpx auto 56rpx auto;
	}

	.noCart .pictrue image {
		width: 100%;
		height: 100%;
	}

	.line2 {
		word-break: break-all;
	}
</style>