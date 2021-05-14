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
      <div class="part_title pt1">
        订单确认
      </div>
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
            <!-- <div class="username">
              {{ sellerNN }}
            </div> -->
          </div>
        </div>
        <div class="avaInGoodDiv">
          <img src="/static/default.png" class="avaInGood">
        </div>
        </div>
      </div>
      <div class="sellerInfo">
        <div class="contain lim4">
          <img src="/static/default.png" class="avaInGood">
          <div class="right_area">
            <div class="username2">
              ABCED
            </div>
            <div class="exp_add">
              123456
            </div>
          </div>
        </div>
      </div>
      <div class="addInfo">
        <div class="contain">
          <div class="conn_info">
            期望交易时间：
            <input type="text" class="form-control" v-model="exp_time" placeholder="输入期望时间...">
          </div>
          <div class="conn_info">
            期望交易地点：
            <input type="text" class="form-control" v-model="exp_time" placeholder="输入期望地点...">
          </div>
          <div class="conn_info">
            联系方式：
            <input type="text" class="form-control" v-model="exp_time" placeholder="输入联系方式...">
          </div>
        </div>
      </div>
      <center>
        <button class="pruchrase_order" @click="confirm">确认提交</button>
      </center>
    </div>
  </div>
</template>
<script>
import 'bootstrap'
import axios from 'axios'
export default {
  name: 'orderConfirm',
  data () {
    return {
      exp_time: '',
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
  },
  methods: {
    search () {
      this.$router.push('/search/' + this.keyWord)
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
    confirm () {
      var _this = this
      axios({
        method: 'get',
        url: window.requestUrl + '/order/create',
        data: {
          buyerId: sessionStorage.userId,
          item: {id: this.goodId}
        },
        headers: {
          'x-auth-token': sessionStorage.token
        }
      })
        .then(function (response) {
          _this.$router.push('/orderDetail/' + response.data.data.id)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
