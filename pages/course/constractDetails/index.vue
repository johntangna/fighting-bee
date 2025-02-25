<template>
	<view class="container_mini">
		<view class="nav acea-row row-around cardStyle whiteBg" style="padding: 26rpx 0;">
			<view class="item" v-for="(header, index) in header" :key="index"
				:class="type == header.itemValue ? 'on' : ''" @click="statusClick(header.itemValue)">
				<view>{{header.itemText}}</view>
			</view>
		</view>
		<view class="padding32 height100" v-if="type == 0">
			<scroll-area :needExceptHeight="needExceptHeight" class="height100"
				v-if="(outsideRoom.inuse == 1) && constractDetails && Object.keys(constractDetails).length">

				<view class="padding40 whiteBg marginBottom32">
					<view class="fontSize34 fontWeight600 colorBlack90">{{outsideRoom.constractName}}</view>
					<view class="divider marginTop40 marginBottom40"></view>
					<view class="fontSize34 fontWeight600 colorBlack90 marginBottom40">基本信息</view>
					<view class="marginBottom40">
						<view class="fontSize28 fontWeight400 colorBlack40 marginBottom20">甲方</view>
						<view class="fontSize28 fontWeight400 colorBlack75 marginBottom20">
							{{constractDetails.companyName}}
						</view>
					</view>
					<view class="marginBottom40">
						<view class="fontSize28 fontWeight400 colorBlack40 marginBottom20">租赁时间</view>
						<view class="fontSize28 fontWeight400 colorBlack75 marginBottom20">
							{{constractDetails.startTime}}
						</view>
					</view>
					<view class="marginBottom40">
						<view class="fontSize28 fontWeight400 colorBlack40 marginBottom20">到期时间</view>
						<view class="fontSize28 fontWeight400 colorBlack75 marginBottom20">{{constractDetails.endTime}}
						</view>
					</view>
					<view class="marginBottom40">
						<view class="fontSize28 fontWeight400 colorBlack40 marginBottom20">付款状态</view>
						<view class="fontSize28 fontWeight400 colorBlack75 marginBottom20">
							{{ constractDetails.payInfoList && constractDetails.payInfoList.length != 0 ? constractDetails.payInfoList[0].paystatus : "暂未付款"}}
						</view>
					</view>
					<view class="marginBottom40">
						<view class="fontSize28 fontWeight400 colorBlack40 marginBottom20">缴费时间</view>
						<view class="fontSize28 fontWeight400 colorBlack75 marginBottom20">
							{{constractDetails.payInfoList && constractDetails.payInfoList.length != 0 ? constractDetails.payInfoList[0].payTime : "暂未付款"}}
						</view>
					</view>
					<view class="marginBottom40">
						<view class="fontSize28 fontWeight400 colorBlack40 marginBottom20">缴费金额</view>
						<view class="fontSize28 fontWeight400 colorBlack75 marginBottom20">
							{{constractDetails.payInfoList && constractDetails.payInfoList.length != 0 ? constractDetails.payInfoList[0].money : "暂未付款"}}
						</view>
					</view>
					<view class="marginBottom40">
						<view class="fontSize28 fontWeight400 colorBlack40 marginBottom20">备注</view>

						<view>
							<view v-if="!editFlag" class="flex">
								<view class="fontSize28 fontWeight400 colorBlack75 marginBottom20 flex1"
									style="overflow: auto;max-height: 200rpx;line-height: 40rpx !important;">
									{{constractDetails.remark || "—"}}
								</view>
								<uni-icons class="marginLeft12" type="compose" size="20" @tap="editAction"></uni-icons>
							</view>
							<view v-else>
								<Input :suffixIcon="true" :prefixIcon="false" ref="input"
									:remark="constractDetails.remark" type="textarea" @featchList="editRemark"
									style="height: 100%;width: 598rpx;" placeholder="请输入备注"></Input>
							</view>
						</view>
					</view>
				</view>
				<view class="padding40 whiteBg">
					<view class="fontSize28 fontWeight400 colorBlack40 marginBottom32">附件</view>
					<view class="picture flex justify-between items-center" v-if="constractDetails.attachment1">
						<view class="flex items-center" style="width: calc(100% - 188rpx);flex: 1;margin-right: 20rpx">
							<image class="marginRight24"
								:src="isPicture(constractDetails.attachment1) ? computedPicture(constractDetails.attachment1) : '../../../static/asset/pdf.png'"
								@tap="previewImg(computedPicture(constractDetails.attachment1))" mode="aspectFit"
								style="width:64rpx;height:64rpx;border-radius: 4rpx;"></image>
							<view style="width: 80%;overflow: overlay;white-space: nowrap;">
								{{ constractDetails.attachment1 }}
							</view>
						</view>
						<view class="action" @tap="viewConstract(constractDetails.attachment1)">
							复制下载链接
						</view>
					</view>
					<view class="picture flex justify-between items-center" v-if="constractDetails.attachment2">
						<view class="flex items-center" style="width: calc(100% - 188rpx);flex: 1;margin-right: 20rpx">
							<image class="marginRight24"
								:src="isPicture(constractDetails.attachment2) ? computedPicture(constractDetails.attachment2) : '../../../static/asset/pdf.png'"
								@tap="previewImg(computedPicture(constractDetails.attachment2))" mode="aspectFit"
								style="width:64rpx;height:64rpx;border-radius: 4rpx;"></image>
							<view style="width: 80%;overflow: overlay;white-space: nowrap;">
								{{ constractDetails.attachment2 }}
							</view>
						</view>
						<view class="action" @tap="viewConstract(constractDetails.attachment2)">
							复制下载链接
						</view>
					</view>
					<view class="picture flex justify-between items-center" v-if="constractDetails.attachment3">
						<view class="flex items-center" style="width: calc(100% - 188rpx);flex: 1;margin-right: 20rpx">
							<image class="marginRight24"
								:src="isPicture(constractDetails.attachment3) ? computedPicture(constractDetails.attachment3) : '../../../static/asset/pdf.png'"
								mode="aspectFit" @tap="previewImg(computedPicture(constractDetails.attachment3))"
								style="width:64rpx;height:64rpx;border-radius: 4rpx;"></image>
							<view style="width: 80%;overflow: overlay;white-space: nowrap;">
								{{ constractDetails.attachment3 }}
							</view>
						</view>
						<view class="action" @tap="viewConstract(constractDetails.attachment3)">
							复制下载链接
						</view>
					</view>
				</view>
			</scroll-area>

			<view v-else>
				<empty-page title="待租赁" src="../../static/asset/no_constract.png"></empty-page>
			</view>
		</view>
		<view class="padding32 record_list" v-if="type == 1">
			<view v-if="constractAboutRoom.length">
				<view class="padding40 record whiteBg" v-for="(item, index) in constractAboutRoom" :key="index">
					<view class="fontSize34 fontWeight600 colorBlack90">{{item.startTime}} 至 {{item.endTime}}</view>
					<view class="divider marginTop40 marginBottom40"></view>
					<view class="fontSize34 fontWeight600 colorBlack90 marginBottom40">基本信息</view>
					<!-- <view class="marginBottom40">
						<view class="fontSize28 fontWeight400 colorBlack40 marginBottom20">合同名称</view>
						<view class="fontSize28 fontWeight400 colorBlack75 marginBottom20">{{outsideRoom.constractName}}
						</view>
					</view> -->
					<view class="marginBottom40">
						<view class="fontSize28 fontWeight400 colorBlack40 marginBottom20">甲方</view>
						<view class="fontSize28 fontWeight400 colorBlack75 marginBottom20">{{item.companyName}}</view>
					</view>
					<view class="marginBottom40">
						<view class="fontSize28 fontWeight400 colorBlack40 marginBottom20">其他备注</view>
						<view class="fontSize28 fontWeight400 colorBlack75 marginBottom20">{{item.remark || "—"}}</view>
					</view>
					<view>
						<view class="fontSize28 fontWeight400 colorBlack40 marginBottom32">合同</view>
						<view class="picture flex justify-between items-center" v-if="item.attachment1">
							<view class="flex items-center"
								style="width: calc(100% - 188rpx);flex: 1;margin-right: 20rpx">
								<image class="marginRight24"
									:src="isPicture(item.attachment1) ? computedPicture(item.attachment1) : '../../../static/asset/pdf.png'"
									mode="aspectFit" @tap="previewImg(computedPicture(item.attachment1))"
									style="width:64rpx;height:64rpx;border-radius: 4rpx;"></image>
								<view style="width: 80%;overflow: overlay;white-space: nowrap;">{{ item.attachment1 }}
								</view>
							</view>
							<view class="action" @tap="viewConstract(item.attachment1)">
								复制下载链接
							</view>
						</view>
						<view class="picture flex justify-between items-center" v-if="item.attachment2">
							<view class="flex items-center"
								style="width: calc(100% - 188rpx);flex: 1;margin-right: 20rpx">
								<image class="marginRight24"
									:src="isPicture(item.attachment2) ? computedPicture(item.attachment2) : '../../../static/asset/pdf.png'"
									mode="aspectFit" @tap="previewImg(computedPicture(item.attachment2))"
									style="width:64rpx;height:64rpx;border-radius: 4rpx;"></image>
								<view style="width: 80%;overflow: overlay;white-space: nowrap;">{{ item.attachment2 }}
								</view>
							</view>
							<view class="action" @tap="viewConstract(item.attachment2)">
								复制下载链接
							</view>
						</view>
						<view class="picture flex justify-between items-center" v-if="item.attachment3">
							<view class="flex items-center"
								style="width: calc(100% - 188rpx);flex: 1;margin-right: 20rpx">
								<image class="marginRight24"
									:src="isPicture(item.attachment3) ? computedPicture(item.attachment3) : '../../../static/asset/pdf.png'"
									mode="aspectFit" @tap="previewImg(computedPicture(item.attachment3))"
									style="width:64rpx;height:64rpx;border-radius: 4rpx;"></image>
								<view style="width: 80%;overflow: overlay;white-space: nowrap;">{{ item.attachment3 }}
								</view>
							</view>
							<view class="action" @tap="viewConstract(item.attachment3)">
								复制下载链接
							</view>
						</view>
					</view>
				</view>
			</view>
			<view v-else>
				<empty-page title="暂无租赁记录" src="../../static/asset/no_constract.png"></empty-page>
			</view>
		</view>
		<view class="padding32 record_list" v-if="type == 2">
			<view v-if="(outsideRoom.inuse == 1) && payHistory.length">
				<view class="padding40 record whiteBg" v-for="(item, index) in payHistory" :key="index">
					<view class="fontSize34 fontWeight600 colorBlack90 marginBottom40">基本信息</view>
					<!-- <view class="marginBottom40">
						<view class="fontSize28 fontWeight400 colorBlack40 marginBottom20">合同名称</view>
						<view class="fontSize28 fontWeight400 colorBlack75 marginBottom20">{{outsideRoom.constractName}}
						</view>
					</view> -->
					<view class="marginBottom40">
						<view class="fontSize28 fontWeight400 colorBlack40 marginBottom20">付款状态</view>
						<view class="fontSize28 fontWeight400 colorBlack75 marginBottom20">{{item.paystatus}}</view>
					</view>
					<view class="marginBottom40">
						<view class="fontSize28 fontWeight400 colorBlack40 marginBottom20">缴费时间</view>
						<view class="fontSize28 fontWeight400 colorBlack75 marginBottom20">{{item.payTime}}</view>
					</view>
					<view class="marginBottom40">
						<view class="fontSize28 fontWeight400 colorBlack40 marginBottom20">缴费金额</view>
						<view class="fontSize28 fontWeight400 colorBlack75 marginBottom20">{{item.money}}
						</view>
					</view>
				</view>
			</view>
			<view v-else>
				<empty-page title="暂无付款记录" src="../../static/asset/no_constract.png"></empty-page>
			</view>
		</view>
		<view v-if="type == 0" style="position: fixed;bottom: 0;left: 0;right: 0;">
			<view class="whiteBg bottomBtnEle flex justify-around"
				v-if="(outsideRoom.inuse == 1) && constractDetails && Object.keys(constractDetails).length">
				<uni-file-picker v-if="takePictureDisabled" :show="false"
					class="pinchuan_button info_button fontWeight550 fontSize32NoLineheight"
					hover-class="info_button_hover" :autoUpload="false" file-mediatype="all" limit="6" ref="filePicker"
					@select="takePicture">
					上传
				</uni-file-picker>

				<button @tap="stop" :disabled="disabled" form-type="submit"
					class="pinchuan_button info_button fontWeight550 fontSize32NoLineheight"
					hover-class="info_button_hover">终止</button>
				<button @tap="delayConstract" :disabled="disabled" form-type="submit"
					class="pinchuan_button primary_button fontWeight550 fontSize32NoLineheight"
					hover-class="info_button_hover">款项</button>
				<!-- <button @tap="save" :disabled="disabled" form-type="submit"
          class="pinchuan_button primary_button fontWeight550 fontSize32NoLineheight"
          hover-class="primary_button_hover">分享</button> -->
			</view>
			<view class="whiteBg bottomBtnEle flex justify-around" v-else>
				<button @tap="addConstract" :disabled="disabled" form-type="submit"
					class="pinchuan_button primary_button fontWeight550 fontSize32NoLineheight"
					hover-class="primary_button_hover">新增合同</button>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		IMG_HTTP_REQUEST_HEAD,
		IMG_REQUEST_URL,
	} from "@/config/app.js"
	import EmptyPage from "@/components/emptyPage/index.vue"
	import ScrollArea from "@/pages/component/ScrollArea.vue"
	import Input from "@/components/input/index.vue"
	import {
		getConstractDetails,
		constractList,
		updateRoom,
		getPayInfoListHistory
	} from "@/api/constract.js"
	import {
		getAllDic
	} from "@/api/dictionary.js"
	export default {
		name: 'template',
		props: {},
		components: {
			EmptyPage,
			ScrollArea,
			Input
		},
		watch: {
			constractDetails: {
				handler(newV) {
					if (newV.attachment1 && newV.attachment2 && newV.attachment3) {
						this.takePictureDisabled = false
					}
				},
				deep: true
			}
		},
		data() {
			return {
				payHistory: [],
				paystatusArr: [],
				editFlag: false,
				takePictureDisabled: true,
				disabled: false,
				height: 0,
				type: 0,
				header: [{
						itemText: "房间概况",
						itemValue: "0"
					},
					{
						itemText: "租赁记录",
						itemValue: "1"
					},
					{
						itemText: "付款记录",
						itemValue: "2"
					}
				],
				constractAboutRoom: {},
				outsideRoom: {},
				constractDetails: {
					picture: ["5T3zPBNMWc2Uc5d405fc420a0519140475d91c2ba8c4.png",
						"5T3zPBNMWc2Uc5d405fc420a0519140475d91c2ba8c4.png",
						"5T3zPBNMWc2Uc5d405fc420a0519140475d91c2ba8c4.png",
						"5T3zPBNMWc2Uc5d405fc420a0519140475d91c2ba8c4.png",
						"5T3zPBNMWc2Uc5d405fc420a0519140475d91c2ba8c4.png",
						"5T3zPBNMWc2Uc5d405fc420a0519140475d91c2ba8c4.png",
						"5T3zPBNMWc2Uc5d405fc420a0519140475d91c2ba8c4.png"
					]
				},
				records: [{
						timeline: "2022年 2月26日 至 2023年 2月26日",
						constractName: "这是一段合同名称信息内容",
						company: "张三里斯本科技股份有限责任公司",
						remark: "",
						picture: ["5T3zPBNMWc2Uc5d405fc420a0519140475d91c2ba8c4.png"]
					},
					{
						timeline: "2022年 2月26日 至 2023年 2月26日",
						constractName: "这是一段合同名称信息内容",
						company: "张三里斯本科技股份有限责任公司",
						remark: "",
						picture: ["微信图片_20231021155029_副本_1697874850523_1698583399622.jpg"]
					},
					{
						timeline: "2022年 2月26日 至 2023年 2月26日",
						constractName: "这是一段合同名称信息内容",
						company: "张三里斯本科技股份有限责任公司",
						remark: "",
						picture: ["微信图片_20231021155029_副本_1697874850523_1698583399622.jpg"]
					},
				],
				needExceptHeight: [72, 20]
			}
		},
		filters: {},
		computed: {
			isPicture(item) {
				return (item) => {
					debugger
					return item.includes(".png") || item.includes(".jpg") || item.includes(".jpeg")
				}
			},
			computedPicture(item) {
				return (item) => {
					return `${IMG_HTTP_REQUEST_HEAD+IMG_REQUEST_URL+item}`
				}
			},
			computedPayStatus(item) {
				return (item) => {
					try {
						return this.paystatusArr.find(cb => cb.itemValue == item.paystatus).itemText
					} catch (e) {
						//TODO handle the exception
					}
				}
			}
		},
		methods: {
			editAction() {
				this.editFlag = true
			},
			editRemark(v) {
				let input
				if (v) {
					input = v.detail["__args__"][0]
				} else {
					input = this.$refs.input.v
				}
				this.constractDetails.remark = input
				this.editFlag = false
				constractList('put', 'update', {
					id: this.outsideRoom.constractId,
					remark: input
				}).then(res => {
					uni.showToast({
						title: '已更新备注',
						icon: 'success'
					})
				})
			},
			statusClick(value) {
				this.type = value
			},
			previewImg(url) {
				if (url.includes(".png") || url.includes(".jpg") || url.includes(".jpeg")) {
					uni.previewImage({
						urls: [url]
					})
				}
			},
			viewConstract(item) {
				uni.setClipboardData({
					data: `${IMG_HTTP_REQUEST_HEAD+IMG_REQUEST_URL+item}`,
					success: function() {
						console.log('success');
					}
				});

			},
			async takePicture(e) {
				const {
					tempFiles
				} = e;
				const tempFilePaths = tempFiles
				console.log(JSON.stringify(tempFiles));
				/**
				 * 依次使用字段attachment1
				 * 
				 * 当用完，隐藏按钮
				 */
				let count = 3
				if (this.constractDetails.attachment1) {
					count--;
				}
				if (this.constractDetails.attachment2) {
					count--;
				}
				if (this.constractDetails.attachment3) {
					count--;
				}
				if (tempFilePaths.length > count) {
					uni.showToast({
						title: `您仅能上传${count}个附件`,
						icon: "none"
					})
					return
				}
				let fileArr = []
				await Promise.all(
					tempFilePaths.map((item) => {
						return this.$util.uploadFile(item).then(res => {
							const {
								data
							} = res
							const jsonData = JSON.parse(data)
							if (jsonData.code == 200) {
								fileArr.push(jsonData.data)
							} else {
								uni.showToast({
									title: "文件上传出现异常错误",
									icon: "none"
								})
							}
						})
					})).then(() => {
					for (let i = 0; i < fileArr.length; i++) {
						let item = fileArr[i]
						if (!this.constractDetails.attachment1) {
							this.constractDetails.attachment1 = item
							continue;
						}
						if (!this.constractDetails.attachment2) {
							this.constractDetails.attachment2 = item
							continue;
						}
						if (!this.constractDetails.attachment3) {
							this.constractDetails.attachment3 = item
							continue;
						}
					}
					let param = {}
					if (this.constractDetails.attachment1) {
						param.attachment1 = this.constractDetails.attachment1
					}
					if (this.constractDetails.attachment2) {
						param.attachment2 = this.constractDetails.attachment2
					}
					if (this.constractDetails.attachment3) {
						param.attachment3 = this.constractDetails.attachment3
					}
					constractList('put', 'update', {
						id: this.outsideRoom.constractId,
						...param
					}).then(res => {
						this.$util.Tips({
							title: '已为您添加附件',
							icon: 'success'
						}, {
							tab: 3
						})
					})
				})

			},
			delayConstract() {
				// uni.showModal({
				// 	title: '提示',
				// 	content: '确认续租该合同吗？',
				// 	success: (res) => {
				// 		if (res.confirm) {
				// 			const delayYear = Number(this.constractDetails.endTime.split("-")[0]) + 1
				// 			this.disabled = true
				// 			constractList('put', 'update', {
				// 				id: this.outsideRoom.constractId,
				// 				endTime: `${delayYear}-${this.constractDetails.endTime.split("-")[1]}-${this.constractDetails.endTime.split("-")[2]}`
				// 			}).then(res => {
				// 				this.$util.Tips({
				// 					title: '合同已续租一年',
				// 					icon: 'success'
				// 				}, {
				// 					tab: 3
				// 				})
				// 			}).finally(() => {
				// 				this.disabled = false
				// 			})
				// 		} else if (res.cancel) {
				// 			console.log('用户点击取消');
				// 		}
				// 	}
				// });
				let item = {
					contractId: this.outsideRoom.constractId
				}
				debugger
				uni.navigateTo({
					url: `/pages/services/saveContractPayInfo/index?${this.$util.convertObjectToString(item)}`
				})
			},
			addConstract() {
				let item = {
					roomName: this.outsideRoom.roomName,
					roomIds: this.outsideRoom.id
				}
				uni.navigateTo({
					url: `/pages/services/addConstract/index?${this.$util.convertObjectToString(item)}`
				})
			},
			stop() {
				uni.showModal({
					title: '提示',
					content: '是否释放该房间的使用权？',
					success: (res) => {
						if (res.confirm) {
							this.disabled = true
							updateRoom({
								id: this.outsideRoom.id,
								inuse: 0
							}).then(res => {
								this.$util.Tips({
									title: '房间已可用',
									icon: 'success'
								}, {
									tab: 3
								})
							}).finally(() => {
								this.disabled = false
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});

			}
		},
		beforeCreate() {

		},
		onLoad(options) {
			const {
				constractId,
				roomName,
				companyName,
				constractName,
				end_time,
				id,
				inuse
			} = options
			this.outsideRoom = {
				...options
			}
			uni.setNavigationBarTitle({
				title: roomName
			})
			// this.constractDetails = {
			//   ...this.constractDetails,
			//   ...options
			// }

		},
		onShow() {
			getAllDic("paystatus").then(res => {
				this.paystatusArr = res.data[0].items
			})
			getConstractDetails(this.outsideRoom.constractId).then(res => {
				this.constractDetails = res.data
				// if (this.constractDetails.attachment1 && this.constractDetails.attachment2 && this.constractDetails.attachment3) {
				// 	this.takePictureDisabled = false
				// }
			})
			constractList("get", "list", {
				roomid: this.outsideRoom.id
			}).then((res) => {
				this.constractAboutRoom = res.data
			})
			getPayInfoListHistory({
				contractId: this.outsideRoom.constractId
			}).then(res => {
				this.payHistory = res.data
			})
		},
		beforeMount() {

		},
		async mounted() {
			const res = await this.$util.getSelectorQueryInfo('.bottomBtnEle')
			const res2 = await this.$util.getSelectorQueryInfo('.nav')
			this.needExceptHeight.push(res.height)
			this.needExceptHeight.push(res2.height)
		},
		onReady() {

		},
		beforeUpdate() {

		},
		updated() {

		},
		beforeDestroy() {

		},
		destroyed() {

		},
		beforeRouteUpdate() {

		},
		beforeRouteLeave() {

		},
		beforeRouteEnter() {

		}
	}
</script>

<style lang="scss" scoped="scoped">
	.nav .item {
		text-align: center;
		font-size: 28rpx;
		font-weight: 400;
		color: rgba(17, 26, 52, 0.8);
		line-height: 25rpx;
	}

	.nav .item.on {
		color: #2E6CF5;
		position: relative;

		&::after {
			content: '';
			height: 6rpx;
			width: 40rpx;
			position: absolute;
			bottom: -14rpx;
			left: 50%;
			background-color: #2E6CF5;
			border-radius: 4rpx;
			border-top-left-radius: 2px;
			border-top-right-radius: 2px;
			border-bottom-right-radius: 2px;
			border-bottom-left-radius: 2px;
			transform: translateX(-50%);
		}
	}

	.record+.record {
		margin-top: 32rpx;
	}

	.action {
		width: 168rpx;
		font-size: 28rpx;
		font-weight: 400;
		color: #3958FF;
		text-align: right;
	}

	.record_list {
		height: calc(100% - constant(safe-area-inset-bottom) - 38rpx);
		height: calc(100% - env(safe-area-inset-bottom) - 38rpx); ///兼容 IOS>11.2/
		overflow: overlay;
	}

	.picture+.picture {
		margin-top: 24rpx;
	}

	.pinchuan_button {
		padding: 0 !important;
		font: 30rpx !important;
		font-weight: 600 !important;
		color: rgba(0, 0, 0, 0.9) !important;
	}

	.primary_button {
		color: #fff !important;
	}

	.pinchuan_button+.pinchuan_button {
		margin-left: 24rpx;
	}

	::v-deep .uni-file-picker {
		margin-right: 24rpx;
	}

	::v-deep .append_constract {
		width: 100%;
		height: 100%;
		padding: 0 !important;
		font-size: 32rpx !important;
		font-weight: 600 !important;
		color: rgba(0, 0, 0, 0.9) !important;
		text-align: center;
		background-color: #E2E4EC;
		border-color: #E2E4EC;
		border-radius: 4rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>