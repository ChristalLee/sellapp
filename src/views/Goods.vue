<template>
    <div class="goods">
        <!-- 左边菜单 -->
            <div class="goods-left">
                <ul class="content">
                    <!-- 添加标题点击事件和动态选中属性 -->
                  <div @click="clickTitle(i)" :class="{gootsBox:true,selected:i==curIndex}" v-for="(v,i) in goodsList" :key="i">
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
                <div  :id="i" v-for="(v,i) in goodsList" :key="i">
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
                                    <button v-show="item.num>0" @click="clickChangeNum(item.name,-1)">-</button>
                                    <span v-show="item.num>0">{{item.num}}</span>
                                    <button class="add" @click="clickChangeNum(item.name,+1)">+</button>
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
      curIndex: 0, //默认索引
      isShow: true
    };
  },
  created() {
    getGoods().then(res => {
      console.log(res.data.data);
      this.$store.commit("initGoodsList", res.data.data);
    });
  },
  mounted() {
    new BScroll(document.querySelector(".goods-left"), { click: true });
    this.rightBox = new BScroll(document.querySelector(".goods-right"), {
      probeType: 3 //实时派发滚动事件
    });
    this.rightBox.on("scroll", ({ y }) => {
      let _y = Math.abs(y);
      // console.log(_y);
      for (let obj of this.getCurHeight) {
        if (_y >= obj.min && _y < obj.max) {
          this.curIndex = obj.index;
          return;
        }
      }
    });
  },
  computed: {
    getCurHeight() {
      var arr = [];
      var total = 0;
      //   获取高度
      for (let i = 0; i < this.goodsList.length; i++) {
        let curHeight = document.getElementById(i).offsetHeight;
        arr.push({ min: total, max: total + curHeight, index: i });
        total += curHeight;
      }
      console.log(arr);
      return arr;
    },
    goodsList() {
      return this.$store.state.goodsList;
    }
  },
  methods: {
    //   标题选中
    clickTitle(index) {
      this.curIndex = index; //保存当前索引
      //  左侧索引对应右侧id名(右侧随左侧点击滑动到相对应的位置)
      this.rightBox.scrollToElement(document.getElementById(index), 600);
    },
    //点击+-
    clickChangeNum(name,val) {
      // 改变vuex中对应商品的数量 +1
      this.$store.commit("clickChangeNum", {name,val});
    }
  }
};
</script>

<style lang="less" scoped>
.goods {
  display: flex;
  position: absolute;
  width: 100%;
  overflow: auto;
  bottom: 50px;
  top: 196px;
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
    .selected {
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
            display: flex;
            button {
              background-color: #fff;
              border: 1px solid rgb(97, 111, 243);
              width: 20px;
              height: 20px;
              border-radius: 20px;
            }
            span {
              padding: 0 20px;
            }
            .add {
              background-color: #049fdb;
              color: #fff;
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