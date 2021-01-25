<template>
  <div class="container">
    <form class="form" @submit.prevent="editBlog">
      <div class="row mt-4 justify-content-center">
        <div class="col-12 d-flex justify-content-center">
          <div class="card my-2 homogenis-card yellow">
            <div class="card-body ml-3">
              <h2>Edit Blog Title</h2>
              <input v-model="state.newBlog.title"
                     type="text"
                     class="input-width border-0 bg-none"
                     name="title"
                     id="title"
                     placeholder="new title here..."
                     required
              >
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12 d-flex justify-content-center">
          <div class="d-flex align-items-center">
            <div class="card my-2 homogenis-card green">
              <div class="card-body ml-3">
                <div class="d-flex align-items-center">
                  <h2>Edit Image URL</h2>
                  <p class="mb-0">
                    (Optional)
                  </p>
                </div>
                <input v-model="state.newBlog.imgUrl"
                       type="text"
                       class="input-width border-0 bg-none"
                       name="imgUrl"
                       id="imgUrl"
                       placeholder="new image here, if you want..."
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-4" v-if="false">
        <div class="col-12 d-flex justify-content-center">
          <div class="card my-2 homogenis-card red">
            <div class="card-body ml-3">
              <div>
                <h2>Tags</h2>
                <input v-model="state.newBlog.tags"
                       type="text"
                       class="input-width border-0 bg-none"
                       name="tags"
                       id="tags"
                       placeholder="Tag your blog, for meta-data reasons..."
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12 d-flex justify-content-center">
          <div class="card my-2 homogenis-card indigo">
            <div class="card-body ml-3">
              <div>
                <h2>Edit Blog Body</h2>
                <input v-model="state.newBlog.body"
                       type="text"
                       class="input-width border-0 bg-none"
                       name="body"
                       id="body"
                       placeholder="Write the new contents of your blog..."
                       required
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-12 d-flex justify-content-center">
          <div class="card my-2 homogenis-card blue">
            <div class="card-body ml-3 d-flex justify-content-center">
              <div>
                <button class="btn btn-success mr-5 shadows" type="submit">
                  Submit
                </button>
                <button class="btn btn-danger ml-5 shadows" type="button" @click="state.newBlog = {}">
                  Cancel
                </button>
              </div>
            </div>
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
import router from '../router'
export default {
  name: 'EditBlog',
  setup() {
    const state = reactive({
      newBlog: {}
    })
    return {
      state,
      async buildBlog() {
        try {
          await blogsService.editBlog(state.newBlog)
          state.newBlog = {}
        } catch (error) {
          logger.error(error)
        }
      },
      editBlog() {
        try {
          blogsService.editBlog(state.newBlog)
          router.push({ name: 'Home' })
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
  min-width: 29vw;
  min-height: 2.5em;
  border-bottom: 1px solid black !important;
}
.bb {
  border-bottom: 1px solid black !important;
}
.bg-none {
  background-color: rgba(255, 255, 255, 0);
}
.red{
  background-color: #db2020a1;
  color:black;
}
.orange{
  background-color: #fe6230a1;
  color:black;
}
.yellow{
  background-color: #fef600a1;
  color: black;
}
.green{
    background-color: #00bb00a1;
    color: black;
}
.blue{
    background-color: #009bfea1;
    color: black;
}
.purple{
    background-color:#e030d7a1;
    color: black;
}
.indigo {
  background-color: #00eeffa1;
  color: black;
}

.shadows {
  box-shadow: 0px 1px 2px .5px black;
}

</style>
