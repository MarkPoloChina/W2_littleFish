<template>
  <div class="body">
    <header>
        <div class="logo">
          <a href="/">小闲鱼</a>
        </div>
        <div class="search">
    <div class="input-group search-input">
      <div class="input-group-btn">
        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{{ text1 }} <span class="caret"></span></button>
        <ul class="dropdown-menu">
          <!-- <li><a href="#">按标题</a></li> -->
          <li><a href="javascript:void(0);" @click="changeP">{{ text2 }}</a></li>
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
          <a v-if="!islogin" class="func" href="/register">注册</a>
          <a v-if="!islogin" class="func" href="/login">登录</a>
          <a v-if="islogin" class="func" href="/user">用户：{{ currentUsername }}</a>
          <a v-if="islogin" class="func" href="javascript:void(0);" @click="logout">注销</a>
        </div>
    </header>
    <div class="main">
        <div class="part_title">
            热门商品
        </div>
        <div class="hotpoint">
          <div v-for="item in data" :key="item.id" class="sig_good">
            <a :href="'/goodDetail/' + item.id"><img src="/static/Char_103_angel_2.png" class="sig_pic"></a>
              <div class="sig_word">
                <div class="sig_left">
                  <div class="sig_title">
                    <a :href="'/goodDetail/' + item.id">{{ item.name }}</a>
                  </div>
                  <div class="sig_seller">
                    <a href="#">{{ item.username }}</a>
                  </div>
                </div>
                <div class="sig_price">
                  ¥{{ item.price }}
                </div>
              </div>
          </div>
        </div>
    </div>
  </div>
</template>
<script>
import 'bootstrap'
import axios from 'axios'
export default {
  name: 'allGood',
  data () {
    return {
      keyWord: '',
      data: [],
      islogin: false,
      currentUsername: '',
      text1: '按标题',
      text2: '按标签'
    }
  },
  created () {
    this.init()
    if (sessionStorage.token) {
      this.islogin = true
      this.currentUsername = sessionStorage.userName
    } else {
      alert('仅限管理员')
      this.$router.push('/')
    }
    if (this.currentUsername !== 'admin') {
      alert('仅限管理员')
      this.$router.push('/')
    }
  },
  methods: {
    changeP () {
      var temp = this.text1
      this.text1 = this.text2
      this.text2 = temp
    },
    logout () {
      axios({
        method: 'put',
        url: window.requestUrl + '/logout',
        headers: {
          'x-auth-token': sessionStorage.token
        }
      })
        .then(function (response) {
          if (response.data.rspCode === window.OKrsp) {
            sessionStorage.clear()
            this.$router.push('/login')
          }
        })
    },
    search () {
      this.$router.push('/search/' + this.keyWord)
    },
    init () {
      var _this = this
      axios({
        method: 'get',
        url: window.requestUrl + '/admin/getItems',
        headers: {
          'x-auth-token': sessionStorage.token
        }
      })
        .then(function (response) {
          if (response.data.rspCode === window.OKrsp) {
            _this.data = response.data.data
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
