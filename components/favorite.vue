<template>
  <div class="container">
    <div class="row">
      <div
        class="modal fade bd-example-modal-lg"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myLargeModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">...</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["favorite"],
  data() {
    return {
      offer: "",
      fav_offers: [],
      showBtn: false,
      modal: "myModal",
      ffavorites: [],
      showModal: "hide",
      classModal: "hide_modal",
    };
  },

  computed: {
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
    //       console.log("else_adminka_else--",this.favorite);
    //       return this.fav_offers;
    //     }
    //   }
    // }
  },
  mounted() {
    this.get_offer();
    // this.makeNormalModal()
  },
  methods: {
    get_offer() {
      if (this.favorite) {
        this.showBtn = true;
        console.log("if_adminka44", this.favorite);
        this.fav_offers = JSON.parse(this.favorite);
        return this.fav_offers;
      } else {
        if (!localStorage.favorite) {
          console.log("else_adminka");
          this.showBtn = false;
          return this.fav_offers;
        } else {
          this.showBtn = true;
          this.fav_offers = JSON.parse(localStorage.favorite);
          console.log("else_adminka_else--", this.favorite);
          this.ffavorites = this.fav_offers;
          console.log("ffavor", this.ffavorites);
        }
      }
    },
    ForcesUpdate() {
      // ...
      this.$forceUpdate(); // Заметьте, что мы используем $ в качестве префикса
      // ...
    },
    makeNormalModal() {
      // $(this.modal).modal("show");
      //myModal.setAttribute("modal", "show");
      // console.log(document.getElementById(this.modal));
      //  this.showModal="show";
      //  console.log(document.getElementById(this.modal));
      //this.ForcesUpdate();
      this.hide_modal = "show_modal";
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

      if (res.length < 1) {
        localStorage.removeItem("favorite");
        //this.favorite ="";
        // this.$emit("favorite", "");
        this.$emit("update:favorite", "");
        this.$emit("update:offerList", []);

        //  this.offerList
        this.fav_offers = [];
      } else {
        console.log("temp_del===", res.length);
        localStorage.favorite = JSON.stringify(res);
        //this.$emit("favorite", localStorage.favorite);
        this.$emit("update:favorite", localStorage.favorite);
        // this.favorite = localStorage.favorite;
      }
    },
  },
};
</script>
<style lang="scss">
.hide_modal {
  display: none;
}
.show_modal {
  display: block;
}
</style>