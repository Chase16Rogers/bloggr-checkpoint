<template>
  <div class="container bg-light shadows">
    <div class="row mt-3 justify-content-center">
      <div class="col-9 text-center ">
        <h2 class="title-text">
          {{ state.blog.title }}
        </h2>
      </div>
      <div class="col-1 d-flex align-items-center title-text justify-content-start text-shadow">
        <i v-if="state.account._id === state.blog.creatorId" class="text-shadow pointer fa fa-pencil text-yellow p-1" aria-hidden="true" @click="editBlog"></i>
        <i v-if="state.account._id === state.blog.creatorId"
           @click="deleter"

           data-toggle="modal"
           data-target="#deleteMod"
           class="pointer text-shadow fa fa-trash text-danger"
           aria-hidden="true"
        ></i>
      </div>
    </div>
    <delete-modal-component :del="state.here" />
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
    <div class="row bg-secondary" v-if="state.comments[0]">
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
import { commentsService } from '../services/CommentsService'
import { useRoute } from 'vue-router'
import { AppState } from '../AppState'
import { logger } from '../utils/Logger'
import CommentsComponent from '../components/CommentsComponent.vue'
import CommentModalComponent from '../components/CommentModalComponent.vue'
import DeleteModalComponent from '../components/DeleteModalComponent.vue'
import router from '../router'
export default {
  components: { CommentsComponent, CommentModalComponent, DeleteModalComponent },
  name: 'ActiveBlog',
  setup() {
    const route = useRoute()
    const state = reactive({
      blog: computed(() => AppState.activeBlog),
      comments: computed(() => AppState.comments),
      account: computed(() => AppState.account),
      showComm: false,
      here: 'blog'
    })
    onMounted(async() => {
      try {
        await blogsService.getActiveBlog(route.params.id)
        await commentsService.getComments(route.params.id)
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
      state,
      deleter() {
        router.push({ name: 'Home' })
        blogsService.deleteBlog()
      },
      editBlog() {
        router.push({ name: 'EditBlogPage' })
      }
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
.text-yellow{
  color: rgb(201, 236, 0);
}
.text-shadow{
  text-shadow: 1px 5px black;
}

.pointer:hover{
  cursor: pointer;
}
</style>
