<template>
    <div>
        <div class="headBox" :style="{backgroundImage:'url('+data.avatar+')',backgroundReapet:'no-reapet',backgroundSize:'100% 100%'}"></div>
        <div class="sellInfo" >
            <!-- <img :src="this.data.pics[0]" alt=""> -->
            <div class="info">
                <img :src="data.avatar" alt="" class="headImg">
                <div class="text">
                    <div>
                        <img src="../assets/imgs/brand@2x.png" alt="" class="brand">
                        <h2>{{data.name}}</h2>
                    </div>
                    <p>
                        <span>{{data.description}}</span>/
                        <span>{{data.deliveryTime}}分钟送达</span>
                    </p>
                    <div>
                        <img src="../assets/imgs/decrease_1@2x.png" alt="" class="decrease">
                        <span>{{data.supports ? data.supports[0].description : '' }}</span>
                <div class="btn">5个></div>                   
                    </div>
                </div>
            </div>
            <div class="infoBottom">
                <img src="../assets/imgs/bulletin@2x.png" alt="">
                <span>{{data.bulletin}}</span>
            </div>
        </div>

        <div class="mainBox">
            <router-link to="/Goods" active>商品</router-link>
            <router-link to="/Evaluate" active>评价</router-link>
            <router-link to="/Merchant" active>商家</router-link>
        </div>
        <router-view></router-view>
        <div class="shopBar">
            <div class="imgBox">
                <img src="../assets/imgs/shopbtn.png" alt="">
            </div>
                <span>￥0</span>
                <span>另需配送费￥{{data.deliveryPrice}}元</span>
                <div class="box">
                    ￥{{data.minPrice}}起送
                </div>
        </div>
    </div>
</template>

<script>
import { getSeller } from "../api/apis.js";
export default {
  data() {
    return {
      data: {}
    };
  },
  created() {
    getSeller().then(res => {
      console.log(res.data.data);
      this.data = res.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
.headBox{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 136px;
    filter: blur(4px);
    z-index: 0;
}
.sellInfo {
  height: 136px;
  width: 100%;
  color: #fff;
  position: relative;
  z-index: 1;
  .info {
    display: flex;
    align-items: center;
    padding: 5px 18px;
    .headImg {
      width: 80px;
      height: 80px;
      border-radius: 10px;
    }
    .text {
      margin-left: 20px;
      line-height: 24px;
      div {
        display: flex;
        align-items: center;
        .brand {
          width: 45px;
          height: 24px;
          margin-right: 10px;
        }
        .decrease {
          width: 20px;
          height: 20px;
          margin-right: 10px;
        }
      
      .btn{
        width: 50px;
        height: 26px;
        line-height: 26px;
        border-radius: 10px;
        background-color: rgba(0, 0, 0, 0.2);   
        margin-left: 30px;
        padding-left: 10px;
    }
    }
    }
    
  }
  .infoBottom {
    height: 30px;
    line-height: 30px;
    background-color: rgba(0, 0, 0, 0.8);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    img {
      height: 18px;
      vertical-align: middle;
      padding: 0 10px;
    }
  }
}
.mainBox {
  display: flex;
  justify-content: space-around;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #ccc;
  .router-link-active {
    color: red;
  }
}
.shopBar {
  width: 100%;
  height: 50px;
  background: #333;
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
      color: #fff;
  .imgBox{
      width: 50px;
      height: 50px;
      border-radius: 50px;
      background: #333;
      position: absolute;
      bottom: 8px;
      left: 18px;
      
      img{
          width: 40px;
          height: 40px;
          margin: 5px;
      }
  }
  .box{
    background-color: rgba(0, 0, 0, 0.2);   
    height: 50px;
    width: 90px;
    text-align: center;
    line-height: 50px;
  }
  span{
      padding-left: 80px;
  }
}
</style>