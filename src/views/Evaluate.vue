<template>
    <div class="evaluate">
        <div class="level">
            <div class="score">
                <h1>{{data[0].score}}</h1>
                <h2>综合评分</h2>
                <p>高于周边商家69.2%</p>
            </div>
            <div class="star">
                <div class="starBox">服务态度
                    <Rate disabled show-text allow-half v-model="valueCustomText">
                        <span style="color: #f5a623">{{ valueCustomText }}</span>
                    </Rate>
                </div>
                <div class="starBox">服务态度
                    <Rate disabled show-text allow-half v-model="valueCustomText">
                        <span style="color: #f5a623">{{ valueCustomText }}</span>
                    </Rate>
                </div>
                <p>送达时间
                    <span>44分钟</span>
                </p>
            </div>
        </div>
        <div class="content">
            <div class="btn">
                <i-button type="primary">全部57</i-button>
                <i-button type="info">满意47</i-button>
                <i-button>不满意10</i-button>
            </div>
            <div class="tips"><Icon type="ios-checkmark-circle" />只看有内容的评价</div>
            <div class="contentBox" v-for="(item,index) in data" :key="index">
                <div class="contentTop">
                    <img :src="item.avatar" alt="">
                <div>
                    <p>{{item.username}}</p>
                    <p class="starBox">
                        <Rate disabled v-model="valueDisabled[index]" />
                        <span v-show="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
                    </p>
                </div>
                <p class="single">{{ item.rateTime | formatDate }}</p>
                </div>
                <div class="contentBottom">
                    <p>{{item.text}}</p>
                    <div class="recommend">
                        <Icon type="md-thumbs-up" v-show="item.recommend!=0"/>
                        <span v-for="value in item.recommend" :key="value.id">{{value}}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getRatings } from "../api/apis";
export default {
  data() {
    return {
      data: [
        {
          score: ""
        }
      ],
      valueCustomText: 3.8,
      valueDisabled: []
    };
  },
  created() {
    getRatings().then(res => {
      console.log(res.data.data);
      this.data = res.data.data;
      for (let i of res.data.data) {
        this.valueDisabled.push(i.score);
      }
    });
  },
  filters: {
    formatDate: function(date) {
      var d = new Date(date);
      var year = d.getFullYear();
      var month = d.getMonth() + 1;
      var day = d.getDate() < 10 ? "0" + d.getDate() : "" + d.getDate();
      var hour = d.getHours();
      var minutes = d.getMinutes();
      var seconds = d.getSeconds();
      return (
        year + "-" +month +"-" +day +" " +hour +":" +minutes +":" +seconds
      );
    }
  }
};
</script>

<style lang="less" scoped>
.evaluate {
  background: #f5f5f5;
  .level {
    display: flex;
    padding: 15px 20px;
    background: #fff;
    .score {
      border-right: 1px solid #ccc;
      padding-right: 15px;
      text-align: center;
      h1 {
        color: #f5a623;
      }
    }
    .star {
      margin-left: 20px;
      line-height: 30px;
      .starBox {
        display: flex;
        width: 200px;
        .ivu-rate {
          font-size: 16px;
          display: flex;
        }
      }
    }
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
        justify-content: space-around;
        text-align: center;
        .single{
          text-align: right;
        }
        div {
          margin-left: 8px;
          .starBox {
            width: 100%;
            .ivu-rate {
              font-size: 16px;
            }
          }
        }
        img {
          width: 30px;
          height: 30px;
          text-align: left;
          
        }
      }
      .contentBottom {
        padding: 10px 0 20px 30px;
        border-bottom: 1px solid #ccc;
        p {
          font-size: 1rem;
          font-weight: bold;
        }
        .recommend {
          span {
            display: inline-block;
            width: 80px;
            height: 20px;
            text-align: center;
            margin: 15px 15px 0 0;
            border: 1px solid #ccc;
          }
          .ivu-icon {
            font-size: 18px;
            color: #039edf;
          }
        }
      }
    }
  }
}
</style>