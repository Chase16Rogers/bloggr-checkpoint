<template>
  <div class="col-6">
    <div class="card mt-3 mb-3" :class="state.color">
      <div class="card-header">
        {{ comment.creator.name }}
        <i v-if="state.account._id === comment.creatorId"
           @click="editComm"
           data-toggle="modal"
           data-target="#editCommentMod"
           class="text-shadow pointer fa fa-pencil text-yellow p-1"
           aria-hidden="true"
        ></i>
        <i v-if="state.account._id === comment.creatorId"
           @click="deleteComm"
           class="pointer text-shadow fa fa-trash text-danger"
           aria-hidden="true"
        ></i>
      </div>
      <div class="card-body">
        <p class="card-text">
          {{ comment.body }}
        </p>
      </div>
    </div>
  </div>
  <edit-comments-component />
</template>

<script>
import { colorRando } from '../utils/ColorRando'
import { computed, reactive } from 'vue'
import { AppState } from '../AppState'
import { commentsService } from '../services/CommentsService'
import { logger } from '../utils/Logger'
import EditCommentsComponent from './EditCommentsComponent.vue'
export default {
  components: { EditCommentsComponent },
  name: 'CommentsComponent',
  props: {
    comment: { type: Object, required: true }
  },
  setup(props) {
    const state = reactive({
      color: colorRando.randomColor(),
      account: computed(() => AppState.account),
      comm: computed(() => AppState.comments)
    })
    return {
      state,
      deleteComm() {
        try {
          commentsService.deleteComment(props.comment.id)
        } catch (error) {
          logger.error(error)
        }
      },
      editComm() {
        AppState.comment = props.comment.id
      }
    }
  }
}
</script>

<style scoped>
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
