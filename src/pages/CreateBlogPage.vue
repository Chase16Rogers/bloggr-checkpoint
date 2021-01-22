<template>
  <div class="container bg-light">
    <form class="form" @submit.prevent="buildBlog">
      <div class="row mt-4 justify-content-center">
        <div class="col-12 d-flex justify-content-center">
          <div>
            <h2>Blog Title</h2>
            <input v-model="state.newBlog.title"
                   type="text"
                   class="input-width border-0 bg-light"
                   name="title"
                   id="title"
                   placeholder="your title here..."
                   required
            >
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12 d-flex justify-content-center">
          <div>
            <div class="d-flex align-items-center">
              <h2>Image URL</h2>
              <p class="mb-0">
                (Optional)
              </p>
            </div>
            <input v-model="state.newBlog.imgUrl"
                   type="text"
                   class="input-width border-0 bg-light"
                   name="imgUrl"
                   id="imgUrl"
                   placeholder="your image here, if you want..."
            >
          </div>
        </div>
      </div>
      <div class="row mt-4" v-if="false">
        <div class="col-12 d-flex justify-content-center">
          <div>
            <h2>Tags</h2>
            <input v-model="state.newBlog.tags"
                   type="text"
                   class="input-width border-0 bg-light"
                   name="tags"
                   id="tags"
                   placeholder="Tag your blog, for meta-data reasons..."
            >
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12 d-flex justify-content-center">
          <div>
            <h2>Blog Body</h2>
            <input v-model="state.newBlog.body"
                   type="text"
                   class="input-width border-0 bg-light"
                   name="body"
                   id="body"
                   placeholder="Write the contents of your blog..."
                   required
            >
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12 d-flex justify-content-center">
          <div>
            <button class="btn btn-outline-success mr-5" type="submit">
              Submit
            </button>
            <button class="btn btn-outline-danger ml-5" @click="state.newBlog = {}">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { blogsService } from '../services/BlogsService'
import { logger } from '../utils/Logger'
export default {
  name: 'CreateBlog',
  setup() {
    const state = reactive({
      newBlog: {}
    })
    return {
      state,
      async buildBlog() {
        try {
          await blogsService.createBlog(state.newBlog)
        } catch (error) {
          logger.error(error)
        }
      }
    }
  }

}
</script>

<style>
.input-width{
  min-width: 50vw;
  min-height: 2.5em;
  border-bottom: 1px solid black !important;
}
.bb {
  border-bottom: 1px solid black !important;
}
</style>
