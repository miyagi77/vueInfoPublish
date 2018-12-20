<template>
  <div class="navBar">
    
      <div style="border:3px solid red"></div>
      <img src="infor.png" alt="" style="width: 232px;float: left;display: inline-block;margin: 2px 5px;">
      <ul  class="navList">
        <li v-for="(item,index) in navList" :key="index"   @click="mouseEnter(index)"  :class="{active:index==isActive}" > 
            <router-link :key="index" :to="item.path" :class="{active:index==isActive}" style="height: 100%;width: 100%;display: inline-block;">
                {{item.name}}
            </router-link>
        </li>
      </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActive: 0
    };
  },
  computed: {
    navList() {
      return this.$store.state.navList;
    }
  },
  methods: {
    //   鼠标点击
    mouseEnter(index) {
      this.isActive = index;
    }
  },
  mounted() {
      
  }
};
</script>

<style>
.navBar {
  height: 50px;
  width: 100%;
  background-color: #fff;
  margin: 0 auto;
  border-bottom: 2px solid #ddd;
}
.navList {
  width: 60%;
  margin: 0 auto;
  height: 100%;
  padding: 0;
}
.navList li {
  list-style: none;
  float: left;
  height: 45px;
  width: 100px;
  line-height: 47px;
}
.navList li a {
  text-decoration: none;
  color: #333;
}
.active {
  background-color: #e7e7e7;
  color: #ffb86c !important;
}
.search {
  position: relative;
}
</style>

