<template>
  <div class="col-12 d-flex justify-content-center">
    <router-link :to="{name: 'ActiveBlogPage', params: {id: blog.id}}">
      <div class="card purple my-2">
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

.red{
  background-color: red;
  color:black;
  text-shadow: 1px 2px rgb(87, 86, 86);
}
.orange{
  background-color: orange;
  color:black;
  text-shadow: 1px 2px rgb(87, 86, 86);
}
.yellow{
  background-color: yellow;
  color: black;
  text-shadow: 1px 2px rgb(87, 86, 86);
}
.green{
    background-color: green;
    color: black;
    text-shadow: 1px 2px rgb(87, 86, 86);
}
.blue{
    background-color: blue;
    color: black;
    text-shadow: 1px 2px rgb(86, 86, 87);
}
.purple{
    background-color: purple;
    color: black;
}

</style>
