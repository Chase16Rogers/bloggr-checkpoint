<template>
  <div class="container bg-light">
    <div class="row justify-content-center">
      <div class="col text-center">
        <h2>{{ state.blog.title }}</h2>
      </div>
    </div>
    <!-- <div class="row justify-content-center">
      <div class="col text-center">
        <h4>Author: {{ state.blog.creator.email }}</h4>
      </div>
    </div> -->
    <div class="row justify-content-center" id="tags">
      <div class="col"></div>
    </div>
    <div class="row justify-content-center">
      <div class="col">
        <img :src="state.blog.imgUrl" alt="">
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-10">
        <p>{{ state.blog.body }}</p>
      </div>
    </div>
    <div class="row">
      <comments-component v-for="comm in state.comments" :key="comm.id" :comment="comm" />
    </div>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { blogsService } from '../services/BlogsService'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import CommentsComponent from '../components/CommentsComponent.vue'
export default {
  components: { CommentsComponent },
  name: 'ActiveBlog',
  setup() {
    const route = useRoute()
    const state = reactive({
      blog: computed(() => AppState.activeBlog),
      comments: computed(() => AppState.comments)
    })
    onMounted(async() => {
      try {
        await blogsService.getActiveBlog(route.params.id)
        console.log(AppState.activeBlog)
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state
    }
  }
}
</script>

<style>

</style>
