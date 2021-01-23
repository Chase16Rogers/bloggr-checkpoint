<template>
  <div class="container bg-light shadows">
    <div class="row mt-3 justify-content-center">
      <div class="col text-center ">
        <h2 class="title-text">
          {{ state.blog.title }}
        </h2>
      </div>
    </div>
    <!-- <div class="row justify-content-center">
      <div class="col text-center">
        <h4>Author: {{ state.blog.creator.name }}</h4>
      </div>
    </div> -->
    <div class="row justify-content-center" id="tags">
      <div class="col"></div>
    </div>
    <div class="row justify-content-center mt-2 mb-5" v-if="state.blog.imgUrl">
      <div class="col d-flex justify-content-center">
        <img class="img-size" :src="state.blog.imgUrl" alt="">
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-10">
        <p>{{ state.blog.body }}</p>
      </div>
    </div>
    <div class="row bg-secondary" v-if="state.showComm">
      <div class="col-12 text-center mt-3">
        <div class="d-flex justify-content-center">
          <h3 class="mr-5">
            Comments
          </h3>
          <button class="btn btn-outline-info" data-toggle="modal" data-target="#commentMod">
            <i class="fa fa-plus-circle text-info" aria-hidden="true"></i>
          </button>
        </div>
      </div>
      <comments-component v-for="comm in state.comments" :key="comm.id" :comment="comm" />
    </div>
    <div class="row" v-else>
      <div class="col d-flex">
        <h2>Be the first to comment!</h2>
        <button class="btn btn-outline-secondary" data-toggle="modal" data-target="#commentMod">
          <i class="fa fa-plus-circle text-secondary" aria-hidden="true"></i>
        </button>
      </div>
    </div>
    <comment-modal-component>
    </comment-modal-component>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { blogsService } from '../services/BlogsService'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import CommentsComponent from '../components/CommentsComponent.vue'
import CommentModalComponent from '../components/CommentModalComponent.vue'
export default {
  components: { CommentsComponent, CommentModalComponent },
  name: 'ActiveBlog',
  setup() {
    const route = useRoute()
    const state = reactive({
      blog: computed(() => AppState.activeBlog),
      comments: computed(() => AppState.comments),
      showComm: false
    })
    onMounted(async() => {
      try {
        await blogsService.getActiveBlog(route.params.id)
        await blogsService.getComments(route.params.id)
        console.log(AppState.activeBlog)
      } catch (error) {
        logger.error(error)
      } finally {
        if (AppState.comments[0]) {
          state.showComm = true
        }
      }
    })
    return {
      state
    }
  }
}
</script>

<style>

.img-size{
  max-width: 30em;
  max-height: 30em;
  border-radius: 2%;
  box-shadow: 0 0 10px 5px black;
}
.shadows{
  box-shadow: 0 0 20px 5px black;
}
.title-text{
  font-size: 5em;
}
</style>
