<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col">
        
        <div class="alert alert-danger" v-if="validateErrors">
          <ul>
            <li v-for="(value,index) in validateErrors"
            :key="index">
            {{value}}
            </li>
          </ul>
        </div>



  


      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["errors"],


  computed: {
    validateErrors() {
      let errors = Object.values(this.errors);
      console.log('ERRORS SAD',errors)
      //errors = errors.flat();
      return errors;
    }
  }


};
</script>