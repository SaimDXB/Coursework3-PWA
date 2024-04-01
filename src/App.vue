<template>
  <div id="app">
    <LessonList v-if="!showCheckout" :lessons="lessons" @add-to-cart="addToCart"/>
    <Checkout v-else :cart="cart" @remove-from-cart="removeFromCart" @place-order="placeOrder"/>
    <button @click="toggleCheckout" class="cart-btn">
      Cart <span v-if="cart.length">({{ cart.length }})</span>
    </button>
  </div>
</template>

<script>
import Checkout from './components/Checkout.vue';
import LessonList from './components/Lesson.vue';

export default {
  name: 'App',
  components: {
    LessonList,
    Checkout
  },
  data() {
    return {
      lessons: [],
      cart: [],
      showCheckout: false,
      apiUrl: 'http://localhost:3000/api/'
    }
  },
  methods: {
    addToCart(lesson) {
      if (lesson.spaces > 0) {
        this.cart.push(lesson);
        lesson.spaces--; // Update spaces locally
      }
    },
    removeFromCart(lessonId) {
      const index = this.cart.findIndex(lesson => lesson._id === lessonId);
      if (index !== -1) {
        this.cart.splice(index, 1);
        this.updateLessonSpaces(lessonId, 1); // Increase spaces when removing from cart
      }
    },
    toggleCheckout() {
      this.showCheckout = !this.showCheckout;
    },
    async fetchLessons() {
      try {
        const response = await fetch(`${this.apiUrl}lessons`);
        const data = await response.json();
        this.lessons = data;
      } catch (error) {
        console.error('Error fetching lessons:', error);
      }
    },
    async updateLessonSpaces(lessonId, increment) {
      try {
        const response = await fetch(`${this.apiUrl}lessons/${lessonId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ spaces: increment })
        });
        if (response.ok) {
          console.log(`Lesson spaces updated successfully for lessonId: ${lessonId}`);
        } else {
          console.error('Failed to update lesson spaces:', response.statusText);
        }
      } catch (error) {
        console.error('Error updating lesson spaces:', error);
      }
    },
    async placeOrder(order) {
  try {
    const response = await fetch(`${this.apiUrl}orders/place`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: order.name,
        phone: order.phone,
        lessonIds: this.cart.map(lesson => lesson._id),
      }),
    });
    const responseData = await response.json();
    if (response.ok) {
      this.cart = []; // Clear cart on successful order
      this.showCheckout = false; // Hide checkout after successful order
      alert('Order placed successfully!');
    } else {
      console.error('Failed to place order:', responseData.error);
      alert('There was an error placing the order.');
    }
  } catch (error) {
    console.error('Error placing order:', error);
    alert('There was an error placing the order.');
  }
}
  },
  mounted() {
    this.fetchLessons();
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.cart-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.cart-btn:hover {
  background-color: #0056b3;
}
</style>
