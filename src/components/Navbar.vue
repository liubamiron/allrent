<template>
  <div class="navbar">
     <div @click="$router.push('/')">Vue 3</div>
    <div class="navbar__btns">
      <my-button @click="$router.push('/posts')">Posts</my-button>
      <my-button style="margin-left: 10px" @click="$router.push('/about')" >About Us</my-button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.navbar {
  height: 50px;
  background-color: lightgrey;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}

.post__btns {
  margin-left: auto;
}
</style>

<!--<router-link to="/users">Users</router-link>-->
<!--<router-link to="/about">About Us</router-link>-->