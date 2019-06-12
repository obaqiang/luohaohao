<template>
	<view>
		<view class="user_info_list">
			<text>{{i18n.userId}}:</text>
			<!-- <input type="text"> -->
			<text>{{userId}}</text>
		</view>
		<view class="user_info_list">
			<text>{{i18n.fullName}}:</text>
			<!-- <input type="text"> -->
			<text>{{fullName}}</text>
		</view>
<!-- 		<view class="user_info_list">
			<text>性别:</text>
			<input type="text">
		</view>
		<view class="user_info_list">
			<text>手机:</text>
			<input type="text">
		</view>
		<view class="user_info_list">
			<text>部门:</text>
			<input type="text">
		</view> -->
		<view class="user_info_list">
			<text>{{i18n.displayName}}:</text>
			<!-- <input type="text"> -->
			<text>{{displayName}}</text>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {

		},

		data() {
			return {
				mine_banner_bg: "../../static/img/mine_banner_bg.jpg",

			};
		},
		onNavigationBarButtonTap() {

		},
		computed: {
			i18n() {
				return this.$t('UserInfo')
			},
			userId(){
				return uni.getStorageSync('mylogin_data').userId
			},
			fullName(){
				return uni.getStorageSync('mylogin_data').fullName
			},
			displayName(){
				return uni.getStorageSync('mylogin_data').currentOrgUnit.displayName
			}
		},

		methods: {


		},
		onLoad() {


		}
	}
</script>

<style>
	page {
		background: #E7E7E7;
	}

	.user_info_list {
		border: 1px solid #666666;
		width: 700upx;
		margin: 20upx 25upx;
		display: flex;
		align-items: center;
		height: 72upx;
		font-size: 25upx;
	}
	.user_info_list text{
		margin-left: 30upx;
	}
	.user_info_list input{
		margin-left: 30upx;
	}
</style>
