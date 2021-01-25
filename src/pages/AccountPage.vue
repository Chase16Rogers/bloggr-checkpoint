<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col my-3 d-flex justify-content-center">
        <div class="about p-1 text-center shadows">
          <img class="rounded" :src="account.picture" alt="" />
          <p>{{ account.email }}</p>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-5 mr-3 shadows">
        <h2 class="text-center">
          My Blogs
        </h2>
        <div class="container">
          <div class="row overflow hide-scroll">
            <blog-component v-for="blog in state.blogs" :key="blog.id" :blog="blog" />
          </div>
        </div>
      </div>
      <div class="col-5 shadows ml-3">
        <h2 class="text-center">
          My Comments
        </h2>
        <div class="container-fluid">
          <div class="row overflow hide-scroll">
            <comments-component v-for="comm in state.comms" :key="comm.id" :comment="comm" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, onMounted } from 'vue'
import { AppState } from '../AppState'
import { myService } from '../services/MyService'
import { logger } from '../utils/Logger'
export default {
  name: 'Account',
  setup() {
    const state = reactive({
      blogs: computed(() => AppState.myBlogs),
      comms: computed(() => AppState.myComments)
    })
    onMounted(async() => {
      try {
        myService.getMyBlogs()
        myService.getMyComments()
      } catch (error) {
        logger.error(error)
      }
    })
    return {
      state,
      account: computed(() => AppState.account)
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}

.overflow {
  height: 35em;
  overflow-y: scroll;
}
.hide-scroll::-webkit-scrollbar {
  display: none;
}
.shadows {
  box-shadow: 0px 0px 10px .5px black;
  border-radius: 3%;
}
</style>
