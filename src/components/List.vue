<template>
  <div class="test" >
     <input placeholder="Nouvelle Liste" v-model="nameList">
     <button v-on:click="createList()" >Créer List</button>
    <div  v-for="list in lists" :key="list._id" >
        <div v-on:click="editList(list)"  >
        {{list.name}}
        <div v-for="movie in list.movies" :key="movie._id" >

            TEST DE OUF

        </div>
        </div>
    </div>

  </div>
</template>

<script>
import {sList} from "../service/listService"
import {authenticationService} from "../service/loginService"
export default {

    props:['filmId'],
    data(){
        return{
            nameList :"",
            user:{},
            lists:[],
            newList:{
                name:"",
                movies:[],
                created_by: ""
            },
        }
    },

    created(){
         authenticationService.getUser().then(res  =>{
        this.user= res
        this.getList()
       })
        
    },

    methods:{
        getList(){
            sList.getListById(this.user._id).then(res =>{
                this.lists = res
                console.log(res 
                )
            })
            },
            createList(){
            this.newList.name = this.nameList
            this.newList.created_by = this.user._id
            this.newList.movies.push(this.filmId)
            console.log(this.newList)
             sList.addList(this.newList).then(res =>{
                console.log(res, "RESSS DE OUF" )
                this.getList()
            }) 
        },
        editList(list){
            let i
            i = list.movies.findIndex(Id => Id == this.filmId)
            if(i == -1){
                list.movies.push(this.filmId)
            }
            console.log(list)
           sList.editListById(list._id, list).then(res =>{
               console.log(res)
                this.getList()
           })
           



         }



        }
        
}
</script>

<style>


</style>