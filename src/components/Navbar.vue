<template>
  <div id="navbar">
      <div id="navcontent">
        <div id="logo" @click="gohome">研学天下</div>
        <div id="navinfo" v-if="islogin">
            <i class="el-icon-s-home" style="font-weight:bolder" @click="gohome"> 首页</i>
            <div id="logindiv">
                <div id="headimg" @click="outlogin"><img :src="navheadimg" alt=""></div>
            </div>
        </div>
        <div id="navinfo" v-if="!islogin">
            <i class="el-icon-s-home" style="font-weight:bolder" @click="gohome"> 首页</i>
            <div id="logindiv">
                <div  style="font-weight:bolder" @click="loginadmin"> 立即登陆</div>
            </div>
        </div>
      </div>
      <el-dialog
        title="登陆"
        :visible.sync="centerDialogVisible"
        width="50%"
        center>
        账号
        <el-input v-model="username" placeholder="请输入内容"></el-input>
        密码
        <el-input v-model="password" placeholder="请输入密码" type="password"></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="login">确 定</el-button>
        </span>
        </el-dialog>
  </div>
</template>

<script>
export default {
    data(){
        return{
            islogin:sessionStorage.isLogin,
            username:'',
            password:'',
            centerDialogVisible:false,
            navheadimg:sessionStorage.getItem('headimg')
        }
    },
    methods:{
        outlogin(){
            var that = this
            this.$axios({
                method:'get',
                url:'/login/outlogin?username='+sessionStorage.getItem('username')
            })
            .then(res=>{
                
                console.log(res);
                if(res.data.code==200){
                    this.$message({
                    showClose: true,
                    message: res.data.msg,
                    type: 'success'
                    });
                    sessionStorage.clear()
                    this.isLogin=false;
                    this.$router.push({ name: "Blog" });
                    location.reload()
                }
                else{
                    this.$message.error('退出失败，检查网络后重试');
                }
            })
            
            },
        login(){
            var that = this
            this.$axios({
                method:'get',
                url:'/login/userlogin?username='+that.username+'&password='+that.password
            })
            .then(res=>{
                if(res.config.url === '/login/userLogin?username=&password='){
                    this.$message.error('用户名密码不能为空');
                }
                else if(res.config.url !== '/login/userLogin?username=&password='&& res.data === 'no!'){
                    this.$message.error('用户名或密码错误');
                }
                else if(res.config.url !== '/login/userLogin?username=&password='&& res.data !== 'no!'){
                    this.centerDialogVisible = false
                    this.$message({
                    showClose: true,
                    message: res.data.msg,
                    type: 'success'
                    });
                    console.log(res);
                    this.$store.state.username=res.data.data.username
                    this.$store.state.password=res.data.data.password
                    this.$store.state.realname=res.data.data.realname
                    this.$store.state.role=res.data.data.role
                    this.$store.state.headimg=res.data.data.headimg
                    this.$store.state.jurisdiction=res.data.data.jurisdiction
                    this.$store.state.isLogin=true
                    localStorage.setItem('username',res.data.data.username)
                    sessionStorage.setItem('username',res.data.data.username)
                    sessionStorage.setItem('password',res.data.data.password)
                    sessionStorage.setItem('isLogin',true)
                    sessionStorage.setItem('headimg',res.data.data.headimg)
                    sessionStorage.setItem('realname',res.data.data.realname)
                    sessionStorage.setItem('jurisdiction',res.data.data.jurisdiction)
                    sessionStorage.setItem('role',res.data.data.role)
                    location.reload()
                }
            })
        },
        loginadmin(){
            this.centerDialogVisible = true
        },
        gohome(){
            this.$router.push({name:"Home"})
        }
    }
}
</script>

<style>
    .el-icon-s-home{
        cursor: pointer;
    }
    #navbar{
        width: 100vw;
        height: 100px;
        background: white;
    }
    #navcontent{
        width: 90%;
        height: 100%;
        margin: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    #logo{
        font-size: 2em;
        font-weight: bolder;
        cursor: pointer;
    }
    #navinfo{
        width: 200px;
        font-size: 1.5em;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    #headimg>img{
        width: 100%;
    }
    #message{
        width: 40px;
        height: 40px;
        font-size:120%;
        text-align: center;
        background: #FF8A5E;
        color: white;
        border: none;
        outline: none;
        border-radius: 7px;
    }
    #message:hover{
        background: #ffa280;
    }
    #edit{
        width: 40px;
        height: 40px;
        font-size:120%;
        text-align: center;
        background: #5E99FF;
        color: white;
        border: none;
        outline: none;
        border-radius: 7px;
    }
    #edit:hover{
        background: #85b2ff;
    }
    #headimg{
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        background: red;
    }
</style>