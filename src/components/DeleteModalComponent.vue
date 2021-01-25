<template>
  <div class="modal fade"
       id="deleteMod"
       tabindex="-1"
       role="dialog"
       aria-labelledby="commentModLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <form @submit.prevent="createComment">
          <div class="modal-header">
            <h5 class="modal-title" id="commentModLabel">
              Are you sure you want to delete this?
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="d-flex justify-content-center">
              <button type="button" class="btn btn-secondary mr-5" data-dismiss="modal">
                Cancel
              </button>
              <button type="submit" class="btn btn-danger">
                Yes, I'm sure
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
// import { AppState } from '../AppState'
import { blogsService } from '../services/BlogsService'
import { logger } from '../utils/Logger'
export default {
  name: 'DeleteModal',
  props: {
    del: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const state = reactive({
      truthy: false
    })
    return {
      state,
      async deleteToggle(props) {
        switch (props.del) {
          case 'blog':
            try {
              await blogsService.deleteBlog()
            } catch (error) {
              logger.error(error)
            }
        }
      }
    }
  }
}
</script>

<style>
</style>
