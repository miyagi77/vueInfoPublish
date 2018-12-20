<template>
  <el-container>
  <el-aside style="width:10%">
      <ul style="list-style: none; min-height: 400px; padding: 0; line-height: 50px;margin: 0;">
          <li v-for="(item,index) in qqList" :key="index"  @click="mouseEnter(index)"  :class="{active:index==isActived}" style="cursor:pointer"> 
             <span><i :class=item.class></i></span>   {{item.name}}
          </li>
      </ul>
  </el-aside>
  <el-main v-if="showSend">
      <div style="float:left;width: 70%;margin-bottom: 10px;">
          <div style="border:1px solid #ddd;">
            <p style="margin: 0;height: 40px;line-height: 40px;text-align: left;background-color: #E7E7E7;padding-left: 1%;">
                <span style="height: 25px;width: 30px;display: inline-block;background-color: orange;line-height: 25px;text-align: center;color: #fff;font-weight: bold;border-radius: 6px;margin-right: 0.2%;">1</span>
                编辑邮件内容
            </p>
            <div style="padding: 10px;">
                <span style="float:left;line-height: 43px;margin-right: 10px;">邮件标题：</span>
                <el-input v-model="title" placeholder="请输入邮件标题" style="width: 30%;float: left;"></el-input>
            </div>
            
            <textarea style="text-align: left;width: 97%;margin: 10px auto;height: 180px;"  placeholder="请输入您要发送的邮件内容" v-model="textarea"></textarea>
            <!-- <p style="margin: 0;text-align: left;font-size: small;margin-bottom: 5px;">企业签名:<span style="color:#E6A23C;margin: 0px;text-align: left;padding-left: 12px;">【省气象信息中心】</span></p> -->
          </div>
          <div style="border:1px solid #ddd;margin-top: 10px;">
          <p style="margin: 0;height: 40px;line-height: 40px;text-align: left;background-color: #E7E7E7;padding-left: 1%;">
              <span style="height: 25px;width: 30px;display: inline-block;background-color: orange;line-height: 25px;text-align: center;color: #fff;font-weight: bold;border-radius: 6px;margin-right: 0.2%;">3</span> 
              收件人邮箱
          </p>
            <textarea  v-model="qqEmaile" style="text-align: left;width: 97%;margin: 10px auto;height: 200px;"  placeholder="邮箱之间请用中文符号'，'隔开"  plain @click="openTie"></textarea>
          </div>
      </div>
      <div style="float: left;width: 17%;min-height: 500px;border: 1px solid rgb(221, 221, 221);margin-left: 20px;background-color: #fff;">
          <p style="margin: 0;height: 40px;line-height: 40px;text-align: left;background-color: #E7E7E7;padding-left: 1%;">
              <span style="height: 25px;width: 30px;display: inline-block;background-color: orange;line-height: 25px;text-align: center;color: #fff;font-weight: bold;border-radius: 6px;margin-right: 0.2%;">2</span> 
              通讯录
              <span class="el-icon-circle-plus" style="display: inline-block;cursor: pointer;" @click="addMaile"></span>
              <el-dialog title="添加终端" :visible.sync="dialogFormVisible">
                <el-form :model="form">
                    <el-form-item label="邮箱："  class="fromItm">
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
            ref="tree"
            node-key="maile"
            :props="defaultProps"
            style="padding: 15px;"
            >
            </el-tree>
      </div>
      <div style="clear:both;margin-top:10px">
        <el-button type="info" style=" padding: 12px 50px;margin-left: 24%;">保存</el-button>
        <el-button type="success" style=" padding: 12px 50px;" @click="sendMe">发送</el-button>
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

                
                <el-button type="primary" icon="el-icon-search" style="margin-left: 3%;" @click="search">搜索</el-button>
          </div>
            <el-table
                :data="tableDatas"
                height="304px"
                border
                style="width: 100%;text-align:center">
                <el-table-column
                prop="ids"
                label="标题"
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
                label="发信人">
                </el-table-column>
                <el-table-column
                prop="states"
                label="发信人邮箱">
                </el-table-column>
                <el-table-column
                prop="users"
                label="收件人">
                </el-table-column>
                <el-table-column
                prop="userMail"
                label="收件人邮箱">
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
      isActived: 0,
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
      tableDatas: [],
      restaurants: [],
      state2: "",
      count: 1,
      qqEmaile: "",
      showSend: true,
      showTre: false,
      showHis: false,
      textarea: "",
      title: "",
      qqEmaile: "",
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
      value2: []
    };
  },
  computed: {
    qqList() {
      return this.$store.state.qqList;
    }
  },
  methods: {
    //   鼠标点击
    mouseEnter(index) {
      this.isActived = index;
      if (index == 0) {
        let _self = this;
        this.showSend = true;
        this.showHis = false;
        this.data2 = [];
        this.$axios
          .get("http://192.168.13.178:8002/api/Terminal/GetTerminal")
          .then(function(response) {
            response.data.map(n => {
              if (n.Type == 1) {
                _self.data2.push({
                  label: n.TUseCompany,
                  children: [
                    {
                      label: n.TerminalVal,
                      maile: n.TerminalVal
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
        this.showHis = true;
      }
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
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
    //添加终端
    addMaile() {
      this.dialogFormVisible = true;
    },
    //添加终端
    addTerForWeb() {
      let successMessage = this.$message;
      let _self = this;
      this.$axios
        .post("http://192.168.13.178:8002/api/Terminal/AddTerminal", {
          TerminalVal: this.form.name,
          Type: "1",
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
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    //发送邮箱
    sendMe() {
      //this.$refs.tree.getCheckedKeys() 按key值获取
      console.log(this.$refs.tree.getCheckedKeys());
      let phonrToPost = [];
      let _self = this;

      phonrToPost = this.qqEmaile.split("，");
      for (let i = 1; i < this.$refs.tree.getCheckedNodes().length; i++) {
        phonrToPost.push(this.$refs.tree.getCheckedNodes()[i].maile);
      }
      console.log(phonrToPost);
      let formattingArr = [];
      for (let item of phonrToPost) {
        if (item) {
          formattingArr.push(item);
        }
      }
      let regex3 = /[^\{\)]+(?=\})/g;
      let successMessage = this.$message;

      this.$axios
        .post("http://192.168.13.178:8002/api/Email/SendEmail", {
          SenderName: "王茂森", //Immdlthtxhkibfjj
          SenderEmail: "641254423@qq.com",
          SenderAddr: "lmmdlthtxhkibfjj",
          ReceiverEmail: formattingArr,
          Theme: _self.title,
          Body: this.textarea,
          UserName: "张雷",
          SendTime: ""
        })
        .then(function(response) {
          console.log(response);
          if (response.data == "succ") {
            successMessage({
              showClose: true,
              message: "发送成功！",
              type: "success"
            });
            _self.textarea = "";
            _self.qqEmaile = "";
            _self.title = "";
          } else {
            successMessage.error("发送失败！请检查填写数据是否符合规范。");
          }
        })
        .catch(function(error) {
          console.log(error);
        });
      console.log(formattingArr, _self.title, this.textarea);
    },
    //查询
    search() {
      let _self = this;
      _self.tableDatas = [];
      this.$axios
        .get(
          "http://192.168.13.178:8002/api/Email/GetEmail?startTime=" +
            this.value2[0] +
            "&endTime=" +
            this.value2[1]
        )
        .then(function(response) {
          console.log(response);
          response.data.map(n => {
            console.log(n);
            _self.tableDatas.push({
              ids: n.Theme,
              contents: n.Body,
              dates: _self.moment(n.SendTime).format("YYYY-MM-DD HH:00:00"),
              names: n.SenderName,
              users: n.UserName,
              states: n.SenderEmail,
              userMail: n.ReceiverEmail,
            });
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
          message: h('p', { style: 'color: teal'}, '请使用中文逗号隔开邮箱。')
        });
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
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
</style>
