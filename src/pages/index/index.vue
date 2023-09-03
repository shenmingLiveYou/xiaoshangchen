<template>
  <!-- 顶部导航栏组件 -->
  <CustomNavbar></CustomNavbar>
  <!-- 滚动组件容器 -->
  <scroll-view
    refresher-enabled
    @refresherrefresh="onResherrefresh"
    scroll-y
    class="scroll-view"
    :refresher-triggered="isTriggered"
    @scrolltolower="onScrolltolower"
  >
    <PageSkeleton v-if="isLoding"></PageSkeleton>
    <template v-else>
      <!-- 轮播图组件 -->
      <XtxSwiper :list="bannerList"></XtxSwiper>
      <!-- 首页分类组件 -->
      <CategoryPanel :categoryList="categoryList"></CategoryPanel>
      <!-- 热门推荐组件 -->
      <HotPanel :homeHotList="homeHotList"></HotPanel>
      <!-- 猜你喜欢组件 -->
      <XtxGuess ref="guessRef"></XtxGuess>
    </template>
  </scroll-view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { useGuessList } from '@/composatbles'
import CustomNavbar from '@/pages/index/components/CustomNavbar.vue'
import CategoryPanel from '@/pages/index/components/CategoryPanel.vue'
import HotPanel from '@/pages/index/components/HotPanel.vue'
import PageSkeleton from '@/pages/index/components/PageSkeleton.vue'
import { getHomeBannerAPI, getHomeCategoryMutliAPI, getHomeHotMutliAPI } from '@/services/home'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'

// 首页轮播图数据
const bannerList = ref<BannerItem[]>([])

// 首页分类数据
const categoryList = ref<CategoryItem[]>([])

// 首页推荐数据
const homeHotList = ref<HotItem[]>([])

// 下拉刷新完成数据
const isTriggered = ref(false)

// 是否显示骨架
const isLoding = ref(false)

// 获取首页轮播图数据函数
const getBannerList = async () => {
  const result = await getHomeBannerAPI()
  bannerList.value = result.result
}

// 获取首页分类数据函数
const getHomeCategoryMutli = async () => {
  const result = await getHomeCategoryMutliAPI()
  categoryList.value = result.result
}

// 获取首页推荐数据函数
const getHomeHotMutli = async () => {
  const result = await getHomeHotMutliAPI()
  homeHotList.value = result.result
}

// 滚动到底部触发
const { guessRef, onScrolltolower } = useGuessList()

// 下拉刷新函数
const onResherrefresh = async () => {
  // 开启下拉刷新动画
  isTriggered.value = true

  // 刷新数据
  // getBannerList()
  // getHomeCategoryMutli()
  // getHomeHotMutli()
  // 重置猜你喜欢组件数据
  guessRef.value?.resetData(),
    await Promise.all([
      getBannerList(),
      getHomeCategoryMutli(),
      getHomeHotMutli(),
      guessRef.value?.resetData(),
    ])
  // 关闭下拉刷新动画
  isTriggered.value = false
}

// 页面加载触发
onLoad(async () => {
  isLoding.value = true
  await Promise.all([getBannerList(), getHomeCategoryMutli(), getHomeHotMutli()])
  isLoding.value = false
})
</script>

<style lang="scss">
page {
  background-color: #f7f7f7;
  display: flex;
  height: 100%;
  flex-direction: column;
}
.scroll-view {
  flex: 1;
  height: 100%;
}
</style>
