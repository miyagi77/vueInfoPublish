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
            <textarea style="text-align: left;width: 97%;margin: 10px auto;height: 200px;"  placeholder="邮箱之间请用';'隔开"></textarea>
          </div>
      </div>
      <div style="float: left;width: 17%;min-height: 500px;border: 1px solid rgb(221, 221, 221);margin-left: 20px;background-color: #fff;">
          <p style="margin: 0;height: 40px;line-height: 40px;text-align: left;background-color: #E7E7E7;padding-left: 1%;">
              <span style="height: 25px;width: 30px;display: inline-block;background-color: orange;line-height: 25px;text-align: center;color: #fff;font-weight: bold;border-radius: 6px;margin-right: 0.2%;">2</span> 
              通讯录
          </p>
          <el-tree
            :data="data2"
            show-checkbox
            node-key="id"
            :props="defaultProps"
            style="padding: 15px;"
            >
            </el-tree>
      </div>
      <div style="clear:both;margin-top:10px">
        <el-button type="info" style=" padding: 12px 50px;margin-left: 24%;">保存</el-button>
        <el-button type="success" style=" padding: 12px 50px;" @click="me">发送</el-button>
      </div>
  </el-main>
  <el-main v-if="showHis">
      <div>
          <div style="text-align: left;margin: 15px;">
               
                <span class="demonstration">创建时间：</span>
                <el-date-picker
                v-model="value2"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                :picker-options="pickerOptions1">
                </el-date-picker>
                
                -

                <el-date-picker
                v-model="value2"
                type="datetime"
                placeholder="选择日期时间"
                align="right"
                :picker-options="pickerOptions1">
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
                label="编号"
                width="180">
                </el-table-column>
                <el-table-column
                prop="contents"
                label="内容">
                </el-table-column>
                <el-table-column
                prop="states"
                label="状态">
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
                prop="users"
                label="收件人">
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
      data2: [
        {
          id: 1,
          label: "分组1",
          children: [
            {
              id: 4,
              label: "组员1",
              children: []
            }
          ]
        },
        {
          id: 2,
          label: "分组2",
          children: [
            {
              id: 5,
              label: "组员1"
            },
            {
              id: 6,
              label: "组员2"
            }
          ]
        },
        {
          id: 3,
          label: "分组3",
          children: [
            {
              id: 7,
              label: "组员1"
            },
            {
              id: 8,
              label: "组员2"
            }
          ]
        }
      ],
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
      tableDatas: "",
      restaurants: [],
      state2: "",
      count: 1,
      showSend: true,
      showTre: false,
      showHis: false,
      textarea: "",
      title:""
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
        this.showSend = true;
        this.showHis = false;
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
    me() {
      console.log(this.textarea);
    }
  },
  mounted() {
    this.restaurants = this.loadAll();
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
