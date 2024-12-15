<template>
  <div>
    <Header />
    <div class="content-area">
      <div class="sidebox"></div>
      <div class="contact-us">
        <h1>Contact Us</h1>
        <p>Feel free to reach out to us with any questions or concerns!</p>

        <!-- Your contact form goes here -->
        <form>
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" required>

          <label for="email">Email:</label>
          <input type="email" id="email" name="email" required>

          <label for="message">Message:</label>
          <textarea id="message" name="message" rows="4" required></textarea>

          <button type="submit">Submit</button>
        </form>
      </div>
      <div class="sidebox"></div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/CompoHeader.vue';
import Footer from '@/components/CompoFooter.vue';

export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<style scoped>

.content-area {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  padding: 0 20px;
  min-height: calc(100vh - 60px - 40px);
  gap: 20px;
}

.sidebox {
  background-color: #868686;
  width: 15%;
  flex-grow: 1;
  border-radius: 10px;
}

.contact-us {
  width: 68%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
form label {
  display: block;
  margin-bottom: 5px;
}

form input,
form textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  margin-bottom: 15px;
}


</style>
