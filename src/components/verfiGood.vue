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
            审核中心
        </div>
        <div class="myPost">
          <div class="sig_myPost" v-for="item in data" :key="item.id">
            <div class="contain_mp">
              <div class="memberAndStus">
                <div class="member">
                  {{item.name}}
                  <img src="/static/default.png" class="mp_mbp">
                </div>
                <div class="stus">
                  待审核<button class="ps_btn" @click="acc(item.id)">审核通过</button><button class="rf_btn" @click="ref(item.id)">审核不通过</button>
                </div>
              </div>
              <div class="mainArea">
                <div class="mp_pc">
                  <img src="/static/default.png" class="mp_mcp">
                </div>
                <div class="right_area">
                  <div class="mp_title">
                    {{item.name}}
                  </div>
                  <div class="mp_price">
                    ¥{{item.price}}
                  </div>
                </div>
              </div>
              <div class="lastInfo">
                发布于：{{ item.created }}
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
  name: 'myPost',
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
    search () {
      this.$router.push('/search/' + this.keyWord)
    },
    init () {
      var _this = this
      axios({
        method: 'get',
        url: window.requestUrl + '/admin/getUnVerified',
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
      var _this = this
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
            _this.$router.push('/login')
          }
        })
    },
    acc (id) {
      var _this = this
      axios({
        method: 'put',
        url: window.requestUrl + '/admin/verify',
        params: {
          itemId: id,
          verified: true
        },
        headers: {
          'x-auth-token': sessionStorage.token
        }
      })
        .then(function (response) {
          if (response.data.rspCode === window.OKrsp) {
            _this.init()
          }
        })
    },
    ref (id) {
      var _this = this
      axios({
        method: 'put',
        url: window.requestUrl + '/admin/verify',
        params: {
          itemId: id,
          verified: false
        },
        headers: {
          'x-auth-token': sessionStorage.token
        }
      })
        .then(function (response) {
          if (response.data.rspCode === window.OKrsp) {
            _this.init()
          }
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ps_btn{
  border: none;
  background-color: rgba(8, 168, 35, 0.623);
  border-radius: 15px;
  color: white;
  padding: 10px 20px 10px 20px;
  margin: 10px;
  font-size: 18px
}
.rf_btn{
  border: none;
  background-color: rgba(168, 8, 8, 0.657);
  border-radius: 15px;
  color: white;
  padding: 10px 20px 10px 20px;
  margin: 10px;
  font-size: 18px
}
</style>
