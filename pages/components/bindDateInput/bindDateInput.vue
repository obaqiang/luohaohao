<template>
	<view class="body_list">
		<text class="text_a">{{i18n.text_date}}:</text>
		<view class="text_right_area_date">
			<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
				<view class="uni-input" style="width: 400upx;padding: 5px 5px;font-size: 25upx;">{{date}}</view>
			</picker>
		</view>
	</view>
</template>

<script>
	import {} from 'vuex'
	export default {
		components: {

		},
		data() {
			const currentDate = this.getDate({
				format: true
			});
			return {
				text_right_area_icon: "../../static/img/text_right_area_icon.png",
				date: this.$t('bindDateInput').date_cho,
			};
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			},
			i18n() {
				return this.$t('bindDateInput')
			},
		},
		watch: {

		},
		onNavigationBarButtonTap() {

		},
		methods: {
			bindDateChange: function(e) {
				this.date = e.target.value
				this.$emit('choDate',e.target.value)
			},
			getDate(type) {
				const date = new Date();

				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;

				return `${year}-${month}-${day}`;
			}
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
