<template>
  <div class="modal fade"
       id="editCommentMod"
       tabindex="-1"
       role="dialog"
       aria-labelledby="commentModLabel"
       aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <form @submit.prevent="editComment">
          <div class="modal-header">
            <h5 class="modal-title" id="commentModLabel">
              Edit Comment
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row">
                <div class="col-12 d-flex justify-content-center">
                  <div>
                    <input v-model="state.commData.body"
                           type="text"
                           class="input-width border-0"
                           name="body"
                           id="body"
                           placeholder="Your comment here..."
                           required
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-center">
            <button type="button" class="btn btn-secondary mr-5" data-dismiss="modal">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
import { commentsService } from '../services/CommentsService'
import { logger } from '../utils/Logger'
import $ from 'jquery'
export default {
  name: 'CommentsModal',
  setup() {
    const state = reactive({
      commData: {}
    })
    return {
      state,
      async createComment() {
        try {
          $('#commentMod').modal('hide')
          await commentsService.createComment(state.commData)
        } catch (error) {
          logger.error(error)
        } finally {
          state.commData = {}
          state.showComm = true
        }
      },
      async editComment() {
        try {
          $('#editCommentMod').modal('hide')
          await commentsService.editComment(state.commData)
          state.commData = {}
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
  min-width: 20vw;
  min-height: 2.5em;
  border-bottom: 1px solid black !important;
}
.bb {
  border-bottom: 1px solid black !important;
}
</style>
