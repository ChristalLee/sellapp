import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// 创建一个vuex的数据仓库，用来存放所有交互的数据
var store = new Vuex.Store({
    state: {
        goodsList: [],
    },
    // 改变，他是改变state的唯一方式
    mutations: {
        initGoodsList(state, newArr) {
            store.state.goodsList = newArr;
        },
        clickChangeNum(state, item) {
            for (let i of state.goodsList) {
                for (let j of i.foods) {
                    if (j.name == item.name) {
                        j.num += item.val
                    }
                }
            }
        },
    },
    getters: {
        total(state) {
            var arr = [];
            var resultArr = [];
            for (let obj of state.goodsList) {
                obj.foods.map((v) => {
                    if (v.num > 0 && v.num != 0) {
                        arr.push({ name: v.name, count: v.num, price: v.price })
                    }
                })
            }
            var flag; 
            for (var i = 0; i < arr.length; i++) {
                flag = true;
                for (let j = 0; j < resultArr.length; j++) {
                    if (resultArr[j].name == arr[i].name) {
                        flag = false; 
                        break;
                    }
                }
                //如果flag=ture,赋值给resultArr
                if (flag) {
                    resultArr[resultArr.length] = arr[i];
                }
            }
            return resultArr
        }
    }
})
export default store;