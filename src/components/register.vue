<template>
  <div class="body1">
    <div class="demo form-bg">
      <div class="container">
        <div class="row">
          <div class="col-md-offset-3 col-md-6">
            <form class="form-horizontal">
              <span class="heading">小闲鱼用户注册</span>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  v-model="userName"
                  placeholder="用户名"
                />
                <i class="fa fa-user"></i>
              </div>
              <div class="form-group help">
                <input
                  type="password"
                  class="form-control"
                  v-model="pw"
                  placeholder="密码"
                />
                <i class="fa fa-lock"></i>
              </div>
              <div class="form-group help">
                <input
                  type="password"
                  class="form-control"
                  v-model="repw"
                  placeholder="重复密码"
                />
                <i class="fa fa-lock"></i>
              </div>
              <div class="form-group">
                <button type="button" class="btn btn-default" @click="checkForm">注册</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'register',
  data () {
    return {
      userName: '',
      pw: '',
      repw: ''
    }
  },
  methods: {
    checkForm () {
      if (this.userName === '') {
        return alert('没有用户名')
      }
      if (this.pw === '') {
        return alert('没有密码')
      }
      if (this.pw !== this.repw) {
        return alert('重复密码为空或不匹配')
      }
      this.regForm()
    },
    regForm () {
      var _this = this
      axios({
        method: 'post',
        url: window.requestUrl + '/register',
        data: {
          username: this.userName,
          password: this.pw
        }
      })
        .then(function (response) {
          if (response.data.rspCode === window.OKrsp) {
            alert('OK')
          } else if (response.data.rspCode === window.repName) {
            alert('用户名已被使用,换一个吧')
            _this.userName = ''
            _this.pw = ''
            _this.repw = ''
          } else {
            alert(response.data.rspMsg)
            _this.userName = ''
            _this.pw = ''
            _this.repw = ''
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "font-awesome/css/font-awesome.min.css";
.body1 {
  padding-top: 10%;
  background-color: #d1d1d188;
  height: 100%;
  width: 100%;
  position: absolute;
}
.form-bg {
  padding: 2em 0;
}
.form-horizontal {
  background: #fff;
  padding-bottom: 40px;
  border-radius: 15px;
  text-align: center;
}
.form-horizontal .heading {
  display: block;
  font-size: 35px;
  font-weight: 700;
  padding: 35px 0;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 30px;
}
.form-horizontal .form-group {
  padding: 0 40px;
  margin: 0 0 25px 0;
  position: relative;
}
.form-horizontal .form-control {
  background: #f0f0f0;
  border: none;
  border-radius: 20px;
  box-shadow: none;
  padding: 0 20px 0 45px;
  height: 40px;
  transition: all 0.3s ease 0s;
}
.form-horizontal .form-control:focus {
  background: #e0e0e0;
  box-shadow: none;
  outline: 0 none;
}
.form-horizontal .form-group i {
  position: absolute;
  top: 12px;
  left: 60px;
  font-size: 17px;
  color: #c8c8c8;
  transition: all 0.5s ease 0s;
}
.form-horizontal .form-control:focus + i {
  color: #00b4ef;
}
.form-horizontal .fa-question-circle {
  display: inline-block;
  position: absolute;
  top: 12px;
  right: 60px;
  font-size: 20px;
  color: #808080;
  transition: all 0.5s ease 0s;
}
.form-horizontal .fa-question-circle:hover {
  color: #000;
}
.form-horizontal .main-checkbox {
  float: left;
  width: 20px;
  height: 20px;
  background: #11a3fc;
  border-radius: 50%;
  position: relative;
  margin: 5px 0 0 5px;
  border: 1px solid #11a3fc;
}
.form-horizontal .main-checkbox label {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 0;
  left: 0;
  cursor: pointer;
}
.form-horizontal .main-checkbox label:after {
  content: "";
  width: 10px;
  height: 5px;
  position: absolute;
  top: 5px;
  left: 4px;
  border: 3px solid #fff;
  border-top: none;
  border-right: none;
  background: transparent;
  opacity: 0;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
}
.form-horizontal .main-checkbox input[type="checkbox"] {
  visibility: hidden;
}
.form-horizontal .main-checkbox input[type="checkbox"]:checked + label:after {
  opacity: 1;
}
.form-horizontal .text {
  float: left;
  margin-left: 7px;
  line-height: 20px;
  padding-top: 5px;
  text-transform: capitalize;
}
.form-horizontal .btn {
  float: center;
  font-size: 14px;
  color: #fff;
  background: #00b4ef;
  border-radius: 30px;
  padding: 10px 25px;
  border: none;
  text-transform: capitalize;
  transition: all 0.5s ease 0s;
}
@media only screen and (max-width: 479px) {
  .form-horizontal .form-group {
    padding: 0 25px;
  }
  .form-horizontal .form-group i {
    left: 45px;
  }
  .form-horizontal .btn {
    padding: 10px 20px;
  }
}
</style>
