<template>
    <div class="step">
        <div class="step-nav">操作详情</div>
        <div v-for="(item,index) in process" :key="index" class="process">
              <h3 v-html="item.pcontent"></h3>
            <img :src="item.pic">
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                 appkey: "b06a74d0eaba120f",
                 process:[]
            }

        },
        mounted(){
            this.$axios.get('/api/detail',{params:{id:this.$route.query.id,appkey:this.appkey}}).then(res=>{
                let data =res.data;
                if(data.status===0){
                    this.process=data.result.process
                }else{
                    alert(data.mag)
                }
            })
        }
        
    }
</script>
<style scoped>
.step{background:lemonchiffon;height: 100vh;height: 100%;}
.step-nav{height: 49px;background: hotpink;color: ivory;text-align: center;line-height: 49px;font-size: 20px;}
.process{margin-top:10px ;}
</style>