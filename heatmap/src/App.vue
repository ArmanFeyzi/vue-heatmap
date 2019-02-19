<template>
  <div id="app">
    <h2>برای تست فونت اینجا نوشتم.</h2>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style >
@import "./assets/style/style.scss";

body{
  font-family: 'Vazir';
  background: #373737;
}
</style>
