<template>
  <div class="app">
    <div v-if="state.account.id">
      <p>안녕하세요? {{state.account.name}}님!!</p>
      <button @click="logout()">logout</button>
    </div>
    <div v-else>
      <label for="loginId">
        <span>아이디</span>
        <input type="text" id="loginId" v-model="state.form.loginId"/>
      </label>
      <label for="loginPw">
        <span>패스워드</span>
        <input type="text" id="loginPw" v-model="state.form.loginPw"/>
      </label>
      <button @click="submit()">로그인</button>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import axios from "axios";

export default{
  setup(){
    const state = reactive({
      account:{
        id:null,
        name:""
      },
      
      form:{
        loginId:"",
        loginPw:"",
      }
    })

    axios.get("/api/account").then((res) =>{
      console.log(res);
      state.account = res.data;

    })


    const submit = () =>{
      const args = {
        loginId: state.form.loginId,
        loginPw: state.form.loginPw,
      }
      axios.post("/api/account", args).then((res) =>{
        console.log(res);
        alert("로그인에 성공했습니다.")
        state.account = res.data;

      })
      .catch(()=>{
        alert("로그인에 실패했습니다. 계정 정보를 확인하세요.");
      })
      
    }

    const logout =() => {
      axios.delete("/api/account").then(()=>{
        alert("로그아웃하였습니다.");
        state.account.id = null;
        state.account.name ="";
        state.form.loginId = "";
        state.form.loginPw ="";

      });
    
    }
   

    return {state, submit, logout}
  }
}
</script>



