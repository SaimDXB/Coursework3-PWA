<template>
  <div>
    <h2>Your Cart</h2>
    <div v-for="lesson in cart" :key="lesson._id" class="cart-item">
      <h3>{{ lesson.subject }}</h3>
      <p>Location: {{ lesson.location }}</p>
      <button @click="removeFromCart(lesson._id)">Remove</button>
    </div>
    <div class="customer-details">
      <h2>Customer Details</h2>
      <input type="text" placeholder="Name" v-model="name">
      <input type="text" placeholder="Phone" v-model="phone">
      <button @click="placeOrder">Place Order</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Checkout-Cart',
  props: ['cart'],
  data() {
    return {
      name: '',
      phone: ''
    };
  },
  methods: {
    removeFromCart(lessonId) {
      this.$emit('remove-from-cart', lessonId);
    },
    placeOrder() {
      if (this.name && this.phone) {
        this.$emit('place-order', { name: this.name, phone: this.phone });
      } else {
        alert('Please enter your name and phone number.');
      }
    }
  }
}
</script>

<style scoped>
.cart-item {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
}

.cart-item button {
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
}

.customer-details {
  margin-top: 20px;
}

.customer-details input {
  margin: 5px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.customer-details button {
  margin-top: 10px;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.customer-details button:hover {
  background-color: #0056b3;
}
</style>
