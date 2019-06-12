<template>
	<view>
		<input class="aaa" type="text" :value="value" @input="updateVal($event.target.value)" @confirm="conFirm">
		<p>{{aa}}</p>
	</view>
</template>

<script>
	import {} from 'vuex'
	export default {
		props: ['value','aa'],
		components: {

		},
		data() {
			return {};
		},
		computed: {

		},
		watch: {

		},
		onNavigationBarButtonTap() {

		},
		computed: {

		},

		methods: {
			updateVal: function(val) {
				this.$emit('input', val);
			},
			conFirm(val){
				console.log(this.aa)
				console.log('点击完成')
				
				this.$emit('clear', val);
			}
		},
		onLoad() {}
	}
</script>

<style>
	.aaa {
		border: 1px solid #DDDDDD;
		/* line-height: 100upx !important; */
	}
</style>
