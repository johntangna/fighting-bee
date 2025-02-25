<template>
	<view class="">
		<uni-popup ref="popup" background-color="#fff" @maskClick="closePopup">
			<view class="popup-content">
				<view class="paddingTop56 paddingLeft32 paddingRight32"
					style="border-radius: 24rpx 24rpx 0rpx 0rpx;border-bottom: 1rpx solid #E6E7F1;">
					<view class="paddingBottom59" style="position: relative;">
						<view class="fontSize36 fontWeight550 colorLightBlack90 text-center">任务记录</view>
						<uni-icons type="closeempty" size="25" color="#979BA7" style="position: absolute;right: 0;top: 0;"
							:class="openFlag ? 'rotateToRightAngle' : 'rotateToRightAngleReverse'" @tap="closePopup()"></uni-icons>
					</view>
					<view class="paddingBottom56">
						<view class="paddingBottom24 fontSize34 fontWeight600 colorBlack90">备注</view>
						<view style="width: 100%;height: 176rpx;padding: 26rpx 32rpx;overflow: overlay;">
							<textarea style="height: 100%;" placeholder="请输入任务记录备注" v-model="data.remark" />
						</view>
					</view>
					<view class="paddingBottom56">
						<view class="paddingBottom46 fontSize34 fontWeight600 colorBlack90">进度</view>
						<slider class="silder" block-size="22" activeColor="#E6E9F1" backgroundColor="#E6E9F1" block-color="#3958FF"
							:value="data.progress" @change="sliderChange" show-value="true"/>
					</view>
					<view class="paddingBottom36">
						<view class="paddingBottom32 fontSize34 fontWeight600 colorBlack90">图片</view>
						<uni-file-picker :autoUpload="false" file-mediatype="image" limit="3" ref="filePicker" @select="select"
							@success="success" @delete="deleteFile">
						</uni-file-picker>
					</view>
				</view>
				<view style="padding: 44rpx 40rpx">
					<button @tap="save" :disabled="disabled" class="pinchuan_button primary_button fontWeight550 fontSize32NoLineheight"
						hover-class="primary_button_hover">确认</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		uploadFile
	} from "@/api/public.js"
	import {
		IMG_HTTP_REQUEST_HEAD,
		IMG_REQUEST_URL,
	} from "@/config/app.js"
	import {
		supplyTaskInfo
	} from "@/api/taskCenter.js"
	export default {
		name: "",
		components: {},
		props: {
			task: {
				type: Object,
				default: {}
			}
		},
		computed: {},
		watch: {
			task: {
				handler(newV) {
					this.data.progress = newV.progress
				},
				deep: true
			}
		},
		onLoad(options) {
			
		},
		onShow() {},
		data() {
			return {
				openFlag: false,
				// pictureList: [],
				data: {
					remark: "",
					progress: "",
					picture: [],
					taskid: 0
				},
				disabled: false
			}
		},
		methods: {
			deleteFile(e) {
				const {
					tempFile
				} = e;
				this.data.picture.splice(this.data.picture.findIndex(cb => cb == tempFile.name), 1)
			},
			select(e) {
				const {
					tempFiles
				} = e;
				// this.pictureList = tempFiles
				tempFiles.forEach(item => {
					this.$util.uploadFile(item).then(res => {
						this.data.picture.push(item.name)
					})
				})
			},
			success(e) {
				console.info(e)
			},
			closePopup() {
				this.$refs.popup.close()
				this.openFlag = true
			},
			openPopup() {
				this.$refs.popup.open('bottom')
				this.openFlag = false
			},
			sliderChange(e) {
				this.data.progress = e.detail.value
			},
			save() {
				if (!this.task.id) {
					return this.$util.Tips({
					  title: '缺少任务号无法补充任务记录'
					});
				}
				this.disabled = true
				console.info(this.data.picture)
				let obj = {
					...this.data,
					taskid: this.task.id
				}
				this.data.picture.forEach((item, index) => {
					obj["attachment" + (index + 1)] = item
				})
				delete obj["picture"]
				supplyTaskInfo(obj).then(res => {
					this.$util.Tips({
						title: '已为您更新任务',
						icon: 'success'
					}, {
						tab: 3
					})
					this.closePopup()
				}).catch(() => {
				}).finally(() => {
					this.$emit("init", this.task.id)
					this.disabled = false
					this.data = {
						remark: "",
						progress: "",
						picture: [],
						taskid: 0
					}
				})
			}
		},
		mounted() {
			
		}

	}
</script>

<style scoped lang="scss">
</style>