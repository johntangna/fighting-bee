<template>
  <view class="container_mini">
    <view class="whiteBg container_mini_header">
			<HeadPlaceHolder></HeadPlaceHolder>
			<view class="whiteBg uni-flex">
			  <image src="/static/image/avatar.png" mode="aspectFit" style="width: 70px;height: 45px;"></image>
				<image src="/static/image/text.png" mode="aspectFit" style="width: 100px;height: 45px;"></image>
			</view>
			<view class="search_header">
				<uni-easyinput class="search_input" suffixIcon="search" v-model="value" placeholder="右侧图标" @iconClick="iconClick"></uni-easyinput>
			</view>
		</view>
		<view class="task_list_wrapper height100">
			<TaskLists ref="taskList" :stateList="stateList"></TaskLists>
		</view>
    <Tabbar :pagePath="'/pages/home/index'"></Tabbar>
  </view>
</template>

<script>
  import HeadPlaceHolder from "@/components/headPlaceHolder/index.vue"
	import Tabbar from "@/components/tabbar/index.vue"
	import TaskLists from "@/pages/component/taskLists/index.vue"
	import {
		mapGetters
	} from "vuex"
  export default {
    components: {
      HeadPlaceHolder,
			Tabbar,
			TaskLists
    },
    data() {
      return {
				mutiState: [],
				stateList: []
      };
    },
    props: {},
    async mounted() {
			// this.$refs.popup.open("center")
    },
    onShow() {
			
			this.$refs.taskList.init()
    },
    methods: {
			goDistributeTask() {
				uni.navigateTo({
				  url: `/pages/services/distributeTask/index`
				})
			},
			openDeadLine() {
				this.$refs.popup.open("center")
			},
			closeDeadLine() {
				this.$Cache.set("DEADLINE", new Date().getTime())
				this.$refs.popup.close()
			},
      // 授权关闭
      authColse: function(e) {
        this.isShowAuth = e;
      },
      /**
       * 生命周期函数--监听页面加载
       */
      onLoad: function(options) {
        if (options.status) {
          const {
            status,
            type
          } = options

        }
        
      },
			getTaskList(v) {
				this.$refs.taskList.stateOrderSearch(v)
			},
			getTaskListByName(v) {
				this.$refs.taskList.search(v)
			}
    },
  };
</script>

<style scoped lang="scss">
  .task_list_wrapper {
    padding: 32rpx;

    &>view:not(:first-child) {
      padding: 32rpx;
    }

    &>view {
      margin-bottom: 28rpx;
    }
  }

.search_header {
	background-color: #4b2802;
	height: 100rpx;
}
.search_input {
	.uni-easyinput {
	width: 80% !important;
	}
}
</style>