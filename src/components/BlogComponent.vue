<template>
  <div class="col-12 d-flex justify-content-center">
    <router-link :to="{name: 'ActiveBlogPage', params: {id: blog.id}}">
      <div class="card text-white bg-info my-2">
        <div class="card-body">
          <h2 class="text-center">
            {{ blog.title }}
          </h2>
          <h5>Author: {{ blog.creator.name }}</h5>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'BlogComponent',
  props: {
    blog: { type: Object, required: true }
  }
}
</script>

<style>

</style>
