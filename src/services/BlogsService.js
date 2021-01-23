import { AppState } from '../AppState'
import { api } from './AxiosService'

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

  async getComments(id) {
    const res = await api.get('api/blogs/' + id + '/comments')
    console.log('comm', res.data)
    AppState.comments = res.data
  }

  async createBlog(data) {
    data.creator = AppState.account
    console.log(data)
    await api.post('api/blogs', data)
  }

  async createComment(data) {
    data.creator = AppState.account
    data.blog = AppState.activeBlog.id
    AppState.comments.push(data)
    await api.post('api/comments', data)
  }
}

export const blogsService = new BlogsService()
