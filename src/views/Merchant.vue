<template>
    <div class="merchant">
        <div class="title">
            <div class="top">
                <div>
                <h2>{{data.name}}</h2>
                <div>
                    <div class="starBox">服务态度
                        <Rate disabled allow-half v-model="valueCustomText">
                        </Rate>
                    </div>
                    <span>({{data.ratingCount}})</span>
                    <span>月售{{data.sellCount}}单</span>
                </div>                    
                </div>
                <div class="collect">
                    <Icon type="md-heart" />
                    <p>已收藏</p>
                </div>
            </div>
            <div class="bottom">
                <Row>
        <i-col span="8">
            <p>起送价</p>
            <p><span class="special">{{data.minPrice}}</span>元</p>
        </i-col>
        <i-col span="8">
            <p>商家配送</p>
            <p><span class="special">{{data.deliveryPrice}}</span>元</p>            
        </i-col>
        <i-col span="8">
            <p>平均配送时间</p>
            <p><span class="special">{{data.deliveryTime}}</span>分钟</p>
        </i-col>
    </Row>
            </div>
        </div>
        <div class="activity">
            <div class="bulletin">
                <h3>公告与活动</h3>
                <p>{{data.bulletin}}</p>
            </div>
            <div class="desc" v-for="val in data.supports" :key="val.id">
               <p>
                   <img v-show="val.type==0" src="../assets/imgs/decrease_1@2x.png" alt="">
                   <img v-show="val.type==1" src="../assets/imgs/discount_1@2x.png" alt="">
                   <img v-show="val.type==2" src="../assets/imgs/special_1@2x.png" alt="">
                   <span>{{val.description}}</span>
                </p>
            </div>
        </div>
        <div class="sellImg" >        
            <img v-for="item in data.pics" :key="item.id" :src="item" alt="">
        </div>
        <div class="sellerInfo" >   
            <h3>商家信息</h3>     
            <div v-for="v in data.infos" :key="v.id">
                {{v}}
            </div>
        </div>
    </div>
</template>

<script>
import { getSeller } from "../api/apis.js";
export default {
  data() {
    return {
      data: {},
      valueCustomText: 4
    };
  },
  created() {
    getSeller().then(res => {
      console.log(res.data.data);
      this.data = res.data.data;
      this.valueCustomText=res.data.data.serviceScore;
    });
  }
};
</script>

<style lang="less" scoped>
.merchant {
  background: #f5f5f5;
  margin-bottom: 30px;
  .title {
    background: #fff;
    padding: 15px;
    .top {
      border-bottom: 1px solid #ccc;
      display: flex;
      justify-content: space-between;
      padding-bottom: 15px;
      .starBox {
        display: inline-block;
        img {
          width: 20px;
          height: 15px;
          padding-right: 5px;
          vertical-align: middle;
        }
      }
      .collect{
          text-align: center;
        .ivu-icon {
        font-size: 18px;
        color: rgb(238, 25, 25);
        } 
      }
      
    }
    .bottom {
      padding-top: 15px;
      text-align: center;
      .special {
        font-size: 2rem;
      }
      .ivu-col:not(:last-child){
          border-right: 1px solid #ccc;
      }
    }
  }
  .activity {
    margin-top: 30px;
    background: #fff;
    padding: 15px;
    div {
      border-bottom: 1px solid #ccc;
      line-height: 24px;
    }
    .bulletin {
      p {
        color: crimson;
      }
    }
    .desc {
      line-height: 50px;
      img{
          vertical-align: middle;
      }
    }
  }
  .sellImg {
    margin-top: 30px;
    background: #fff;
    padding: 15px;
    display: flex;
    flex: 1;
    img {
      width: 80px;
      height: 80px;
      margin-right: 5px;
    }
  }
  .sellerInfo{
      margin-top: 30px;
      background-color: #fff;
      padding: 15px;  
      h3{
      }    
      h3,div{
          height: 40px;
          line-height: 40px;
          border-bottom: 1px solid #ccc;
      }
  }
}
</style>