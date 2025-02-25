<template>
	<view class="new-users lightGreyBg height100vh flex flex-col">
		<!-- <HeadLogo></HeadLogo> -->
		<view class="padding28 relative zIndex1 overflowAuto flex1">
			<view class="formBuilder height100">
				<view class="form">
					<form>
						<view class="form-line acea-row row-middle">
							<label for="" class="flex1">付款状态</label>
							<picker @change="bindPickerChange" :value="index" :range="range">
								<view class="acea-row row-middle">
									<view class="uni-input">{{paystatusArr[index].itemText}}</view>
									<image src="../../../static/asset/矩形(4).png" class="flag rotateToRightAngleReverse"
										mode="aspectFit">
									</image>
								</view>
							</picker>
							<!-- <text class="text" style="margin-left: 8rpx;margin-bottom: -4rpx;" for="">计费吨</text> -->
						</view>
						<view class="form-line">
							<label for="">缴费金额</label>
							<input class="uni-input" placeholder="请输入缴费金额" v-model="data.money" />
						</view>
						<view class="form-line">
							<label for="">缴费时间</label>
							<uni-datetime-picker :showForward="false" type="datetime" v-model="data.payTime" />
						</view>
					</form>
				</view>
			</view>
		</view>
		<view class="whiteBg bottomBtnEle">
			<button @tap="save" :disabled="disabled" form-type="submit"
				class="pinchuan_button primary_button fontWeight550 fontSize32NoLineheight"
				hover-class="primary_button_hover">补充款项</button>
		</view>
	</view>
</template>

<script>
	import {
		saveContractPayInfo
	} from "@/api/constract.js"
	import {
		getAllDic
	} from "@/api/dictionary.js"
	export default {
		name: "SaveContractPayInfo",
		data() {
			return {
				data: {
					contractId: "",
					money: "",
					paystatus: "",
					payTime: ""
				},
				paystatusArr: [],
				index: 0,
				range: []
			}
		},
		onLoad(options) {
			debugger
			options = this.$util.convertNullToEmpty(options)
			this.data.contractId = options.contractId
			// #ifdef MP-WEIXIN
			uni.hideHomeButton()
			// #endif
			getAllDic("paystatus").then(res => {
				this.paystatusArr = res.data[0].items
				this.range = res.data[0].items.map(item => item.itemText)
			})
		},
		methods: {
			save() {
				saveContractPayInfo({
					...this.data,
					paystatus: this.paystatusArr[this.index].itemValue
				}).then(res => {
					this.$util.Tips({
						title: '已补充款项',
						icon: 'success'
					}, {
						tab: 3
					})
				})
			},
			bindPickerChange: function(e) {
				this.index = e.detail.value
			},
		}
	}
</script>
<style lang="scss" scoped>
	.form-line {
		background-color: #fff !important;

		picker {
			width: auto
		}

		label {
			font-size: 30rpx;
			font-weight: 550;
			color: rgba(0, 0, 0, 0.9);
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

	.new-users {
		.backgroundColor {
			background: linear-gradient(to left bottom, #ffeded, #fef1f5);
		}
	}

	::v-deep .uni-date__x-input {
		text-align: right;
		font-size: 30rpx;
	}
</style>