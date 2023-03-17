<template>
    <div class="memo">
        <div class="act">
            <button class="btn btn-primary btn-block" @click="add()">+ 추가</button>
        </div>
        
        <ul>
            <li v-for="d in state.data" :key="d.Id" @click="edit(d.Id)" >{{ d.content}}</li>
 
        </ul>
        
    </div>
</template>

<script>
import { reactive } from 'vue'
import axios from "axios"

export default {
    setup() {
        const state = reactive({
            data : [ ]
        })
        
        const add =() =>{
            const content = prompt("내용을 입력해주세요.");
            axios.post("/api/memos", {content}).then((res) =>{
                state.data = res.data;
                console.log(res.data);
            })
        }

        const edit = (id) => {
            var currentItem = state.data.find(d => d.Id === id);
            const content = prompt("내용을 수정해주세요.", currentItem.content);
            console.log(content);
            if(content === null) return;
            if(content === "") return;
            axios.put("/api/memos/"+id, {content}).then((res) => {
                state.data  = res.data;
            })

        }

        axios.get("/api/memos").then((res) => {
            console.log(res);
            state.data = res.data;
        })

        return {state, add, edit};
    },
}
</script>

<style lang="scss" scoped>
.memo {
    .act{
        padding: 15px 5px 5px 15px;
        text-align: right;
    }
    ul{
        border-top: 1px solid #eee;
    list-style: none;
    padding: 0;
    margin: 0;

    li {
        padding: 5px 15px;
        margin: 5px;
        border: 1px solid #eee;
    }
}}


</style>