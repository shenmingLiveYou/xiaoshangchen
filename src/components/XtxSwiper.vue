<template>
  <view>
    <swiper :indicator-dots="true" :autoplay="true" :circular="true" :interval="3000">
      <swiper-item v-for="item in list" :key="item.id">
        <navigator url="/pages/index/index" hover-class="none" class="navigator">
          <image class="image" mode="aspectFill" :src="item.imgUrl" />
        </navigator>
      </swiper-item>
    </swiper>
  </view>
</template>

<script lang="ts" setup>
import type { BannerItem } from '@/types/home'
// 定义 props 接收
defineProps<{
  list: BannerItem[]
}>()
</script>

<style scoped lang="scss">
.uni-margin-wrap {
  width: 690rpx;
  width: 100%;
}
.swiper {
  height: 300rpx;
}
.swiper-item {
  display: block;
  height: 300rpx;
  line-height: 300rpx;
  text-align: center;
}
.swiper-list {
  margin-top: 40rpx;
  margin-bottom: 0;
}
.uni-common-mt {
  margin-top: 60rpx;
  position: relative;
}
.info {
  position: absolute;
  right: 20rpx;
}
.uni-padding-wrap {
  width: 550rpx;
  padding: 0 100rpx;
}
.navigator,
.image {
  width: 100%;
  height: 100%;
}
</style>
