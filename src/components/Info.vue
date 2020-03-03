<template>
    <div class="info"  v-show="isShow">
        <h1>{{list.name}}</h1>
        <Rate disabled allow-half v-model="valueCustomText"> </Rate>   
        <div class="discounts">
            <p class="title">优惠信息</p>
            <div class="desc" v-for="val in list.supports" :key="val.id">
               <p>
                   <img v-show="val.type==0" src="../assets/imgs/decrease_1@2x.png" alt="">
                   <img v-show="val.type==1" src="../assets/imgs/discount_1@2x.png" alt="">
                   <img v-show="val.type==2" src="../assets/imgs/special_1@2x.png" alt="">
                   <span>{{val.description}}</span>
                </p>
            </div>
            <p class="title">商家公告</p>
            <div class="bulletin">{{list.bulletin}}</div>            
        </div>   
        <Icon type="md-close" />                     
    </div>
</template>

<script>
import { getSeller } from "../api/apis.js";
export default {
  name: "info",
  data() {
    return {
      list: {},
      valueCustomText: 4,
      isShow:false,
    };
  },
  created() {
    getSeller().then(res => {
      console.log(res.data.data);
      this.list = res.data.data;
      this.valueCustomText = res.data.data.score;
    });
  },
};
</script>
<style lang="less" scoped>
.info {
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);    
  text-align: center;
  color: #fff;
  padding-top: 80px;
  .discounts {
    .title {
      position: relative;
      font-size: 16px;
      color: #fff;
      height: 45px;
      line-height: 45px;
      text-align: center;
    }
    .title:before {
      content: "";
    position: absolute;
    width: 120px;
    height: 1px;
    top: 50%;
    background-color: #ccc;
    left: 6%;
    }
    .title:after {
      content: "";
    position: absolute;
    width: 120px;
    height: 1px;
    top: 50%;
    background-color: #ccc;
    right: 6%;
    }
    .desc{
        text-align: left;
        padding-left: 10%;
        height: 30px;
        line-height: 30px;
        font-size: 0.85rem;              
        img{
            vertical-align: middle;
            padding-right: 10px;
        }        
    }
    .bulletin{
        width: 80%;
        padding-left: 10%;
        text-align: left;
        line-height: 28px;  
        font-size: 0.85rem;      
    }
  }
  .ivu-icon{
      font-size: 30px;
      position: fixed;
      bottom: 80px;
  }
}
</style>