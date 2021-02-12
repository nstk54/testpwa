<template>
  <div class="container">
    <div>
    <!-- <div v-for="item in items" :key="item.id">
      <b-card
        :title="item.title"
        :img-src="item.imageUrl"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
      > -->
        <!-- <b-card-text>{{ item.text }}</b-card-text> -->

        <b-button variant="primary" @click="show_Modal();" class="fa fa-bar-chart basket" aria-hidden="true"
          >  Список</b-button
        >
      
    </div>
    <b-modal id="modal1" size="xl" title="Список выбранных предложений">
     
      


      <div class="col-12">
                <table
                  class="table table-striped table-dark table-hover table-responsive-sm"
                  id="table_start"
                >
                  <thead>
                    <tr>
                      <th scope="col">Объявление</th>
                      <th scope="col">Город</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr></tr>
                    <tr v-for="(post , index) in fav_offers_vuex">
                      <td>
                        <div
                          class="message"
                          v-html="`<img src='/tubs/`+imgFunc(index)+`' height='11px' width='11px' alt=''>  `+post.long"
                        ></div>

                        <div>
                          <div class="dop nunito">
                            <div v-if="post.photo">
                              <br />
                              <img
                                v-if="img_toggle"
                                @click="img_toggle=!img_toggle"
                                height="50px"
                                :src="'/img/uploads/'+post.photo"
                                alt
                              />
                              <img
                                v-else
                                @click="img_toggle=!img_toggle"
                                :src="'/img/b/uploads/'+post.photo"
                                alt
                              />
                              <br />
                            </div>

                            <div v-if="post.tel">
                              <br />
                              <span>
                                <span>Телефон:</span>
                                {{post.tel}}
                              </span>
                              <br />
                            </div>

                            <div>
                              <span>Сайт: {{post.site}}</span>
                              <br />
                            </div>

                            <div v-if="post.person">
                              <span>Организация:</span>
                              {{post.person}}
                              <br />
                            </div>

                            <div v-if="post.created_at">
                              <div class="container">
                                <div class="row">
                                  <div class="col-6 text-left p-0 m-0">
                                    <span>Дата:</span>
                                    {{ post.created_at.substr(0,10)}}
                                  </div>
                                  <div class="col-6 text-right">
                                    <button
                                      class="btn btn-danger"
                                      @click="delItemFavorite(post.id)"
                                    >Удалить</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="city">{{post.city}}</td>
                    </tr>
                  </tbody>
                </table>
              </div>


    </b-modal>
  </div>
  </div>
</template>

<script>
export default {
  props: ["show_btn_fav"],
  data() {
    return {
 

      offer: "",
      fav_offers: [],
      showBtn: false,
      modal: "staticBackdrop",
      ffavorites: [],
      showModal: "hide",
      classModal: "hide_modal",
    };
  },

  computed: {

     fav_offers_vuex() {
      return this.$store.getters["favorite/fav_offers"];
    },


    // get_offer() {
    //   if (this.favorite) {
    //     this.showBtn = true;
    //     console.log("if_adminka44", this.favorite);
    //     this.fav_offers = JSON.parse(this.favorite);
    //     return this.fav_offers;
    //   } else {
    //     if (!localStorage.favorite) {
    //       console.log("else_adminka");
    //       this.showBtn = false;
    //       return this.fav_offers;
    //     } else {
    //       this.showBtn = true;
    //       this.fav_offers = JSON.parse(localStorage.favorite);
    //       console.log("else_adminka_else--", this.favorite);
    //       return this.fav_offers;
    //     }
    //   }
    // },
  },
  mounted() {
    //this.get_offer();
    // this.makeNormalModal()
  },
  methods: {
     imgFunc(ind) {
      return this.fav_offers_vuex[ind].type == "Продать"
        ? "sell.png"
        : "buy.png";
    },
    show_Modal(item) {
      this.selectedItem = item;
      this.$root.$emit("bv::show::modal", "modal1");
      console.log("dfddg-dgdf-g-g", this.$root.$emit);
    },

    ForcesUpdate() {
      // ...
      this.$forceUpdate(); // Заметьте, что мы используем $ в качестве префикса
      // ...
    },
    makeNormalModal() {
      $(this.modal).modal("show");
      //myModal.setAttribute("modal", "show");
      // console.log(document.getElementById(this.modal));
      //  this.showModal="show";
      //  console.log(document.getElementById(this.modal));
      //this.ForcesUpdate();
      //  this.hide_modal = "show_modal";
    },
    delItemFavorite(id) {
      let temp = [],
        res = [];
      temp = JSON.parse(localStorage.favorite);

      temp.forEach((element) => {
        if (element.id != id) {
          res.push(element);
        }
      });
      

      this.$store.commit("favorite/setFavOffers",res);
      console.log("REZZZZ",res);



                        if (res.length < 1) {
                          localStorage.removeItem("favorite");
                          

                           this.$emit("update:show_btn_fav", false);
                          // this.$emit("update:offerList", []);

                          // this.fav_offers = [];
                        } 
                        else {
                        //   console.log("temp_del===", res.length);
                             localStorage.favorite = JSON.stringify(res);
                        //   this.$emit("update:favorite", localStorage.favorite);
                         }
      //this.get_offer();
    },
  },
};
</script>