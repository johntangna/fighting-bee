<script>
	import {
		checkLogin
	} from './libs/login';
	import {
		HTTP_REQUEST_URL
	} from './config/app';
	import {
		silenceAuth
	} from '@/api/public';
	import {
		getAllDic
	} from "@/api/dictionary.js"
	import {
		portsList,
		countryList
	} from "@/api/user.js"
	import Routine from '@/libs/routine.js';
	export default {
		globalData: {
			spid: 0,
			code: 0,
			isLogin: false,
			userInfo: {
				createTime: 0,
				isAdmin: -1, // 是否为管理员,给-1是想不要显示初始化页面
				openId: "",
				session_key: "", // 微信session_key，用来获取客户的头像
				departIds: "",
				id: "",
				delFlag: 0,
				status: 0,
				username: "", // 用户昵称
				token: "" ,// 后端token
				selectRoomList: "",
        id: ""
			},
			MyMenus: [],
			globalData: false,
			isIframe: false,
			tabbarShow: true
		},
		data() {
			return {
				dictionay: [],
				portsArray: [],
				countryArray: []
			}
		},
		methods: {
			// 小程序更新
			autoMiniUpdate() {
				const updateManager = uni.getUpdateManager()
				updateManager.onCheckForUpdate((res) => {
					// 请求完整新版本信息的回调
				})
				updateManager.onUpdateReady(() => {
					uni.showModal({
						title: '更新提示',
						content: '新版本已经准备好，是否重启应用',
						success: (res) => {
							if (res.confirm) {
								// 新的版本已经下载好，调用applyUpdate应用新版本并重启
								updateManager.applyUpdate()
							}
						}
					})
				})
				updateManager.onUpdateFailed(() => {
					return this.Tips({
						title: '新版本下载失败'
					})
				})
			},

			// 小程序静默授权
			async silenceAuth1(code) {
				let that = this;
				await silenceAuth({
						code: code,
					})
					.then(res => {
						console.dir(res)
						if (res.token !== undefined && res.token) {
							uni.hideLoading();
							let time = res.expires_time - this.$Cache.time();
							that.$store.commit('LOGIN', {
								token: res.token,
								time: time
							});
							that.$store.commit('UPDATE_USERINFO', {
								...res
							});
							// 注意这里，我的状态保存使用了Storage和store以及globalData，每个根据情况使用
							this.globalData.userInfo = {
								...this.globalData.userInfo,
								...res
							}
						}
					}).then(() => {
						// this.$isResolve()
						// 如果是客服切换至客服页面，0为客户，1为客服
						// if (this.globalData.userInfo.isAdmin == 1) {
							uni.reLaunch({
								url: "/pages/service/taskCenter/index"
							})
						// }

					})
					.catch(res => {
						console.log(res);
					});
			},
			// 小程序静默登陆
			async miniSilenceAuth() {
				console.log(this.$store.getters.isLogin, 'this.$store');
				if (!this.$store.getters.isLogin) {
					await Routine.getCode()
						.then(async code => {
							await this.silenceAuth1(code);
						})
						.catch(res => {
							uni.hideLoading();
						});
				}
			},
			// 获取三个字典值，先加载出来放在缓存中
			async fetchDic(type) {
				await getAllDic(type).then(res => {
					this.dictionay.push(res.data[0])
				})
			},
			// 获取港口列表
			async portsList() {
				await portsList().then(res => {
					this.portsArray = res.data
				})
			},
			// 获取国家列表
			async countryList() {
				await countryList().then(res => {
					this.countryArray = res.data
				})
			}
		},
		onLaunch: async function() {
			console.log('App Launch')
			// #ifdef MP
			this.autoMiniUpdate()
			await this.miniSilenceAuth()
			// 拉取三个字典值放在缓存中
			// Promise.all([
			// 	this.fetchDic("sex"),
			// 	this.fetchDic("trans_order_status"),
			// 	this.fetchDic("ship_status"),
			// 	this.portsList(),
			// 	this.countryList()
			// ]).then(res => {
			// 	// 一次性处理结果，在将结果放在store中进行复用
			// 	let result = {}
			// 	this.dictionay.forEach(item => {
			// 		let key = item["dictCode"]
			// 		result[key] = item.items
			// 	})

			// 	this.$store.commit('SETDICTIONARY', result)
			// 	this.$store.commit('SETPORTLIST', this.portsArray)
			// 	this.$store.commit('SETCOUNTRYLIST', this.countryArray)
			// })
			// #endif
			// 获取导航高度；
			uni.getSystemInfo({
				success: (res) => {
					this.globalData.navHeight = res.statusBarHeight * (750 / res.windowWidth) + 91;
				}
			});
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
	* {
		box-sizing: border-box;
	}

	/* #ifdef MP-WEIXIN */
	:not(not) {
		/* *所有选择器 */
		box-sizing: border-box;
	}

	.file-picker__box {
		width: 124rpx !important;
		height: 124rpx !important;
		border-radius: 6rpx !important;
		margin: 8rpx;
		padding-top: 0 !important;
	}

	.file-picker__box-content {
		margin: 0 !important;
	}

	.file-picker__box-content.is-add {
		background: #f1f2f5 !important;
		border-radius: 6rpx !important;
	}

	.icon-add {
		width: 28rpx !important;
		height: 4rpx !important;
		background-color: #333 !important;
		border-radius: 2px !important;
	}
	uni-checkbox .uni-checkbox-input,
	checkbox .wx-checkbox-input {
		border-radius: 50% !important;
	}

	uni-checkbox .uni-checkbox-input,
	checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		color: #fff !important;
		border: 4rpx solid #3958FF;

		&::before {
			padding: 20rpx;
			content: "";
			background: #3958FF !important;
			border-radius: 50%;
		}
	}

	//修改禁用后勾选状态的样式
	uni-checkbox[aria-disabled="true"][value="true"] .uni-checkbox-input,
	checkbox[aria-disabled="true"][value="true"] .wx-checkbox-input.wx-checkbox-input-checked {
		background-color: #e1e1e1 !important;
	}

	//修改禁用后不勾选状态的样式
	uni-checkbox[aria-disabled="true"][value="false"] .uni-checkbox-input,
	checkbox[aria-disabled="true"][value="false"] .wx-checkbox-input {
		background-color: #000 !important;
	}

	/* #endif */
</style>