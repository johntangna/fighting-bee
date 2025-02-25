<template>
	<view class="container_mini">
		<view class="whiteBg container_mini_header">
			<HeadPlaceHolder></HeadPlaceHolder>
			<view class="marginTop44">
				<HeadTitle title="人员管理" imageSrc="../../static/asset/矩形(10).png" actionTitle="新增"
					@action="goEditEmployee"></HeadTitle>
			</view>
			<StateHeader :showStateCondition="false" placeholder='请输入姓名' @getTaskListByName="getTaskListByName">
			</StateHeader>
		</view>
		<view class="height100 padding32">
			<ParternList ref="ParternList"></ParternList>
		</view>
		<Tabbar :pagePath="'/pages/service/employeeManager/index'"></Tabbar>
	</view>
</template>

<script>
	import HeadPlaceHolder from "@/components/headPlaceHolder/index.vue"
	import StateHeader from "@/pages/component/stateHeader/index.vue"
	import ParternList from "@/pages/component/parternList/index.vue"
	import HeadTitle from "@/components/headTitle/index.vue"
	import {
		toLogin
	} from '@/libs/login.js';
	import {
		mapGetters
	} from 'vuex';
	import Tabbar from "@/components/tabbar/index.vue"
	export default {
		components: {
			HeadPlaceHolder,
			StateHeader,
			ParternList,
			Tabbar,
			HeadTitle
		},
		data() {
			return {
				loading: false, //是否加载中
				loadend: false, //是否加载完毕
				loadTitle: '加载更多', //提示语
				orderList: [], //订单数组
				orderStatus: 0, //订单状态
				orderType: 0, //订单类型 0为询单，1为订单
				page: 1,
				limit: 20,
				pay_close: false,
				pay_order_id: '',
				totalPrice: '0',
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				header: [],
				inputValue: ''
			};
		},
		props: {},
		computed: mapGetters(['isLogin']),
		mounted() {

		},
		onShow() {
			this.loadend = false
			// this.getOrderList(true);
			this.$refs.ParternList.getEmployeeList(true);
		},
		methods: {
			getTaskListByName(v) {
				this.$refs.ParternList.search(v)
			},
			goEditEmployee() {
				uni.navigateTo({
					url: `/pages/services/editEmployee/index`
				})
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
		},
	};
</script>

<style scoped lang="scss">
	.order_wrapper {
		padding: 28rpx;

		&>view:not(:first-child) {
			padding: 32rpx;
		}

		&>view {
			margin-bottom: 28rpx;
		}
	}

	.my-order .header {
		height: 512rpx;
		padding: 0 30rpx;
	}

	.my-order .header .picTxt {
		height: 190rpx;
	}

	.my-order .header .picTxt .text {
		color: rgba(255, 255, 255, 0.8);
		font-size: 26rpx;
		font-family: 'Guildford Pro';
	}

	.my-order .header .picTxt .text .name {
		font-size: 34rpx;
		font-weight: bold;
		color: #fff;
		margin-bottom: 20rpx;
	}

	.my-order .header .picTxt .pictrue {
		width: 122rpx;
		height: 109rpx;
	}

	.my-order .header .picTxt .pictrue image {
		width: 100%;
		height: 100%;
	}

	.my-order .nav .item {
		text-align: center;
		padding: 8rpx 0;
		font-size: 30rpx;
		font-weight: 550;
		color: rgba(255, 255, 255, 0.8);
		line-height: 30rpx;
	}

	.my-order .nav .item.on {
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

	.my-order .nav .item .num {
		margin-top: 18rpx;
	}

	.my-order .list {}

	.my-order .list .item {
		background-color: #fff;
		margin-bottom: 28rpx;
	}

	.my-order .list .item .title {
		height: 84rpx;
		padding: 0 30rpx;
		border-bottom: 1rpx solid #eee;
		font-size: 28rpx;
		color: #282828;
	}

	.my-order .list .item .title .sign {
		font-size: 24rpx;
		padding: 0 7rpx;
		height: 36rpx;
		margin-right: 15rpx;
	}

	.my-order .list .item .item-info {
		padding: 0 30rpx;
		margin-top: 22rpx;
	}

	.my-order .list .item .item-info .pictrue {
		width: 120rpx;
		height: 120rpx;
	}

	.my-order .list .item .item-info .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 6rpx;
	}

	.my-order .list .item .item-info .text {
		width: 486rpx;
		font-size: 28rpx;
		color: #999;
		margin-top: 6rpx;
	}

	.my-order .list .item .item-info .text .name {
		width: 306rpx;
		color: #282828;
	}

	.my-order .list .item .item-info .text .money {
		text-align: right;
	}

	.my-order .list .item .item-info .text .refund {
		text-align: right;
		width: 100%;
		margin-top: 10rpx;
	}

	.my-order .list .item .totalPrice {
		font-size: 26rpx;
		color: #282828;
		text-align: right;
		padding: 30rpx 30rpx 30rpx 0;
		border-bottom: 1rpx solid #eee;
	}

	.my-order .list .item .totalPrice .money {
		font-size: 28rpx;
		font-weight: bold;
	}

	.my-order .list .item .bottom {
		height: 107rpx;
		padding: 0 30rpx;
	}

	.my-order .list .item .bottom .bnt {
		width: 176rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		color: #fff;
		border-radius: 50rpx;
		font-size: 27rpx;
	}

	.my-order .list .item .bottom .bnt.cancelBnt {
		border: 1rpx solid #ddd;
		color: #aaa;
	}

	.my-order .list .item .bottom .bnt~.bnt {
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