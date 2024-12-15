<template>
    <div>
    <Header />
    <div class="light-green-container">
      <div class="grey-container">
        <h2>A Post</h2>
      </div>
      <div class="white-container">
        <div class="form-group">
          <label for="body">Body</label>
          <input type="text" id="body" name="body" placeholder="body" v-model="body" />
        </div>

        <div class="button-container">
          <button type="submit" class="update-button">Update</button>
          <button type="submit" class="delete-button">Delete</button>
        </div>
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
  
  .light-green-container {
  background-color: #d1f5d3;
  border-radius: 10px;
  padding: 20px;
  height: 30%;
  width: 95%;
  justify-content: center;
  align-items: center;
}

.grey-container {
  background-color: #d3d3d3;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 10px;
}

.white-container {
  background-color: #d3d3d3;
  border-radius: 10px;
  padding: 20px;
  width: 90%;
  
}

.form-group {
  margin-bottom: 10px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input[type='text'] {
  width: 50%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.button-container {
  display: flex;
  justify-content: space-between;
}

.update-button {
  background-color: blue;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.update-button:hover {
  background-color: darkblue;
}

.delete-button {
  background-color: red;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: darkred;
}

  
  </style>
  