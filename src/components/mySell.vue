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
            我的卖出
        </div>
        <div class="myPost">
          <div class="sig_myPost" v-for="item in data" :key="item">
            <div class="contain_mp">
              <div class="memberAndStus">
                <div class="member">
                  aaaaaaaaaaaaa
                  <img src="/static/default.png" class="mp_mbp">
                </div>
                <div class="stus">
                  已被下单
                </div>
              </div>
              <div class="mainArea">
                <div class="mp_pc">
                  <img src="/static/default.png" class="mp_mcp">
                </div>
                <div class="right_area">
                  <div class="mp_title">
                    商品
                  </div>
                  <div class="mp_price">
                    ¥100
                  </div>
                </div>
              </div>
              <div class="lastInfo">
                发布于：2019020605
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
  name: 'mySell',
  data () {
    return {
      keyWord: '',
      data: [0, 2],
      islogin: false,
      currentUsername: '',
      text1: '按标题',
      text2: '按标签'
    }
  },
  created () {
    // this.init()
    if (sessionStorage.token) {
      this.islogin = true
      this.currentUsername = sessionStorage.userName
    }
  },
  methods: {
    changeP () {
      var temp = this.text1
      this.text1 = this.text2
      this.text2 = temp
    },
    search () {
      this.$router.push('/search/' + this.keyWord)
    },
    init () {
      var _this = this
      axios({
        method: 'get',
        url: window.requestUrl + '/searchItem',
        params: {
          key: '*',
          size: '20'
        },
        headers: {
          'x-auth-token': sessionStorage.token
        }
      })
        .then(function (response) {
          if (response.data.rspCode === window.OKrsp) {
            _this.data = response.data.data
          }
        })
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
