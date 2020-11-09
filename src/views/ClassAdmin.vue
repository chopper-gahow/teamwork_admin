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
          <div>
            <div id="noticeright">
              <span>课程管理</span>
              <el-button type="success" @click="addnewclass">发起课程</el-button>
          </div>
          <div id="myitems" v-for="(item,index) in allclass" :key="index">
              <div id="itemcover">
                  <img :src="item.coverimg" alt="">
              </div>
              <div id="myiteminfo">
                  <div id="nameanddown">
                      <div id="myitemtitle">{{item.name}}</div>
                      <el-dropdown trigger="click" id="downbutton">
                        <span class="el-dropdown-link">
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-popconfirm title="确定删除吗？">
                                <el-dropdown-item slot="reference" @click.native="deletethis(item._id)">删除</el-dropdown-item>
                            </el-popconfirm>
                            <el-dropdown-item @click.native="openeditclass(item._id)">修改</el-dropdown-item>
                            
                        </el-dropdown-menu>
                    </el-dropdown>
                  </div>
                  <div id="myitemcontent">{{item.desc}}</div>
                  <div style="text-align:right">
                    <div>教师:{{item.techer}}</div>
                    <div>课时:{{item.classtime}}</div>
                  </div>
              </div>
          </div>
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
    title="添加课程"
    :visible.sync="classdialog"
    width="85%"
    center>
    <el-input v-model="name" placeholder="请输入课程名称..." style="margin-bottom:20px"></el-input>
            <el-select v-model="techer" placeholder="请选择课程" id="kindselect">
                <el-option label="娜娜" value="娜娜"></el-option>
                <el-option label="彬彬" value="彬彬"></el-option>
                <el-option label="莉莉" value="莉莉"></el-option>
                <el-option label="钉钉" value="钉钉"></el-option>
            </el-select>
            <el-select v-model="classtime" placeholder="请选择课时" id="kindselect">
                <el-option label="8" value="8"></el-option>
                <el-option label="12" value="12"></el-option>
                <el-option label="16" value="16"></el-option>
                <el-option label="24" value="24"></el-option>
            </el-select>
            <div>
                <span id="coverdec">请选择课程的封面</span>
            </div>
            <div id="titandcov">
                <div>
                    <el-upload
                        class="upload-demo"
                        drag
                        action="http://upload-z2.qiniup.com"
                        :data="postData"
                        :on-success="uploadcoverSuccess"
                        multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </div>
                <div v-if='coverimg' id="editcoverimg"><img :src="coverimg"></div>
            </div>
            <el-input v-model="desc" placeholder="请输入课程描述"></el-input>

    <span slot="footer" class="dialog-footer">
        <el-button @click="classdialog = false">取 消</el-button>
        <el-button type="primary" @click="addclass">确 定</el-button>
    </span>
    </el-dialog>
    <el-dialog
    title="编辑课程"
    :visible.sync="editdialog"
    width="85%"
    center>
    <el-input v-model="upname" placeholder="请输入课程名称..." style="margin-bottom:20px"></el-input>
            <el-select v-model="uptecher" placeholder="请选择课程" id="kindselect">
                <el-option label="娜娜" value="娜娜"></el-option>
                <el-option label="彬彬" value="彬彬"></el-option>
                <el-option label="莉莉" value="莉莉"></el-option>
                <el-option label="钉钉" value="钉钉"></el-option>
            </el-select>
            <el-select v-model="upclasstime" placeholder="请选择课时" id="kindselect">
                <el-option label="8" value="8"></el-option>
                <el-option label="12" value="12"></el-option>
                <el-option label="16" value="16"></el-option>
                <el-option label="24" value="24"></el-option>
            </el-select>
            <div>
                <span id="coverdec">请选择课程的封面</span>
            </div>
            <div id="titandcov">
                <div>
                    <el-upload
                        class="upload-demo"
                        drag
                        action="http://upload-z2.qiniup.com"
                        :data="postData"
                        :on-success="uploadcoverSuccess2"
                        multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </div>
                <div v-if='upcoverimg' id="editcoverimg"><img :src="upcoverimg"></div>
            </div>
            <el-input v-model="updesc" placeholder="请输入课程描述"></el-input>

    <span slot="footer" class="dialog-footer">
        <el-button @click="editdialog = false">取 消</el-button>
        <el-button type="primary" @click="editclass">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
    data(){
        return{
            name:'',
            coverimg:'',
            desc:'',
            classtime:'',
            techer:'',
            upname:'',
            upcoverimg:'',
            updesc:'',
            upclasstime:'',
            uptecher:'',
            upid:'',
            allclass:[],
            pushednotice:[],
            classdialog:false,
            editdialog:false,
            slogin:sessionStorage.getItem("isLogin"),
            realname:sessionStorage.getItem('realname'),
            headimg:sessionStorage.getItem('headimg'),
            postData:{
                token:this.$store.state.qiniutoken,
                domain:'hcpr.s3-cn-south-1.qiniucs.com'
            }
        }
    },
    methods:{
        openeditclass(id){
            this.editdialog = true
            this.$axios({
                method:'get',
                url:'/class/beforeupdate?id='+id
            })
            .then(res=>{
                this.upid = id
                this.upname = res.data.data.name
                this.upcoverimg = res.data.data.coverimg
                this.uptecher = res.data.data.techer
                this.upclasstime = res.data.data.classtime
                this.updesc = res.data.data.desc
            })
        },
        editclass(){
            var that = this
            this.$axios.post('/class/updateclass',{
                id:that.upid,
                name:that.upname,
                coverimg:that.upcoverimg,
                techer:that.uptecher,
                classtime:that.upclasstime,
                desc:that.updesc,
            })
            .then(()=>{
                location.reload()
            })
            .then(()=>{
                this.$message({
                            showClose: true,
                            message: '修改成功',
                            type: 'success'
                            });
            })
        },
        addclass(){
            var that = this
            this.$axios.post('class/addnew',{
                name:that.name,
                techer:that.techer,
                desc:that.desc,
                coverimg:that.coverimg,
                classtime:that.classtime
            })
            .then(res=>{
                this.$message({
                    showClose: true,
                    message: res.data.msg,
                    type: 'success'
                    });
                    that.classdialog = false
                    location.reload()
            })
        },
        uploadcoverSuccess(res){
            this.coverimg = 'http://hchopper.top/'+res.hash
        },
        uploadcoverSuccess2(res){
            this.upcoverimg = 'http://hchopper.top/'+res.hash
        },
        addnewclass(){
            this.classdialog = true
        },
        deletethis(id){
            this.$axios({
                method:'get',
                url:`/class/deletebyid?id=${id}`
            })
            .then(res=>{
                    this.$message({
                    showClose: true,
                    message: '删除成功',
                    type: 'success'
                    });
            })
            .then(()=>{
                location.reload()
            })
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
            url:'/class/findall'
        })
        .then(res=>{
            this.allclass = res.data.data
        })
        this.$axios({
                        method:'get',
                        url:'/token/cper/gettoken'
                    })
                .then(res=>{
                        this.postData.token = res.data.token
                })
    },
}
</script>
  
<style>
    #titandcov{
        display: flex;
    }
     #editcoverimg{
        width: 366px;
        height: 200px;
        overflow: hidden;
    }
    #editcoverimg>img {
        width: 100%;
    }
    #nameanddown{
        display: flex;
        justify-content: space-between;
    }
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
  #myitems{
      width: 88%;
      height: 170px;
      margin: 0 auto;
      box-shadow: 0 0 10px rgb(185, 145, 145);
      display: flex;
      align-items: center;
      padding: 0 20px;
      justify-content: space-between;
      margin-bottom: 20px;
  }
  #itemcover{
      width: 250px;
      height: 90%;
      background: red;
      overflow: hidden;
  }
  #itemcover img{
      width: 100%;
  }
  #myiteminfo{
      width: 340px;
      height: 90%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      
  }
  #myitemtitle{
      font-size: 1.2em;
      font-weight: 500;
      text-align: left;
  }
  #myitemcontent{
      margin-top: 20px;
      font-size: .9em;
      font-weight: 500;
      text-align: left;
  }
  #myitemfeedback{
      width: 340px;
      height: 30px;
  }
</style>
