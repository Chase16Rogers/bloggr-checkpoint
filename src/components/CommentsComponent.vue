<template>
  <div class="col-6">
    <div class="card mt-3 bg-light mb-3">
      <div class="card-header">
        {{ comment.creator.name }}
      </div>
      <div class="card-body">
        <p class="card-text">
          {{ comment.body }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
export default {
  name: 'CommentsComponent',
  props: {
    comment: { type: Object, required: true }
  },
  setup() {
    const state = reactive({
      comments: computed(() => AppState.comments)
    })
    return {
      state
    }
  }
}
</script>

<style>

</style>
