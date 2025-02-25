<template>
	<view class="new-users lightGreyBg height100vh flex flex-col">
		<!-- <HeadLogo></HeadLogo> -->
		<view class="relative zIndex1 overflowAuto flex1 marginBottom24">
			<view class="formBuilder height100">
				<view class="form" style="padding: 24rpx 0;">
					<form>
						<view class="form-line">
							<label for="">照片</label>
							<view class="marginTop24">
								<uni-file-picker class="" v-model="avatar" :autoUpload="false" file-mediatype="image" limit="1"
									ref="filePicker" @select="select" @success="success" @delete="deleteFile">
								</uni-file-picker>
							</view>
							<view class="divider marginTop40"></view>
							<!-- <text class="text" style="margin-left: 8rpx;margin-bottom: -4rpx;" for="">计费吨</text> -->
						</view>
						<view class="form-line">
							<label for="">姓名</label>
							<input class="uni-input marginTop24" placeholder="请输入" v-model="employeeData.realname" />
							<view class="divider marginTop40"></view>
						</view>
						<view class="form-line">
							<label for="">手机号</label>
							<input class="uni-input marginTop24" placeholder="请输入" v-model="employeeData.phone" />
						</view>
						<view class="form-line">
							<label for="">职务</label>
							<!-- <picker style="width: 320rpx;" mode="selector" :range="post.items" :value="postIndex"
								range-key="itemText" @change="changePost"> -->
							<view class="acea-row row-middle marginTop24 justify-between" @click="postClick">
								<view class="uni-input">{{postItem.itemText || '请选择'}}</view>
								<image src="../../../static/asset/矩形(4).png" class="flag" mode="aspectFit">
								</image>
							</view>
							<view class="divider marginTop40"></view>
							<!-- </picker> -->
						</view>
						<view class="form-line">
							<label for="">岗位</label>
							<!-- <picker style="width: 320rpx;" mode="selector" :range="job.items" :value="jobIndex"
								range-key="itemText" @change="changeJob"> -->
							<view class="acea-row row-middle marginTop24 justify-between" @click="jobClick">
								<view class="uni-input">{{jobItem.itemText || '请选择'}}</view>
								<image src="../../../static/asset/矩形(4).png" class="flag" mode="aspectFit">
								</image>
							</view>
							<view class="divider marginTop40"></view>
							<!-- </picker> -->
						</view>
						<view class="form-line">
							<label for="">所属公司</label>
							<input class="uni-input marginTop24" placeholder="请输入" v-model="employeeData.companyName" />
							<view class="divider marginTop40"></view>
						</view>
					</form>
				</view>
			</view>
		</view>
		<view class="whiteBg bottomBtnEle">
			<button @tap="save" :disabled="disabled" form-type="submit"
				class="pinchuan_button primary_button fontWeight550 fontSize32NoLineheight"
				hover-class="primary_button_hover">确定</button>
		</view>
		<qianziyu-select :show="show" type="radio" :popupTitle="popupTitle" name="itemText" :dataLists="dataLists"
			:placeholder="tipTitle" @cancel="show=false" @search="selectSearch" @submit="submit">

		</qianziyu-select>
	</view>
</template>

<script>
	import {
		updateOrSave
	} from "@/api/employee.js"
	import {
		jobList,
		postList
	} from "@/api/public.js"
	import {
		IMG_HTTP_REQUEST_HEAD,
		IMG_REQUEST_URL,
	} from "@/config/app.js"
	import QianziyuSelect from "@/components/qianziyu-select/qianziyu-select.vue"
	export default {
		name: "EditEmployee",
		props: {},
		computed: {},
		watch: {

		},
		components: {
			QianziyuSelect
		},
		onLoad(options) {
			const {
				id,
				jobTitle,
				post,
				avatar,
				realname,
				phone,
				companyName
			} = options
			if (id) {
				this.employeeData = {
					realname: realname,
					phone: phone,
					post: post,
					jobTitle: jobTitle,
					id: id,
					companyName: companyName
				}
				this.employeeData = this.$util.convertNullToEmpty(this.employeeData)
			}
			if (avatar) {
				this.avatar = [{
					name: avatar.substring(avatar.lastIndexOf("/")),
					extname: avatar.substring(avatar.lastIndexOf(".")),
					url: IMG_HTTP_REQUEST_HEAD + IMG_REQUEST_URL + avatar,
				}]
			}
			this.jobList(jobTitle)
			this.postList(post)
		},
		onShow() {},
		data() {
			return {
				avatar: [],
				employeeData: {
					avatar: ""
				},
				disabled: false,
				show: false,
				job: [],
				jobItem: {},
				post: [],
				postItem: {},
				activeIndex: 0, // 0为职务，1为岗位
				dataLists: [],
				isAdminList: [
					"否", "是"
				],
				adminIndex: 0,
				popupTitle: "",
				tipTitle: "",
			}
		},
		methods: {
			jobClick() {
				this.show = true
				this.activeIndex = 1
				this.dataLists = this.job.items
				this.tipTitle = "输入岗位名称搜索"
				this.popupTitle = "请选择岗位"
			},
			postClick() {
				this.show = true
				this.activeIndex = 0
				this.dataLists = this.post.items
				this.tipTitle = "输入职务名称搜索"
				this.popupTitle = "请选择职务"
			},
			selectSearch(v) {
				uni.showLoading({
					title: "请稍候..."
				})
				this.dataLists = this.dataLists
				this.dataLists = this.dataLists.filter(cb => {

					return cb.itemText.includes(v)

				})
				setTimeout(() => {
					uni.hideLoading()
				}, 100)
			},
			submit(v) {
				if (this.activeIndex) {
					this.jobItem = v
				} else {
					this.postItem = v
				}
				this.show = false
			},
			changeAdmin(e) {
				this.adminIndex = e.detail.value
			},
			save() {
				if (!this.employeeData.realname || this.employeeData.realname == "") {
					uni.showToast({
						title: "姓名为必填哦",
						icon: "error"
					})
					return
				}
				if (!this.employeeData.phone || this.employeeData.phone == "") {
					uni.showToast({
						title: "手机号为必填哦",
						icon: "error"
					})
					return
				}
				this.disabled = true
				updateOrSave(this.employeeData.id ? 'put' : 'post', this.employeeData.id ? 'update' : 'save', {
					...this.employeeData,
					post: this.postItem.itemText,
					jobTitle: this.jobItem.itemText,
					isAdmin: this.adminIndex
				}).then(res => {
					this.$util.Tips({
						title: this.employeeData.id ? '已为您修改员工信息' : '已为您添加员工信息',
						icon: 'success'
					}, {
						tab: 3
					})
				}).finally(() => {
					this.disabled = false
				})
			},
			deleteFile(e) {
				this.employeeData.avatar = ""
			},
			select(e) {
				const {
					tempFiles
				} = e;
				const self = this
				self.avatar = tempFiles
				// this.pictureList = tempFiles
				tempFiles.forEach(item => {
					this.$util.uploadFile(item).then(res => {
						const {
							data
						} = res
						const jsonData = JSON.parse(data)
						if (jsonData.code == 200) {
							self.employeeData.avatar = jsonData.data
						} else {
							uni.showToast({
								title: "文件上传出现异常错误",
								icon: "none"
							})
							self.employeeData.avatar = ''
							this.avatar = []
						}
					})
				})
			},
			success(e) {
				console.info(e)
			},
			jobList(job_title) {
				jobList().then(res => {
					this.job = res.data[0]
				}).finally(() => {
					if (job_title) this.jobItem = this.job.items.find(cb => cb.itemText == job_title) || {}
				})
			},
			postList(post) {
				postList().then(res => {
					this.post = res.data[0]
				}).finally(() => {
					if (post) this.postItem = this.post.items.find(cb => cb.itemText == post) || {}
				})
			}
		},
		async mounted() {

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
		font-size: 30rpx;
		display: block !important;
		justify-content: unset !important;
		align-items: unset !important;
		color: rgba(0, 0, 0, 0.4)
	}
</style>