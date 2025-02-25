<template>
	<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower"
		@scroll="scroll" :style="{height: noNeedHeight ? 0 : height, padding: paddingStyle}">
		<slot></slot>
	</scroll-view>
</template>

<script>
	// 共用页面滚动组件
	export default {
		name: "ScrollViewPage",
		props: {
			// 需不需要按照自定义的方式计算高度
			noNeedComputed: {
				type: Boolean,
				default: true
			},
			// 内边距，可不传，外部自己设置也行
			paddingStyle: {
				type: String
			},
			// 需要排除的元素高度
			needExceptHeight: {
				type: Array,
				default: [0]
			},
			// 是否需要底部安全区域
			needBottomSafe: {
				type: Boolean,
				default: true
			},
      // 管理员有额外的元素，方便统一管理，在加一个元素，区分客服和用户
      externalHeight: {
        type: Number,
        default: 0
      },
			// 因为没有数据，所以可以去掉高度
			noNeedHeight: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				scrollTop: 0,
				old: {
					scrollTop: 0
				},
				height: 0
			}
		},
		watch: {
			needExceptHeight: {
				handler(newV) {
					this.height =
						`calc(100% - ${this.needExceptHeight.reduce((pre, next) => pre + next) + (this.needBottomSafe ? uni.getSystemInfoSync().safeAreaInsets.bottom + 28 : 0)}px)`
				},
				deep: true,
				immediate: true
			}
		},
		methods: {
			upper: function(e) {
				console.log(e)
			},
			lower: function(e) {
				console.log(e)
			},
			scroll: function(e) {
				console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
		},
		mounted() {
			// 利用api获取底部安全域高度以及tabar高度，然后，减去，获取当前可以滚动区域高度,126为tabbar的高，20为顶部占位符的高
			const headPlaceHolderHeight = uni.getSystemInfoSync().statusBarHeight
			const safeAreaBottom = uni.getSystemInfoSync().safeAreaInsets.bottom
			const tabbarHeight = 126
			if (this.noNeedComputed) {
				this.height =
					`calc(100% - ${headPlaceHolderHeight + safeAreaBottom * 3 + tabbarHeight + 16 + (this.externalHeight)}rpx)`
			} else {

			}
		}
	}
</script>

<style>
</style>