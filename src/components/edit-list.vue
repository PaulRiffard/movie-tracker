<template>
<div>
        <input type="text" v-model="list.name" placeholder="Nom de la list">
        <button v-on:click="addList()"  > Créer la list </button>        {{list.name}}    
</div>    
</template>
<script>
import {  authenticationService } from "../service/loginService";
import {  sList } from "../service/listService";

export default {
    data(){
        return{
            user:{},
            list:{
                name:"",
                created_by:"",

            }
        }
    },
    mounted(){
        authenticationService.getUser().then(res =>{
            this.user = res
            this.list.created_by = this.user._id
        })


    },
    methods:{
        addList(){
            sList.addList(this.list).then(res =>{
                console.log(res)
            })
            
        },
    }

}
</script>
<style>

</style>