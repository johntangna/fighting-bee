<template>
	<view class="new-users lightGreyBg height100vh flex flex-col">
		<!-- <HeadLogo></HeadLogo> -->
		<view class="relative zIndex1 overflowAuto flex1">
			<view class="formBuilder height100">
				<view class="form" style="padding: 24rpx 0;">
					<form>
						<!-- <view class="form-line">
							<label for="">合同名称</label>
							<input class="uni-input marginTop24" placeholder="请输入" v-model="constractData.realname" />
							<view class="divider marginTop40"></view>
						</view> -->
						<view class="form-line">
							<label for="">甲方</label>
							<!-- <picker style="width: 320rpx;" mode="selector" :range="post.items" :value="postIndex"
								range-key="itemText" @change="changePost"> -->
							<view class="acea-row row-middle marginTop24 justify-between" @click="companyClick">
								<view class="uni-input" v-if="constractData.companyName">{{constractData.companyName}}
								</view>
								<view v-else class="colorBlack40">请选择</view>
								<image src="../../../static/asset/矩形(4).png" class="flag" mode="aspectFit">
								</image>
							</view>
							<view class="divider marginTop40"></view>
							<!-- </picker> -->
						</view>
						<view class="form-line">
							<label for="">报价（元）</label>
							<input class="uni-input marginTop24" placeholder="请输入" v-model="constractData.price" />
						</view>
						
						<view class="form-line">
							<label for="">房间</label>
							<!-- <picker style="width: 320rpx;" mode="selector" :range="post.items" :value="postIndex"
								range-key="itemText" @change="changePost"> -->
							<view class="acea-row row-middle marginTop24 justify-between" @click="selectRoom">
								<view class="uni-input" v-if="constractData.roomnames">{{constractData.roomnames}}
								</view>
								<view v-else class="colorBlack40">请选择</view>
								<image src="../../../static/asset/矩形(4).png" class="flag" mode="aspectFit">
								</image>
							</view>
							<view class="divider marginTop40"></view>
							<!-- </picker> -->
						</view>
						<view class="form-line">
							<label for="">开始时间</label>
							<view class="acea-row row-middle marginTop24 justify-between">
								<uni-datetime-picker v-model="constractData.startTime" type="date" />
								<!-- <image src="../../../static/asset/矩形(4).png" class="flag" mode="aspectFit"> -->
							</view>
							<view class="divider marginTop40"></view>
						</view>
						<view class="form-line">
							<label for="">结束时间</label>
							<view class="acea-row row-middle marginTop24 justify-between">
								<uni-datetime-picker v-model="constractData.endTime" type="date" />
								<!-- <image src="../../../static/asset/矩形(4).png" class="flag" mode="aspectFit"> -->
							</view>
							<view class="divider marginTop40"></view>
						</view>
						<view class="form-line">
							<label class="append" for="">备注</label>
							<input class="uni-input marginTop24" placeholder="请输入" v-model="constractData.remark" />
							<view class="divider marginTop40"></view>
						</view>
					</form>
				</view>
				<view class="form-line" style="margin-bottom: 73rpx !important;">
					<label class="append" for="">合同附件1</label>
					<view class="marginTop24">
						<uni-file-picker class="" v-model="constract" :autoUpload="false" file-mediatype="all"
							limit="1" ref="filePicker" @select="selectconstract" @delete="deleteFileconstract">
						</uni-file-picker>
					</view>
					<view class="divider marginTop40"></view>
				</view>
				<view class="form-line">
					<label class="append" for="">合同附件2</label>
					<view class="marginTop24">
						<uni-file-picker class="" v-model="constractAppend" :autoUpload="false" file-mediatype="all"
							limit="1" ref="filePicker" @select="selectconstractAppend"
							@delete="deleteFileconstractAppend">
						</uni-file-picker>
					</view>
					<view class="divider marginTop40"></view>
					<!-- <text class="text" style="margin-left: 8rpx;margin-bottom: -4rpx;" for="">计费吨</text> -->
				</view>
				<view class="form-line">
					<label class="append" for="">合同附件3</label>
					<view class="marginTop24">
						<uni-file-picker class="" v-model="constractAppend2" :autoUpload="false" file-mediatype="all"
							limit="1" ref="filePicker" @select="selectconstractAppend2"
							@delete="deleteFileconstractAppend2">
						</uni-file-picker>
					</view>
					<view class="divider marginTop40"></view>
					<!-- <text class="text" style="margin-left: 8rpx;margin-bottom: -4rpx;" for="">计费吨</text> -->
				</view>
			</view>
		</view>
		<view class="whiteBg bottomBtnEle">
			<button @tap="save" :disabled="disabled" form-type="submit"
				class="pinchuan_button primary_button fontWeight550 fontSize32NoLineheight"
				hover-class="primary_button_hover">确认新增</button>
		</view>
		<qianziyu-select type="radio" :show="show" popupTitle="入驻公司" name="name" :dataLists="allCompany"
			placeholder="请输入入驻公司名称" @cancel="show=false" @search="selectSearch" @submit="submit">
		
		</qianziyu-select>
	</view>
</template>

<script>
	import {
		constractList,
		companyList
	} from "@/api/constract.js"
	import {
		IMG_HTTP_REQUEST_HEAD,
		IMG_REQUEST_URL,
	} from "@/config/app.js"
	import QianziyuSelect from "@/components/qianziyu-select/qianziyu-select.vue"
	const app = getApp()
	export default {
		name: "AddConstract",
		props: {},
		computed: {},
		watch: {

		},
		components: {
			QianziyuSelect
		},
		onLoad(options) {
			const {
				roomName,
				roomIds
			} = options
			if (roomName != "undefined") {
				this.constractData.roomnames = roomName || ""
				this.constractData.roomids = roomIds || ""
			}
			this.companyList()
		},
		onShow() {
			const roomList = app.globalData.roomList
			if (roomList) {
				this.constractData.roomnames = roomList.map(item => item.roomname).join(',')
				this.constractData.roomids = roomList.map(item => item.roomid).join(',')
			}
		},
		data() {
			return {
				show: false,
				constract: [],
				constractAppend: [],
				constractAppend2: [],
				constractData: {
					companyId: '',
					companyName: '',
					startTime: '',
					endTime: '',
					price: '',
					roomids: '',
					roomnames: '',
					remark: '',
					attachment1: '',
					attachment2: '',
					attachment3: ''
				},
				disabled: false,
				show: false,
				allCompany: [],
				allCompanyDeep: []
			}
		},
		methods: {
			selectSearch(v) {
				uni.showLoading({
					title: "请稍候..."
				})
				this.allCompany = this.allCompanyDeep
				this.allCompany = this.allCompany.filter(cb => {
			
					return cb.name.includes(v)
			
				})
				setTimeout(() => {
					uni.hideLoading()
				}, 100)
			},
			submit(v) {
				this.constractData.companyId = v.id
				this.constractData.companyName = v.name
				this.show = false
			},
			companyClick() {
				this.show = true
			},
			companyList() {
				companyList().then(res => {
					this.allCompany = res.data
					this.allCompanyDeep = res.data
				})
			},
			
			selectRoom() {
				uni.navigateTo({
					url: '/pages/services/selectRoom/index'
				})
			},
			save() {
				const requiredValue = JSON.parse(JSON.stringify(this.constractData))
				delete requiredValue["remark"]
				delete requiredValue["attachment1"]
				delete requiredValue["attachment2"]
				delete requiredValue["attachment3"]
				if (Object.keys(requiredValue).map(cb => requiredValue[cb]).some(cb => cb == "")) {
					uni.showToast({
						title: "请检查必填项哦",
						icon: "error"
					})
					return
				}
				this.disabled = true
				constractList('post', 'save', {
					...this.constractData
				}).then(res => {
					this.$util.Tips({
						title: '已添加新合同',
						icon: 'success'
					}, {
						url: '/pages/service/constract/index'
					})
				}).finally(() => {
					this.disabled = false
				})
			},
			deleteFileconstractAppend2(e) {
				this.constractData.attachment3 = ""
			},
			deleteFileconstractAppend(e) {
				this.constractData.attachment2 = ""
			},
			deleteFileconstract(e) {
				this.constractData.attachment1 = ""
			},
			selectconstractAppend2(e) {
				const {
					tempFiles
				} = e;
				const self = this
				self.constractAppend2 = tempFiles
				// this.pictureList = tempFiles
				debugger
				tempFiles.forEach(item => {
					this.$util.uploadFile(item).then(res => {
						const {
							data
						} = res
						const jsonData = JSON.parse(data)
						if (jsonData.code == 200) {
							self.constractData.attachment3 = jsonData.data
						} else {
							uni.showToast({
								title: "文件上传出现异常错误",
								icon: "none"
							})
							self.constractData.attachment3 = ''
							this.constractAppend2 = []
						}
					})
				})
			},
			selectconstractAppend(e) {
				const {
					tempFiles
				} = e;
				const self = this
				self.constractAppend = tempFiles
				// this.pictureList = tempFiles
				tempFiles.forEach(item => {
					this.$util.uploadFile(item).then(res => {
						const {
							data
						} = res
						const jsonData = JSON.parse(data)
						if (jsonData.code == 200) {
							self.constractData.attachment2 = jsonData.data
						} else {
							uni.showToast({
								title: "文件上传出现异常错误",
								icon: "none"
							})
							self.constractData.attachment2 = ''
							this.constractAppend = []
						}
					})
				})
			},
			selectconstract(e) {
				const {
					tempFiles
				} = e;
				const self = this
				self.constract = tempFiles
				// this.pictureList = tempFiles
				tempFiles.forEach(item => {
					this.$util.uploadFile(item).then(res => {
						const {
							data
						} = res
						const jsonData = JSON.parse(data)
						if (jsonData.code == 200) {
							self.constractData.attachment1 = jsonData.data
						} else {
							uni.showToast({
								title: "文件上传出现异常错误",
								icon: "none"
							})
							self.constractData.attachment1 = ''
							this.constract = []
						}
					})
				})
			},
		},
		async mounted() {

		},
		destroyed() {
			app.globalData.roomList = ""
		}

	}
</script>

<style lang="scss" scoped>
	.form-line {
		display: block !important;

		padding: 40rpx 32rpx 0 !important;
		background-color: #fff !important;
		margin-bottom: 0 !important;
		height: auto !important;

		label {
			font-size: 34rpx;
			font-weight: 400;
			color: rgba(0, 0, 0, 0.9);
			padding-bottom: 24rpx;
			position: relative;

			&::after {
				content: "*";
				color: #FF1717;
				position: absolute;
				margin-left: 4rpx;
			}
		}
		label.append {
			&::after {
				content: "*";
				color: #fff;
				position: absolute;
				margin-left: 4rpx;
			}
		}

		picker {
			font-size: 34rpx;
			font-weight: 400;
			font-size: 30rpx;
			text-align: unset !important;
			margin-left: unset !important;
		}
	}

	.divider {
		width: 100%;
	}

	.bg {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		z-index: -2;
		background: #f4f6fa;
	}

	.new-users {
		.backgroundColor {
			background: linear-gradient(to left bottom, #ffeded, #fef1f5);
		}
	}

	.form-line .uni-input,
	.uni-file-picker,
	.un-sex,
	.uni-data-checklist {
		text-align: unset !important;
		margin-left: unset !important;
		font-size: 34rpx;
		display: block !important;
		justify-content: unset !important;
		align-items: unset !important;
		color: rgba(0, 0, 0, 0.9)
	}

	.form-line picker {
		margin-left: unset !important;
	}
</style>