import { AppState } from '../AppState'
import { api } from './AxiosService'
import { commentsService } from './CommentsService'

class BlogsService {
  async getAllBlogs() {
    const res = await api.get('api/blogs')
    AppState.blogs = res.data
    console.log('get all blogs', res.data)
  }

  async getActiveBlog(id) {
    const res = await api.get('api/blogs/' + id)
    AppState.activeBlog = res.data
    console.log('activeBlog' + res.data)
  }

  async createBlog(data) {
    data.creator = AppState.account
    console.log(data)
    await api.post('api/blogs', data)
  }

  async editBlog(data) {
    const id = AppState.activeBlog.id
    const res = await api.put('api/blogs/' + id, data)
    AppState.blogs.push(res.data)
  }

  async deleteBlog() {
    const id = AppState.activeBlog.id
    await api.delete('api/blogs/' + id)
    AppState.activeBlog = {}
    AppState.comments.forEach(c => commentsService.deleteComment(c.id))
  }
}

export const blogsService = new BlogsService()
