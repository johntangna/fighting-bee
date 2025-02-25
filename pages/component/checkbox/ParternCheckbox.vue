<template>
	<view class="uni-list">
		<checkbox-group @change="checkboxChange">
			<label class="uni-list-cell uni-list-cell-pd acea-row items-center" v-for="item in items" :key="item.value">
				<view>
					<checkbox class="checkbox" :value="item.value" :checked="item.checked" />
				</view>
				<view class="item">
					<image :src="item.avatar ? computedAvatar(item) : '../../../static/asset/蒙版(6).png'" mode="aspectFit"></image>
					<view class="marginLeft24">
						<view class="fontSize34 colorBlack90 fontWeight400">{{item.text}}</view>
						<view class="marginTop12 fontSize28 colorBlack40 fontWeight400">{{item.job || ""}}</view>
					</view>
				</view>
			</label>
		</checkbox-group>
	</view>
</template>
<script>
	import {
		IMG_HTTP_REQUEST_HEAD,
		IMG_REQUEST_URL
	} from "@/config/app.js"
	export default {
		props: {
			helpPerson: {
				type: Array,
				default: () => []
			}
		},
		data() {
			return {
				items: []
			}
		},
		computed: {
			computedAvatar(item) {
				return (item) => {
					try {
						return IMG_HTTP_REQUEST_HEAD + IMG_REQUEST_URL + item.avatar
					} catch(e) {
						
					}
				}
			}
		},
		watch: {
			helpPerson: {
				handler(newV) {
					this.items = this.helpPerson
				},
				deep: true,
				immediate: true
			}
		},
		methods: {
			checkboxChange: function(e) {
				var items = this.items,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					const item = items[i]
					if (values.indexOf(item.value) >= 0) {
						this.$set(item, 'checked', true)
					} else {
						this.$set(item, 'checked', false)
					}
				}
				this.$emit("changeHelpPerson", values)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.uni-list-cell {
		justify-content: flex-start
	}

	label {
		padding: 12px 0 13px 0;
		border-bottom: 1px solid #E6E7F1;
	}

	.item {
		display: flex;
		align-items: center;
		margin-left: 32rpx;

		image {
			width: 88rpx;
			height: 88rpx;
			border-radius: 50%;
		}
	}


</style>