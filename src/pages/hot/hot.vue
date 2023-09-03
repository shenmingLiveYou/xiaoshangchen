<template>
  <view class="viewport">
    <!-- 推荐封面图 -->
    <view class="cover">
      <image style="width: 100%" :src="bannerPicture"></image>
    </view>
    <!-- 推荐选项 -->
    <view class="tabs">
      <text
        class="text"
        :class="{ active: index === activeIndex }"
        v-for="(item, index) in subTypes"
        :key="item.id"
        @tap="activeIndex = index"
        >{{ item.title }}</text
      >
    </view>
    <!-- 推荐列表 -->
    <scroll-view
      scroll-y
      v-for="(item, index) in subTypes"
      :key="item.id"
      @scrolltolower="onScrolltolower"
      v-show="activeIndex === index"
      class="scroll-view"
    >
      <view class="goods">
        <navigator
          hover-class="none"
          class="navigator"
          v-for="goods in item.goodsItems.items"
          :key="goods.id"
          :url="`/pages/goods/goods?id=${goods.id}`"
        >
          <image class="thumb" :src="goods.picture"></image>
          <view class="name ellipsis">{{ goods.name }}</view>
          <view class="price">
            <text class="symbol">¥</text>
            <text class="number">{{ goods.price }}</text>
          </view>
        </navigator>
      </view>
      <view class="loading-text">{{ item.finish ? '没有更多数据了~~' : '正在加载中~' }} </view>
    </scroll-view>
  </view>
</template>

<script setup lang="ts">
import { getHotRecommendAPI } from '@/services/hot'
import type { HotResult, SubTypeItem } from '@/types/hot'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

// 热门推荐页 标题和url
const hotMap = [
  { type: '1', title: '特惠推荐', url: '/hot/preference' },
  { type: '2', title: '爆款推荐', url: '/hot/inVogue' },
  { type: '3', title: '一站买全', url: '/hot/oneStop' },
  { type: '4', title: '新鲜好物', url: '/hot/new' },
]

// 推荐封面图
const bannerPicture = ref('')

const subTypes = ref<(SubTypeItem & { finish?: boolean })[]>([])
// 获取query参数
const query = defineProps<{ type: string }>()
// console.log(query)

// 点击下标
const activeIndex = ref(0)

// 查找传递的参数是否和hotMap数组中type值一致的那条数据
const currUrlMap = hotMap.find((item) => item.type === query.type)

// 设置页码标题
uni.setNavigationBarTitle({ title: currUrlMap!.title })

onLoad(() => {
  getHotRecommend()
})
// 请求数据函数
const getHotRecommend = async () => {
  const result = await getHotRecommendAPI(currUrlMap!.url, {
    // 技巧：环境变量，开发环境，修改初始页面方便测试分页结束
    page: import.meta.env.DEV ? 30 : 1,
    pageSize: 10,
  })
  bannerPicture.value = result.result.bannerPicture
  subTypes.value = result.result.subTypes
}

// 下拉触底刷新数据
const onScrolltolower = async () => {
  console.log(1111111)

  // 获取当前选项数据
  const currsubTypes = subTypes.value[activeIndex.value]
  if (currsubTypes.goodsItems.page < currsubTypes.goodsItems.pages) {
    //累加当前页码
    currsubTypes.goodsItems.page++
  } else {
    // 标记已结束
    currsubTypes.finish = true
    // 没有更多数据
    return uni.showToast({ icon: 'none', title: '没有更多数据了~~' })
  }

  // 调用api重新请求数据
  const res = await getHotRecommendAPI(currUrlMap!.url, {
    subType: currsubTypes.id,
    page: currsubTypes.goodsItems.page,
    pageSize: currsubTypes.goodsItems.pageSize,
  })

  // 新的列表项
  const newsubTypes = res.result.subTypes[activeIndex.value]
  // 将新的列表加到原有的数据中
  currsubTypes.goodsItems.items.push(...newsubTypes.goodsItems.items)
}
</script>

<style lang="scss">
page {
  height: 100%;
  background-color: #f4f4f4;
}
.viewport {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 180rpx 0 0;
  position: relative;
}
.cover {
  width: 750rpx;
  height: 225rpx;
  border-radius: 0 0 40rpx 40rpx;
  overflow: hidden;
  position: absolute;
  left: 0;
  top: 0;
}
.scroll-view {
  flex: 1;
  height: 100%;
}
.tabs {
  display: flex;
  justify-content: space-evenly;
  height: 100rpx;
  line-height: 90rpx;
  margin: 0 20rpx;
  font-size: 28rpx;
  border-radius: 10rpx;
  box-shadow: 0 4rpx 5rpx rgba(200, 200, 200, 0.3);
  color: #333;
  background-color: #fff;
  position: relative;
  z-index: 9;
  .text {
    margin: 0 20rpx;
    position: relative;
  }
  .active {
    &::after {
      content: '';
      width: 40rpx;
      height: 4rpx;
      transform: translate(-50%);
      background-color: #27ba9b;
      position: absolute;
      left: 50%;
      bottom: 24rpx;
    }
  }
}
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx 20rpx;
  .navigator {
    width: 345rpx;
    padding: 20rpx;
    margin-top: 20rpx;
    border-radius: 10rpx;
    background-color: #fff;
    box-sizing: border-box;
  }
  .thumb {
    width: 305rpx;
    height: 305rpx;
  }
  .name {
    height: 88rpx;
    font-size: 26rpx;
  }
  .price {
    line-height: 1;
    color: #cf4444;
    font-size: 30rpx;
  }
  .symbol {
    font-size: 70%;
  }
  .decimal {
    font-size: 70%;
  }
}

.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0 50rpx;
}
</style>
