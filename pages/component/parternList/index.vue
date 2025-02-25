<template>
	<view class="height100">
		<view class="partern-list height100">
			<view class="task_wrapper height100">
				<scroll-view-page :noNeedComputed="false" :needExceptHeight="needExceptHeight"
					:noNeedHeight="parternList.length ? false : true">
					<view class="list borderRadius6 height100 whiteBg" v-if="parternList.length">
						<view class="item cardStyle" style="padding: 40rpx 40rpx 0;" v-for="(item, index) in parternList"
							:key="index">
							<view @click="getEmployeeDetails(item)">
								<view class="acea-row items-center">
									<image :src="computedAvatar(item)" mode="aspectFit" style="width: 112rpx;height: 112rpx;border-radius: 50%">
									</image>
									<view class="flex1 paddingLeft24">
										<view class="paddingBottom12 acea-row items-center">
											<view class="fontSize32 fontWeight550 colorBlack90">{{item.realname}}</view>
											<view class="fontSize24 fontWeight400 marginLeft12"
												style="padding: 8rpx;background: #E6EEFC;border-radius: 2rpx;color: #3E5CFF;" v-if="item.jobTitle">{{item.jobTitle}}
											</view>
										</view>
										<view class="paddingBottom16 fontSize22 fontWeight400 colorBlack65" v-if="item.companyName">{{item.companyName}}</view>
										<view class="fontSize28 fontWeight400 colorBlack65">{{item.phone}}</view>
									</view>
									<view class="relative">
										<image @tap.stop="openPopup(item, index)" src="../../../static/asset/矩形(9).png"
											style="width: 32rpx;height: 32rpx" mode="aspectFit">
										</image>
										<view class="absolute popupEdit" :style="'right: 0;z-index: 1;bottom:' + ((index == parternList.length - 1 && parternList.length != 1) ? '35rpx' : 'unset')" v-show="item.open">
											<view class="mask" @click.stop="closePopup(item)"></view>
											<view class="text-center"
												style="z-index: 999999;position: relative;">
												<view class="fontSize30 fontWeight400 colorBlack90 btn" @click.stop="getEmployeeDetails(item)"
													style="white-space: nowrap;">编辑</view>
												<view class="divider" style="margin: 0 32rpx;width: auto;"></view>
												<view class="fontSize30 fontWeight400 colorBlack90 btn" @click.stop="del(item)">删除</view>
											</view>
										</view>
									</view>
								</view>
							</view>
							<view class="divider marginTop40"></view>
						</view>
						<!-- <view class="loadingicon acea-row row-center-wrapper fontSize26 colorBlack90 fontWeight550 marginTop16"
							v-if="parternList.length > 0">
							<text class="loading iconfont icon-jiazai" :hidden="loading == false" @tap="next()"></text>
							<text @tap="next()">{{ loadTitle }}</text>
						</view> -->
					</view>
				</scroll-view-page>
				<view v-if="!parternList.length">
					<emptyPage :title="'暂无员工信息~'"></emptyPage>
				</view>
			</view>
		</view>
		<view class="noCart" v-if="parternList.length == 0 && page > 1">
			<view class="pictrue">
				<image src="@/static/image/noOrder.png"></image>
			</view>
		</view>

	</view>
</template>

<script>
	import ScrollViewPage from "@/components/scrollViewPage/index.vue"
	// import ProvideService from "@/components/provideService/index.vue"
	import {
		getEmployeeList
	} from '@/api/employee.js';
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
	import {
		IMG_HTTP_REQUEST_HEAD,
		IMG_REQUEST_URL,
	} from "@/config/app.js"
	export default {
		components: {
			emptyPage,
			// #ifdef MP
			authorize,
			// #endif
			ScrollViewPage,
		},
		data() {
			return {
				loading: false, //是否加载中
				loadend: false, //是否加载完毕
				loadTitle: '加载更多', //提示语
				parternList: [], //人员数组
				page: 1,
				limit: 10000,
				isAuto: false, //没有授权的不会自动授权
				isShowAuth: false, //是否隐藏授权
				header: [],
				needExceptHeight: [0, 43],
				inputValue: "",
				open: false
			};
		},
		props: {},
		computed: {
		...mapGetters(['isLogin']),
			computedAvatar(item) {
				return (item) => {
					try{
						return  IMG_HTTP_REQUEST_HEAD + IMG_REQUEST_URL + item.avatar
					}catch(e){
						//TODO handle the exception
					}
				}
			}
		},
		async mounted() {
			const res = await this.$util.getSelectorQueryInfo('.container_mini_header')
			this.needExceptHeight.push(res.height)
			
		},
		// onShow() {
		// 	if (this.isLogin) {
		// 		this.loadend = false
		// 		this.getEmployeeList(true);
		// 		// this.getUserInfo();
		// 	} else {
		// 		toLogin();
		// 	}
		// },
		methods: {
			openPopup(item, index) {
				item.open = true
				this.$forceUpdate()
			},
			closePopup(item) {
				item.open = false
				this.$forceUpdate()
			},
			del(item) {
				this.closePopup(item)
				uni.showModal({
					title: '提示',
					content: '是否删除改员工',
					success: (res) => {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			onLoadFun() {
				this.getEmployeeList();
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
			/**
			 * 去人员详情
			 */
			getEmployeeDetails: function(item) {
				if (!item.id)
					return this.$util.Tips({
						title: '缺少员工号无法查看详情'
					});
				// #ifdef MP
				this.closePopup(item)
				uni.showLoading({
					title: '正在加载'
				});
				uni.hideLoading();
				let obj = {
					id: item.id,
					realname: item.realname,
					avatar: item.avatar,
					phone: item.phone,
					post: item.post,
					companyName: item.companyName,
					jobTitle: item.jobTitle
				}
				uni.navigateTo({
					url: `/pages/services/editEmployee/index?${this.$util.convertObjectToString(obj)}`
				})
				// #endif
			},
			// 输入框查询事件，与原有的列表查询相区分，因为不需要叠加查询
			search(value) {
				this.loadend = false
				this.inputValue = value
				this.parternList.length = 0;
				this.page = 1
				this.getEmployeeList()
			},
			/**
			 * 切换类型
			 */
			statusClick: async function(status) {
				if (status == this.orderStatus) return;
				this.orderStatus = status;
				this.loadend = false;
				this.page = 1;
				this.$set(this, 'parternList', []);
				await this.getEmployeeList();
			},
			next() {
				this.page = this.page + 1
				this.getEmployeeList()
			},
			/**
			 * 获取订单列表
			 * @param {flag} boolean
			 * true为当前页面被唤醒使用时
			 * false为其他情况  
			 * @param {reachType} boolean
			 * true为下拉刷新时使用
			 * false为其他情况
			 */
			getEmployeeList: async function(flag = false, reachType = false) {
				let that = this;
				if (that.loadend) return;
				if (that.loading) return;
				that.loading = true;
				that.loadTitle = '加载更多';
				let param = {
					pageNo: this.page,
					pageSize: this.limit,
					realname: this.inputValue
				}
				await getEmployeeList(param)
					.then(res => {
						let list = res.data || [];
						if (!list.length) {
							this.$util.showToast({
								title: '没有新数据了哦',
								icon: 'error'
							})
						}
						let loadend = res.data.totalRow < that.limit;
						that.parternList = flag ? list : that.$util.SplitArray(list, that.parternList);
						that.parternList.forEach(item => {
							item.open = false
						})
						// that.$set(that, 'parternList', that.parternList);
						console.info(that.parternList)
						that.loadend = loadend;
						that.loading = false;
						that.loadTitle = loadend ? '' : '加载更多';
					})
					.catch(err => {
						that.loading = false;
						that.loadTitle = '加载更多';
					});
			},
		},
		onReachBottom: function() {
			this.getEmployeeList(false, true);
		}
	};
</script>

<style scoped lang="scss">
	.task_wrapper {

		&>view:not(:first-child) {
			padding: 32rpx;
		}

	}

	.partern-list .header {
		height: 512rpx;
		padding: 0 30rpx;
	}

	.partern-list .header .picTxt {
		height: 190rpx;
	}

	.partern-list .header .picTxt .text {
		color: rgba(255, 255, 255, 0.8);
		font-size: 26rpx;
		font-family: 'Guildford Pro';
	}

	.partern-list .header .picTxt .text .name {
		font-size: 34rpx;
		font-weight: bold;
		color: #fff;
		margin-bottom: 20rpx;
	}

	.partern-list .header .picTxt .pictrue {
		width: 122rpx;
		height: 109rpx;
	}

	.partern-list .header .picTxt .pictrue image {
		width: 100%;
		height: 100%;
	}

	.partern-list .nav .item {
		text-align: center;
		padding: 8rpx 0;
		font-size: 30rpx;
		font-weight: 550;
		color: rgba(255, 255, 255, 0.8);
		line-height: 30rpx;
	}

	.partern-list .nav .item.on {
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

	.partern-list .nav .item .num {
		margin-top: 18rpx;
	}

	.partern-list .list {}

	.partern-list .list .item {
		background-color: #fff;
		margin-bottom: 28rpx;
	}

	.partern-list .list .item .title {
		height: 84rpx;
		padding: 0 30rpx;
		border-bottom: 1rpx solid #eee;
		font-size: 28rpx;
		color: #282828;
	}

	.partern-list .list .item .title .sign {
		font-size: 24rpx;
		padding: 0 7rpx;
		height: 36rpx;
		margin-right: 15rpx;
	}

	.partern-list .list .item .item-info {
		padding: 0 30rpx;
		margin-top: 22rpx;
	}

	.partern-list .list .item .item-info .pictrue {
		width: 120rpx;
		height: 120rpx;
	}

	.partern-list .list .item .item-info .pictrue image {
		width: 100%;
		height: 100%;
		border-radius: 6rpx;
	}

	.partern-list .list .item .item-info .text {
		width: 486rpx;
		font-size: 28rpx;
		color: #999;
		margin-top: 6rpx;
	}

	.partern-list .list .item .item-info .text .name {
		width: 306rpx;
		color: #282828;
	}

	.partern-list .list .item .item-info .text .money {
		text-align: right;
	}

	.partern-list .list .item .item-info .text .refund {
		text-align: right;
		width: 100%;
		margin-top: 10rpx;
	}

	.partern-list .list .item .totalPrice {
		font-size: 26rpx;
		color: #282828;
		text-align: right;
		padding: 30rpx 30rpx 30rpx 0;
		border-bottom: 1rpx solid #eee;
	}

	.partern-list .list .item .totalPrice .money {
		font-size: 28rpx;
		font-weight: bold;
	}

	.partern-list .list .item .bottom {
		height: 107rpx;
		padding: 0 30rpx;
	}

	.partern-list .list .item .bottom .bnt {
		width: 176rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
		color: #fff;
		border-radius: 50rpx;
		font-size: 27rpx;
	}

	.partern-list .list .item .bottom .bnt.cancelBnt {
		border: 1rpx solid #ddd;
		color: #aaa;
	}

	.partern-list .list .item .bottom .bnt~.bnt {
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

	.popupEdit {
		background: #FFFFFF;
		box-shadow: 0rpx 2rpx 4rpx 0rpx rgba(0, 0, 0, 0.13);
		border-radius: 4rpx;
		border: 1rpx solid #E6E7F1;
	}
	.btn {
		padding: 32rpx;
	}
	.btnActive {
		color: #3958FF
	}
</style>