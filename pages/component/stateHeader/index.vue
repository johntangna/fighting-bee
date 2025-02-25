<template>
	<view>
		<view class="nav acea-row row-around cardStyle marginTop14" v-if="showStateCondition">
			<view class="item" v-for="(header, index) in headersList" :key="index" :class="status == header.itemValue ? 'on' : ''"
				@click="statusClick(header.itemValue)">
				<view>{{header.itemText}}</view>
			</view>
		</view>
		<view v-if="showSearch" style="padding: 0 32rpx;margin-bottom: 8rpx;" class="acea-row items-center row-between">
			<Input ref="input" @featchList="search" style="height: 100%;width: 598rpx;" :placeholder="placeholder" ></Input>
			<text class="fontSize32 fontWeight400 colorBlack90" @click="($event) => search()">搜索</text>
		</view>
		<!-- <view style="padding: 0 32rpx;" class="nav acea-row row-around items-center cardStyle" v-if="showStateCondition">
			<view class="item condition acea-row items-center" v-for="(con, index) in condition" :key="index"
				@click="dispatchAction(con.action)">
				<view class="title acea-row items-center">
					<view>{{con.title}}</view>
					<view class="arrow"></view>
				</view>
			</view>
		</view> -->
		<view style="height: 8rpx;"></view>
		<uni-popup ref="popup" background-color="#fff">
			<view class="popup-content relative" style="width: 80vw">
				<view style="border-radius: 16rpx;border-bottom: 1rpx solid #f3f3f3;">
					<view class="fontSize30 fontWeight500 colorBlack60 marginBottom28">
						任务状态
					</view>
					<view style="border-top: 1px solid #eaeaea;border-bottom: 1px solid #eaeaea;padding: 30rpx 0">
						<uni-data-checkbox @change="checkBoxChange" v-model="mutiState"
							:localdata="stateList"></uni-data-checkbox>
					</view>
					<view @tap="searchByState" class="fontSize30 fontWeight500 absolute colorBlack60"
						style="right: 40rpx; top: 40rpx;">
						确定
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import Input from "@/components/input/index.vue"
	export default {
		components: {
			Input
		},
		props: {
			mutiStatus: {
				type: Array
			},
			showStateCondition: {
				type: Boolean,
				default: true
			},
			placeholder: {
				type: String,
				default: "搜索"
			},
			headers: {
				type: Array
			},
			showSearch: {
				type: Boolean,
				default: true
			}
		},
		data() {
			let self = this
			return {
				status: -1,
				condition: [{
					title: "全部状态",
					action: 'openStateList'
				}],
				mutiState: "",
				headersList: [],
				stateList: []
			}
		},
		watch: {
			headers: {
				handler(newV) {
					// this.stateList = JSON.parse(JSON.stringify(newV))
					// this.stateList.forEach(item => {
					// 	item.text = item.itemText;
					// 	item.value = item.itemValue
					// })
					this.headersList = JSON.parse(JSON.stringify(newV))
					this.headersList.unshift({
						itemValue: "-1",
						itemText: "全部任务"
					})
					this.headersList.splice(2, 0, {
						itemValue: "2",
						itemText: "我指派"
					})
					this.stateList = JSON.parse(JSON.stringify(this.headersList))
					this.stateList.forEach(item => {
						item.text = item.itemText;
						item.value = item.itemValue
					})
				},
				deep: true
			}
		},
		methods: {
			dispatchAction(name) {
				this[name]()
			},
			statusClick(value) {
				this.status = value
				this.mutiState = value
				this.$emit("getTaskList", value)
			},
			openStateList() {
				console.log(1);
				this.$refs.popup.open("center")
			},
			openTimePicker() {
				console.log(2);
			},
			descTime() {
				console.log(3);
			},
			checkBoxChange(e) {
				console.info(e.detail.value)
				const value = e.detail.value
				this.mutiState = value
				this.status = value
			},
			searchByState() {
				this.$refs.popup.close()
				this.$emit('getTaskList', this.mutiState)
			},
			// 输入框查询事件，与原有的列表查询相区分，因为不需要叠加查询
			search(value) {
				let input
				if (value) {
					input = value.detail["__args__"][0]
				} else {
					input = this.$refs.input.value
				}
			  this.$emit("getTaskListByName", input)
			}
		}
	}
</script>

<style scoped lang="scss">
	.nav .item {
		text-align: center;
		padding: 8rpx 0;
		font-size: 28rpx;
		font-weight: 400;
		color: rgba(17, 26, 52, 0.8);
		line-height: 28rpx;
		flex: 1;
		height: 80rpx;

		&>view {
			&:first-child {
				border-right: 1px dotted #333;
			}
		}
	}

	.nav .item.on {
		color: $uni-color-light-primary;
		font-weight: 550;
		position: relative;

		&::after {
			content: '';
			height: 6rpx;
			width: 40rpx;
			position: absolute;
			bottom: 28rpx;
			left: 50%;
			background-color: $uni-color-light-primary;
			border-top-left-radius: 2px;
			border-top-right-radius: 2px;
			border-bottom-right-radius: 2px;
			border-bottom-left-radius: 2px;
			transform: translateX(-50%);
		}
	}

	.popup-content {
		padding: 44rpx 40rpx;
	}

	.condition {
		line-height: 80rpx;
		position: relative;

		.title {
			width: 100%;
			border-right: 2rpx solid #E6E7F1 !important;

			.arrow {
				width: 0;
				height: 0;
				border-top: 10rpx solid #111A34;
				border-right: 10rpx solid transparent;
				border-left: 10rpx solid transparent;
				margin-left: 14rpx;
			}
		}
	}
</style>