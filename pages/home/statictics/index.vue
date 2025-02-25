<template>
	<view class="container_mini">
		<view class="whiteBg container_mini_header">
			<HeadPlaceHolder></HeadPlaceHolder>
			<view class="marginTop44">
				<HeadTitle title="任务统计"></HeadTitle>
			</view>
		</view>
		<!-- 饼环示例-开始 -->
		<view class="padding32" :style="'overflow: overlay;height:' + height">
			<PickerCommon @changeTime="changeTime" :showIcon="false" style="width: 100%" type="date" fields="month" :diyBtn="true"
				:marginBottom="24" :nameDiyStyle="true"></PickerCommon>
			<view class="chart-con">
				<view class="chart-wrap">
					<view class="title">
						<view class="title-desc">工作时长</view>
					</view>
					<view class="ring-chart">
						<l-echart style="height: 100%;" ref="ringChart"></l-echart>
					</view>
				</view>
			</view>
			<!-- 饼环示例-结束 -->
			<!-- 折线示例-开始 -->
			<view class="chart-con gap">
				<view class="chart-wrap">
					<view class="title">
						<view class="title-desc">总任务数</view>
					</view>
					<view class="line-chart-con">
						<l-echart style="height: 100%;" class="line-chart" ref="lineChart"></l-echart>
					</view>
				</view>
			</view>
		</view>
		<!-- 折线示例-结束 -->
		<Tabbar :pagePath="'/pages/service/statictics/index'"></Tabbar>
	</view>
</template>

<script>
	//若开发者工具上传时提示包太大，在hbuilder中点击发行后进行预览上传
	//如果你使用的是vue2（当前使用的是vue2和vue3都兼容的方式），包可以更小，优化方式如下：
	//1.删除项目根目录node_moudules文件夹；
	//2.在https://echarts.apache.org/zh/builder.html链接定制相应图标，例如按默认的下载大概500kb左右，名称为echarts.min.js；
	//3.将echarts.min.js放入到uni_modules/lime-echart/static目录下，通过这样引入：
	// import * as echarts from '@/uni_modules/lime-echart/static/echarts.min.js';
	//4.删除从本行的下一行开始到export default {之间的代码，其他不变。
	import Tabbar from "@/components/tabbar/index.vue"
	import LEchart from "@/components/lime-echart/components/l-echart/l-echart.vue"
	import HeadPlaceHolder from "@/components/headPlaceHolder/index.vue"
	import PickerCommon from "@/pages/component/picker/picker.vue"
	import HeadTitle from "@/components/headTitle/index.vue"
	import * as echarts from '@/uni_modules/lime-echart/static/echarts.min.js';
	// import {
	// 	LineChart,
	// 	BarChart
	// } from 'echarts/charts';
	// import {
	// 	TooltipComponent,
	// 	GridComponent,
	// } from 'echarts/components';
	// import {
	// 	CanvasRenderer
	// } from 'echarts/renderers';
	import {
		getWorkingCounts,
		getWorkingHours
	} from "@/api/statictics.js"
	import dayjs from "dayjs"
	// 注册必须的组件
	// echarts.use([
	// 	TooltipComponent,
	// 	GridComponent,
	// 	LineChart,
	// 	BarChart,
	// 	CanvasRenderer
	// ]);
	export default {
		components: {
			Tabbar,
			LEchart,
			HeadPlaceHolder,
			HeadTitle,
			PickerCommon
		},
		data() {
			const self = this
			return {
				type: 1, //交易分析模块里的类型
				jdData: {}, //进度那块数据
				height: 0,
				time: dayjs().format("YYYY年MM月DD日"),
				nameStyle: {
					fontSize: '32rpx',
					fontWeight: '500',
					color: 'rgba(17,26,52,0.8)'
				},
				barOption: {
					grid: {
						left: '0%',
						right: '4%',
						bottom: 0,
						top: 0,
						containLabel: true
					},
					yAxis: {
						type: 'category',
						data: [],
						axisTick: {
							alignWithLabel: true
						}
					},
					xAxis: {
						type: 'value'
					},
					tooltip: {
						trigger: 'axis',
						triggerOn: 'click',
						formatter: '{b} \n 工作时长: {c}'
					},
					//设置颜色，这里是3条故这只3个颜色
					color: ['#3958FF'],
					series: [{
						type: 'bar',
						barWidth: '14',
						data: []
					}]
				},
				lineOption: {
					xAxis: {
						type: 'category',
						// x轴数据文字颜色
						axisLabel: {
							color: '#a7a7a7'
						},
						// x轴那天坐标轴线的颜色
						axisLine: {
							lineStyle: {
								color: '#f1f1f1',
							}
						},
						//x轴上面刻度线隐藏
						axisTick: {
							show: false,
						},
						//这里是x轴数据
						data: []
					},
					//设置网格
					grid: {
						top: 24,
						bottom: 24,
					},
					//y轴设置
					yAxis: {
						type: 'value',
						//y轴标签文字颜色
						axisLabel: {
							color: '#a7a7a7'
						},
						// y轴分割线设置为虚线
						splitLine: {
							show: true,
							lineStyle: {
								type: 'dashed'
							}
						}
					},
					//设置提示为点击时
					tooltip: {
						trigger: 'axis',
						triggerOn: 'click',
						formatter: '{b} \n 任务总数: {c}'
					},
					//设置曲线的颜色
					color: ['#3958FF'],
					series: [{
						//这里是数据
						data: [],
						type: 'line',
						//设置为平滑，默认为折线
						smooth: false,
					}]
				}
			}
		},
		created() {
			this.changeTime(new Date().getFullYear(), new Date().getMonth() + 1)
		},
		async mounted() {
			const res = await this.$util.getSelectorQueryInfo('.container_mini_header')
			const safeAreaBottom = uni.getSystemInfoSync().safeAreaInsets.bottom
			this.height = `calc(100% - ${res.height+safeAreaBottom+286}rpx)`
			this.$nextTick(() => {
				//加载饼环数据
				this.loadRingData();
				//加载折线图数据
				this.loadLineData();
			})
		},
		methods: {
			async changeTime(year, month) {
				console.info(year, month)
				await getWorkingHours({
					year: year,
					month: month
				}).then(res => {
					const {
						data
					} = res
					this.barOption.yAxis.data = data.map(item => item.name)
					this.barOption.series[0].data = data.map(item => item.hours)
					this.$refs.ringChart.setOption(this.barOption)
				})
				await getWorkingCounts({
					year: year,
					month: month
				}).then(res => {
					const {
						data
					} = res
					this.lineOption.xAxis.data = data.map(item => item.name)
					this.lineOption.series[0].data = data.map(item => item.cnt)
					this.$refs.lineChart.setOption(this.lineOption)
				})
			},
			//加载饼环数据,这里可以去请求服务器获取数据
			loadRingData() {
				//这里option配置参考文档：https://echarts.apache.org/zh/option.html
				this.$refs.ringChart.init(echarts, chart => {
					chart.setOption(this.barOption)
				});
			},
			//加载折线图数据
			loadLineData() {
				//这里option配置参考文档：https://echarts.apache.org/zh/option.html
				this.$refs.lineChart.init(echarts, chart => {
					chart.setOption(this.lineOption);
				});
			}
		},
	}
</script>

<style lang="scss" scoped>
	.content {
		width: 100%;
		min-height: 100vh;
		background-color: #f1f3f2;
		padding: 20rpx 0rpx 100rpx;
	}

	.t-sm {
		font-size: 22rpx;
		color: #6e6e6e;
		padding-left: 10rpx;
	}

	.chart-con {
		width: 100%;
		box-sizing: border-box;

		.chart-wrap {
			width: 100%;
			box-sizing: border-box;
			background-color: #ffffff;
			padding: 32rpx 0rpx;
			border-radius: 20rpx;

			.title {
				box-sizing: border-box;
				width: 100%;
				padding: 0rpx 28rpx;
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
			}

			.ver-line {
				height: 30rpx;
				width: 8rpx;
				border-radius: 10rpx;
				background-color: #4e9d77;
			}

			.title-desc {
				font-size: 34rpx;
				font-weight: 600;
				color: rgba(0, 0, 0, 0.9);
			}

			.ring-chart {
				max-height: 700rpx;
				min-height: 350rpx;
				width: 100%;
				box-sizing: border-box;
				padding: 0rpx 28rpx;
				margin-top: 32rpx;
			}

			.process-con {
				padding: 50rpx 28rpx 18rpx;
				box-sizing: border-box;
				width: 100%;

				.process-item:not(:last-child) {
					margin-bottom: 50rpx;
				}

				.process-item {
					display: flex;
					flex-direction: row;
					justify-content: flex-start;
					align-items: center;

					.pay-img {
						width: 65rpx;
						height: 65rpx;
					}

					.percent-con {
						display: flex;
						flex-direction: column;
						justify-content: flex-start;
						align-items: center;
						flex: 1;
						padding-left: 28rpx;

						.top {
							display: flex;
							flex-direction: row;
							justify-content: space-between;
							align-items: center;
							font-size: 28rpx;
							color: #222222;
							width: 100%;

						}

						.bot {
							width: 100%;
							height: 12rpx;
							background-color: #f5f5f5;
							border-radius: 10rpx;
							position: relative;
							margin-top: 14rpx;

							.percent-num {
								background-color: #4e9d77;
								position: absolute;
								height: 100%;
								top: 0;
								left: 0;
								z-index: 1;
								border-radius: 10rpx;
								transition: width .5s ease-in;
							}
						}
					}
				}
			}

			.line-chart-con {
				width: 100%;
				box-sizing: border-box;
				padding: 0rpx 28rpx;

				.fun-tabs {
					margin-top: 42rpx;
					display: flex;
					flex-direction: row;
					justify-content: space-between;
					align-self: center;
					width: 100%;
					box-sizing: border-box;

					.tab-item {
						width: 200rpx;
						height: 120rpx;
						border-radius: 10rpx;
						padding-left: 20rpx;
						background: #ffffff;
						border: 1rpx solid #ececec;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: flex-start;
						box-sizing: border-box;

						.item-name {
							color: #6e6e6e;
							font-size: 20rpx;
						}

						.item-val {
							color: #222222;
							font-size: 24rpx;
							font-weight: bold;
							margin-top: 20rpx;
						}
					}

					.selected {
						background: #edf5f1 !important;
						border: 1rpx solid #4e9d77 !important;

						.item-name {
							color: #4e9d77 !important;
						}

						.item-val {
							color: #4e9d77 !important;
						}
					}
				}

				.line-chart {
					margin-top: 30rpx;
					height: 380rpx;
				}
			}
		}
	}


	.gap {
		margin-top: 24rpx;
	}

	.t-items {
		width: 690rpx;
		box-sizing: border-box;
		display: flex;
		flex-direction: row;
		justify-content: space-evenly;
		align-items: center;
		background: #fff;
		margin: 10rpx auto;

		.t-item {
			font-size: 28rpx;
			color: #222222;
			height: 80rpx;
			line-height: 80rpx;
			font-weight: bold;
		}

	}
</style>