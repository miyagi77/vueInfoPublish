<template>
  <el-container>
  <el-aside style="width:10%">
      <ul style="list-style: none; min-height: 400px; padding: 0; line-height: 50px;margin: 0;">
          <li v-for="(item,index) in leftList" :key="index"  @click="mouseEnter(index)"  :class="{active:index==isActive}" style="cursor:pointer"> 
             <span><i :class=item.class></i></span>   {{item.name}}
          </li>
      </ul>
  </el-aside>
  <el-main v-if="showSend">
      <div style="float:left;width: 70%;margin-bottom: 10px;">
          <div style="border:1px solid #ddd;">
            <p style="margin: 0;height: 40px;line-height: 40px;text-align: left;background-color: #E7E7E7;padding-left: 1%;">
                <span style="height: 25px;width: 30px;display: inline-block;background-color: orange;line-height: 25px;text-align: center;color: #fff;font-weight: bold;border-radius: 6px;margin-right: 0.2%;">1</span>
                编辑短信内容
                <el-button type="warning" style="float: right;padding: 7px 12px;margin: 4px;" @click="chooseTre">选择模板</el-button>
                <el-dialog
                title="选择模板"
                :visible.sync="dialogVisibleChoose"
                width="40%"
                >
                <div style='padding: 10px;color: red;'>使用模板后请在"{}"中填写内容。</div>
                <el-table
                :data="tableData5"
                height="304px"
                border
                style="width: 100%;text-align:center">
                <el-table-column
                prop="id"
                label="编号">
                </el-table-column>
                <el-table-column
                prop="content"
                label="内容"
                width="380"
                >
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="chooseSendContent(scope.$index, scope.row)">使用</el-button>
                    </template>
                </el-table-column>
            </el-table>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisibleChoose = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisibleChoose = false">确 定</el-button>
                </span>
                </el-dialog>
            </p>
            <textarea style="text-align: left;width: 97%;margin: 10px auto;height: 180px;"  placeholder="请输入您要发送的短信内容" v-model="textarea"></textarea>
            <p style="margin: 0;text-align: left;font-size: small;margin-bottom: 5px;">短信签名:<span style="color:#E6A23C;margin: 0px;text-align: left;padding-left: 12px;">【延安气象信息】</span></p>
          </div>
          <div style="border:1px solid #ddd;margin-top: 10px;">
          <p style="margin: 0;height: 40px;line-height: 40px;text-align: left;background-color: #E7E7E7;padding-left: 1%;">
              <span style="height: 25px;width: 30px;display: inline-block;background-color: orange;line-height: 25px;text-align: center;color: #fff;font-weight: bold;border-radius: 6px;margin-right: 0.2%;">3</span> 
              短信接收号码
          </p>
            <textarea style="text-align: left;width: 97%;margin: 10px auto;height: 200px;" v-model="phoneNumber" placeholder="手机号码请用中文符号'，'隔开"  plain @click="openTie"></textarea>
          </div>
      </div>
      <div style="float: left;width: 17%;min-height: 500px;border: 1px solid rgb(221, 221, 221);margin-left: 20px;background-color: #fff;">
          <p style="margin: 0;height: 40px;line-height: 40px;text-align: left;background-color: #E7E7E7;padding-left: 1%;">
              <span style="height: 25px;width: 30px;display: inline-block;background-color: orange;line-height: 25px;text-align: center;color: #fff;font-weight: bold;border-radius: 6px;margin-right: 0.2%;">2</span> 
              通讯录号码
              <span class="el-icon-circle-plus" style="display: inline-block;cursor: pointer;" @click="addPhone"></span>
              <el-dialog title="添加终端" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="手机号码："  class="fromItm">
                    <el-input  v-model="form.name" autocomplete="off" ></el-input>
                    </el-form-item>
                    <el-form-item label="单位："  class="fromItm">
                    <el-input v-model="form.company" autocomplete="off"></el-input>
                     </el-form-item>
                    <el-form-item label="省："  class="fromItm">
                    <el-input v-model="form.prov" autocomplete="off"></el-input>
                     </el-form-item>
                    <el-form-item label="市："  class="fromItm">
                    <el-input v-model="form.city" autocomplete="off"></el-input>
                     </el-form-item>
                    <el-form-item label="县："  class="fromItm">
                    <el-input v-model="form.cnty" autocomplete="off"></el-input>
                     </el-form-item>
                    <el-form-item label="乡："  class="fromItm">
                    <el-input v-model="form.town" autocomplete="off"></el-input>
                     </el-form-item>
                    <el-form-item label="使用状态："  class="fromItm">
                    <el-select v-model="form.region" placeholder="请选择使用状态">
                        <el-option label="正常" value="0"></el-option>
                        <el-option label="停用" value="1"></el-option>
                    </el-select>
                     </el-form-item>
                    <el-form-item label="负责人："  class="fromItm">
                    <el-input v-model="form.user" autocomplete="off"></el-input>
                     </el-form-item>
                    <el-form-item label="负责人电话："  class="fromItm">
                    <el-input v-model="form.userPhone" autocomplete="off"></el-input>
                     </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="addTerForWeb">确 定</el-button>
                </div>
               </el-dialog>
          </p>
          <el-tree
            :data="data2"
            show-checkbox
            :props="defaultProps"
             ref="tree"
             node-key="phone"
            style="padding: 15px;"
            >
            </el-tree>
      </div>
      <div style="clear:both;margin-top:10px">
        <el-button type="info" style=" padding: 12px 50px;margin-left: 24%;">保存</el-button>
        <el-button type="success" style=" padding: 12px 50px;" @click="sendMe">发送</el-button>
      </div>
  </el-main>
   <el-main v-if="showTre">
      <div>
          <div style="text-align: left;margin: 15px;">
               
                <span class="demonstration">创建时间：</span>
                <el-date-picker
                  v-model="value1"
                  type="datetimerange"
                  :picker-options="pickerOptions2"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  align="right">
                </el-date-picker>

                <span style="display: inline-block;margin-left: 3%;">模板内容：</span>
                <el-autocomplete
                class="inline-input"
                v-model="state2"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                :trigger-on-focus="false"
                @select="handleSelect"
                
                ></el-autocomplete>
                <el-button type="primary" icon="el-icon-search" style="margin-left: 3%;">搜索</el-button>
                 <el-button type="warning" icon="el-icon-circle-plus" style="margin-left: 1%;" @click="dialogVisible = true">添加模板</el-button>
                 <el-dialog
                    title="增加模板"
                    :visible.sync="dialogVisible"
                    width="30%"
                    :before-close="handleClose">
                    <span>
                        模板名称：<el-input v-model="textareaName" placeholder="请输入名称" style="margin: 10px;"></el-input>
                        模板内容：
                            <el-input
                                type="textarea"
                                :rows="3"
                                placeholder="请输入模板内容"
                                v-model="treContent"
                                style="margin: 10px;">
                                </el-input>
                        模板备注：<el-input v-model="textareaRemark" placeholder="申请原因，使用场景" style="margin: 10px;"></el-input>
                        <div>
                          <p style="color:red">   填写规则：</p>

                           <p> 1、变量用{xx}表示，一个x代表一个字，实际发送的变量字数小于等于x的个数即可，模板中标点也用变量表示；</p>
                            <p> 2、变量长度根据实际应用设置，不允许提供全部都是变量，或绝大部分都是变量的模板；</p>
                            <p> 3、企业签名为平台自动添加，模板中不要带企业签名；</p>
                            <p> 4、发送时变量无需带{}；</p>
                            <p> 例如：</p>
                            <p> 发送内容，如：尊敬的张三，您本次验证码为123456，请在10分钟内使用！</p>
                            <p> 整理模板，如：尊敬的{xxxx}您本次验证码为{xxxxxxx}请在10分钟内使用{x}</p>
                        </div>
                    </span>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="submitTre">确 定</el-button>
                    </span>
                 </el-dialog>
          </div>
            <el-table
                :data="tableData3"
                height="304px"
                border
                style="width: 100%;text-align:center">
                <el-table-column
                prop="id"
                label="编号"
                width="180">
                </el-table-column>
                <el-table-column
                prop="content"
                label="内容">
                </el-table-column>
                <el-table-column
                prop="state"
                label="状态">
                </el-table-column>
                <el-table-column
                prop="date"
                label="创建时间">
                </el-table-column>
                <el-table-column
                prop="name"
                label="备注">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
      </div>
  </el-main>
   <el-main v-if="showHis">
      <div>
          <div style="text-align: left;margin: 15px;">
               
                <span class="demonstration">创建时间：</span>
                <el-date-picker
                  v-model="value2"
                  type="datetimerange"
                  :picker-options="pickerOptions2"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  format = "yyyy-MM-dd HH:mm:ss"
                  align="right">
                </el-date-picker>

                
                <el-button type="primary" icon="el-icon-search" style="margin-left: 3%;">搜索</el-button>
          </div>
            <el-table
                :data="tableDatas"
                height="304px"
                border
                style="width: 100%;text-align:center">
                <el-table-column
                prop="ids"
                label="短信签名"
                width="180">
                </el-table-column>
                <el-table-column
                prop="contents"
                label="内容">
                </el-table-column>
                <el-table-column
                prop="dates"
                label="发送时间">
                </el-table-column>
                <el-table-column
                prop="names"
                label="收件人">
                </el-table-column>
                <el-table-column
                prop="users"
                label="收件号码">
                </el-table-column>
            </el-table>
      </div>
  </el-main>
</el-container>
</template>

<script>
export default {
  data() {
    return {
      isActive: 0,
      data2: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      pickerOptions1: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      },
      tableData3: [],
      tableData5: [],
      tableDatas: [],
      restaurants: [],
      state2: "",
      count: 1,
      showSend: true,
      showTre: false,
      showHis: false,
      textarea: "",
      dialogVisible: false,
      treContent: "",
      textareaName: "",
      textareaRemark: "",
      dialogVisibleChoose: false,
      phoneNumber: '',
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        company: "",
        prov: "",
        city: "",
        cnty: "",
        town: "",
        user: "",
        userPhone: ""
      },
      value1: "",
      value2: [],
      parameters : "",
      
    };
  },
  computed: {
    leftList() {
      return this.$store.state.leftList;
    }
  },
  methods: {
    //   鼠标点击
    mouseEnter(index) {
      this.isActive = index;
      if (index == 0) {
        let _self = this;
        this.showSend = true;
        this.showTre = false;
        this.showHis = false;
        this.data2 = [];
        this.$axios
          .get("http://192.168.13.178:8002/api/Terminal/GetTerminal")
          .then(function(response) {
            response.data.map(n => {
              if (n.Type == 0) {
                _self.data2.push({
                  label: n.TUseCompany,
                  children: [
                    {
                      label: n.TerminalVal,
                      phone: n.TerminalVal
                    }
                  ]
                });
              }
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      } else if (index == 1) {
        this.showSend = false;
        this.showTre = true;
        this.showHis = false;
        this.tableData3 = [];
        let tableD3 = this.tableData3;
        //查询模板
        this.$axios
          .get("http://192.168.13.178:8002/api/SMS/GetSmsTemplate")
          .then(function(response) {
            response.data.map(n => {
              if (n.status == 0) {
                n.send = "审核通过";
              } else if (n.status == 1) {
                n.send = "待审核";
              } else if (n.status == 2) {
                n.send = "审核未通过";
              }
              tableD3.push({
                name: n.remark,
                id: n.id,
                content: n.text,
                date: n.time,
                state: n.send
              });
            });
          })
          .catch(function(error) {
            console.log(error);
          });
      } else if (index == 2) {
        this.showSend = false;
        this.showTre = false;
        this.showHis = true;
      }
    },

    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除模板, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(index, row);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    querySearch(queryString, cb) {
      var restaurants = this.restaurants;
      var results = queryString
        ? restaurants.filter(this.createFilter(queryString))
        : restaurants;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return restaurant => {
        return (
          restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        );
      };
    },
    loadAll() {
      return [{ value: "xxxx" }, { value: "xxxx" }, { value: "xxxx" }];
    },

    //发送短信
    sendMe() {
      //this.$refs.tree.getCheckedKeys() 按key值获取
      let phonrToPost = [];
      let _self = this;
      if (this.$refs.tree.getCheckedNodes() == []) {
        phonrToPost = this.phoneNumber.split("，");
      } else {
        if (this.$refs.tree.getCheckedNodes().length > 1) {
          phonrToPost = this.phoneNumber.split("，");
          for (let i = 1; i < this.$refs.tree.getCheckedNodes().length; i++) {
            phonrToPost.push(this.$refs.tree.getCheckedNodes()[i].phone);
          }
        }
      }
      //去掉数组中的false, null, 0, "", undefined, and NaN
      let formattingArr = [];
      for (let item of phonrToPost) {
        if (item) {
          formattingArr.push(item);
        }
      }
      //截取花括号内容
      let regex3 = /[^\{\)]+(?=\})/g;
      let successMessage = this.$message;
      console.log(this.parameters,123456789)
      this.$axios
        .post("http://192.168.13.178:8002/api/SMS/AddSms", {
          userName: "张三",
          phoneNumbers: formattingArr,
          smsSign: "延安气象信息",
          parameters: this.textarea.match(regex3),
          templateId: "244923",
          SmsContent:this.textarea
        })
        .then(function(response) {
          if (response.data == "success") {
            successMessage({
              showClose: true,
              message: "发送成功！",
              type: "success"
            });
            _self.textarea = "";
            _self.phoneNumber = "";
          }else{
            successMessage.error('发送失败！请检查填写数据是否符合规范。');
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done(
            (this.textareaRemark = ""),
            (this.treContent = ""),
            (this.textareaName = "")
          );
        })
        .catch(_ => {});
    },
    //添加模板
    submitTre() {
      let successMessage = this.$message;
      let _self = this;
      this.$axios
        .post("http://192.168.13.178:8002/api/SMS/AddSmsTemplate", {
          remark: this.textareaRemark,
          text: this.treContent,
          title: this.textareaName,
          type: 0,
          international: 0
        })
        .then(function(response) {
          if (response.data == "success") {
            successMessage({
              showClose: true,
              message: "添加成功！",
              type: "success"
            });
            _self.textareaRemark = "";
            _self.treContent = "";
            _self.textareaName = "";
          }else{
            successMessage.error('添加失败！请检查填写数据是否符合规范。');
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    chooseTre() {
      this.tableData5 = [];
      let tableD5 = this.tableData5;
      this.dialogVisibleChoose = true;
      this.$axios
        .get("http://192.168.13.178:8002/api/SMS/GetSmsTemplate")
        .then(function(response) {
          response.data.map(n => {
            if (n.status == 0) {
              n.send = "审核通过";
              tableD5.push({
                name: n.remark,
                id: n.id,
                content: n.text,
                date: n.time,
                state: n.send,
                operation: "使用"
              });
            }
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //选择模板
    chooseSendContent(index, row) {
      let _self = this
      this.textarea = "";
      this.dialogVisibleChoose = false;
      console.log(row.id)
      this.$axios.get('http://192.168.13.178:8002/api/Terminal/GetTerminalContent?templateId='+row.id)
      .then(function(response){
        console.log(response.data)
        _self.textarea = response.data
        _self.parameters = response.data
      })
    },
    //添加终端
    addPhone() {
      this.dialogFormVisible = true;
    },
    //添加终端
    addTerForWeb() {
      let successMessage = this.$message;
      let _self = this;
      this.$axios
        .post("http://192.168.13.178:8002/api/Terminal/AddTerminal", {
          TerminalVal: this.form.name,
          Type: "0",
          TUseCompany: this.form.company,
          Province: this.form.prov,
          City: this.form.city,
          Cnty: this.form.cnty,
          Town: this.form.town,
          Status: this.form.region,
          Contacts: this.form.user,
          ConTel: this.form.userPhone
        })
        .then(function(response) {
          if (response.data == "success") {
            successMessage({
              showClose: true,
              message: "添加成功！",
              type: "success"
            });
            _self.from = {
              name: "",
              region: "",
              date1: "",
              date2: "",
              delivery: false,
              type: [],
              resource: "",
              desc: "",
              company: "",
              prov: "",
              city: "",
              cnty: "",
              town: "",
              user: "",
              userPhone: ""
            };
            _self.dialogFormVisible = false;
          }else{
            successMessage.error('添加失败！请检查填写数据是否符合规范。');
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //查询
    search() {
      let _self = this;
      _self.tableDatas = [];
      this.$axios
        .get("http://192.168.13.178:8002/api/SMS/GetSmsInfo")
        .then(function(response) {
          console.log(response);
          response.data.map(n => {
            console.log(n);
             _self.tableDatas.push({ids:n.smsSign,contents:n.SmsContent,dates:_self.moment(n.SendTime).format("YYYY-MM-DD HH:00:00"),names:n.userName,users:n.PhoneNumber})//SendTime
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //提醒框
    openTie(){
      const h = this.$createElement;

        this.$notify({
          title: '提示',
          message: h('p', { style: 'color: teal'}, '请使用中文逗号隔开手机号码。')
        });
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
    this.tableData5 = [];
    let tableD5 = this.tableData5;
    this.$axios
      .get("http://192.168.13.178:8002/api/SMS/GetSmsTemplate")
      .then(function(response) {
        response.data.map(n => {
          if (n.status == 0) {
            n.send = "审核通过";
            tableD5.push({
              name: n.remark,
              id: n.id,
              content: n.text,
              date: n.time,
              state: n.send,
              operation: "使用"
            });
          }
        });
      })
      .catch(function(error) {
        console.log(error);
      });

    this.mouseEnter(0);
    this.value2.push(
      this.moment()
        .add(-1, "days")
        .format("YYYY-MM-DD HH:mm:ss"),
      this.moment().format("YYYY-MM-DD HH:mm:ss")
    );
    this.search();
  }
};
</script>
<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  color: #333;
  text-align: center;
  /* line-height: 200px; */
  border: 1px solid #ddd;
  border-top: none;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  padding-left: 40px;
  /* text-align: center; */
  /* line-height: 160px; */
}
.el-form-item__content {
  float: left !important;
}
.fromItm {
  display: inline-block;
  width: 45%;
  margin: 0 2%;
  margin-bottom: 0 !important;
}
.el-form-item__label {
  width: 100px !important;
}
</style>
