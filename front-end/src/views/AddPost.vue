<template>
  <div>
    <Header />
    
    <div class="outer-container">
      <div class="signup-container">
        <form class="signup-form" @submit.prevent="handleSignup">

          <div class = "add-post">
            <label for="post">Add Post</label>
          </div>


          
          <div class="form-group">
            
            <label for="body">Body</label>
            <input type="body" id="body" name="body" placeholder="body" v-model="email" />
          </div>

          <button type="submit" class="add-button">Add</button>
        </form>
      </div>
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
    Footer
  }
}



</script>
  
  <style scoped>

.outer-container {
  background-color: #868686; 
  padding: 30px; 
  border-radius: 10px;
  margin: auto; 
  width: calc(100% - 121px);
  margin-top: 10px;
  height: 30vw;
}

.signup-container {
  background-color: rgb(243, 255, 221);
  text-align: center;
  padding: 8%;
  border-radius: 10px;
  display: flex;
  flex-direction: column; /* Updated to column */
  justify-content: center;
  align-items: center;
  height: 40%;
  
  
}

.signup-form {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.form-group {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.form-group label {
  color: black;
  margin-right: 25px; /* Spacing between label and input */
}

.form-group input {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: white;
  color: black; 
}

.add-button {
  background-color: rgb(122, 175, 255);
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-self: center; /* Center the button */
  margin-top: 20px; /* Spacing from the last input field */
}

.signup-button:hover {
  background-color: rgb(72, 145, 255);
}

.add-post{

  align-self: center; /* Center the button */
  margin-bottom: 40px; /* Spacing from the last input field */

}

</style>
