<template>
  <div class="body">
    <header>
        <div class="logo">
          <a href="/">小闲鱼</a>
        </div>
        <div class="search">
    <div class="input-group search-input">
      <input type="text" class="form-control" v-model="keyWord" placeholder="输入关键字...">
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
            发布二手
        </div>
        <div class="head_pic">
          <div class="section_title">头图</div>
          <div id="hp_preview">
            <img class="hpcp" src="/static/default.png">
          </div>
          <ImgCutter @cutDown="cutDown" :rate="'1:1'">
            <button type="button" class="swt_btn" slot="open">选择文件</button>
          </ImgCutter>
        </div>
        <div class="text">
          <div class="section_title">商品名</div>
          <div class="form-group gn">
            <input type="text" v-model="goodName" class="form-control">
          </div>
        </div>
        <div class="text">
          <div class="section_title">描述</div>
          <div class="form-group">
            <textarea name="" id="discr" rows="6" v-model="desc" class="form-control"></textarea>
          </div>
        </div>
        <div class="text">
          <div class="section_title">标签</div>
          <div class="tag_list">
            <ul>
              <li v-for="item in tagList" :key="item">
                {{ item }}
                <a href="javascript:void(0);" @click="deleteTag(item)"><span class="glyphicon glyphicon-remove"></span></a>
              </li>
            </ul>
          </div>
    <div class="input-group tag_newer">
      <input type="text" class="form-control" v-model="newTagStr" @keyup.enter="newTag()" placeholder="填入新标签">
      <span class="input-group-btn">
        <button class="btn btn-default" type="button" @click="newTag()">增加</button>
      </span>
    </div><!-- /input-group -->
        </div>
        <div class="text">
          <div class="section_title">定价</div>
          <div class="input-group st">
            <span class="input-group-addon">¥</span>
            <input type="text" v-model="price" class="form-control" aria-label="Amount">
          </div>
        </div>
        <div class="submit">
          <button @click="checkGood" class="submit_btn">发布</button>
        </div>
    </div>
  </div>
</template>

<script>
import ImgCutter from 'vue-img-cutter'
import axios from 'axios'
export default {
  name: 'sell',
  data () {
    return {
      keyWord: '',
      files: null,
      goodName: '',
      desc: '',
      tagList: ['tag1', 'tag2'],
      newTagStr: '',
      price: ''
    }
  },
  methods: {
    search: function () {
      this.$router.push('/search/123')
    },
    cutDown (event) {
      this.files = event.file
    },
    showPreview () {
      var reader = new FileReader()
      reader.readAsDataURL(this.files)
      reader.onloadend = function () {
        this.preview = this.result
        var ele = document.getElementById('hp_preview')
        ele.innerHTML = '<img class="hpcp" src ="' + this.preview + '"/>'
      }
    },
    deleteTag (item) {
      this.tagList.pop(item)
    },
    newTag () {
      this.tagList.push(this.newTagStr)
      this.newTagStr = ''
    },
    postGood () {
      var _this = this
      axios({
        method: 'post',
        url: window.requestUrl + '/uploadItem',
        data: {
          name: this.goodName,
          price: this.price,
          detail: this.desc,
          tags: this.tagList,
          username: sessionStorage.userName
        },
        headers: {
          'x-auth-token': sessionStorage.token
        }
      })
        .then(function (response) {
          if (response.data.rspCode === window.OKrsp) {
            alert('OK')
            _this.$router.push('/')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    checkGood () {
      if (!this.files) { return alert('没有头图') }
      if (this.goodName === '') { return alert('没有商品名') }
      if (!this.desc) { return alert('没有描述') }
      if (!this.price) { return alert('没有价格') }
    }
  },
  watch: {
    files: function () {
      this.showPreview()
    }
  },
  components: {
    ImgCutter
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.head_pic{
  padding-left: 10%;
  padding-right: 10%;
}
.hp_preview
{
  display: inline-block;
}
.hpcp{
  width: 200px;
  height: 200px;
  border-radius: 10px;
}
.imc{
  display: inline-block;
}
.text{
  padding-left: 10%;
  padding-right: 10%;
}
.section_title{
  font-size: 20px;
  padding: 20px 0 20px 0;
}
.swt_btn{
  border: none;
  background-color: rgba(8, 110, 168, 0.698);
  border-radius: 15px;
  color: white;
  padding: 10px;
  margin: 10px;
}
.tag_newer{
  width: 300px;
}
#discr{
  resize: none;
  font-size: large;
}
.submit{
  width: 100%;
  text-align: center;
  padding-top: 50px;
  padding-bottom: 150px;
}
.submit_btn{
  border: none;
  background-color: rgba(8, 110, 168, 0.698);
  border-radius: 15px;
  color: white;
  padding: 10px 20px 10px 20px;
  margin: 10px;
  font-size: larger;
}
.st{
  width: 200px;
}
.gn{
  width: 800px;
}
</style>
