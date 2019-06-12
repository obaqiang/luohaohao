<template>
	<view>
		<input type="number" v-model="val" @input="intInput" style="text-align: center;">
	</view>
</template>

<script>
	import {} from 'vuex'
	export default {
		props: ['err_code','qcValue'],
		components: {

		},
		data() {
			return {
				val: this.qcValue
			};
		},
		computed: {

		},
		watch: {

			// 			placeholder_text: {
			// 				handler(newName, oldName) {
			// 					this.placeholder_show = newName
			// 				},
			// 				immediate: true
			// 			}
		},
		onNavigationBarButtonTap() {

		},
		computed: {},
		methods: {
			intInput(e) {
				let return_data = {}
				return_data.err_code = this.err_code
				return_data.value = e.detail.value
				this.$emit('intInput', return_data)
			}
		},
		onLoad() {}
	}
</script>

<style>

</style>
