<template>
  <div class="home">
    Home page:{{msg}}
    <br>
    <input type="text" name="" id="" v-model="msg"/>
  </div>
</template>
<script>
export default {
  data(){
    return {
      msg:"hello"
    }
  }
}
</script>


