<template>
  <div class="home">
    <!-- tabbar -->
    <div class="nav">菜谱大全</div>
    <!-- 搜索栏 -->
    <div class="foods">
      <input
        v-model="keywords"
        class="search"
        @keyup.enter="search"
        type="text"
        placeholder="请输入菜名"
      />
      <button class="btn" @click="search">搜索</button>
    </div>
    <!-- 菜品分类推荐 -->
    <div class="tabs">
      <div
        class="tabs-item"
        v-for="(item, index) in foods"
        :key="index"
        @click="change(item.classid)"
      >
        {{ item.name }}
      </div>
    </div>
    <!-- 分类详情数据 -->
    <div class="category">
      <div class="category-item" v-for="(item, index) in category" :key="index" @click="recommend(item.classid)">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appkey: "b06a74d0eaba120f",
      foods: [], //所有菜的数据
      category: [], //分类详情数据
      keywords:""
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    //加载分类数据
    loadData() {
      this.$axios
        .get("/api/class", { params: { appkey: this.appkey } })
        .then((res) => {
          let data = res.data;
          if (data.status === 0) {
            this.foods = data.result;
            this.category = data.result[0].list.slice(0, 10);
          } else {
            alert(data.msg);
          }
        });
    },
    change(classid) {
     let select=this.foods.filter((item)=>item.classid==classid)
     this.category=select[0].list.slice(0,10)
    },
    search(){
      // 通过路由:query 参数传递方式 传到另一个页面
      this.$router.push({path:"/detail",query:{name:this.keywords}}) 
    },
    recommend(res){
      this.$router.push({path:'/recommend',query:{classid:res,num:10,start:0}})
    }
  },
};
</script>
<style scoped>
.nav {
  background: hotpink;
  color: azure;
  font-size: 700;
  height: 49px;
  text-align: center;
  line-height: 49px;
}
.foods {
  margin: 10px 20px;
}
.search {
  width: 80%;
  margin-right: 15px;
  height: 30px;
}
.btn {
  width: 45px;
  height: 30px;
  border-radius: 10px;
  background: darkkhaki;
}
.home {
  background: darkseagreen;
  height: 100vh;
}
.tabs {
  display: flex;
  margin-top: 10px;
  flex-wrap: wrap;
}
.tabs-item {
  background: lightcoral;
  color: #fff;
  padding: 5px 10px;
  border-radius: 3px;
  margin: 3px 5px;
}
.category {
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
  margin: auto;
}
.category-item {
  width: 45%;
  height: 100%;
  margin: 5px 5px;
  padding: 5px 3px;
  background:cornflowerblue;
  text-align: center;
  line-height: 60px;
  border-radius: 20px;
  color: #fff;
}

</style>
