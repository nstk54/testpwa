<template>
  <div class="container">
    <!-- <div class="row">{{favorite}}</div> -->

    

      <!-- Modal -->
 
  

    <div class="row">
      <div class="col">
        <div>
          <input
              v-model="lastPage"
              width="200px"
              type="text"
              placeholder="последняя страница- 10"
            />
            <input v-model="firstPage" width="200px" type="text" placeholder="первая страница- 0" />

          <button @click="parser()" class="btn btn-success">
            
            <i class="fa fa-pencil" aria-hidden="true">Парсим TRUBAMET</i>
          </button>
        </div>
      </div>
    </div>


     <div class="row">
      <div class="col">
        <div>
          <input
              v-model="lastPage"
              width="200px"
              type="text"
              placeholder="последняя страница- 10"
            />
            <input v-model="firstPage" width="200px" type="text" placeholder="первая страница- 0" />
          <button @click="parserTrubyBu()" class="btn btn-success">
        
            <i class="fa fa-pencil" aria-hidden="true">Парсим TRUBY-BU</i>
          </button>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div>
          <button @click="parserWatsapp()" class="btn btn-success">
            <textarea v-model="watsappText" rows="30" cols="150"></textarea>
            <i class="fa fa-pencil" aria-hidden="true">Парсим watsApp</i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  
  data() {
    return {
      lastPage: "",
      firstPage: "",
      watsappText: "",

    };
  },

  computed: {

  },

  methods: {
 

    parser() {
      

        this.$axios.post("/trubamet", {
          lastPage: this.lastPage,
          firstPage: this.firstPage
        })

        .then(response => {
          console.log("RESPONSE_parser!!!!:", response);
        })
        .catch(error => {
          this.errored = true;
          console.log(error);
        })
        .finally();
    },


        parserTrubyBu() {
      

        this.$axios.post("/parserTrubabu", {
          lastPage: this.lastPage,
          firstPage: this.firstPage
        })

        .then(response => {
          console.log("RESPONSE_parser!!!!:", response);
        })
        .catch(error => {
          this.errored = true;
          console.log(error);
        })
        .finally();
    },

    parserWatsapp() {
      

        this.$axios.post("/whatsapp", {
          watsappText: this.watsappText
        })

        .then(response => {
          console.log("RESPONSE_parser!!!!:", response);
        })
        .catch(error => {
          this.errored = true;
          console.log(error);
        })
        .finally();
    }
  }
};
</script>