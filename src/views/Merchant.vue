<template>
    <div class="merchant">
        <div class="title">
            <div class="top">
                <div>
                <h2>{{data.name}}</h2>
                <div>
                    <p class="starBox">
                        <img src="../assets/imgs/star24_on@2x.png" alt="">
                        <img src="../assets/imgs/star24_on@2x.png" alt="">
                        <img src="../assets/imgs/star24_on@2x.png" alt="">
                        <img src="../assets/imgs/star24_on@2x.png" alt="">                                        
                        <img src="../assets/imgs/star24_off@2x.png" alt="">
                    </p>
                    <span>(661)</span>
                    <span>月售699单</span>
                </div>                    
                </div>
                <div>
                    <p><Icon type="md-heart" /></p>
                    <p>已收藏</p>
                </div>
            </div>
            <div class="bottom">
                <Row>
        <i-col span="8">
            <p>起送价</p>
            <p><span>20</span>元</p>
        </i-col>
        <i-col span="8">
            <p>商家配送</p>
            <p><span>4</span>元</p>            
        </i-col>
        <i-col span="8">
            <p>平均配送时间</p>
            <p><span>39</span>分钟</p>
        </i-col>
    </Row>
            </div>
        </div>
        <div class="activity">
            <div>
                <h3>公告与活动</h3>
                <p>{{data.bulletin}}</p>
            </div>
            <div>
                <p>在线支付满28减5</p>
            </div>
            <div>
                <p>在线支付满28减5</p>
            </div>
            <div>
                <p>在线支付满28减5</p>
            </div>
        </div>
        <div class="sellImg" >        
            <img v-for="item in data.pics" :key="item.id" :src="item" alt="">
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
      .starBox{
                display: inline-block;
                img{
                    width: 20px;
                    height: 15px;
                    padding-right: 5px;
                    vertical-align: middle;
                }
            }
    }
    .bottom{
        padding-top: 15px;
        text-align: center;
    }
  }
  .activity{
      margin-top: 30px;
      background: #fff;
      padding: 15px;
      div{
          border-bottom: 1px solid #ccc;
          line-height: 24px;
      }
  }
  .sellImg{
      margin-top: 30px;
      background: #fff;
      padding: 15px;
      img{
          width: 90px;
          height: 90px;
          margin-right: 5px;
      }
  }
}
</style>