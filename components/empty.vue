<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col">
        
        <div class="alert alert-danger" v-if="postEmptyFunc">
          <ul>
            <li>
              {{postEmptyFunc}}
            </li>
          </ul>
        </div>

        <div class="alert alert-success" v-if="successFunc">
          <ul>
            <li>
              {{successFunc}}
            </li>
          </ul>
        </div>

           <div class="alert alert-danger" v-if="noboterrorFunc">
          <ul>
            <li>
              {{noboterrorFunc}}
            </li>
          </ul>
        </div>



      </div>
    </div>
  </div>
</template>

<script>
export default {
 props: ["postEmpty","success","noboterror"],


  computed: {
    postEmptyFunc() {
      let message = this.postEmpty;
      // console.log('ERRORS SAD',errors)
      //errors = errors.flat();
      return message;
    },
    successFunc() {
      let message = this.success;
      // console.log('ERRORS SAD',errors)
      //errors = errors.flat();
      return message;
    },
  
     noboterrorFunc() {
      let message = this.noboterror;
      // console.log('ERRORS SAD',errors)
      //errors = errors.flat();
      return message;
    },
  }

 

  
 
};
</script>