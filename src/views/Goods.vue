<template>
    <div class="goods">
        <!-- 左边菜单 -->
            <div class="goods-left">
                <ul class="content">
                    <!-- 添加标题点击事件和动态选中属性 -->
                  <div @click="clickTitle(i)" :class="{gootsBox:true,selected:i==curIndex}" v-for="(v,i) in data" :key="i">
                <p>
                <img v-show="v.type==2" src="../assets/imgs/special_1@2x.png" alt="">                    
                <img v-show="v.type==1" src="../assets/imgs/discount_1@2x.png" alt="">                    
                    {{v.name}}
                </p>
            </div>      
                </ul>
        </div>
        <!-- 右边商品 -->
            <div class="goods-right">
        <ul class="content">
                <div  :id="i" v-for="(v,i) in data" :key="i">
                <h3>{{v.name}}</h3>
                <div v-for="(item,index) in v.foods" :key="index" class="rightBox">
                        <img :src="item.image" alt="">
                        <div class="rightText">
                            <h4>{{item.name}}</h4>
                            <p>{{item.description}}</p>
                            <p>
                                <span>月售{{item.sellCount}}份</span>
                                <span>好评率{{item.rating}}%</span>
                            </p>
                            <div class="rightBottom">
                                <span class="price">￥{{item.price}}</span>
                                <del>{{item.oldPrice}}</del>
                                <p class="btn">
                                    <!-- <i-button type="primary" shape="circle">
                                        <span>-</span>
                                    </i-button>
                                    <span>1</span> -->
                                    <i-button type="primary" shape="circle">
                                        <span>+</span>
                                    </i-button>
                                </p>
                            </div>
                        </div>
                </div>
            </div>
        </ul>
        </div>
    </div>
</template>

<script>
import BScroll from "better-scroll";
import { getGoods } from "../api/apis";
export default {
  data() {
    return {
      data: [],
      curIndex:0,//默认索引
    };
  },
  created() {
    getGoods().then(res => {
      console.log(res.data.data);
      console.log(res.data.data.foots);
      this.data = res.data.data;
    });
  },
  mounted() {
    new BScroll(document.querySelector(".goods-left"),{click:true});
    this.rightBox=new BScroll(document.querySelector(".goods-right"));
  },
  methods:{
    //   标题选中
      clickTitle(index){
         this.curIndex=index;//保存当前索引
        //  左侧索引对应右侧id名(右侧随左侧点击滑动到相对应的位置)
        this.rightBox.scrollToElement(document.getElementById(index),600)
      }
  }
};
</script>

<style lang="less" scoped>
.goods {
  display: flex;
  height: 300px;
  .goods-left {
    width: 80px;
    height: 100%;
    background-color: #f4f5f7;
    overflow: scroll;
    .gootsBox {
      height: 60px;
      display: flex;
      align-items: center;
      margin: 0 10px;
      border-bottom: 1px solid #ccc;
      font-size: 0.75rem;
      img {
        width: 18px;
        height: 18px;
        vertical-align: middle;
      }
    }
    // 选中样式
    .selected{
        background: #fff;
        margin: 0;
        padding-left: 10px;
    }
  }
  .goods-right {
    flex: 1;
    height: 100%;
    background-color: #f4f5f7;
    overflow: scroll;
    h3 {
      height: 30px;
      line-height: 30px;
      border-left: 2px solid #ccc;
    }
    .rightBox {
      height: 140px;
      background-color: #fff;
      padding: 15px;
      display: flex;
      border-bottom: 1px solid #ccc;
      .rightText {
        padding-left: 10px;
        span {
          padding-right: 15px;
        }
        .rightBottom {
          display: flex;
          align-items: center;
          .price {
            font-size: 1rem;
            color: crimson;
          }
          .btn {
            height: 40px;
            margin-left: 30px;
            .ivu-btn {
              font-size: 20px;
              height: 32px;
              width: 32px;
              padding: 0;
              span {
                display: inline-block;
                padding: 0;
              }
            }
            span {
              font-size: 1rem;
              padding-left: 10px;
            }
          }
        }
      }
      img {
        width: 80px;
        height: 80px;
      }
    }
  }
}
</style>