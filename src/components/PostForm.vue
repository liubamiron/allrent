<template>
    <form @submit.prevent>
      <h2>Create Post</h2>
      <div class="mb-3">
        <my-input
            v-focus
            v-model="post.title"
            type="text"
            placeholder="title"
        />

      </div>
      <div class="mb-3">
        <my-input
            v-model="post.body"
            type="text"
            placeholder="description"
        />
      </div>
      <my-button
          style="align-self: flex-end; margin-top: 15px"
          @click="createPost"
      >
        Submit
      </my-button>
    </form>
</template>

<script>

import MyInput from "@/components/UI/MyInput";
export default {
  components: {MyInput},
  data() {
    return {
      post: {
        title: '',
        body: '',
      }
    }
  },
  methods: {

    createPost() {
      this.post.id = Date.now();
      this.$emit('create', this.post)
      this.post = {
        title: '',
        body: ''
      }
    }
  },
}
</script>

<style scoped>

</style>