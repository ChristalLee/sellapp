<template>
    <div>
        <h3>购物车</h3>
        <div class="goodslist" v-for="list in getTotal" :key="list.id">
            <div>
                <span class="single">{{list.name}}</span>
                <span class="single">{{list.count*list.price}}</span>
                <p class="btn single">
                    <button @click="clickChangeNum(list.name,-1)">-</button>
                    <span>{{list.count}}</span>
                    <button class="add" @click="clickChangeNum(list.name,1)">+</button>              
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  computed:{
      getTotal(){
          return this.$store.getters.total
      },
  },
  methods:{
     //点击+-
    clickChangeNum(name,val) {
      // 改变vuex中对应商品的数量 +1
      this.$store.commit("clickChangeNum", {name,val});
    }
  }
};
</script>

<style lang="less" scoped>
h3{
    background: rgb(247, 137, 137);
    text-align: center;
    color: #fff;
    line-height: 40px;
}
.goodslist{
    height: 80%;
    overflow: scroll;    
    div{
        width: 100%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        height: 30px;
        text-align: center;
        font-size: 0.75rem;
        .btn{
            button{
                background-color: #fff;
                border: 1px solid rgb(97, 111, 243);
                width: 20px;
                height: 20px;
                border-radius: 20px;
            }
            span{
                padding: 0 3%;                
            }
            .add{
                background-color: #049FDB;
                color: #fff                
            }
        }
        .single{
            width: 30%;
        }
    }
}
</style>