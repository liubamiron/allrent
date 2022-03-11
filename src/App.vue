<template>
  <div class="app">
    <h1> Page with posts</h1>
    <my-input
        v-model="searchQuery"
        placeholder="search ..."
    />
    <!--  <my-button @click="fetchPosts">Get the posts</my-button>-->
    <!--  <input type="text" v-model.number="modificatorValue">-->
    <div class="app__btns">
      <my-button
          @click="showDialog"
      >
        Create post
      </my-button>
      <my-select
          v-model="selectedSort"
          :options="sortOptions"
      />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form
          @create="createPost"
      />
    </my-dialog>
    <post-list
        :posts="sortedAndSearchedPosts"
        @remove="removePost"
        v-if="!isPostsLoading"
    />
    <div v-else>Is loading ..</div>
    <div ref="observer" class="observer"></div>
<!--    <div class="page__wrapper">-->
<!--      <div-->
<!--          v-for="pageNumber in totalPages"-->
<!--          :key="pageNumber"-->
<!--          class="page"-->
<!--          :class="{-->
<!--          'current-page': page === pageNumber-->
<!--        }"-->
<!--          @click="changePage(pageNumber)"-->
<!--      >-->
<!--        {{ pageNumber }}</div>-->
<!--    </div>-->
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyDialog from "@/components/UI/MyDialog";
import MyButton from "@/components/UI/MyButton";
import axios from "axios";
import MySelect from "@/components/UI/MySelect";
import MyInput from "@/components/UI/MyInput";
export default {
  components: {
    MyInput,
    MySelect,
    MyButton,
    MyDialog,
    PostList, PostForm
  },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      //modificatorValue: ''
      selectedSort: '',
      searchQuery: '',
      page: 0,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        {value: 'title', name: 'By Name'},
        {value: 'body', name: 'By description'},
      ]
    }
  },
  methods: {
    createPost(post) {
      // add post to array
      this.posts.push(post);
      this.dialogVisible = false;
    },
    //remove, listen the event function
    removePost(post) {
      this.posts = this.posts.filter(p => p.id !== post.id)
    },
    showDialog() {
      this.dialogVisible = true;
    },
    // changePage(pageNumber){
    //   this.page = pageNumber
    //   //this.fetchPosts()
    // },
    async fetchPosts(){
      try {
        this.isPostsLoading = true;
        setTimeout( async ()  =>{
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
              _page: this.page,
              _limit: this.limit
            }
          });
          this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
          this.posts = response.data;
          this.isPostsLoading = false;
        }, 500)
      } catch (e) {
        alert('Error')
      } finally {
      }
    },
    //add
    async loadMorePosts(){
      try {
        this.page +=1;
          const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
              _page: this.page,
              _limit: this.limit
            }
          });
          this.totalPages = Math.ceil(response.headers['x-total-count'] / this.limit)
          this.posts = [...this.posts, ...response.data];
      } catch (e) {
        alert('Error')
      }
    },
    //end
  },
  mounted() {
    this.fetchPosts();
    console.log(this.$refs.observer);
    const options = {
      rootMargin: '0px',
      threshold: 1.0
    }

    const callback = (entries, observer) => {
      if (entries[0].isIntersecting && this.page < this.totalPages){
        console.log('intersected');
        this.loadMorePosts()
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);

  },
  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
  watch: {
    // page() {
    //   this.fetchPosts()
    // }
  }
}
</script>
<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app {
  padding: 20px;
}
.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}
.page__wrapper {
  display: flex;
  margin-top: 15px;
}
.page {
  border: 1px solid black;
  padding: 10px;
}
.current-page {
  border: 2px solid darkred;
}
.observer {
  height: 30px;
  background: grey;
}
</style>