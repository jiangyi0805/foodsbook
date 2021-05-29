<template>
  <div class="detail">
    <div class="nav-bar">烹饪步骤</div>
    <div class="procedure" v-for="(item, index) in detailInfo" :key="index">
      <!-- 菜名 -->
      <h1>菜名：{{ item.name }}</h1>
         <!-- 主图 -->
        <img :src="item.pic" />
        <!-- 烹饪食材 -->
        <h4 style="text-align:center">烹饪食材：</h4>
        <p v-for="(m, n) in item.material" :key="n + 'a'" class="material">
         {{ m.mname }}:{{ m.amount }}
        </p>
        <!-- 烹饪步骤 -->
      <div style="text-align: center;">烹饪步骤：<span style="color: blue" @click="Step(item.id)">:查看详情>></span></div>
      
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      appkey: "b06a74d0eaba120f",
      detailInfo: [],
    };
  },
  mounted() {
    // 访问另一个页面传过来的参数
    this.$axios
      .get("/api/search", {
        params: {
          appkey: this.appkey,
          keyword: this.$route.query.name,
          num: 10,
        },
      })
      .then((res) => {
        let data = res.data;
        if (data.status === 0) {
          this.detailInfo = data.result.list;
        } else {
          alert(data.msg);
        }
      });
  },
  methods:{
      Step(res) {
          this.$router.push({path:"/step",query:{id:res}})
      }
  }
};
</script>
<style scoped>
.clear {
  clear: both;
}
.detail {
  background: navajowhite;
  height: 100%;
}
.nav-bar {
  height: 49px;
  width: 100%;
  background: maroon;
  color: #fff;
  text-align: center;
  line-height: 49px;
  font-size: 20px;
  font-weight: 600;
}
.procedure {
  width: 100%;
  background: teal;
  margin: 10px 0;
}
h1 {
  font-size: 20px;
  text-align: center;
  color: whitesmoke;
}
 .procedure img {
  width:200px;
  height:200px;
  border: 10px solid firebrick;
  margin:8px 80px;
}
.procedure span {
  font-size: 14px;
  
}
.material{
    text-align: center;
}

</style>