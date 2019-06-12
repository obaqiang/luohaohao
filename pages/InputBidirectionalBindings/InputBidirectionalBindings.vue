<template>
	<view>
		<bindingInput v-model="price" @input="onInput" v-bind:aa="aa" @clear="clear"></bindingInput>
		<button @tap="clear">aaaa</button>
	</view>
</template>

<script>
	import bindingInput from "../components/bindingInput/bindingInput.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			bindingInput
		},

		data() {
			return {
				price: '',
				aa:'111'
			};
		},
		computed: {},

		methods: {
			onInput: function(val) {
				this.price = val;
			},
		
			clear(){
				console.log(this.price)
				if(this.price==111){
					this.price=''
				}
			}
		},
		onLoad() {

		}
	}
</script>

<style>

</style>
