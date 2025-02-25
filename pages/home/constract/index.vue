<template>
	<view class="container_mini whiteBg">
		<view class="whiteBg container_mini_header">
			<HeadPlaceHolder></HeadPlaceHolder>
			<view class="marginTop44">
				<HeadTitle title="合同管理" imageSrc="../../static/asset/矩形(11).png" actionTitle="新增"
					@action="createConstract">
				</HeadTitle>
			</view>
			<StateHeader :showSearch="false" :showStateCondition="false" placeholder="请输入甲方搜索"></StateHeader>
		</view>
		<view class="flex" :style="'height:' + height">
			<view class="height100 flex relative">
				<view class='aside height100'>
					<view class='item acea-row row-center-wrapper' :class='[index==navActive?"on":""]'
						v-for="(item,index) in roomList" :key="index" @click='tap(index)'>
						<text>{{item.cate_name}}</text>
					</view>
				</view>
				<view class='conter flex1'>
					<view>
						<view class='list'>
							<block v-for="(itemn,indexn) in roomDetails" :key="indexn">
								<view class="fontSize34 fontWeight550 colorBlack90 paddingBottom24">
									{{itemn.cate_detailsName}}
								</view>
								<view class="paddingBottom24 flex flex-wrap">
									<block v-for="(itemm,indexm) in itemn.children" :key="indexm">
										<view :class="itemm.constractName && itemm.inuse ? 'active' : ''" hover-class='none'
											class='item text-center'
											style="padding: 24rpx 40rpx;border: 1rpx solid #CFD3E1;"
											@tap="goDetails(itemm, itemm.roomName)">
											<view class='fontSize30 fontWeight400 colorBlack90 paddingBottom12'>
												{{itemm.roomName}}
											</view>
											<view class='fontSize24 fontWeight400 colorBlack45 acea-row row-center-wrapper'>
												<div v-if="itemm.constractName && itemm.inuse" class="flag"
													:class="computedColor(itemm.end_time) ? 'redColor' : 'greenColor'"></div>
												<span class="flex1 hiddenText">{{ itemm.inuse ? itemm.constractName : '待租'}}</span>
											</view>
										</view>
									</block>
								</view>
							</block>
						</view>
					</view>
				</view>
			</view>
		</view>
		<tabBar :pagePath="'/pages/service/constract/index'"></tabBar>
	</view>
</template>

<script>
	import HeadPlaceHolder from "@/components/headPlaceHolder/index.vue"
	import tabBar from "@/components/tabbar/index.vue";
	import HeadTitle from "@/components/headTitle/index.vue"
	import StateHeader from "@/pages/component/stateHeader/index.vue"
	import {
		getConstractList,
		getRoomCascade
	} from '@/api/constract.js';
	export default {
		components: {
			tabBar,
			HeadPlaceHolder,
			HeadTitle,
			StateHeader
		},
		data() {
			return {
				navlist: [],
				roomDetails: [],
				roomList: [{
						cate_name: '某某楼层',
						children: [{
								cate_detailsName: '1F',
								children: [{
										roomName: '1408室',
										constractName: '田田妈妈蛋糕房',
										state: 1,
										constract: {
											title: "这是一段合同名称信息内容",
											name: "张三里斯本科技股份有限责任公司",
											startTime: "2022年 2月26日",
											endTime: "2022年 2月26日",
											remark: "",
											attachment1: "微信图片_20231021155029_副本_1697874850523_1698583399622.jpg",
											attachment2: "微信图片_20231020110726_1697861193161_1698583403915.jpg"
										}

									},
									{
										roomName: '1410室',
										constractName: '',
										state: 0,
										constract: {}
									},
									{
										roomName: '1413室',
										constractName: '阿花室内设计',
										state: 2,
										constract: {}
									}
								]
							},
							{
								cate_detailsName: '2F',
								children: [{
										roomName: '1408室',
										constractName: '田田妈妈蛋糕房',
										state: 1,
										constract: {}
									},
									{
										roomName: '1410室',
										constractName: '待租',
										state: 0,
										constract: {}
									},
									{
										roomName: '1413室',
										constractName: '阿花室内设计',
										state: 2,
										constract: {}
									}
								]
							},
						]
					},
					{
						cate_name: '某某楼层',
						children: [{
								cate_detailsName: '1F',
								children: [{
										roomName: '1406室',
										constractName: '我的房间',
										state: 1,
										constract: {}
									},
									{
										roomName: '1410室',
										constractName: '待租',
										state: 0,
										constract: {}
									},
									{
										roomName: '1413室',
										constractName: '阿花室内设计',
										state: 2,
										constract: {}
									}
								]
							},
							{
								cate_detailsName: '2F',
								children: [{
										roomName: '1408室',
										constractName: '田田妈妈蛋糕房',
										state: 1,
										constract: {}
									},
									{
										roomName: '1410室',
										constractName: '待租',
										state: 0,
										constract: {}
									},
									{
										roomName: '1413室',
										constractName: '阿花室内设计',
										state: 2,
										constract: {}
									}
								]
							},
						]
					}
				],
				navActive: 0,
				number: "",
				clickLeft: false,
				height: 0
			}
		},
		onShow(options) {
			this.getAllCategory();
		},
		async mounted() {
			const res = await this.$util.getSelectorQueryInfo('.container_mini_header')
			const safeAreaBottom = uni.getSystemInfoSync().safeAreaInsets.bottom
			this.height = `calc(100% - ${res.height+safeAreaBottom+326}rpx)`
		},
		onReady() {
			// this.$nextTick(()=>{
			// 	const query = uni.createSelectorQuery();
			// 	query.select('#tabbar').boundingClientRect(data => {
			// 		console.log(data)
			// 	}).exec();
			// });
		},
		computed: {
			computedColor(item) {
				return (item) => {
					return new Date().getTime() > new Date(item).getTime()
				}
			}
		},
		methods: {
			createConstract() {
				uni.navigateTo({
					url: `/pages/services/addConstract/index`
				})
			},
			goDetails(item, roomName) {
				// if (item.inuse) {
					uni.navigateTo({
						url: `/pages/services/constractDetails/index?${this.$util.convertObjectToString(item)}`
					})
				// } else {
				// 	this.createConstract({
				// 		roomName: roomName,
				// 		roomIds: item.id
				// 	})
				// }

			},
			infoScroll: function() {
				this.roomDetails = this.roomList[0].children
			},
			tap: function(index) {
				this.clickLeft = true
				this.navActive = index;
				this.roomDetails = this.roomList[index].children
			},
			getAllCategory: function() {
				let that = this;
				getRoomCascade().then(res => {
					that.roomList = res.data;
					setTimeout(function() {
						that.infoScroll();
					}, 500)
				})
			},
			scroll: function(e) {
				// if(!this.clickLeft){
				//   let scrollTop = e.detail.scrollTop;
				//   let scrollArr = this.hightArr;
				//   for (let i = 0; i < scrollArr.length; i++) {
				//   	if (scrollTop >= 0 && scrollTop < scrollArr[1] - scrollArr[0]) {
				//   		this.navActive = 0
				//   	} else if (scrollTop >= scrollArr[i] - scrollArr[0] && scrollTop < scrollArr[i + 1] - scrollArr[0]) {
				//   		this.navActive = i
				//   	} else if (scrollTop >= scrollArr[scrollArr.length - 1] - scrollArr[0]) {
				//   		this.navActive = scrollArr.length - 1
				//   	}
				//   }
				// } else {
				//   this.clickLeft = false
				// }
			},
			searchSubmitValue: function(e) {
				if (this.$util.trim(e.detail.value).length > 0)
					uni.navigateTo({
						url: '/pages/services/constractDetails/index?searchValue=' + e.detail.value
					})
				else
					return this.$util.Tips({
						title: '请填写要搜索的合同名称或者甲方'
					});
			},
		}
	}
</script>

<style scoped lang="scss">
	.container_mini .header {
		width: 100%;
		height: 96rpx;
		background-color: #fff;
		position: relative;
		left: 0;
		right: 0;
		top: 0;
		z-index: 9;
		border-bottom: 1rpx solid #f5f5f5;
	}

	.container_mini .header .input {
		flex: 1;
		height: 72rpx;
		background-color: #f5f5f5;
		border-radius: 50rpx;
		box-sizing: border-box;
		padding: 0 25rpx;
	}

	.container_mini .header .input .iconfont {
		font-size: 35rpx;
		color: #555;
	}

	.container_mini .header .input .placeholder {
		color: #999;
	}

	.container_mini .header .input input {
		font-size: 26rpx;
		height: 100%;
		width: 597rpx;
	}

	.container_mini .aside {
		position: relative;
		width: 168rpx;
		left: 0;
		top: 0;
		background-color: #f7f8fb;
		overflow-y: auto;
		overflow-x: hidden;
		/* 兼容 IOS<11.2 */
		bottom: calc(126rpx+ constant(safe-area-inset-bottom));
		/* 兼容 IOS>11.2 */
		bottom: calc(126rpx + env(safe-area-inset-bottom));
	}

	.container_mini .aside .item {
		height: 112rpx;
		width: 100%;
		font-size: 26rpx;
		color: rgba(0, 0, 0, 0.4);
		font-weight: 400;
		text-align: center;
		padding: 10rpx;
	}

	.container_mini .aside .item.on {
		width: 100%;
		color: #3958ff;
		font-weight: 550;
	}

	.container_mini .conter {
		padding: 0 24rpx;
		background-color: #fff;
		overflow: overlay;
	}

	.container_mini .conter .listw {}

	.container_mini .conter .listw .title {
		height: 90rpx;
	}

	.container_mini .conter .listw .title .line {
		width: 100rpx;
		height: 2rpx;
		background-color: #f0f0f0;
	}

	.container_mini .conter .listw .title .name {
		font-size: 30rpx;
		color: #333;
		margin: 0 30rpx;
		font-weight: bold;
	}

	.container_mini .conter .list {
		flex-wrap: wrap;
	}

	.container_mini .conter .list .item {
		width: 259rpx;
		height: 114rpx;
		margin-bottom: 16rpx;

		&:nth-child(odd) {
			margin-right: 16rpx;
		}
	}

	.container_mini .conter .list .item .name {
		font-size: 24rpx;
		color: #333;
		height: 56rpx;
		line-height: 56rpx;
		width: 120rpx;
		text-align: center;
	}

	.active {
		background-color: #EBEDF5 !important;
		border: unset !important;
	}

	.flag {
		width: 10rpx;
		height: 10rpx;
		border-radius: 50%;
		margin-right: 7rpx;
	}

	.redColor {

		background: #FF5151;
	}

	.greenColor {

		background: #16C335;
	}
</style>