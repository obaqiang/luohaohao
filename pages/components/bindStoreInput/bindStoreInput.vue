<template>
	<view class="body_list">
		<text class="text_a">{{text_store}}:</text>
		<view class="text_right_area_date">
			<picker v-if="warehouse_data_show!=''" :value="index" @change="choStore" :range="warehouse_data_show" range-key="warehouseName">
				<view class="uni-input" style="width: 400upx;padding: 3px 5px;font-size: 25upx;">{{warehouse_data_show[index].warehouseName}}</view>
			</picker>
		</view>
	</view>
</template>

<script>
	import {} from 'vuex'
	export default {
		props: ['text_store', 'warehouse_data'],
		components: {

		},
		watch: {
			warehouse_data: {
				handler(new_val, old_val) {
					let arr = []
					let all = {
						id:'',
						warehouseName:'所有'
					}
					arr.push(all)
					for (let i = 0; i < new_val.length; i++) {
						let arr_list = {}
						arr_list.id = new_val[i].id
						arr_list.warehouseName = new_val[i].warehouseName
						arr.push(arr_list)
					}
					this.warehouse_data_show = arr

				},
				immediate: true
			}
		},
		data() {

			return {
				index: 0,
				warehouse_data_show: ''
			};
		},
		computed: {
		},
		onNavigationBarButtonTap() {

		},
		methods: {
			choStore(e) {
				// console.log(e)
				this.index = e.detail.value
				// console.log(this.warehouse_data[this.index].id)
				this.$emit('choStore', this.warehouse_data[this.index].id)
			},
		},
		onLoad() {}
	}
</script>

<style>
	.body_list {
		display: flex;
		line-height: 60upx;
		padding-left: 30upx;
		align-items: center;
		margin-top: 20upx;
	}

	.text_a {
		width: 150upx;
		text-align: right;
		font-size: 25upx;
	}

	.text_b {
		padding-left: 50upx;
	}

	.text_right_area {
		display: flex;
		border: 1px solid #DDDDDD;
		align-items: center;
		padding: 10upx;
		margin-left: 10upx;
		border-radius: 10upx;
		width: 500upx;
		justify-content: space-between;
	}

	.text_right_area_date {
		display: flex;
		border: 1px solid #DDDDDD;
		align-items: center;
		padding: 0 10upx;
		margin-left: 10upx;
		border-radius: 10upx;
		width: 500upx;
		justify-content: space-between;
	}

	.text_right_area_hover {
		display: flex;
		border: 1px solid #ffb700;
		align-items: center;
		padding: 10upx;
		margin-left: 10upx;
		border-radius: 10upx;
		width: 500upx;
		justify-content: space-between;
	}

	/* .text_right_area:hover {
		border: 1px solid #ffb700;
	} */
	.text_right_area:focus {
		border: 1px solid #ffb700;
	}

	.text_right_area_icon {
		width: 50upx;
		height: 50upx;
	}

	.text_right_input {
		width: 350upx;
		font-size: 20upx;
		/* background: red; */
	}
</style>
