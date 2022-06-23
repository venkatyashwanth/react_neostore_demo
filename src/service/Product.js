import { MAIN_API } from "../env";
import axios from "axios";

function getProducts(){
    return axios.get(`${MAIN_API}products`)
}

function getProductById(id){
    return axios.get(`${MAIN_API}products/${id}`)
}

function searchProducts(ser){
    return axios.get(`${MAIN_API}products/${ser}`)
}

function saveProducts(data){
    return axios.post(`${MAIN_API}products`,data)
}

function editProduct(id,data){
    return axios.put(`${MAIN_API}products/${id}`,data)
}

function deleteProduct(id){
    return axios.delete(`${MAIN_API}products/${id}`)
}



export {getProducts,getProductById, saveProducts,searchProducts,editProduct,deleteProduct};