<template>
  <div class="tab">
    <div class="naav">热门推荐</div>
    <div class="recommend">
      <div class="item" v-for="(item,index) in recommend" :key="index" @click="recommends(item.id)">{{item.name}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      classId: this.$route.query.classid,
      appkey: "b06a74d0eaba120f",
      recommend: [],
    };
  },
  mounted() {
    this.$axios
      .get("/api/byclass", {
        params: {
          classid: this.classId,
          appkey: this.appkey,
          start: 0,
          num: 10,
        },}).then((res) => {
        let data = res.data;
        if (data.status === 0) {
          this.recommend = data.result.list;
        } else {
          alert(data.msg);
        }
      });
  },
  methods: {
    recommends(res) {
      this.$router.push({ path: "/step", query: { id: res } });
    },
  },
}
</script>
<style scoped>
.recommend {
  display: flex;
  flex-wrap: wrap;
  margin-top: 15px;
}
.item {
  width: 170px;
  height: 50px;
  border-radius: 10px;
  text-align: center;
  line-height: 50px;
  background: cornflowerblue;
  color: #fff;
  margin: 18px 8px;
}
.naav {
  height: 49px;
  width: 100%;
  background: hotpink;
  color: lavender;
  line-height: 49px;
  text-align: center;
}
.tab {
  background: darkgrey;
  height: 100%;
  height: 100vh;
}
</style>