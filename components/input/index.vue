<template>
  <view class="acea-row justify-between items-center">
    <uni-easyinput 
	:type="type" 
	:autoHeight="type == 'text' ? false : true" 
	:styles="{backgroundColor: '#f2f3f9', borderColor: '#f2f3f9'}" 
	placeholderStyle="font-size: 30rpx;font-weight: 400;color: rgba(0,0,0,0.4);" 
	:prefixIcon="prefixIcon && 'search'" 
	:suffixIcon="suffixIcon && 'checkmarkempty'" 
	v-model="value" 
	:placeholder="placeholder" 
	@confirm="confirm"
    @change="getList" 
	@iconClick="getList" 
	@input="input">
    </uni-easyinput>
  </view>
</template>

<script>
  import {
    mapGetters
  } from "vuex"
  export default {
    name: "input",
    props: {
			placeholder: {
				type: String,
				default: '搜索'
			},
			type: {
				type: String,
				default: 'text'
			},
			remark: {
				type: String,
				default: ''
			},
			prefixIcon: {
				type: Boolean,
				default: true
			},
			suffixIcon: {
				type: Boolean,
				default: false
			}
    },
    watch: {
		remark: {
			handler(newV) {
				this.value = newV
			},
			immediate: true
		}
    },
    computed: {
      ...mapGetters(['dictionary'])
    },
    data() {
      return {
        value: '',
      }
    },
    methods: {
      input(e) {
        this.value = e
      },
      confirm() {
        this.$emit('featchList', this.value)
      },
      getList(v) {
        this.stateList = []
        if (v == 'prefix' || v == 'suffix') {
          this.$emit('featchList', this.value)
        }
      }
    },
    mounted() {}
  }
</script>

<style scoped lang="scss">
  .popup-content {
    padding: 44rpx 40rpx;
  }
</style>