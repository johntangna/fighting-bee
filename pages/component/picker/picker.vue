<template>
	<view class="acea-row items-center relative" :style="'margin-bottom:' + marginBottom + 'rpx'">
		<view class="uni-list" v-if="type == 'common'" >
			<picker @change="bindPickerChange" :value="index" :range="array" range-key="itemText">
				<view class="flex" :class="diyBtn ? '' : 'row-between'">
					<view>
						<view v-if="!array[index].itemText" class="fontSize34 fontWeight400 colorBlack40" >请选择</view>
						<view v-else class="uni-input fontSize34 fontWeight400 colorBlack90" >{{array[index].itemText}}</view>
					</view>
					<view>
						<uni-icons v-if="showIcon" class="icons" type="forward" color="#191919" size="18" style="font-weight: bold;"></uni-icons>
						<image v-else src="../../../static/asset/矩形(2).png" mode="aspectFit" style="width: 30rpx;height: 30rpx;margin-left: 14rpx;"></image>
					</view>
				</view>
				
			</picker>
		</view>
		<view class="uni-list" v-if="type == 'date'">
			<picker mode="date" :value="date" @change="bindDateChange" :fields="fields">
				<view class="flex" :class="diyBtn ? '' : 'row-between'">
					<view>
						<view v-if="!date" class="fontSize34 fontWeight400 colorBlack40">请选择</view>
						<view v-else class="uni-input fontSize34 fontWeight400 colorBlack90" :class="nameDiyStyle ? 'nameDiyStyle' : ''">{{date}}</view>
					</view>
					
					<view>
						<uni-icons v-if="showIcon" class="icons" type="forward" color="#191919" size="18" style="font-weight: bold;"></uni-icons>
						<image v-else src="../../../static/asset/矩形(2).png" mode="aspectFit" style="width: 30rpx;height: 30rpx;margin-left: 14rpx;"></image>
					</view>
				</view>
			</picker>
		</view>
	</view>
</template>
<script>
	import dayjs from "dayjs"
	export default {
		props: {
			type: {
				type: String
			},
			item: {
				type: String,
			},
			array: {
				type: Array,
				default: []
			},
			fields: {
				type: String,
				default: "day"
			},
			showIcon: {
				type: Boolean,
				default: true
			},
			nameDiyStyle: {
				type: Boolean
			},
			marginBottom: {
				type: Number
			},
			diyBtn: {
				type: Boolean,
				default: false
			},
			pickType: {
				type: String,
				default: ''
			}
		},
		data() {
			const current = dayjs().format("YYYY年MM月")
			return {
				title: 'picker',
				index: 0,
				date: current,
			}
		},
		methods: {
			bindPickerChange: function(e) {
				this.index = e.detail.value
				switch (this.pickType){
					case 'taskType':
						this.$emit("changeType", this.index)
						break;
					case 'warning':
						this.$emit("changeWarning", this.index)
						break;
				}
			},
			bindDateChange: function(e) {
				console.info(e.detail.value)
				this.date = dayjs(e.detail.value).format("YYYY年MM月")
				this.$emit("changeTime", e.detail.value.split("-")[0], e.detail.value.split("-")[1])
			},
		},
		mounted() {
		}
	}
</script>

<style lang="scss" scoped>
	.uni-picker-tips {
		font-size: 12px;
		color: #666;
		margin-bottom: 15px;
		padding: 0 15px;
		/* text-align: right; */
	}

	.uni-list {
		z-index: 999;
	}

	.icons {
		font-weight: bold;
		position: absolute;
		right: 0;
	}
	.nameDiyStyle {
		font-size: 32rpx !important;
		font-weight: 500 !important;
		color: rgba(17,26,52,0.8) !important;
	}
</style>