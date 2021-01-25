import { AppState } from '../AppState'
import { api } from './AxiosService'
class MyService {
  async getMyBlogs() {
    const res = await api.get('account/blogs')
    console.log('myBlog', res.data)
    AppState.myBlogs = res.data
  }

  async getMyComments() {
    const res = await api.get('account/comments')
    console.log('myComms', res.data)
    AppState.myComments = res.data
  }
}

export const myService = new MyService()
