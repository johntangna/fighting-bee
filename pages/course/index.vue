<template>
	<view>
		<Tabbar :pagePath="'/pages/course/index'"></Tabbar>
	</view>
</template>

<script>
	import Tabbar from "@/components/tabbar/index.vue"
	export default {
		components: {
			Tabbar
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">

</style>