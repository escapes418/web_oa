<template>
    <div class="login-container">
        <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px" class="card-box login-form">
            <h3 class="title">司机宝管理助手</h3>
            <el-form-item prop="username">
                <span class="svg-container svg-container_login">
                    <i class="iconfont icon-weibiaoti562"></i>
                </span>
                <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="用户名" />
            </el-form-item>
            <el-form-item prop="password">
                <span class="svg-container">
                    <i class="iconfont icon-mima"></i>
                </span>
                <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on" placeholder="密码"></el-input>
                <span class="show-pwd" @click="showPwd">
                    <i :class="isClick ? 'iconfont icon-eyeo' : 'iconfont icon-eye-off'"></i>
                </span>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
                    登录
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
export default {
    name: 'login',
    data() {
        const validateUsername = (rule, value, callback) => {
            // if (!/^1[34578][0-9]{9}$/.test(value)) {
            if (value == '') {
                callback(new Error('请输入正确的手机号'))
            } else {
                callback()
            }
        }
        const validatePass = (rule, value, callback) => {
            if (value.length < 5) {
                callback(new Error('密码不能小于5位'))
            } else {
                callback()
            }
        }
        return {
            isClick: false,
            loginForm: {
                username: '',
                password: ''
            },
            loginRules: {
                username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                password: [{ required: true, trigger: 'blur', validator: validatePass }]
            },
            loading: false,
            pwdType: 'password'
        }
    },
    methods: {
        showPwd() {
            this.isClick = !this.isClick
            if (this.pwdType === 'password') {
                this.pwdType = ''
            } else {
                this.pwdType = 'password'
            }
        },
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true;
                    // 获取字典
                    // !!!登录和字典都在登录跳转前完成!!!
                    this.$store.dispatch('Login', this.loginForm).then(() => {

                        // 派发事件在登录后跳转前去获取字典数据，并存入本地
                        this.$store.dispatch('FetchDictsAndLocalstore').then(() => {
                            this.loading = false;
                            this.$router.push('/');
                        }).catch(() => {
                            this.loading = false;
                            console.log('获取字典数据失败!');
                        })

                    }).catch(() => {
                        this.loading = false;
                    })
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        }

    }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .login-container {
    position: fixed;
    height: 100%;
    width:100%;
    background-color: $bg;
    input:-webkit-autofill {
      box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
    }
    .el-input {
      display: inline-block;
      width: 85%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 400px;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select:none;
    }
    .thirdparty-button{
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }
</style>
