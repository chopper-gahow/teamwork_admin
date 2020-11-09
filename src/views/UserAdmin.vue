<template>
  <div class="admin">
    <div id="adminmainleft">
      <div id="adminleft">
          <div id="adminmainlefthead">平台管理</div>
          <div id="adminmainlefthead" @click="goadmin1"><i class="el-icon-s-tools"></i> 权限管理</div>
          <div id="adminmainlefthead" @click="goadmin2"><i class="el-icon-s-order"></i> 公告管理</div>
          <div id="adminmainlefthead" @click="goadmin3"><i class="el-icon-s-comment"></i> 反馈管理</div>
          <div id="adminmainlefthead" @click="goadmin4"><i class="el-icon-s-grid"></i> 课程管理</div>
          <div id="adminmainlefthead" @click="goadmin5"><i class="el-icon-s-flag"></i> 风采管理</div>
          <div id="adminmainlefthead" @click="goadmin6"><i class="el-icon-s-custom"></i> 用户管理</div>
          <div id="adminmainlefthead" @click="goadmin7"><i class="el-icon-s-custom"></i> 统计</div>

      </div>
      <div id="adminright">
          <div id="noticeright">
              <span>用户管理</span> 
          </div>
          <div> 
                            <el-table
                                :data="tableDataNot"
                                stripe
                                border
                                style="width: 97%;margin-top:20px">
                                <el-table-column
                                prop="username"
                                label="用户名"
                                width="180">
                                </el-table-column>
                                <el-table-column
                                prop="realname"
                                label="真实姓名"
                                width="80">
                                </el-table-column>
                                <el-table-column
                                prop="role"
                                label="角色">
                                </el-table-column>
                                <el-table-column
                                label="操作"
                                style="">
                                <template slot-scope="scope">
                                        <el-button
                                        size="mini"
                                        type="success"
                                        @click="handlerole(scope.row)">操作角色</el-button>
                                        <el-button
                                        size="mini"
                                        type="danger"
                                        @click="deleteuser(scope.row)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>

                        </div>
      </div>
    </div>
    <div id="adminmainright">
      <div id="adminrighttop" v-show="islogin">
        <div id="adminrighttopimg">
          <img src="top.png">
        </div>
        <div id="admintopheadimg">
          <img :src="headimg" alt="">
        </div>
        <div id="admintopnickname">
          {{realname}}
        </div>
        <div id="admin">
          平台管理员
        </div>
        <div id="admintopfoot">
          <button @click="goadmin"><i class="el-icon-s-promotion"></i> 发起项目</button>
        </div>
      </div>
      <div id="rightfoot">
        <div id="rightfoothead">
          <div>公告栏</div>
          <a href="">更多</a>
        </div>
        <div id="rightfootmain">
          <div id="rightfootmainitem" v-for="(item,index) in pushednotice" :key="index">
              <div id="itemtitle">{{item.title}}</div>
              <div id="itemdate">{{item.date}}</div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="修改角色"
      :visible.sync="centerDialogVisible"
      width="30%"
      center>
      <el-radio-group v-model="hisrole">
            <el-radio v-for="(item,index) in allrole" :key="index" :label="item.name" name="type"></el-radio>
      </el-radio-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="changerole">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
    data(){
        return{
          islogin:sessionStorage.getItem("isLogin"),
          realname:sessionStorage.getItem('realname'),
          headimg:sessionStorage.getItem('headimg'),
            activeName: 'first',
            options:[
                {
                    value:1
                },
                {
                    value:2
                },
                {
                    value:3
                },
                {
                    value:4
                },
                {
                    value:5
                },
            ],
            value:'',
            tableDataNot:[],
            centerDialogVisible:false,
            noticetitle:'',
            noticetext:'',
            pushednotice:[],
            allrole:[],
            hisrole:'',
            editid:""
        }
    },
    methods:{
        handlerole(row){
            this.editid = row._id
            this.centerDialogVisible = true
          this.$axios({
                method:'get',
                url:'/user/findbyid?id='+row._id
            })
            .then(res=>{
                this.hisrole = res.data.data
            })
        },
        deletenotice(row){
          this.$axios({
            method:'get',
            url:'/notice/delete?id='+row._id
          })
          .then(res=>{
            this.$message({
                        showClose: true,
                        message: res.data.msg,
                        type: 'success'
                    });
          })
          .then(()=>{
              this.$axios({
                method:'get',
                url:'/notice/findall'
              })
              .then(res=>{
                this.tableDataNot = res.data.data
              })
            })
        },
        changerole(){
          var that = this
          this.$axios.post('/user/changerole',{
                id:that.editid,
                role:that.hisrole
            })
            .then(res=>{
                this.$message({
                        showClose: true,
                        message: res.data.msg,
                        type: 'success'
                    });
                this.centerDialogVisible=false
            })
            .then(()=>{
              this.$axios({
                method:'get',
                url:'/user/findall'
              })
              .then(res=>{
                this.tableDataNot = res.data.data
              })
            })
        },
        addnotice(){
          this.centerDialogVisible = true
        },
        goadmin(){
            this.$router.push({name:"Admin"})
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        goadmin1(){
            this.$router.push({name:"Admin"})
        },
        goadmin2(){
            this.$router.push({name:"NoticeAdmin"})
        },
        goadmin3(){
            this.$router.push({name:"FeedBackAdmin"})
        },
        goadmin4(){
            this.$router.push({name:"ClassAdmin"})
        },
        goadmin5(){
            this.$router.push({name:"FengcaiAdmin"})
        },
        goadmin6(){
            this.$router.push({name:"UserAdmin"})
        },
        goadmin7(){
            this.$router.push({name:"Tongji"})
        },
    },
    mounted(){
      this.$axios({
        method:'get',
        url:'/notice/findpushed'
        })
        .then(res=>{
        this.pushednotice = res.data.data
        })
      this.$axios({
        method:'get',
        url:'/user/findall'
      })
      .then(res=>{
        this.tableDataNot = res.data.data
      })
      this.$axios({
        method:'get',
        url:'/role/findusablerole'
      })
      .then(res=>{
        this.allrole = res.data.data
      })
    }
}
</script>
  
<style>
  .admin{
    width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    margin-top: 45px;
    position: relative;
  }
  #adminmainleft{
    width: 70vw;
    display: flex;
  }
  #adminleft{
    position: relative;
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 600px;
    background: white;
    margin-right: 50px;
  }
  #adminright{
    width: 900px;
    min-height: 600px;
    background: white;
    margin-right: 50px;
    padding-top: 20px;
    padding-left: 20px;
  }
  #adminmainlefthead{
      width: 70%;
      height: 30px;
      margin: 0 auto;
      text-align: left;
      font-size: 1.2em;
      font-weight: bold;
      margin-bottom: 10px;
      cursor: pointer;
  }
  #adminmainlefthead:nth-of-type(1){
      font-size: 1.4em;
      margin-bottom: 20px;
      margin-top: 20px;
  }
  #adminmainright{
    width: 20vw;
    height: 700px;
  }
  #jurisdiction{
      text-align: left;
  }
  #adminstudyitem{
    width: 95%;
    height: 400px;
    display: flex;
  }
  #adminitemheadimg{
    width: 100px;
    height: 100px;
    background: blue;
  }
  #adminrighttop{
    width: 100%;
    height: 430px;
    background: white;
    position: relative;
    box-shadow: 5px 5px 5px rgb(227, 227, 227);

  }
  #adminrighttopimg{
    width: 100%;
    height: 129px;
  }
  #adminrighttopimg img{
    width: 100%;
  }
  #admintopheadimg{
    width: 130px;
    height: 130px;
    background: red;
    position: relative;
    border-radius: 50%;
    margin: 0 auto;
    margin-top: -65px;
    border: 4px white solid; 
  }
  #admintopnickname{
    width: 100%;
    height: 40px;
    font-size: 1.5em;
    font-weight: bolder;
    margin-top: 20px;
  }
  #admintopfoot{
    width: 100%;
    display: flex;
    justify-content: center;
  }
  #admintopfootdiv{
    width: 90px;
    height: 70px;
    border-right: 2px #F5F5F5 solid;
  }
  #admintopfootdiv:nth-last-of-type(1){
    border: none;
  }
  #admintopfootdivtop{
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2em;
    font-weight: bolder;
  }
  #admintopfootdivfoot{
    font-size: 1.4em;
    font-weight: bolder;
  }
  #adminrightfoot{
    width: 100%;
    height: 350px;
    background: white;
    margin-top: 50px;
  }
  #adminrightfoothead{
    width: 100;
    height: 30px;
    border-bottom: 2px #ECECEC solid; 
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
  #adminrightfoothead>div{
    font-size: 1.2em;
  }
  #adminrightfoothead>a{
    text-decoration: none;
    color: #A4A4A4;
  }
  #adminrightfootmain{
    width: 80%;
    height: 70%;
    background: red;
    margin: 0 auto;
    margin-top: 20px;
  }
  #admin{
    font-size: 1.1em;
    color: #A5A5A5;
  }
  #admintopfoot{
    margin-top: 40px;
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  #admintopfoot>button{
    width: 230px;
    height: 45px;
    background: #FF6C11;
    color: white;
    border: none;
    outline: none;
    border-radius: 5px;
    font-size: 1.4em;
    font-weight: 500;
  }
  #noticeright{
    width: 97%;
    display: flex;
    justify-content: space-between;
  }
  #noticeright>span{
    font-size: 2em;
  }
</style>
