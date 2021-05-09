<template>
  <div class="body">
    <header>
        <div class="logo">
          <a href="/">小闲鱼</a>
        </div>
        <div class="search">
    <div class="input-group search-input">
      <div class="input-group-btn">
        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">按标题 <span class="caret"></span></button>
        <ul class="dropdown-menu">
          <!-- <li><a href="#">按标题</a></li> -->
          <li><a href="#">按标签</a></li>
        </ul>
      </div><!-- /btn-group -->
      <input type="text" class="form-control" v-model="keyWord" @keyup.enter="search" placeholder="输入关键字...">
      <span class="input-group-btn">
        <button class="btn btn-default" type="button" @click="search"><span class="glyphicon glyphicon-search"></span></button>
      </span>
    </div><!-- /input-group -->
        </div>
        <div class="link_list">
          <a class="func" href="/sell">发布二手</a>
          <a class="func" href="/register">注册</a>
          <a class="func" href="/login">登录</a>
          <a class="func" href="/user">用户</a>
        </div>
    </header>
    <div class="main">
        <div class="part_title">
            热门商品
        </div>
        <div class="hotpoint">
          <div v-for="item in data" :key="item" class="sig_good">
            <a href="#"><img src="/static/Char_103_angel_2.png" class="sig_pic"></a>
              <div class="sig_word">
                <div class="sig_left">
                  <div class="sig_title">
                    <a href="#">{{ title }}</a>
                  </div>
                  <div class="sig_seller">
                    <a href="#">{{ seller }}</a>
                  </div>
                </div>
                <div class="sig_price">
                  ¥{{ price }}
                </div>
              </div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import 'bootstrap'
export default {
  name: 'search',
  data () {
    return {
      keyWord: '',
      title: '超值只要998',
      seller: 'zzp',
      price: 100,
      data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
    }
  },
  methods: {
    search () {
      this.$router.push('/search/' + this.keyWord)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
