<template>
	<view class="distribute-task lightGreyBg height100vh flex flex-col">
		<view class="relative zIndex1 overflowAuto flex1">
			<view class="form_builder">
				<form>
					<view class="item">
						<view class="form-line-new">
							<label for="desc">任务描述</label>
							<input name="desc" v-model="task.content" class="uni-input" placeholder="请输入" />
						</view>
						<view class="form-line-new">
							<label for="">任务类型</label>
							<PickerCommon style="width: 100%" type="common" :array="taskType" pickType="taskType" @changeType="changeType"></PickerCommon>
						</view>
					</view>
					<view class="item">
						<view class="form-line-new">
							<label for="">开始时间</label>
							<uni-datetime-picker type="datetime" v-model="task.startTime" @changePickerVisible="changePickerVisible"/>
						</view>
						<view class="form-line-new">
							<label for="">结束时间</label>
							<uni-datetime-picker type="datetime" v-model="task.endTime" @changePickerVisible="changePickerVisible"/>
						</view>
						<view class="form-line-new">
							<label for="">到期预警</label>
							<PickerCommon v-show="show" style="width: 100%" type="common" :array="array" pickType="warning" @changeWarning="changeWarning"></PickerCommon>
						</view>
						<view class="form-line-new">
							<label for="">备注</label>
							<textarea style="height: 40rpx;" placeholder="请输入任务备注" v-model="task.remark" />
						</view>
					</view>
					<view class="item marginBottom24">
						<view class="form-line-new">
							<view class="fontSize34 fontWeight600 colorBlack90 marginBottom24">工作人员</view>
							<check-box-common style="width: 100%" :helpPerson="helpPerson" @changeHelpPerson="changeHelpPerson"></check-box-common>
						</view>
					</view>
				</form>
			</view>
		</view>
		<view class="whiteBg bottomBtnEle" v-show="show">
			<button @tap="supplyTaskInfo" :disabled="disabled" form-type="submit"
				class="pinchuan_button primary_button fontWeight550 fontSize32NoLineheight"
				hover-class="primary_button_hover">确认指派</button>
		</view>
	</view>
</template>
<script>
	import {
		saveTask
	} from "@/api/taskCenter.js"
	import HeadLogo from "@/components/headLogo/index.vue"
	import PickerCommon from "@/pages/component/picker/picker.vue"
	import CheckBoxCommon from "@/pages/component/checkbox/ParternCheckbox.vue"
	import { getAllDic } from "@/api/dictionary.js"
	import {
		getEmployeeList
	} from "@/api/employee.js"
	const app = getApp();
	export default {
		data() {
			return {
				task: {
					content: "",
					startTime: "",
					endTime: "",
					earlyWarningDay: "",
					remark: "",
					status: "0",
					type: "",
					userid: ""
				},
				disabled: false,
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
				array: [],
				taskType: [],
				show: true
			}
		},
		components: {
			HeadLogo,
			PickerCommon,
			CheckBoxCommon
		},
		filters: {},
		watch: {},
		onLoad(options) {
			// #ifdef MP-WEIXIN
			uni.hideHomeButton()
			// #endif

			this.array = Array.from({
				length: 7
			}).map((item, index) => {
				return {
					itemText: `到期${index+1}天前通知`,
					itemValue: (index + 1)
				}
			})
			getAllDic("task_type").then(res => {
				this.taskType = res.data[0].items
				this.task.type = this.taskType[0].itemValue
			})
			this.task.earlyWarningDay = this.array[0].itemValue
			this.getEmployeeList()
		},
		methods: {
			getEmployeeList() {
				getEmployeeList().then(res => {
					const { data } = res
					const tempArr = []
					data.forEach(item => {
						let obj = {
							text: item.realname,
							value: item.id,
							job: item.job_title,
							avatar: item.avatar
						}
						tempArr.push(obj)
					})
					this.helpPerson = tempArr
				})
			},
			changeHelpPerson(value) {
				this.task.userid = value.join(",")
			},
			changePickerVisible(value) {
				this.show = value
			},
			changeType(v) {
				this.task.type = this.taskType[v].itemValue
			},
			changeWarning(v) {
				this.task.earlyWarningDay = this.array[v].itemValue
			},
			supplyTaskInfo() {
				if (Object.keys(this.task).map(cb => this.task[cb]).some(cb => cb == "")) {
					uni.showToast({
						title: "全为必填项哦",
						icon: "error"
					})
					return
				}
				this.disabled = true
				saveTask({
					...this.task
				}).then(res => {
					this.$util.Tips({
						title: '任务已添加',
						icon: 'success'
					}, {
						tab: 3
					})
				}).catch(() => {
					this.disabled = false
				})
			}
		}
	}
</script>
<style lang="scss" scoped>
	.form-line-new {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: 40rpx 32rpx;
		background-color: #fff !important;

		label {
			font-size: 34rpx;
			font-weight: 400;
			color: rgba(0, 0, 0, 0.9);
			margin-bottom: 24rpx;

			&::after {
				content: "*";
				color: rgba(255, 23, 23, 0.9);
				font-size: 34rpx;
				font-weight: 400;
				margin-left: 4rpx;
			}
		}
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

	.distribute-task {
		.backgroundColor {
			background: linear-gradient(to left bottom, #ffeded, #fef1f5);
		}
	}

	.form_builder {
		.item {
			margin-top: 24rpx;
		}
	}
</style>