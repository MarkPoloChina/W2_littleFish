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
          <a v-if="!islogin" class="func" href="/register">注册</a>
          <a v-if="!islogin" class="func" href="/login">登录</a>
          <a v-if="islogin" class="func" href="/user">用户：{{ currentUsername }}</a>
          <a v-if="islogin" class="func" href="javascript:void(0);" @click="logout">注销</a>
        </div>
    </header>
    <div class="main">
      <div class="topbar">
        <div class="contain">
          <div class="leftInfo">
          <div class="goodTitle">
            {{ title }}
          </div>
          <div class="priceAndUsername">
            <div class="price">
              ¥{{ price }}
            </div>
            <div class="username">
              {{ sellerNN }}
            </div>
          </div>
        </div>
        <div class="avaInGoodDiv">
          <img src="/static/default.png" class="avaInGood">
        </div>
        </div>
      </div>
      <div class="tagList">
        <div class="contain">
          <div class="sig_tag" v-for="item in tag" :key="item">
            <span class="glyphicon glyphicon-tag"></span>{{ item }}
          </div>
          <div class="preorder">
            <button class="preorder_btn" @click="bug">购买</button>
          </div>
        </div>
      </div>
      <div class="main_text">
        <div class="contain_lim">
          {{ detail }}
        </div>
      </div>
      <div class="picSeries">
        <div class="contain">
          <div class="sig_gp" v-for="item in imageIds" :key="item">
            <img class="gp" src="/static/Char_103_angel_2.png">
          </div>
        </div>
      </div>
      <div class="addInfo">
        <div class="contain">
          <div>
            发布时间：{{ timestamp }}
          </div>
          <div>
            卖家偏向以下联系方式
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
  name: 'goodDetail',
  data () {
    return {
      islogin: false,
      currentUsername: '',
      keyWord: '',
      title: '超值只要998',
      seller: 'zzp',
      sellerNN: 'SSSSBBBBBB',
      price: 100,
      goodId: '',
      tag: ['tag1', 'tag2', 'tag3'],
      address: '',
      timestamp: '',
      detail: '这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情这是一条详情',
      imageIds: [1],
      sellerAva: ''
    }
  },
  created () {
    this.goodId = this.$route.params.goodId
    var ts = new Date(1620202031474)
    this.timestamp = ts.toLocaleString()
    if (sessionStorage.token) {
      this.islogin = true
      this.currentUsername = sessionStorage.userName
    }
    this.init()
    this.geturlById(this.imageIds[0])
  },
  methods: {
    search () {
      this.$router.push('/search/' + this.keyWord)
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
    init () {
      var _this = this
      axios({
        method: 'get',
        url: window.requestUrl + '/item/' + this.goodId
      })
        .then(function (response) {
          if (response.data.rspCode === window.OKrsp) {
            if (response.data.data.item.sold) {
              alert('商品已售出')
              return _this.$router.push('/')
            }
            if (!response.data.data.item.verified) {
              alert('商品未审核')
              return _this.$router.push('/')
            }
            _this.title = response.data.data.item.name
            _this.seller = response.data.data.item.username
            var ts = new Date(response.data.data.item.created)
            _this.timestamp = ts.toLocaleString()
            _this.detail = response.data.data.item.detail
            _this.price = response.data.data.item.price
            _this.sellerNN = response.data.data.user.nickname
            _this.imageIds = response.data.data.item.imageIds
            _this.tag = response.data.data.item.tags
            _this.sellerAva = response.data.data.user.imageIds
          }
        })
    },
    geturlById (id) {
      // var _this = this
      var url
      if (url === undefined) {
        return axios({
          method: 'get',
          url: window.requestUrl + '/image/' + id
        })
          .then(function (response) {
            var eles = document.getElementsByClassName('gp')
            for (var i = 0; i < eles.length; i++) {
              eles[i].setAttribute('src', 'http://' + response.data.data)
            }
            // _this.picurl[i] = response.data.data
          })
      }
    },
    bug () {
      this.$router.push('/orderConfirm/' + this.goodId)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
