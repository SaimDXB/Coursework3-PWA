<template>
    <div class="lesson-list">
      <div v-for="lesson in lessons" :key="lesson._id" class="lesson-item">
        <h3>{{ lesson.subject }}</h3>
        <p>Location: {{ lesson.location }}</p>
        <p v-if="lesson.spaces > 0">Spaces Available: {{ lesson.spaces }}</p>
        <p v-else>Sorry, no spaces available</p>
        <img :src="lesson.image" alt="Lesson Image" class="lesson-image">
        <button @click="addToCart(lesson)" :disabled="lesson.spaces <= 0">Add to Cart</button>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'LessonList',
    props: ['lessons'],
    methods: {
      addToCart(lesson) {
        if (lesson.spaces > 0) {
          this.$emit('add-to-cart', lesson);
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .lesson-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .lesson-item {
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    width: 200px;
  }
  
  .lesson-image {
    max-width: 100%;
    height: auto;
  }
  
  .lesson-item button {
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    cursor: pointer;
  }
  
  .lesson-item button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  </style>
  