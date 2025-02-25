<template>
	<view class="content">
		<!-- 柱状图示例1-开始 -->
		<view class="chart-con">
			<view class="chart-wrap">
				<view class="title">
					<view class="ver-line"></view>
					<view class="title-desc">访问UV统计<text class="t-sm">(示例1)</text></view>
				</view>
				<view class="ring-chart">
					<l-echart ref="barChart"></l-echart>
				</view>
			</view>
		</view>
		<!-- 柱状图示例1-结束 -->
		<!-- 柱状图示例2-开始 -->
		<view class="chart-con gap">
			<view class="chart-wrap">
				<view class="title">
					<view class="ver-line"></view>
					<view class="title-desc">访问UV统计<text class="t-sm">(示例2多柱状图)</text></view>
				</view>
				<view class="ring-chart">
					<l-echart ref="barChart2"></l-echart>
				</view>
			</view>
		</view>
		<!-- 柱状图示例2-结束 -->
	</view>
</template>

<script>
	import * as echarts from 'echarts/core';
	import {
		BarChart
	} from 'echarts/charts';
	import {
		GridComponent,
		TooltipComponent
	} from 'echarts/components';
	import {
		CanvasRenderer
	} from 'echarts/renderers';
	// 注册必须的组件
	echarts.use([
		TooltipComponent,
		GridComponent,
		BarChart,
		CanvasRenderer
	]);
	export default {
		data() {
			return {

			}
		},
		mounted() {
			//加载柱状图数据--示例1
			this.loadBarData();
			//加载柱状图数据--示例2
			this.loadBarData2();
		},
		methods: {

			//加载柱状图数据,这里可以去请求服务器获取数据
			loadBarData() {
				//这里请求服务器得到数据
				let myData = {
					x: ['手机APP', '小程序', 'H5网页', 'PC端', '其它'],
					y: [2000, 1500, 900, 300, 2001]
				}
				//这里option配置参考文档：https://echarts.apache.org/zh/option.html
				this.$refs.barChart.init(echarts, chart => {
					chart.setOption({
						//设置提示为点击时
						tooltip: {
							trigger: 'axis',
							triggerOn: 'click',
							formatter: '{b} \n 数据: {c}'
						},
						//设置曲线的颜色
						color: ['#4e9d77'],
						grid: {
							left: '1%',
							right: '1%',
							bottom: '1%',
							containLabel: true
						},
						yAxis: [{
							type: 'value'
						}],
						xAxis: [{
							type: 'category',
							data: myData.x,
							axisTick: {
								alignWithLabel: true
							}
						}],
						series: [{
							name: '数量',
							type: 'bar',
							// barWidth: '60%',
							data: myData.y
						}]
					});

				});
			},
			//加载柱状图数据,这里可以去请求服务器获取数据
			loadBarData2() {
				//这里请求服务器得到数据
				let myData = {
					x: ['手机APP', '小程序', 'H5网页', 'PC端', '其它'],
					y: [2000, 1500, 900, 300, 2001],
					y1: [800, 1700, 1900, 200, 701],
				}
				//这里option配置参考文档：https://echarts.apache.org/zh/option.html
				this.$refs.barChart2.init(echarts, chart => {
					chart.setOption({
						grid: {
							left: '1%',
							right: '1%',
							bottom: '1%',
							containLabel: true
						},
						yAxis: [{
							type: 'value'
						}],
						xAxis: [{
							type: 'category',
							data: myData.x,
							axisTick: {
								alignWithLabel: true
							}
						}],
						tooltip: {
							trigger: 'axis',
							triggerOn: 'click',
							formatter: '{b}:  \n {a0}: {c0} \n {a1}: {c1}'
						},
						//设置颜色，这里是3条故这只3个颜色
						color: ['#4e9d77','#ee6666'],
						series: [{
							name: '指标1',
							type: 'bar',
							// barWidth: '60%',
							data: myData.y
						},
						{
							name: '指标2',
							type: 'bar',
							// barWidth: '60%',
							data: myData.y1
						}]
					});
			
				});
			},
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
		padding: 0rpx 28rpx;

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
				font-size: 30rpx;
				color: #222222;
				margin-left: 22rpx;
				font-weight: bold;
			}

			.ring-chart {
				height: 400rpx;
				width: 100%;
				box-sizing: border-box;
				padding: 0rpx 28rpx;
				margin-top: 32rpx;
			}
		}
	}


	.gap {
		margin-top: 30rpx;
	}
</style>