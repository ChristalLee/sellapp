import axios from 'axios';
// import qs from 'qs';

// 创建一个请求对象
let req=axios.create({
    baseURL:'http://192.168.1.2:3000',
    timeout:10000,
})
// axios的封装
// 请求商家信息
export function getSeller(){
    return req.get('/api/seller')    
}
// 请求商品信息
export function getGoods(){
    return req.get('/api/goods')
}
// 请求评论信息
export function getRatings(){
    return req.get('/api/ratings')    
}