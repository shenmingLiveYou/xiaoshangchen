<template>
  <view class="category">
    <navigator
      class="category-item"
      url="/pages/index/index"
      hover-class="none"
      v-for="item in categoryList"
      :key="item.id"
    >
      <image class="icon" :src="item.icon" />
      <text class="text">{{ item.name }}</text>
    </navigator>
  </view>
</template>

<script lang="ts" setup>
import type { CategoryItem } from '@/types/home'
// 接收props数据
defineProps<{
  categoryList: CategoryItem[]
}>()
</script>

<style lang="scss">
/* 前台类目 */
.category {
  margin: 20rpx 0 0;
  padding: 10rpx 0;
  display: flex;
  flex-wrap: wrap;
  min-height: 328rpx;

  .category-item {
    width: 150rpx;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    box-sizing: border-box;

    .icon {
      width: 100rpx;
      height: 100rpx;
    }
    .text {
      font-size: 26rpx;
      color: #666;
    }
  }
}
</style>
