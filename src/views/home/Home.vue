<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type=3
            @scroll='contentScroll'
            :pull-up-load='true'
            @pullingUp='loadMore'>
      <home-swiper :banners='banners' @swiperImageLoad='swiperImageLoad'></home-swiper>
      <recommend-view :recommends='recommends'></recommend-view>
      <feature-views></feature-views>
    </scroll>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import Scroll from 'components/common/scroll/Scroll'
  
  import HomeSwiper from './childcmps/HomeSwiper'
  import RecommendView from './childcmps/RecommendView'
  import FeatureViews from './childcmps/FeatureViews'

  import {getHomeMultidata, getHomeGoods} from 'network/home'
  export default {
    name:'Home',
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
      }
    },
    components: {
      NavBar,
      Scroll,
      HomeSwiper,
      FeatureViews,
      RecommendView,
    },
    created() {
      // 1.获取多个数据
      this.getHomeMultidata()
      // 2.获取商品数据
      this.getHomeGoods('pop');
      this.getHomeGoods('sell');
      this.getHomeGoods('new');
    },
    mounted() {
      
    },
    methods: {
      // 网络请求相关方法
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;
          
          // 完成上拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      },
      contentScroll(){},
      loadMore(){},
      swiperImageLoad(){}
    },
  }

</script>

<style scoped>
  #home {
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>