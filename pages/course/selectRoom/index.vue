<template>
	<view class="container_mini whiteBg flex flex-col">
		<view class="whiteBg container_mini_header">
			<StateHeader :showStateCondition="false" placeholder="请输入房间号"></StateHeader>
		</view>
		<view class="flex" :style="'height:'+ height">
			<view class="height100 flex relative">
				<view class='aside height100'>
					<view class='item acea-row row-center-wrapper' :class='[index==navActive?"on":""]'
						v-for="(item,index) in roomList" :key="index" @click='tap(index)'><text>{{item.cate_name}}</text></view>
				</view>
				<view class='conter flex1'>
					<view>
						<view class='list'>
							<block v-for="(itemn,indexn) in roomDetails" :key="indexn">
								<view class="fontSize34 fontWeight550 colorBlack90 paddingBottom24">{{itemn.cate_detailsName}}</view>
								<view class="paddingBottom24 flex flex-wrap roomItem">
									<view v-for="(itemm,indexm) in itemn.children" :key="indexm">
										<view :class="itemm.select ? ' select' : !itemm.inuse ? 'room' : 'active'" hover-class='none'
											class='item text-center flex justify-center items-center fontSize30 fontWeight400 colorBlack90 hiddenText'
											:style="'padding: 24rpx 40rpx;'" @tap="select(itemm)">
											{{itemm.roomName}}
										</view>
									</view>
								</view>
							</block>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="whiteBg bottomBtnEle">
			<button @tap="save" form-type="submit" class="pinchuan_button primary_button fontWeight550 fontSize32NoLineheight"
				hover-class="primary_button_hover">确定</button>
		</view>
	</view>
</template>

<script>
	import StateHeader from "@/pages/component/stateHeader/index.vue"
	import {
		getConstractList,
		getRoomCascade
	} from '@/api/constract.js';
	const app = getApp()
	export default {
		components: {
			StateHeader
		},
		data() {
			return {
				roomDetails: [],
				roomList: [{
						cate_name: '某某楼层',
						children: [{
								cate_detailsName: '1F',
								children: [{
										roomName: '1408室',
										constractName: '田田妈妈蛋糕房',
										state: 1,
										select: false
									},
									{
										roomName: '1410室',
										constractName: '',
										state: 0,
										select: false
									},
									{
										roomName: '1413室',
										constractName: '阿花室内设计',
										state: 2,
										select: false
									},
									{
										roomName: '1414室',
										constractName: '',
										state: 1,
										select: false
									},
									{
										roomName: '1415室',
										constractName: '',
										state: 0,
										select: false
									},
									{
										roomName: '1416室',
										constractName: '',
										state: 2,
										select: false
									}
								]
							},
							{
								cate_detailsName: '2F',
								children: [{
										roomName: '2408室',
										constractName: '田田妈妈蛋糕房',
										state: 1,
										select: false
									},
									{
										roomName: '2410室',
										constractName: '待租',
										state: 0,
										select: false
									},
									{
										roomName: '2413室',
										constractName: '阿花室内设计',
										state: 2,
										select: false
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
										roomName: '3406室',
										constractName: '我的房间',
										state: 1,
										select: false
									},
									{
										roomName: '3410室',
										constractName: '待租',
										state: 0,
										select: false
									},
									{
										roomName: '3413室',
										constractName: '阿花室内设计',
										state: 2,
										select: false
									}
								]
							},
							{
								cate_detailsName: '2F',
								children: [{
										roomName: '3408室',
										constractName: '田田妈妈蛋糕房',
										state: 1,
										select: false
									},
									{
										roomName: '3410室',
										constractName: '待租',
										state: 0,
										select: false
									},
									{
										roomName: '3413室',
										constractName: '阿花室内设计',
										state: 2,
										select: false
									}
								]
							},
						]
					}, {
						cate_name: '某某楼层',
						children: [{
								cate_detailsName: '1F',
								children: [{
										roomName: '1408室',
										constractName: '田田妈妈蛋糕房',
										state: 1,
										select: false
									},
									{
										roomName: '1410室',
										constractName: '',
										state: 0,
										select: false
									},
									{
										roomName: '1413室',
										constractName: '阿花室内设计',
										state: 2,
										select: false
									},
									{
										roomName: '1414室',
										constractName: '',
										state: 1,
										select: false
									},
									{
										roomName: '1415室',
										constractName: '',
										state: 0,
										select: false
									},
									{
										roomName: '1416室',
										constractName: '',
										state: 2,
										select: false
									}
								]
							},
							{
								cate_detailsName: '2F',
								children: [{
										roomName: '2408室',
										constractName: '田田妈妈蛋糕房',
										state: 1,
										select: false
									},
									{
										roomName: '2410室',
										constractName: '待租',
										state: 0,
										select: false
									},
									{
										roomName: '2413室',
										constractName: '阿花室内设计',
										state: 2,
										select: false
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
										roomName: '3406室',
										constractName: '我的房间',
										state: 1,
										select: false
									},
									{
										roomName: '3410室',
										constractName: '待租',
										state: 0,
										select: false
									},
									{
										roomName: '3413室',
										constractName: '阿花室内设计',
										state: 2,
										select: false
									}
								]
							},
							{
								cate_detailsName: '2F',
								children: [{
										roomName: '3408室',
										constractName: '田田妈妈蛋糕房',
										state: 1,
										select: false
									},
									{
										roomName: '3410室',
										constractName: '待租',
										state: 0,
										select: false
									},
									{
										roomName: '3413室',
										constractName: '阿花室内设计',
										state: 2,
										select: false
									}
								]
							},
						]
					}, {
						cate_name: '某某楼层',
						children: [{
								cate_detailsName: '1F',
								children: [{
										roomName: '1408室',
										constractName: '田田妈妈蛋糕房',
										state: 1,
										select: false
									},
									{
										roomName: '1410室',
										constractName: '',
										state: 0,
										select: false
									},
									{
										roomName: '1413室',
										constractName: '阿花室内设计',
										state: 2,
										select: false
									},
									{
										roomName: '1414室',
										constractName: '',
										state: 1,
										select: false
									},
									{
										roomName: '1415室',
										constractName: '',
										state: 0,
										select: false
									},
									{
										roomName: '1416室',
										constractName: '',
										state: 2,
										select: false
									}
								]
							},
							{
								cate_detailsName: '2F',
								children: [{
										roomName: '2408室',
										constractName: '田田妈妈蛋糕房',
										state: 1,
										select: false
									},
									{
										roomName: '2410室',
										constractName: '待租',
										state: 0,
										select: false
									},
									{
										roomName: '2413室',
										constractName: '阿花室内设计',
										state: 2,
										select: false
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
										roomName: '3406室',
										constractName: '我的房间',
										state: 1,
										select: false
									},
									{
										roomName: '3410室',
										constractName: '待租',
										state: 0,
										select: false
									},
									{
										roomName: '3413室',
										constractName: '阿花室内设计',
										state: 2,
										select: false
									}
								]
							},
							{
								cate_detailsName: '2F',
								children: [{
										roomName: '3408室',
										constractName: '田田妈妈蛋糕房',
										state: 1,
										select: false
									},
									{
										roomName: '3410室',
										constractName: '待租',
										state: 0,
										select: false
									},
									{
										roomName: '3413室',
										constractName: '阿花室内设计',
										state: 2,
										select: false
									}
								]
							},
						]
					}, {
						cate_name: '某某楼层',
						children: [{
								cate_detailsName: '1F',
								children: [{
										roomName: '1408室',
										constractName: '田田妈妈蛋糕房',
										state: 1,
										select: false
									},
									{
										roomName: '1410室',
										constractName: '',
										state: 0,
										select: false
									},
									{
										roomName: '1413室',
										constractName: '阿花室内设计',
										state: 2,
										select: false
									},
									{
										roomName: '1414室',
										constractName: '',
										state: 1,
										select: false
									},
									{
										roomName: '1415室',
										constractName: '',
										state: 0,
										select: false
									},
									{
										roomName: '1416室',
										constractName: '',
										state: 2,
										select: false
									}
								]
							},
							{
								cate_detailsName: '2F',
								children: [{
										roomName: '2408室',
										constractName: '田田妈妈蛋糕房',
										state: 1,
										select: false
									},
									{
										roomName: '2410室',
										constractName: '待租',
										state: 0,
										select: false
									},
									{
										roomName: '2413室',
										constractName: '阿花室内设计',
										state: 2,
										select: false
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
										roomName: '3406室',
										constractName: '我的房间',
										state: 1,
										select: false
									},
									{
										roomName: '3410室',
										constractName: '待租',
										state: 0,
										select: false
									},
									{
										roomName: '3413室',
										constractName: '阿花室内设计',
										state: 2,
										select: false
									}
								]
							},
							{
								cate_detailsName: '2F',
								children: [{
										roomName: '3408室',
										constractName: '田田妈妈蛋糕房',
										state: 1,
										select: false
									},
									{
										roomName: '3410室',
										constractName: '待租',
										state: 0,
										select: false
									},
									{
										roomName: '3413室',
										constractName: '阿花室内设计',
										state: 2,
										select: false
									}
								]
							},
						]
					}, {
						cate_name: '某某楼层',
						children: [{
								cate_detailsName: '1F',
								children: [{
										roomName: '1408室',
										constractName: '田田妈妈蛋糕房',
										state: 1,
										select: false
									},
									{
										roomName: '1410室',
										constractName: '',
										state: 0,
										select: false
									},
									{
										roomName: '1413室',
										constractName: '阿花室内设计',
										state: 2,
										select: false
									},
									{
										roomName: '1414室',
										constractName: '',
										state: 1,
										select: false
									},
									{
										roomName: '1415室',
										constractName: '',
										state: 0,
										select: false
									},
									{
										roomName: '1416室',
										constractName: '',
										state: 2,
										select: false
									}
								]
							},
							{
								cate_detailsName: '2F',
								children: [{
										roomName: '2408室',
										constractName: '田田妈妈蛋糕房',
										state: 1,
										select: false
									},
									{
										roomName: '2410室',
										constractName: '待租',
										state: 0,
										select: false
									},
									{
										roomName: '2413室',
										constractName: '阿花室内设计',
										state: 2,
										select: false
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
										roomName: '3406室',
										constractName: '我的房间',
										state: 1,
										select: false
									},
									{
										roomName: '3410室',
										constractName: '待租',
										state: 0,
										select: false
									},
									{
										roomName: '3413室',
										constractName: '阿花室内设计',
										state: 2,
										select: false
									}
								]
							},
							{
								cate_detailsName: '2F',
								children: [{
										roomName: '3408室',
										constractName: '田田妈妈蛋糕房',
										state: 1,
										select: false
									},
									{
										roomName: '3410室',
										constractName: '待租',
										state: 0,
										select: false
									},
									{
										roomName: '3413室',
										constractName: '阿花室内设计',
										state: 2,
										select: false
									}
								]
							},
						]
					}, {
						cate_name: '某某楼层',
						children: [{
								cate_detailsName: '1F',
								children: [{
										roomName: '1408室',
										constractName: '田田妈妈蛋糕房',
										state: 1,
										select: false
									},
									{
										roomName: '1410室',
										constractName: '',
										state: 0,
										select: false
									},
									{
										roomName: '1413室',
										constractName: '阿花室内设计',
										state: 2,
										select: false
									},
									{
										roomName: '1414室',
										constractName: '',
										state: 1,
										select: false
									},
									{
										roomName: '1415室',
										constractName: '',
										state: 0,
										select: false
									},
									{
										roomName: '1416室',
										constractName: '',
										state: 2,
										select: false
									}
								]
							},
							{
								cate_detailsName: '2F',
								children: [{
										roomName: '2408室',
										constractName: '田田妈妈蛋糕房',
										state: 1,
										select: false
									},
									{
										roomName: '2410室',
										constractName: '待租',
										state: 0,
										select: false
									},
									{
										roomName: '2413室',
										constractName: '阿花室内设计',
										state: 2,
										select: false
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
										roomName: '3406室',
										constractName: '我的房间',
										state: 1,
										select: false
									},
									{
										roomName: '3410室',
										constractName: '待租',
										state: 0,
										select: false
									},
									{
										roomName: '3413室',
										constractName: '阿花室内设计',
										state: 2,
										select: false
									}
								]
							},
							{
								cate_detailsName: '2F',
								children: [{
										roomName: '3408室',
										constractName: '田田妈妈蛋糕房',
										state: 1,
										select: false
									},
									{
										roomName: '3410室',
										constractName: '待租',
										state: 0,
										select: false
									},
									{
										roomName: '3413室',
										constractName: '阿花室内设计',
										state: 2,
										select: false
									}
								]
							},
						]
					}, {
						cate_name: '某某楼层',
						children: [{
								cate_detailsName: '1F',
								children: [{
										roomName: '1408室',
										constractName: '田田妈妈蛋糕房',
										state: 1,
										select: false
									},
									{
										roomName: '1410室',
										constractName: '',
										state: 0,
										select: false
									},
									{
										roomName: '1413室',
										constractName: '阿花室内设计',
										state: 2,
										select: false
									},
									{
										roomName: '1414室',
										constractName: '',
										state: 1,
										select: false
									},
									{
										roomName: '1415室',
										constractName: '',
										state: 0,
										select: false
									},
									{
										roomName: '1416室',
										constractName: '',
										state: 2,
										select: false
									}
								]
							},
							{
								cate_detailsName: '2F',
								children: [{
										roomName: '2408室',
										constractName: '田田妈妈蛋糕房',
										state: 1,
										select: false
									},
									{
										roomName: '2410室',
										constractName: '待租',
										state: 0,
										select: false
									},
									{
										roomName: '2413室',
										constractName: '阿花室内设计',
										state: 2,
										select: false
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
										roomName: '3406室',
										constractName: '我的房间',
										state: 1,
										select: false
									},
									{
										roomName: '3410室',
										constractName: '待租',
										state: 0,
										select: false
									},
									{
										roomName: '3413室',
										constractName: '阿花室内设计',
										state: 2,
										select: false
									}
								]
							},
							{
								cate_detailsName: '2F',
								children: [{
										roomName: '3408室',
										constractName: '田田妈妈蛋糕房',
										state: 1,
										select: false
									},
									{
										roomName: '3410室',
										constractName: '待租',
										state: 0,
										select: false
									},
									{
										roomName: '3413室',
										constractName: '阿花室内设计',
										state: 2,
										select: false
									}
								]
							},
						]
					}, {
						cate_name: '某某楼层',
						children: [{
								cate_detailsName: '1F',
								children: [{
										roomName: '1408室',
										constractName: '田田妈妈蛋糕房',
										state: 1,
										select: false
									},
									{
										roomName: '1410室',
										constractName: '',
										state: 0,
										select: false
									},
									{
										roomName: '1413室',
										constractName: '阿花室内设计',
										state: 2,
										select: false
									},
									{
										roomName: '1414室',
										constractName: '',
										state: 1,
										select: false
									},
									{
										roomName: '1415室',
										constractName: '',
										state: 0,
										select: false
									},
									{
										roomName: '1416室',
										constractName: '',
										state: 2,
										select: false
									}
								]
							},
							{
								cate_detailsName: '2F',
								children: [{
										roomName: '2408室',
										constractName: '田田妈妈蛋糕房',
										state: 1,
										select: false
									},
									{
										roomName: '2410室',
										constractName: '待租',
										state: 0,
										select: false
									},
									{
										roomName: '2413室',
										constractName: '阿花室内设计',
										state: 2,
										select: false
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
										roomName: '3406室',
										constractName: '我的房间',
										state: 1,
										select: false
									},
									{
										roomName: '3410室',
										constractName: '待租',
										state: 0,
										select: false
									},
									{
										roomName: '3413室',
										constractName: '阿花室内设计',
										state: 2,
										select: false
									}
								]
							},
							{
								cate_detailsName: '2F',
								children: [{
										roomName: '3408室',
										constractName: '田田妈妈蛋糕房',
										state: 1,
										select: false
									},
									{
										roomName: '3410室',
										constractName: '待租',
										state: 0,
										select: false
									},
									{
										roomName: '3413室',
										constractName: '阿花室内设计',
										state: 2,
										select: false
									}
								]
							},
						]
					}
				],
				navActive: 0,
				number: "",
				clickLeft: false,
				height: 0,
				selectRoom: []
			}
		},
		computed: {},
		onLoad(options) {
			this.getAllCategory();
		},
		async mounted() {
			const res = await this.$util.getSelectorQueryInfo('.container_mini_header')
			const res2 = await this.$util.getSelectorQueryInfo('.bottomBtnEle')
			const safeAreaBottom = uni.getSystemInfoSync().safeAreaInsets.bottom
			this.height = `calc(100% - ${res.height+res2.height+safeAreaBottom * 3+126}rpx)`
		},
		methods: {
			save() {
				app.globalData.roomList = this.selectRoom
				this.$util.Tips({
					title: '已为您选择房间',
					icon: 'success',
					endTime: 1000
				}, {
					tab: 3
				})
			},
			findSpecifyItem(roomName, select) {
				this.roomDetails.forEach(dName => {
					dName["children"].forEach(dChildren => {
						if (dChildren.roomName == roomName) {
							dChildren["select"] = select
						}
					})
				})
			},
			select(item) {
				if (item.inuse) {
					uni.showToast({
						title: "当前房间已占用",
						icon: "none"
					})
					return
				}
				if (this.selectRoom.some(cb => cb.roomname == item.roomName)) {
					this.selectRoom.splice(this.selectRoom.findIndex(cb => cb.roomname == item.roomName), 1)
					this.findSpecifyItem(item.roomName, false)
				} else {
					this.selectRoom.push({
						roomname: item.roomName,
						roomid: item.id
					})
					this.findSpecifyItem(item.roomName, true)
				}
				this.$forceUpdate()
			},
			createConstract() {
				uni.navigateTo({
					url: `/pages/services/addConstract/index`
				})
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
		width: 165rpx;
		height: 72rpx;
		margin-bottom: 16rpx;
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
		background: #f7f8fb !important;
		border: unset !important;
		font-size: 30rpx !important;
		font-weight: 400 !important;
		color: #a2a3a5 !important;
	}

	.select {
		background: #e5eaff !important;
		color: #3958FF !important;
		border-radius: 4rpx !important;
		border: 2rpx solid #3958FF !important;
	}

	.room {
		background: #EBEDF5;
		border-radius: 4rpx;
	}

	.roomItem {
		&>view {
			&:nth-child(3n-1) {
				margin: 0 16rpx;
			}
		}
	}
</style>