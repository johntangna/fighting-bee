<template>
	<view class="content">
		<view class="t-items">
			<view class="t-item" @click="toLeapChart('../pieChart/pieChart')">饼图</view>
			<view class="t-item" @click="toLeapChart('../lineChart/lineChart')">折线图</view>
			<view class="t-item" @click="toLeapChart('../barChart/barChart')">柱状图</view>
		</view>
		<!-- 饼环示例-开始 -->
		<view class="chart-con">
			<view class="chart-wrap">
				<view class="title">
					<view class="ver-line"></view>
					<view class="title-desc">访问UV统计<text class="t-sm">(饼环示例)</text></view>
				</view>
				<view class="ring-chart">
					<l-echart ref="ringChart"></l-echart>
				</view>
			</view>
		</view>
		<!-- 饼环示例-结束 -->
		<!-- 折线示例-开始 -->
		<view class="chart-con gap">
			<view class="chart-wrap">
				<view class="title">
					<view class="ver-line"></view>
					<view class="title-desc">收益分析<text class="t-sm">(折线示例-切换重绘)</text></view>
				</view>
				<view class="line-chart-con">
					<view class="fun-tabs">
						<view :class="{'tab-item':true,'selected':type==1} " @click="changeType(1)">
							<view class="item-name">总收入</view>
							<view class="item-val">87670.32</view>
						</view>
						<view :class="{'tab-item':true,'selected':type==2}" @click="changeType(2)">
							<view class="item-name">总支出</view>
							<view class="item-val">2134.10</view>
						</view>
						<view :class="{'tab-item':true,'selected':type==3}" @click="changeType(3)">
							<view class="item-name">订单量</view>
							<view class="item-val">9877</view>
						</view>
					</view>
					<l-echart class="line-chart" ref="lineChart"></l-echart>
				</view>
			</view>
		</view>
		<!-- 折线示例-结束 -->
		<!-- 进度条示例-开始 -->
		<view class="chart-con gap">
			<view class="chart-wrap">
				<view class="title">
					<view class="ver-line"></view>
					<view class="title-desc">支付笔数<text class="t-sm">(进度条示例)</text></view>
				</view>
				<view class="process-con">
					<view class="process-item">
						<image class="pay-img" src="/static/zfb.png">
						</image>
						<view class="percent-con">
							<view class="top">
								<view class="name">支付宝</view>
								<view class="num">{{jdData.zfb || ''}}笔</view>
							</view>
							<view class="bot">
								<view class="percent-num" :style="{width: (jdData.zfbPercent || '0%')}"></view>
							</view>
						</view>
					</view>
					<view class="process-item">
						<image class="pay-img" src="/static/wx.png">
						</image>
						<view class="percent-con">
							<view class="top">
								<view class="name">微信</view>
								<view class="num">{{jdData.wx || ''}}笔</view>
							</view>
							<view class="bot">
								<view class="percent-num" :style="{width: (jdData.wxPercent || '0%')}"></view>
							</view>
						</view>
					</view>
					<view class="process-item">
						<image class="pay-img" src="/static/yzf.png">
						</image>
						<view class="percent-con">
							<view class="top">
								<view class="name">翼支付</view>
								<view class="num">{{jdData.yzf || ''}}笔</view>
							</view>
							<view class="bot">
								<view class="percent-num" :style="{width: (jdData.yzfPercent || '0%')}"></view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	//若开发者工具上传时提示包太大，在hbuilder中点击发行后进行预览上传
	//如果你使用的是vue2（当前使用的是vue2和vue3都兼容的方式），包可以更小，优化方式如下：
	//1.删除项目根目录node_moudules文件夹；
	//2.在https://echarts.apache.org/zh/builder.html链接定制相应图标，例如按默认的下载大概500kb左右，名称为echarts.min.js；
	//3.将echarts.min.js放入到uni_modules/lime-echart/static目录下，通过这样引入：
	//import * as echarts from '@/uni_modules/lime-echart/static/echarts.min.js';
	//4.删除从本行的下一行开始到export default {之间的代码，其他不变。
	import * as echarts from 'echarts/core';
	import {
		LineChart,
		PieChart
	} from 'echarts/charts';
	import {
		TooltipComponent,
		GridComponent,
	} from 'echarts/components';
	import {
		CanvasRenderer
	} from 'echarts/renderers';
	// 注册必须的组件
	echarts.use([
		TooltipComponent,
		GridComponent,
		LineChart,
		PieChart,
		CanvasRenderer
	]);
	export default {
		data() {
			return {
				type: 1, //交易分析模块里的类型
				jdData: {}, //进度那块数据
			}
		},
		mounted() {
			this.$nextTick(() => {
				//加载进度那块数据
				this.loadJdData();
				//加载饼环数据
				this.loadRingData();
				//加载折线图数据
				this.loadLineData();
			})
		},
		methods: {
			//跳转
			toLeapChart(path){
				uni.navigateTo({
					url:path
				})
			},
			//切换交易分析模块里的类型
			changeType(tp) {
				//设置类型
				this.type = tp;
				//重新加载数据
				this.loadLineData();
			},
			//加载进度那块数据,这里可以去请求服务器获取数据
			loadJdData() {
				//请求服务器获取数据然后处理
				let res = {
					wx: 330, //微信笔数
					zfb: 200, //支付宝笔数
					yzf: 100, //翼支付笔数
				}
				//请求数据处理成进度条数据
				res = {
					...res,
					//下面计算进度条比例
					wxPercent: res.wx >= 300 ? '100%' : ((res.wx / 300 * 100).toFixed(2) + "%"),
					zfbPercent: res.zfb >= 300 ? '100%' : ((res.zfb / 300 * 100).toFixed(2) + "%"),
					yzfPercent: res.yzf >= 300 ? '100%' : ((res.yzf / 300 * 100).toFixed(2) + "%"),
				}
				this.jdData = res;
			},
			//加载饼环数据,这里可以去请求服务器获取数据
			loadRingData() {
				//这里请求服务器得到数据
				let data = [{
						name: '手机APP',
						value: 2000
					},
					{
						name: '小程序',
						value: 1500
					},
					{
						name: 'H5网页',
						value: 900
					},
					{
						name: 'PC端',
						value: 300
					},
					{
						name: '其它',
						value: 2001
					}
				];

				//这里option配置参考文档：https://echarts.apache.org/zh/option.html
				this.$refs.ringChart.init(echarts, chart => {
					chart.setOption({
						series: [{
							type: 'pie',
							// selectedMode: 'single',
							// selectedOffset: 0,
							// hoverAnimation: false,
							radius: [50, 80],
							left: 'center',
							width: '98%',
							//隐藏默认白边
							itemStyle: {
								borderColor: '#fff',
								borderWidth: 0
							},
							//格式化label显示
							label: {
								alignTo: 'edge',
								formatter: '{name|{b}}\n{time|{c} 人}',
								minMargin: 5,
								edgeDistance: 20,
								lineHeight: 24,
								rich: {
									time: {
										fontSize: 10,
										color: '#999'
									}
								}
							},
							//指向label的线设置
							labelLine: {
								length: 15,
								length2: 0,
								maxSurfaceAngle: 80
							},
							//布局样式
							labelLayout: function(params) {
								const isLeft = params.labelRect.x < chart.getWidth() / 2;
								const points = params.labelLinePoints;

								points[2][0] = isLeft ?
									params.labelRect.x :
									params.labelRect.x + params.labelRect.width;
								return {
									labelLinePoints: points
								};
							},

							//数据
							data: data
						}]
					});
					//默认突出高亮显示，可以放开下面注释
					// chart.dispatchAction({
					// 	type: 'highlight',
					// 	seriesIndex: 0,
					// 	dataIndex: 0
					// });
					//监听图标项点击事件
					chart.on("click", function(e) {
						for (var i = 0; i < data.length; i++) {
							if (i != e.dataIndex) {
								chart.dispatchAction({
									type: 'downplay', //取消高亮显示;
									seriesIndex: 0,
									dataIndex: i
								});
							} else {
								chart.dispatchAction({
									type: 'highlight', //突出高亮显示;
									seriesIndex: 0,
									dataIndex: i
								});
							}
						}
					});
				});
			},
			//加载折线图数据
			loadLineData() {
				//这里请求服务器拿到数据
				let res = {
					//x轴数据
					xData: ['6/11', '6/12', '6/13', '6/14', '6/15', '6/16', '6/17'],
					//y轴数据
					yData: [50, 120, 150, 220, 180, 300, 130],
				}
				//这里option配置参考文档：https://echarts.apache.org/zh/option.html
				let option = {
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
						data: res.xData
					},
					//设置网格
					grid: {
						top: 40,
						bottom: 30,
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
						formatter: '{b} \n 数据: {c}'
					},
					//设置曲线的颜色
					color: ['#4e9d77'],
					series: [{
						//这里是数据
						data: res.yData,
						type: 'line',
						//设置为平滑，默认为折线
						smooth: true,
					}]
				};

				this.$refs.lineChart.init(echarts, chart => {
					chart.setOption(option);
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
		margin-top: 30rpx;
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