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
            管理员控制中心
        </div>
        <center class="con">
          <div class="allGoodBtn">
          <button @click="allGood" class="admin_btn">所有商品</button>
        </div>
        <div class="findGoodAsId">
          <div class="input-group search-input">
      <input type="text" class="form-control" v-model="goodId" @keyup.enter="search" placeholder="输入商品id...">
      <span class="input-group-btn">
        <button class="btn btn-default" type="button" @click="findGood"><span class="glyphicon glyphicon-search"></span></button>
      </span>
    </div><!-- /input-group -->
        </div>
        <div class="verfiGoodBtn">
          <button @click="verfiGood" class="admin_btn">审核商品</button>
        </div>
        <div class="delSeller">
          <button @click="delSeller" class="admin_btn">封禁账号</button>
        </div>
        </center>
    </div>
  </div>
</template>
<script>
import 'bootstrap'
import axios from 'axios'
export default {
  name: 'admin',
  data () {
    return {
      keyWord: '',
      islogin: false,
      currentUsername: '',
      text1: '按标题',
      text2: '按标签',
      goodId: ''
    }
  },
  created () {
    this.init()
    if (sessionStorage.token) {
      this.islogin = true
      this.currentUsername = sessionStorage.userName
    } else {
      alert('仅限管理员')
      return this.$router.push('/')
    }
    if (this.currentUsername !== 'admin') {
      alert('仅限管理员')
      return this.$router.push('/')
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
    },
    findGood () {
      this.$router.push('/')
    },
    allGood () {
      this.$router.push('/admin/allGood')
    },
    delSeller () {
      this.$router.push('/admin/delSeller')
    },
    verfiGood () {
      this.$router.push('/admin/verfiGood')
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
.admin_btn{
  border: none;
  background-color: rgba(8, 110, 168, 0.698);
  border-radius: 15px;
  color: white;
  padding: 10px 20px 10px 20px;
  margin: 10px;
  font-size: larger;
}
.con{
  margin-top: 200px;
}
.con div{
  margin-bottom: 20px;
}
</style>
