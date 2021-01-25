import { AppState } from '../AppState'
import { api } from './AxiosService'

class CommentsService {
  async getComments(id) {
    const res = await api.get('api/blogs/' + id + '/comments')
    console.log('comm', res.data)
    AppState.comments = res.data
  }

  async createComment(data) {
    data.creator = AppState.account
    data.blog = AppState.activeBlog.id
    AppState.comments.push(data)
    await api.post('api/comments', data)
  }

  async deleteComment(id) {
    const comm = AppState.comments.findIndex(c => c.id === id)
    const mComm = AppState.myComments.findIndex(c => c.id === id)
    if (mComm) { AppState.myComments.splice(mComm, 1) }
    AppState.comments.splice(comm, 1)
    await api.delete('api/comments/' + id)
    await this.getComments()
  }

  async editComment(data) {
    const id = AppState.comment
    const res = await api.put('api/comments/' + id, data)
    const comm = AppState.comments.findIndex(c => c.id === id)
    const mComm = AppState.myComments.findIndex(c => c.id === id)
    AppState.comments.splice(comm, 1, res.data)
    if (mComm) { AppState.myComments.splice(mComm, 1, res.data) }
  }
}
export const commentsService = new CommentsService()
