<template>
  <div class="col-12 d-flex justify-content-center">
    <router-link :to="{name: 'ActiveBlogPage', params: {id: blog.id}}">
      <div class="card my-2 homogenis-card" :class="state.color">
        <div class="card-body ml-3">
          <h2 class="">
            {{ blog.title }}
          </h2>
          <h5>Author: {{ blog.creator.name }}</h5>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { colorRando } from '../utils/ColorRando'
import { AppState } from '../AppState'
export default {
  name: 'BlogComponent',
  props: {
    blog: { type: Object, required: true }
  },
  setup() {
    const state = reactive({
      color: colorRando.randomColor(),
      blog: computed(() => AppState.activeBlog),
      account: computed(() => AppState.account)
    })
    onMounted(() => {

    })
    return {
      state
    }
  }
}
</script>

<style>

.homogenis-card{
min-width: 35em;
max-width: 35em;
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

</style>
