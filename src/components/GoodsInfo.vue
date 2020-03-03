<template>
    <div class="goodsInfo">
        <div class="title">
           <img :src="list.image" alt="">
        </div>
        <div class="introduce">
          <h1>商品介绍</h1>
          <p></p>
        </div>
        <div class="content">
            <div class="btn">
                <i-button type="primary">全部57</i-button>
                <i-button type="info">推荐47</i-button>
                <i-button>吐槽10</i-button>
            </div>
            <div class="tips"><Icon type="ios-checkmark-circle" />只看有内容的评价</div>
            <div class="contentBox" v-for="item in data" :key="item.id">
                <div class="contentTop">
                <p>{{item.rateTime}}</p>                  
                <div>
                    <p>{{item.username}}</p>
                </div>
                <img :src="item.avatar" alt="">
                </div>
                <div class="contentBottom">
                  <Icon type="md-thumbs-up" />                  
                  <p>{{item.text}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getGoods } from "../api/apis";
import { getRatings } from "../api/apis";
export default {
  data() {
    return {
      data: [
        {
          score: ""
        }
      ],
      list: [],
    };
  },
  created() {
    getGoods().then(res => {
      console.log(res.data.data);
      this.list = res.data.data;
    });
    getRatings().then(res => {
      console.log(res.data.data);
      this.data = res.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
.goodsInfo {
  background: #f5f5f5;
  .level {
    display: flex;
    padding: 15px 20px;
    background: #fff;
  }
  .introduce{
    background: #fff;
  }
  .content {
    background: #fff;
    margin-top: 20px;
    padding: 20px;
    .btn {
      border-bottom: 1px solid #eee;
      padding-bottom: 20px;
      .ivu-btn {
        margin-right: 10px;
      }
    }
    .tips {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #eee;
    }
    .contentBox {
      .contentTop {
        padding-top: 20px;
        display: flex;
        justify-content: space-between;
        img {
          width: 30px;
          height: 30px;
        }
      }
      .contentBottom {
        padding: 10px 0 20px 20px;
        border-bottom: 1px solid #ccc;
        p {
          font-size: 1rem;
          font-weight: bold;
        }
        .ivu-icon{
          font-size: 18px;
          color: #039EDF;
        }
      }
    }
  }
}
</style>