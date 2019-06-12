<template>
	<!-- <view>

		<view class="uni-common-mt">
			<view class="uni-form-item uni-column">
				<input class="uni-input" focus v-model="oldpwd" placeholder="输入原密码" />
			</view>
			<view class="uni-form-item uni-column">
				<input class="uni-input" v-model="newpwd" placeholder="输入新密码" />
			</view>
		</view>
	</view> -->
	<view>
		<view class="user_info_list">
			<text>{{i18n.old_password}}:</text>
			<input type="password" v-if="pwd_type=='password'" class="changepwdinput" v-model="oldpwd" :placeholder="i18n.old_password_place">
			<input type="text" v-if="pwd_type!='password'" class="changepwdinput" v-model="oldpwd" :placeholder="i18n.old_password_place">
		</view>
		<view class="user_info_list">
			<text>{{i18n.new_password}}:</text>
			<input type="password" v-if="pwd_type=='password'" class="changepwdinput" v-model="newpwd" :placeholder="i18n.new_password_place">
			<input type="text" v-if="pwd_type!='password'" class="changepwdinput" v-model="newpwd" :placeholder="i18n.new_password_place">
		</view>
		<view class="user_info_list">
			<text>{{i18n.new_password_again}}:</text>
			<input type="password" v-if="pwd_type=='password'" v-model="newpwdagain" class="changepwdinput" :placeholder="i18n.new_password_again_place">
			<input type="text" v-if="pwd_type!='password'" v-model="newpwdagain" class="changepwdinput" :placeholder="i18n.new_password_again_place">
		</view>
		<view class="changetype_area" @tap="changeInputType">
			<image :src="changepwd_no_hook" class="changepwd_no_hook" v-if="pwd_type=='password'"></image>
			<image :src="changepwd_hook" class="changepwd_no_hook" v-if="pwd_type=='text'"></image>
			<text>{{i18n.show_password}}</text>
		</view>
		<view class="common_btn_bot_fb" style="margin-top: 20upx;" @tap="sureChangePwd">{{i18n.sure_set}}</view>
	</view>

</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				oldpwd: '',
				newpwd: '',
				newpwdagain: '',
				changepwd_hook: "../../static/img/changepwd_hook.png",
				changepwd_no_hook: "../../static/img/changepwd_no_hook.png",
				pwd_type: 'password'
			};
		},
		computed: {
			connect_url() {
				return this.$store.state.connect_url
			},
			current_language() {
				return this.$store.state.current_language
			},
			token() {
				return this.$store.state.token
			},
			post_header() {
				return this.$store.state.post_header
			},
			i18n() {
				return this.$t('changePwd')
			},
		},
		methods: {
			changeInputType() {
				let that = this
				console.log(that.pwd_type)
				if (that.pwd_type == 'password') {
					that.pwd_type = 'text'
				} else {
					that.pwd_type = 'password'
				}
			},
			sureChangePwd() {
				let that = this
				if (that.oldpwd == '' || that.newpwd == '' || that.newpwdagain == '') {
					uni.showToast({
						// title: '输入不能为空',
						title:that.i18n.toast_text_a,
						duration: 2000
					});
				} else if (that.newpwd != that.newpwdagain) {
					uni.showToast({
						// title: '两次新密码输入不一致',
						title:that.i18n.toast_text_b,
						duration: 2000
					});
				} else {
					uni.request({
						url: that.connect_url + 'api/services/app/profile/ChangePassword', //仅为示例，并非真实接口地址。
						data: {
							currentPassword: that.oldpwd,
							newPassword: that.newpwd

						},
						method: 'POST',
						header: that.post_header,
						success: (res) => {
							console.log(res.data);
							if (res.data.success == true) {
								uni.showToast({
									// title: '修改密码成功',
									title:that.i18n.toast_text_c,
									duration: 2000
								});
								uni.switchTab({
									url: '../homepage/homepage'
								})
							} else {
								uni.showToast({
									title: res.data.error.message,
									duration: 2000
								});
							}
						}

					});
				}
			}

		},
		onNavigationBarButtonTap: function(e) {

		},
	}
</script>

<style>
	/* .pwd_list {
		line-height: 50upx !important;
	} */
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
		align-items: center;
	}

	.user_info_list text {
		margin-left: 30upx;
	}

	.user_info_list input {
		margin-left: 30upx;
	}

	.changepwdinput {
		border: none;
		outline: none;
		background: #E7E7E7;
		margin-left: 20upx;
	}

	.changepwd_no_hook {
		width: 50upx;
		height: 50upx;
		margin-right: 20upx;
	}

	.changetype_area {
		display: flex;
		margin-top: 150upx;
		align-items: center;
		padding-left: 30upx;
	}
</style>
