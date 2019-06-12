<template>
	<view class="bottomCountArea_area">
		<view v-if="count!=''">{{i18n.text_a}}{{count}}{{i18n.text_b}}</view>
		<view v-if="count==''">{{i18n.text_c}}</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		props: ['count'],
		components: {

		},
		data() {
			return {};
		},
		computed: {
			i18n() {
				return this.$t('bottomCountArea')
			},
		},
		watch: {
			
		},
		onNavigationBarButtonTap() {

		},
		methods: {

		},
		onLoad() {}
	}
</script>

<style>
	.bottomCountArea_area {
		/* background: #F2F2F2; */
		color: #999999;
		position: relative;
		bottom: 0;
		width: 100%;
		height: 100upx;
		align-items: center;
		display: flex;
		justify-content: center;
		font-size: 25upx;
	}
</style>
