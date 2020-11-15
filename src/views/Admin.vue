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
          <div id="adminmainlefthead" @click="goadmin8"><i class="el-icon-s-custom"></i> 选课管理</div>
          <div id="adminmainlefthead" @click="goadmin9"><i class="el-icon-s-custom"></i> 班级管理</div>
          <div id="adminmainlefthead" @click="goadmin7"><i class="el-icon-s-custom"></i> 统计</div>
      </div>
      <div id="adminright">
          <div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="权限" name="first" id="jurisdiction" >
                        <div style="width:97%;display:flex;justify-content:space-between">
                            <el-select v-model="jurstate" placeholder="选择状态" @change="jurchange">
                                <el-option
                                v-for="(item,index) in juroptions"
                                :key="index"
                                :label="item.label"
                                :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        <el-button type="primary" plain @click="addjur">添加权限</el-button>
                        </div>
                        <div> 
                            <el-table
                                :data="tableDataJur"
                                stripe
                                border
                                style="width: 97%;margin-top:20px">
                                <el-table-column
                                prop="name"
                                label="权限名称"
                                width="120">
                                </el-table-column>
                                <el-table-column
                                prop="level"
                                label="权限级别"
                                width="60">
                                </el-table-column>
                                <el-table-column
                                prop="describe"
                                label="权限描述">
                                </el-table-column>
                                <el-table-column
                                prop="usable"
                                label="状态"
                                style="">
                                </el-table-column>
                                <el-table-column
                                prop="usable"
                                label="操作"
                                style="">
                                <template slot-scope="scope">
                                        <el-button
                                        size="mini"
                                        type="success"
                                        @click="startjur(scope.row)">启用</el-button>
                                        <el-button
                                        size="mini"
                                        type="info"
                                        @click="stopjur(scope.row)">禁用</el-button>
                                        <el-button
                                        size="mini"
                                        type="danger"
                                        @click="deletejur(scope.row)">删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>

                        </div>
                    </el-tab-pane>
                <el-tab-pane label="角色" name="second" id="role">
                    <div style="width:97%;display:flex;justify-content:space-between">
                        <el-select v-model="adminstate" placeholder="选择状态" @change="admchange">
                            <el-option
                            v-for="item in admoptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                        <el-button type="primary" plain @click="addrole">添加角色</el-button>
                    </div>
                        <div> 
                            <el-table
                                :data="tableDataAdm"
                                stripe
                                border
                                style="width: 97%;margin-top:20px">
                                <el-table-column
                                prop="name"
                                label="权限名称"
                                width="120">
                                </el-table-column>
                                <el-table-column
                                label="权限"
                                width="60">
                                <template slot-scope="scope">
                                    <div id="jurbtnbtn" @click="openjuradmin(scope.row)">权限</div>
                                </template>
                                </el-table-column>
                                <el-table-column
                                prop="describe"
                                label="角色描述">
                                </el-table-column>
                                <el-table-column
                                prop="usable"
                                label="状态"
                                style="">
                                </el-table-column>
                                <el-table-column
                                label="操作"
                                style="">
                                <template slot-scope="scope">
                                        <el-button
                                        size="mini"
                                        type="success"
                                        @click="startrole(scope.row)">启用</el-button>
                                        <el-button
                                        size="mini"
                                        type="danger"
                                        @click="stoprole(scope.row)">禁用</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>

                        </div>
                </el-tab-pane>
            </el-tabs>
          </div>
      </div>
    </div>
    <div id="adminmainright">
      <div id="adminrighttop">
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
          <button><i class="el-icon-s-promotion"></i> 发起项目</button>
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
        id="addadmdialog"
        title="添加角色"
        :visible.sync="centerDialogVisible"
        width="60%"
        center>
        <div style="font-size:1.2em;margin-top: 30px;">角色名称:</div>
        <el-input style="width:50%" v-model="admname" placeholder="请输入角色名称"></el-input>
        <div style="font-size:1.2em;margin-top: 30px;">角色权限:</div>
        <el-checkbox-group v-model="newadmjur">
            <el-checkbox v-for="(item,index) in tableDataJur" :key="index" :label="item.name" name="type"></el-checkbox>
        </el-checkbox-group>
        <div style="font-size:1.2em;margin-top: 30px;">角色描述:</div>
        <el-input style="width:50%" v-model="admdesc" placeholder="请输入角色描述"></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addrorole">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog
        id="addadmdialog"
        title="添加角色"
        :visible.sync="centerDialogVisible3"
        width="60%"
        center>
        <div style="font-size:1.2em;margin-top: 30px;">权限名称:</div>
        <el-input style="width:50%" v-model="jurname" placeholder="请输入权限名称"></el-input>
        <div style="font-size:1.2em;margin-top: 30px;">权限描述:</div>
        <el-input style="width:50%" v-model="jurdesc" placeholder="请输入权限描述"></el-input>
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible3 = false">取 消</el-button>
            <el-button type="primary" @click="addjujur">确 定</el-button>
        </span>
    </el-dialog>
    <el-dialog
      title="修改权限"
      :visible.sync="centerDialogVisible2"
      width="30%"
      center>
      <el-checkbox-group v-model="juradmin">
            <el-checkbox v-for="(item,index) in tableDataJur" :key="index" :label="item.name" name="type"></el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="changejujur">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
    data(){
        return{
            activeName: 'first',
            juroptions:[
                {
                    value:'可用',
                    lable:true
                },
                {
                    value:'不可用',
                    lable:false
                },
            ],
            admoptions:[
                {
                    value:'可用',
                    lable:true
                },
                {
                    value:'不可用',
                    lable:false
                },
            ],
            jurstate:'',
            jurname:'',
            jurdesc:'',
            adminstate:'',
            tableDataJur:[],
            tableDataAdm:[],
            centerDialogVisible:false,
            centerDialogVisible2:false,
            centerDialogVisible3:false,
            admname:'',
            admdesc:'',
            newadmjur:[],
            juradmin:[],
            changesomeone:'',
            pushednotice:[],
            slogin:sessionStorage.getItem("isLogin"),
            realname:sessionStorage.getItem('realname'),
            headimg:sessionStorage.getItem('headimg')

        }
    },
    methods:{
        changejujur(){
            var that = this
            this.$axios.post('/role/changejur',{
                id:that.changesomeone,
                jur:that.juradmin
            })
            .then(res=>{
                this.$message({
                        showClose: true,
                        message: res.data.msg,
                        type: 'success'
                    });
                this.centerDialogVisible2=false
            })
            .then(()=>{
                this.$axios({
                    method:'get',
                    url:'/role/findrole'
                })
                .then(res=>{
                    console.log(res.data.data);
                    this.tableDataAdm = res.data.data
                })
            })
            
        },
        openjuradmin(row){
            this.changesomeone = row._id
            this.juradmin = row.jur
            this.centerDialogVisible2 = true
        },
        addrole(){
            this.centerDialogVisible = true
        },
        addjur(){
            this.centerDialogVisible3 = true

        },
        addrorole(){
            var that = this
            this.$axios.post('/role/addrole',{
                name:that.admname,
                jur:that.newadmjur,
                describe:that.admdesc,
            })
            .then(res=>{
                console.log(res);
                this.centerDialogVisible = false
            })
            .then(()=>{
                this.$axios({
                method:'get',
                url:'/role/findrole'
            })
            .then(res=>{
                console.log(res.data.data);
                this.tableDataAdm = res.data.data
            })
            })
            
        },
        startjur(row) {
            this.$axios({
                method:'get',
                url:'/jurisdiction/startajur?id='+row._id
            })
            .then(res=>{
                if(res.data.code == 200){
                    this.$message({
                        showClose: true,
                        message: res.data.msg,
                        type: 'success'
                    });
                }
                else if(res.data.code == 201){
                    this.$message.error("权限已经被启用");
                }
            })
            .then(()=>{
                this.$axios({
                method:'get',
                url:'/jurisdiction/findjurisdiction'
            })
            .then(res=>{
                console.log(res.data.data);
                this.tableDataJur = res.data.data
            })
            })
        },
        addjujur(){
            var that = this
            this.$axios.post('/jur/addjur',{
                name:that.jurname,
                jurdesc:that.jurdesc
            })
            .then(res=>{
                console.log(res);
                this.centerDialogVisible3 = false
            })
            .then(()=>{
                this.$axios({
                    method:'get',
                    url:'/jurisdiction/findjurisdiction'
                })
                .then(res=>{
                    console.log(res.data.data);
                    this.tableDataJur = res.data.data
                })
            })
        },
        stopjur(row) {
            this.$axios({
                method:'get',
                url:'/jurisdiction/stopajur?id='+row._id
            })
            .then(res=>{
                if(res.data.code == 200){
                    this.$message({
                        showClose: true,
                        message: res.data.msg,
                        type: 'success'
                    });
                }
                else if(res.data.code == 201){
                    this.$message.error("权限已经被🈲️用");
                }
            })
            .then(()=>{
                this.$axios({
                method:'get',
                url:'/jurisdiction/findjurisdiction'
            })
            .then(res=>{
                console.log(res.data.data);
                this.tableDataJur = res.data.data
            })
            })
        },
        deletejur(row){
            this.$axios({
                method:'get',
                url:'/jur/deletebyid?id='+row._id
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
                url:'/jurisdiction/findjurisdiction'
            })
            .then(res=>{
                console.log(res.data.data);
                this.tableDataJur = res.data.data
            })
            })
        },
        startrole(row) {
            this.$axios({
                method:'get',
                url:'/role/startarole?id='+row._id
            })
            .then(res=>{
                if(res.data.code == 200){
                    this.$message({
                        showClose: true,
                        message: res.data.msg,
                        type: 'success'
                    });
                }
                else if(res.data.code == 201){
                    this.$message.error("权限已经被启用");
                }
            })
            .then(()=>{
                this.$axios({
                method:'get',
                url:'/role/findrole'
            })
            .then(res=>{
                console.log(res.data.data);
                this.tableDataAdm = res.data.data
            })
            })
        },
        stoprole(row) {
            this.$axios({
                method:'get',
                url:'/role/stoparole?id='+row._id
            })
            .then(res=>{
                if(res.data.code == 200){
                    this.$message({
                        showClose: true,
                        message: res.data.msg,
                        type: 'success'
                    });
                }
                else if(res.data.code == 201){
                    this.$message.error("权限已经被🈲️用");
                }
            })
            .then(()=>{
                this.$axios({
                method:'get',
                url:'/role/findrole'
            })
            .then(res=>{
                console.log(res.data.data);
                this.tableDataAdm = res.data.data
            })
            })
        },
        jurchange(){
            if(this.jurstate=='可用'){
                this.$axios({
            method:'get',
            url:'/jurisdiction/findusablejurisdiction'
            })
            .then(res=>{
                console.log(res.data.data);
                this.tableDataJur = res.data.data
                console.log(this.tableData);
            })
            }
            else if(this.jurstate=='不可用'){
                this.$axios({
            method:'get',
            url:'/jurisdiction/findunusablejurisdiction'
            })
            .then(res=>{
                console.log(res.data.data);
                this.tableDataJur = res.data.data
                console.log(this.tableData);
            })
            }
        },
        admchange(){
            if(this.adminstate=='可用'){
                this.$axios({
            method:'get',
            url:'/role/findusablerole'
            })
            .then(res=>{
                this.tableDataAdm = res.data.data
            })
            }
            else if(this.adminstate=='不可用'){
                this.$axios({
            method:'get',
            url:'/role/findunusablerole'
            })
            .then(res=>{
                this.tableDataAdm = res.data.data
            })
            }
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
        goadmin8(){
            this.$router.push({name:"Choose"})
        },
        goadmin9(){
            this.$router.push({name:"Classcount"})
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
            url:'/jurisdiction/findjurisdiction'
        })
        .then(res=>{
            console.log(res.data.data);
            this.tableDataJur = res.data.data
        })
        this.$axios({
            method:'get',
            url:'/role/findrole'
        })
        .then(res=>{
            console.log(res.data.data);
            this.tableDataAdm = res.data.data
        })
    },
}
</script>
  
<style>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
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
    overflow: hidden;
  }
  #admintopheadimg>img{
      width: 100%;
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
  #jurbtnbtn{
      text-decoration: underline;
      color: #66b0ff;
      cursor: pointer;
  }
</style>
