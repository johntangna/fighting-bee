<template>
	<view class="container_mini" style="background-color: #F7F8FB;">
		<view class="header bg-color"></view>
		<view class="container height100">
			<scroll-area :needExceptHeight="needExceptHeight" class="height100">
				<view class="relative">
					<view class="fontSize34 colorBlack90 fontWeight600">
						{{task.content}}
					</view>
					<view class="paddingTop24 fontSize28 fontWeight400" :style="'color:' + task.color">
						{{ computedStatus(task.status)}}
					</view>
					<image v-if="task.status == '1'" src="../../../static/asset/蒙版.png" mode="aspectFit"
						style="width: 112rpx;height: 116rpx;position: absolute;right: 32rpx;top: 32rpx"></image>
					<view class="divider marginBottom40 marginTop40"></view>
					<view class="fontSize34 colorBlack90 fontWeight600 paddingBottom40">基本信息</view>
					<view class="paddingBottom40">
						<view class="fontSize28 fontWeight400 colorBlack40 paddingBottom20">任务进度</view>
						<view class="fontSize28 fontWeight400 colorBlack75 paddingBottom20">{{task.progress || 0}}%</view>
					</view>
					<view class="paddingBottom40">
						<view class="fontSize28 fontWeight400 colorBlack40 paddingBottom20">工作人员</view>
						<view class="paddingBottom20 flex">
							<view class="flex flex1" style="overflow: overlay;">
								<view style="width: 100rpx" class="acea-row row-column items-center" v-for="(user, userIndex) in task.userinfo" :key="userIndex">
									<image :src="computedAvatar(user) || '../../../static/image/f.png'" mode="aspectFit"
										style="width: 48rpx;height: 48rpx;border-radius: 50%;"></image>
									<view class="fontSize30 fontWeight400 colorBlack65 userinfo" style="padding: 8rpx 8rpx 0 12rpx;width: 120rpx;text-align: center;">{{user.realname}}</view>
									<!-- <text class="fontSize30 fontWeight400 colorBlack65">{{item.userinfo.jobTitle || ""}}</text> -->
								</view>
							</view>
						</view>
					</view>
					<view class="paddingBottom40">
						<view class="fontSize28 fontWeight400 colorBlack40 paddingBottom20">开始时间</view>
						<view class="fontSize28 fontWeight400 colorBlack75 paddingBottom20">{{task.startTime}}</view>
					</view>
					<view class="paddingBottom40">
						<view class="fontSize28 fontWeight400 colorBlack40 paddingBottom20">结束时间</view>
						<view class="fontSize28 fontWeight400 colorBlack75 paddingBottom20">{{task.endTime}}</view>
					</view>
					<view class="paddingBottom40">
						<view class="fontSize28 fontWeight400 colorBlack40 paddingBottom20">备注</view>
						<view class="fontSize28 fontWeight400 colorBlack75 paddingBottom20">{{task.remark}}</view>
					</view>
				</view>
				<view class="marginTop24 marginBottom24">
					<view class="paddingBottom40 fontSize34 fontWeight600 colorBlack90">任务进度</view>
					<view>
						<view v-for="(item, index) in task.taskinfos" :key="index" class="taskDetails flex">
							<image :src="computedAvatar1(item)" style="width: 80rpx;height:80rpx;border-radius: 50%;" mode="aspectFit"></image>
							<view class="paddingLeft16">
								<view class="paddingBottom12 fontSize32 fontWeight400 colorBlack90">{{item.userinfo.realname}}</view>
								<view class="paddingBottom16 fontSize28 fontWeight400 colorBlack40">{{item.createTime}}</view>
								<view
									style="padding: 24rpx;background-color: #f6f7fa;width: 510rpx;background: #F6F7FA;border-radius: 4rpx;">
									<view class="fontSize28 fontWeight400 colorBlack80">{{item.remark || "暂无任务备注"}}</view>
									<view class="paddingTop32 width100 taskImage"
										v-if="item.attachment1 || item.attachment2 || item.attachment3">
										<image v-if="item.attachment1" :src="computedImg(item.attachment1)"
											style="height: 103rpx;width: 25%" mode="aspectFit" @tap="previewImg(computedImg(item.attachment1))"></image>
										<image v-if="item.attachment2" :src="computedImg(item.attachment2)"
											style="height: 103rpx;width: 25%" mode="aspectFit" @tap="previewImg(computedImg(item.attachment1))"></image>
										<image v-if="item.attachment3" :src="computedImg(item.attachment3)"
											style="height: 103rpx;width: 25%" mode="aspectFit" @tap="previewImg(computedImg(item.attachment1))"></image>
									</view>
								</view>
							</view>
						</view>
						<view v-if="!task.taskinfos.length">
							<empty-page title="暂无任务进度" :marginTop="0"></empty-page>
						</view>
					</view>
				</view>
				<view>
					<view class="fontSize34 fontWeight600 colorBlack90 marginBottom24">拉人协助</view>
					<check-box-common style="width: 100%" :helpPerson="helpPerson" @changeHelpPerson="changeHelpPerson"></check-box-common>
					<button @tap="saveHelpPerson" :disabled="help_disabled" form-type="submit" v-if="task.status != 1"
						class="pinchuan_button primary_button fontWeight600 fontSize30NoLineheight marginLeft24 marginTop16"
						hover-class="success_button_hover">确定协助</button>
				</view>
			</scroll-area>
		</view>
		<view class="whiteBg bottomBtnEle acea-row items-center fixedButton" style="border-radius: 0;"
			v-if="task.status != 1">
			<button @tap="save" :disabled="disabled" form-type="submit"
				class="pinchuan_button primary_button fontWeight600 fontSize30NoLineheight"
				hover-class="primary_button_hover">添加任务记录</button>
			<button @tap="done" :disabled="disabled" form-type="submit"
				class="pinchuan_button success_button fontWeight600 fontSize30NoLineheight marginLeft24"
				hover-class="success_button_hover">完成任务</button>
		</view>
		<TaskRecord :task="task" ref="taskRecord" @init="init"></TaskRecord>
	</view>
</template>

<script>
	import dayjs from "dayjs"
	import CheckBoxCommon from "@/pages/component/checkbox/ParternCheckbox.vue"
	import ScrollArea from "@/pages/component/ScrollArea.vue"
	import TaskRecord from "@/pages/component/taskRecord/index.vue"
	import EmptyPage from "@/components/emptyPage/index.vue"
	import {
		getTaskDetails,
		updateTask
	} from "@/api/taskCenter.js"
	import {
		getEmployeeList
	} from "@/api/employee.js"
	import {
		IMG_HTTP_REQUEST_HEAD,
		IMG_REQUEST_URL
	} from "@/config/app.js"
	import {
		getAllDic
	} from "@/api/dictionary.js"
	export default {
		name: "",
		props: {},
		computed: {
			computedStatus(item) {
				return (item) => {
					switch (item) {
						case '0':
							this.task.color = '#2E6CF5'
							return '执行中'
							break;
						case '1':
							this.task.color = '#0Fb325'
							return '已完成'
							break;
					}
				}
			},
			computedImg(item) {
				return (item) => {
					return IMG_HTTP_REQUEST_HEAD + IMG_REQUEST_URL + item
				}
			},
			computedAvatar(item) {
				return (item) => {
					try{
						return IMG_HTTP_REQUEST_HEAD + IMG_REQUEST_URL + item.avatar
					}catch(e){
						//TODO handle the exception
					}
				}
			},
			computedAvatar1(item) {
				return (item) => {
					try{
						return IMG_HTTP_REQUEST_HEAD + IMG_REQUEST_URL + item.userinfo.avatar
					}catch(e){
						//TODO handle the exception
					}
				}
			}
		},
		components: {
			CheckBoxCommon,
			ScrollArea,
			TaskRecord,
			EmptyPage
		},
		watch: {

		},
		onShow() {
			getAllDic("task_status").then(res => {
				this.stateList = res.data[0].items
			})
		},
		data() {
			return {
				help_disabled: false,
				stateList: [],
				task: {
					id: 0,
					content: "这是一段任务描述信息内容",
					status: "执行中",
					color: '#2E6CF5',
					progress: "90%",
					userinfo: {

					},
					startTime: dayjs(new Date()).format("YYYY年MM月DD日 HH:mm"),
					endTime: dayjs(new Date()).format("YYYY年MM月DD日 HH:mm"),
					taskinfos: [{
							avatar: '../../../static/asset/蒙版(6).png',
							name: '秒平衍',
							time: dayjs(new Date()).format("MM-DD HH:mm"),
							remark: '已约甲方见面时间',
							attachment1: "",
							attachment2: "",
							attachment3: "",
						},
						{
							avatar: '../../../static/asset/蒙版(6).png',
							name: '秒平衍',
							time: dayjs(new Date()).format("MM-DD HH:mm"),
							remark: '已约甲方见面时间',
							attachment1: "",
							attachment2: "",
							attachment3: "",
						}
					]
				},
				helpPerson: [{
						text: "王司徒",
						value: "1",
						job: "办公室助理"
					},
					{
						text: "鲁班",
						value: "2",
						job: "前端"
					},
					{
						text: "贾诩",
						value: "3",
						job: "设计师"
					},
					{
						text: "凌度",
						value: "4",
						job: "办公室助理"
					},
					{
						text: "陆建国",
						value: "5",
						job: "办公室助理"
					},
				],
				needExceptHeight: [72],
				disabled: false,
			}
		},
		methods: {
			previewImg(url) {
				uni.previewImage({
					urls: [url]
				})
			},
			changeHelpPerson(v) {
				this.task.userid = v.join(",")
			},
			saveHelpPerson() {
				if (!this.task.userid) {
					uni.showToast({
						title: "协助人员忘记选择了哦"
					})
					return
				}
				this.help_disabled = true
				// this.task.color = '#0FB325'
				updateTask({
					id: this.task.id,
					userid: this.task.userid
				}).then(res => {
					uni.showToast({
						title: '已修改执行人'
					})
				}).finally(() => {
					this.help_disabled = false
				})
			},
			save() {
				this.$refs.taskRecord.openPopup()
			},
			done() {
				const id = this.task.id
				uni.showModal({
					title: '提示',
					content: '是否完结该任务',
					success: (res) => {
						if (res.confirm) {
							this.disabled = true
							this.task.status = '1'
							// this.task.color = '#0FB325'
							updateTask({
								id: id,
								status: 1
							}).then(res => {
								this.$util.Tips({
									title: '已完结该任务',
									icon: 'success'
								}, {
									tab: 3
								})
							}).catch(() => {
								this.disabled = false
							})
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},
			async getTaskDetails(id) {
				await getTaskDetails(id).then(res => {
					this.task = res.data
					if (this.task.userid) {
						const arr = this.task.userid.split(",")
						arr.forEach(item => {
							this.helpPerson.forEach(person => {
								if (item == person.value) {
									debugger
									person.checked = true
								}
							})
						})
					}
				})
			},
			async getEmployeeList() {
				await getEmployeeList().then(res => {
					const {
						data
					} = res
					const tempArr = []
					data.forEach(item => {
						let obj = {
							text: item.realname,
							value: item.id,
							job: item.job_title,
							avatar: item.avatar,
							checked: false
						}
						tempArr.push(obj)
					})
					this.helpPerson = tempArr
				})
			},
			async init(id) {
				await this.getEmployeeList()
				await this.getTaskDetails(id)
			}
		},
		async onLoad(option) {
			const {
				id,
			} = option
			await this.init(id)
			const res = await this.$util.getSelectorQueryInfo('.bottomBtnEle')
			console.info(res)
			if (this.task.status != 1) {
				this.needExceptHeight.push(res.height)
			}
		},
		async mounted() {
			
		}

	}
</script>

<style scoped lang="scss">
	.header {
		height: 560rpx;
	}

	.container {
		padding: 56rpx 32rpx 24rpx;


	}

	.container_content {
		&>view {
			background-color: #fff;
			border-radius: 6rpx;
			padding: 40rpx;
		}
	}

	.taskImage {
		image {
			padding: 8rpx;
		}
	}

	.taskDetails {
		&+.taskDetails {
			padding-top: 64rpx;
		}
	}
</style>