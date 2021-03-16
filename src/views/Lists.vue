<template>
<div>
    <div v-if="lists" >
    <div v-for="list in lists" :key='list.name' >
        {{list.name}}


    </div>
    </div>


</div>
</template>

<script>

import {sList} from "../service/listService"
import {authenticationService} from "../service/loginService"
export default {

data(){
return{
user :{},
lists:[]

}

},
created(){
        this.user = authenticationService.getUser().then(res =>{
            this.user = res
             sList.getListById(this.user._id).then(lists =>{
            this.lists = lists
        })
        })       
}
}
</script>

<style>

</style>