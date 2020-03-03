<template>
    <div>
        <div id="mc" v-show="isShow"><info v-show="isShow"></info></div>
        <div class="headBox" :style="{backgroundImage:'url('+data.avatar+')',backgroundReapet:'no-reapet',backgroundSize:'100% 100%'}"></div>
        <div class="sellInfo" >
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
        <transition name="slide-fade">
            <div class="shopBox" v-show="shopCarShow">
                <shopcar></shopcar>            
            </div>
        </transition>
        <div class="shopBar" @click="shopCarShow=!shopCarShow">
            <div class="imgBox">
                <img v-show="getTotal==0" src="../assets/imgs/shopbtn.png" alt="">
                <img v-show="getTotal>0" src="../assets/imgs/shopcar.png" alt="">
            </div>
                <span>￥{{getTotal}}</span>
                <span>另需配送费￥{{data.deliveryPrice}}元</span>
                <div class="box" v-show="getTotal<20">
                    ￥{{data.minPrice}}起送
                </div>
                <div class="box count" v-show="getTotal>=20" >
                   去结算
                </div>
        </div>
    </div>
</template>

<script>
import shopcar from './Shopcar.vue'
import { getSeller } from "../api/apis.js";
export default {
    components:{
        shopcar
    },
  data() {
    return {
      data: {},
      isShow:false,
      shopCarShow:false, //购物车面板的显示     
    };
  },
  created() {
    getSeller().then(res => {
      console.log(res.data.data);
      this.data = res.data.data;
    });
  },
  computed:{
      getTotal(){
          var total=0;
          for(let i of this.$store.getters.total){
          total+=i.price* i.count             
          }
          return total
      }
  },
};
</script>
<style>
html,body,#app{
    height: 100%;
}
</style>

<style lang="less" scoped>
#mc{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 6;
}
.headBox{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 146px;
    filter: blur(4px);
    z-index: 0;
}
.sellInfo {
  height: 146px;
  width: 100%;
  color: #fff;
  position: relative;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.4);         
  .info {
    display: flex;
    align-items: center;
    padding: 18px;
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
          width: 40px;
          height: 20px;
          margin-right: 10px;
        }
        .decrease {
          width: 18px;
          height: 18px;
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
.shopBox{
    width: 100%;
    height: 50%;
    overflow: scroll;
    position: fixed;
    bottom: 50px;
    background-color: #eee;
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
  .count{
      background-color: #FFD161;
      color: #eee;
  }
  span{
      padding-left: 66px;
  }
}

/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all .8s ease;
}
.slide-fade-leave-active {
  transition: all .8s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(200px);
  opacity: 0;
}
</style>