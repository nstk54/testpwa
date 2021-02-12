<template>
  <div class="container">
    <p v-if="loggedIn">ты вошел
<adminka v-if="loggedIn" ></adminka>


    </p>

    <modal-portal
    v-if="show_btn_fav"
      v-bind:show_btn_fav.sync="show_btn_fav"
      v-bind:offerList.sync="offerList"
    >
    </modal-portal>

    <!-- use the modal component, pass in the prop -->

    <!-- <favorite
      v-bind:favorite.sync="favorite"
      v-bind:offerList.sync="offerList"
    ></favorite> -->
    <div class="row">
      <div class="col text-center text-md-left">
        <a href="https://trublo.ru"
          ><img src="/tubs/logo.png" height="90px" width="340px" alt=""
        /></a>
      </div>
    </div>

    <div class="row m-0 p-1">
      <div class="col bg-blue text-white text-center p-2 nunito">
        <dt class="col-12">ВЫБОР ДИАМЕТРА</dt>
      </div>
    </div>
    <div class="row m-0 p-1">
      <div class="col-3 col-sm-2" v-for="(diametr, index) in diametrs">
        <div class="chiller_cb">
          <input
            class="form-check-input"
            type="checkbox"
            v-model="check.diametr"
            :id="'checkDiam' + index"
            :value="diametr"
          />
          <label class="form-check-label" :for="'checkDiam' + index">{{
            diametr
          }}</label>
          <span></span>
        </div>
      </div>
    </div>

    <div class="row m-0 p-1">
      <div class="col bg-blue text-white text-center p-2 nunito">
        <dt class="col-12">ВЫБОР ТИПА ПРЕДЛОЖЕНИЯ КУПИТЬ ИЛИ ПРОДАТЬ</dt>
      </div>
    </div>

    <div class="row m-0 p-1 justify-content-center">
      <div class="col-4 col-md-2 form-check">
        <div class="chiller_cb">
          <input
            class="form-check-input"
            type="radio"
            v-model="check.type"
            id="buy"
            value="Купить"
          />
          <label class="form-check-label" for="buy">Купить</label>
          <span></span>
        </div>
      </div>

      <div class="col-4 col-md-2 form-check">
        <div class="chiller_cb">
          <input
            class="form-check-input"
            type="radio"
            v-model="check.type"
            id="sell"
            value="Продать"
          />
          <label class="form-check-label" for="sell">Продать</label>
          <span></span>
        </div>
      </div>

      <div class="col-3 col-sm-2 form-check">
        <div class="chiller_cb">
          <input
            class="form-check-input"
            type="radio"
            v-model="check.type"
            id="all"
            value="Все"
          />
          <label class="form-check-label" for="all">Все</label>
          <span></span>
        </div>
      </div>
    </div>

    <div class="row p-0 m-0 pb-1" v-if="check.diametr[0] != null">
      <div class="col bg-dark text-white nunito">
        <dt class="col-12">
          Вы выбрали диаметры:<span
            class="bg-dark checked_diametr_span nunito"
            v-for="(item, index) in check.diametr"
          >
            {{ item }}</span
          >
        </dt>
      </div>
    </div>

    <div class="row p-0 m-0 pb-1" v-if="check.type != null">
      <div class="col bg-dark text-white nunito">
        <dt class="col-12">
          Тип сделки:<span class="bg-dark checked_diametr_span nunito">
            {{ check.type }}
          </span>
        </dt>
      </div>
    </div>

    <empty
      v-if="statusAdd == 200"
      success="Ваше объявление добавлено"
      id="add_success"
    ></empty>

    <empty v-if="validationErrors" :error="validationErrors"></empty>

    <empty v-if="postsEmpty" :postEmpty="postsEmpty"></empty>

    <div
      class="d-flex justify-content-center my-5"
      v-if="posts.loading == true"
    >
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>

    <div class="row">
      <div class="col">
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

            <tr v-for="(post, index) in offers_voex.data" :key="post.id">
              <td>
                <div
                  v-html="
                    `<img src='/tubs/` +
                    imgFunc(index) +
                    `' height='11px' width='11px' alt=''>  ` +
                    post.message
                  "
                  @click="fullMessage(index)"
                ></div>

                <div v-if="info[index] == true" class="dop nunito">
                  <div v-if="post.photo">
                    <br />
                    <img
                      v-if="img_toggle"
                      @click="img_toggle = !img_toggle"
                      height="50px"
                      :src="'/img/uploads/' + post.photo"
                      alt
                    />
                    <img
                      v-else
                      @click="img_toggle = !img_toggle"
                      :src="'/img/b/uploads/' + post.photo"
                      alt
                    />
                    <br />
                  </div>
                  <div v-if="post.tel">
                    <br />
                    <span> <span>Телефон: </span>{{ post.tel }} </span>
                    <br />
                  </div>

                  <div>
                    <span> Сайт: {{ post.site }}</span>
                    <br />
                  </div>

                  <div v-if="post.person" @click="fullMessage(index)">
                    <span>Организация: </span>{{ post.person }}
                    <br />
                  </div>

                  <div v-if="post.created_at" @click="fullMessage(index)">
                    <div class="container">
                      <div class="row">
                        <div class="col-12 text-left p-0 m-0">
                          <span>Дата: </span>{{ post.created_at.substr(0, 10) }}
                        </div>
                        <div class="col-12 text-right">
                          <div class="container">
                            <div class="row justify-content-end">
                              <div class="col-auto">
                                <button
                                  class="btn btn-primary"
                                  @click="add_in_offerList(index)"
                                >
                                  <i
                                    class="fa fa-bar-chart"
                                    aria-hidden="true"
                                  ></i>
                                  В список
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td class="city" @click="fullMessage(index)">{{ post.city }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="row justify-content-center">
      <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li>
            <a class="page-link" href="#" @click.prevent="previousPage()"
              >Назад</a
            >
          </li>

          <li class="page-item disabled">
            <a class="page-link" href="#"
              >Страница {{ offers_voex.current_page }} из
              {{ offers_voex.last_page }}
            </a>
          </li>

          <li>
            <a class="page-link" href="#" @click.prevent="nextPage()">Вперед</a>
          </li>
        </ul>
      </nav>
    </div>

    <div class="row m-0 p-1" id="add_error">
      <div class="col bg-blue text-white text-center p-2 nunito">
        <dt class="col-12">ПОДАТЬ ОБЪЯВЛЕНИЕ</dt>
      </div>
    </div>

    <empty v-if="noboterror" :noboterror="noboterror"></empty>
    <validation v-if="validationErrors" :errors="validationErrors"></validation>

    <div class="row">
      <div class="col-12">
        <form
          @submit.prevent="addPost"
          class="mb-4"
          enctype="multipart/form-data"
        >
          <div class="form-group r">
            <label for="message">Текст объявления*</label>

            <textarea
              v-model="post.message"
              class="form-control"
              id="message"
              rows="3"
            ></textarea>
          </div>

          <div class="form-group r">
            <label for="city">Город*</label>
            <input
              ref="hhh"
              v-model="post.city"
              type="text"
              class="form-control"
              id="city"
            />
          </div>

          <div class="form-group r">
            <label for="phone"
              >Телефон*
              <span class="dopTel" v-if="phone"
                >Вы ввели: +7-{{ phone }}</span
              ></label
            >
            <div class="input-group">
              <div class="input-group-prepend">
                <span class="input-group-text">+7</span>
              </div>
              <input
                type="tel"
                v-model="phone"
                name="phone"
                id="phone"
                placeholder="(555) 555-5555"
                autocomplete="tel"
                maxlength="14"
                class="form-control"
                v-phone
                pattern="[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}"
                required
              />
            </div>
          </div>

          <fieldset class="form-group r">
            <div class="row">
              <legend class="col-form-label col-sm-6 pt-0">Вы хотите*</legend>
              <div class="col-sm-6">
                <div class="form-check form-check-inline">
                  <div class="chiller_cb">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="gridRadios"
                      id="gridRadios1"
                      value="Продать"
                      v-model="post.type"
                    />
                    <label class="form-check-label" for="gridRadios1">
                      Продать
                    </label>
                    <span></span>
                  </div>
                </div>
                <div class="form-check form-check-inline">
                  <div class="chiller_cb">
                    <input
                      class="form-check-input"
                      type="radio"
                      name="gridRadios"
                      id="gridRadios2"
                      value="Купить"
                      v-model="post.type"
                    />
                    <label class="form-check-label" for="gridRadios2">
                      Купить
                    </label>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>

          <div class="form-group row justify-content-start r">
            <label for="nobot" class="col-8 col-md-5 col-form-label"
              >Решите пример: {{ antibotNum[antibot1] }} +
              {{ antibotNum[antibot2] }}= (ответ напишите цифрой)*</label
            >
            <div class="col-4 col-md-2">
              <input
                v-model="post.nobot"
                ref="input_nobot"
                type="text"
                class="form-control"
                id="nobot"
              />
            </div>
          </div>

          <div class="custom-file form-group">
            <input
              type="file"
              name="image"
              @change="uploadFile"
              class="custom-file-input"
              id="customFile"
              lang="ru"
            />
            <div
              class="progress-bar"
              role="progressbar"
              :style="{ width: fileProgress + '%' }"
            >
              {{ fileCurrent }}%
            </div>
            <label
              class="custom-file-label"
              for="customFile"
              data-browse="Выбрать фото"
              >Загрузить фото</label
            >
            <div class="pb-4" v-if="filesFinish">
              Загружено фото: {{ filesFinish }}
              <br />
            </div>
          </div>

          <div class="form-group">
            <label for="site">Сайт</label>
            <input
              v-model="post.site"
              type="text"
              class="form-control"
              id="site"
            />
          </div>

          <div class="form-group">
            <label for="mail">E-mail</label>
            <input
              v-model="post.mail"
              type="text"
              class="form-control"
              id="mail"
            />
          </div>

          <div class="form-group">
            <label for="person">Организация или ФИО</label>
            <input
              v-model="post.person"
              type="text"
              class="form-control"
              id="person"
            />
          </div>

          <button type="submit" class="btn btn-dark">Опубликовать</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from "vuex";

export default {
  async fetch({ store, params }) {
    // console.log("pageeeee", params.page);
    await store.dispatch("item/fetch", params.page);
  },

  data: () => ({
    showModal: false,
    diametrs: [
      57,
      73,
      76,
      89,
      108,
      114,
      142,
      146,
      159,
      219,
      245,
      273,
      300,
      325,
      377,
      426,
      530,
      630,
      720,
      820,
      920,
      1020,
      1220,
      1420,
    ],
    check: {
      type: "",
      diametr: [],
      page: 0,
    },
    TempCheck: {
      type: "",
      diametr: [],
      page: "",
    },
    posts: [],
    diam: ["22", "273"],
    nextPageNum: "",
    currentPage: 1,
    allPage: "",
    allOffers: [],
    page: "",
    status: 0,
    url: "",
    postsEmpty: "",
    info: [],
    minChars: 85,
    validationErrors: "",
    statusAdd: "",
    numRandom1: 0,
    numRandom2: 0,
    antibotSum: "",
    postsEmpty: "",
    antibotNum: [
      "Ноль",
      "Один",
      "Два",
      "Три",
      "Четыре",
      "Пять",
      "Шесть",
      "Семь",
      "Восемь",
      "Девять",
      "Десять",
    ],
    noboterror: "",
    post: {
      id: "",
      message: "",
      city: "",
      tel: "",
      site: "",
      mail: "",
      person: "",
      date: "",
      nobot: "",
      type: "Продать",
    },
    phone: "",
    edit: false,
    filesOrder: [],
    filesFinish: "",
    fileProgress: 0,
    fileCurrent: "",
    imgName: false,
    img_toggle: true,
    offerList: [],
    favorite: "",
    show_btn_fav: false,
  }),

  mounted() {
    // console.log(this.$route.query);
    //this.currentPage = Number.parseInt(this.$route.params.page);
    // console.log("all----", this.offers_voex);
    this.create_fav_list();
  },

  methods: {
    ...mapActions({
      actOffers_filter: "item/offers_filter",
    }),
    async getoffers_vuex(page) {
      const _Check = Object.assign({}, this.check);
      _Check.page = page;
      // console.log("workin vuexxxxxx");
      this.status = 1;
      await this.actOffers_filter(_Check);
    },

    nextPage() {
      this.info = [];
      // console.log("lasttttt", this.offers_voex.last_page);
      if (this.offers_voex.current_page == this.offers_voex.last_page) return;
      if (this.status == 0) {
        this.nextPageNum = this.currentPage + 1;
        // console.log("page====", this.nextPageNum);
        this.$router.push("/offers/" + this.nextPageNum);
      } else {
        // this.getoffers_vuex(this.offers_voex.current_page);
        // console.log("Next");
        this.getoffers_vuex(this.offers_voex.current_page);
      }
    },

    previousPage() {
      this.info = [];
      if (this.offers_voex.current_page == 1) return;
      if (this.status == 0) {
        let previousePageNum = this.currentPage - 1;
        this.$router.push("/offers/" + previousePageNum);
      } else {
        this.getoffers_vuex(this.offers_voex.current_page - 2);
      }
    },

    fullMessage(ind) {
      this.info[ind] = !this.info[ind];
      this.toggle({
        id: ind,
        minChars: this.minChars,
        info: this.info[ind],
      });
    },

    ...mapMutations({
      toggle: "item/fullmessageMut",
    }),

    imgFunc(ind) {
      return this.offers_voex.data[ind].type == "Продать"
        ? "sell.png"
        : "buy.png";
    },
    addPost() {
      this.statusAdd = "";
      this.validationErrors = "";
      if (this.post.nobot != this.numRandom1 + this.numRandom2) {
        this.noboterror = "Вы неправильно решили пример";
        this.$scrollTo("#add_error");
        this.$refs["input_nobot"].focus();
        return;
      } else {
        this.noboterror = "";
      }
      // console.log("antibot", this.post.nobot);
      if (this.edit === false) {
        // Добавление поста

        this.$axios
          .post("posts", {
            message: this.post.message,
            city: this.post.city,
            tel: "+7" + this.phone,
            site: this.post.site,
            mail: this.post.mail,
            type: this.post.type,

            photo: this.imgName || "",
            person: this.post.person,
          })

          .then((response) => {
            this.post.message = "";
            this.post.tel = "";
            this.post.city = "";
            this.post.site = "";
            this.post.type = "";

            //this.getPosts(null, this.status);

            this.statusAdd = response.status;
            // console.log("Servser", response);
          })
          // .catch((response) => {
          //  // console.log("Servser", response.data);
          //   if (error.response.status === 422) {
          //     this.validationErrors = error.response.data.errors;
          //
          //   }
          // })
          .catch((e) => {
            // console.log("Error Response", e.response.data.errors);

            this.validationErrors = e.response.data.errors;
            this.$scrollTo("#add_error");
          })

          .finally(() => {
            this.$scrollTo("#add_success");
          });
      }
    },

    uploadFile() {
      let form = new FormData();

      let fileArr = Array.from(event.target.files);
      let file = fileArr[0];

      if (!(file.type == "image/jpeg" || file.type == "image/png")) {
        alert("Выбранный фаил не является картинкой");
        return;
      }

      form.append("image", file);

      this.$axios
        .post("imageupload", form, {
          onUploadProgress: (itemUpload) => {
            this.fileProgress = Math.round(
              (itemUpload.loaded / itemUpload.total) * 100
            );
            this.fileCurrent = "Загружено: " + this.fileProgress;
          },
        })
        .then((response) => {
          this.fileProgress = 0;
          this.fileCurrent = "";
          this.filesFinish = file.name;
          this.filesOrder.splice(file, 1);
          this.imgName = response.data;
          // console.log(response);
        })

        .catch((error) => {
          if (error.response.status === 422) {
            this.validationErrors = error.response.data.errors;
          }
        });
    },

    ...mapMutations({
      add_favOffers: "favorite/setFavOffers",
    }),

    add_in_offerList(ind) {
     // this.offerList.push(this.offers_voex.data[ind]);
      this.show_btn_fav=true;
      //localStorage.favorite=JSON.stringify(this.offerList);
      
      if (localStorage.favorite) {
        let temp = new Array();
        temp = JSON.parse(localStorage.favorite);
        // console.log("1111111", temp,this.offers_voex.data[ind]);
        temp.push(this.offers_voex.data[ind]);

        // this.offerList.forEach(element =>
        //      {
        //           temp.push(element);
        //      });

        function getUnique(arr) {
          var i = 0,
            current,
            length = arr.length,
            unique = [],
            unique_arr = [];

          for (; i < length; i++) {
            current = arr[i].id;
            if (unique.length < 1) {
              unique_arr.push(arr[i].id);
              unique.push(arr[i]);
            } else {
              if (unique_arr.indexOf(current) == -1) {
                unique_arr.push(arr[i].id);
                unique.push(arr[i]);
              }
            }
          }
          return unique;
        }
        // console.log("выведем иф",getUnique(temp))
        this.add_favOffers(getUnique(temp));
        localStorage.favorite = JSON.stringify(getUnique(temp));
      } else {
        let arr_for_push=[];
           arr_for_push.push(this.offers_voex.data[ind]);
        this.add_favOffers(arr_for_push);
        localStorage.favorite = JSON.stringify(arr_for_push);
      }

      this.favorite = localStorage.favorite;

      //a.push.apply(a, b)
    },

    create_fav_list(){

         if (localStorage.favorite) {
      this.add_favOffers(JSON.parse(localStorage.favorite));
      this.show_btn_fav=true;

    }


    }
  },

  computed: {
    offers_voex() {
      return this.$store.getters["item/offers"];
    },
    antibot1() {
      this.numRandom1 = Math.floor(Math.random() * 10) + 1;
      return this.numRandom1;
    },
    antibot2() {
      this.numRandom2 = Math.floor(Math.random() * 10) + 1;
      return this.numRandom2;
    },

    antibotSumFunc() {
      this.antibotSum = antibot1() + antibot2();
    },

    // favorite_comp(){
    //   return localStorage.favorite;
    // }
  },
  directives: {
    phone: {
      bind(el) {
        el.oninput = function (e) {
          if (!e.isTrusted) {
            return;
          }

          const x = this.value
            .replace(/\D/g, "")
            .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
          this.value = !x[2]
            ? x[1]
            : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
          el.dispatchEvent(new Event("input"));
        };
      },
    },
  },

  watch: {
    "$route.query.url": {
      handler(oldUrl, newUrl) {
        // console.log("Работает");
        window.location.reload(true);
        // fetch data for this PID from the server.
        // ...
      },
    },

    check: {
      handler(val) {
        // Переменная которая плюсует если есть выбранный диаметр или тип сделки
        let statusEmpty = 0;

        for (let key in val) {
          if (val[key].length > 0) {
            statusEmpty += 1;
          }
          // alert( "Ключ: " + key + " значение: " + val[key].length );
        }

        if (statusEmpty > 0) {
          //   this.url = "";
          //   let count = 1;

          //   val.diametr.forEach((element) => {
          //     if (count == 1) {
          //       this.url += "?diametr" + count + "=" + element;
          //       count += 1;
          //     }
          //     else{
          //       this.url += "&diametr" + count + "=" + element;
          //       count += 1;
          //     }
          //   });
          // console.log("ferst check", this.check.diametr);

          this.getoffers_vuex(0);
          // this.getOffers();
        } else {
          // this.$router.push("/offers/1?uuu");
          this.$router.push({ path: `/offers/1?url=9` });
        }
        // console.log("=======", this.url);
        //this.$router.push("/offers/7"+this.url);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Nunito&family=Russo+One&display=swap");

@import url("https://fonts.googleapis.com/css2?family=Russo+One&display=swap");

%tableInfo {
  font-size: 0, 5rem;
  color: #fff;
}

.hidden {
  display: none;
}
.nunito {
  font-family: "Nunito";
}
.table_mes {
  background: #212529;
  border: 1px solid #454d55;
  font-family: "Nunito";
  color: #fff;
  padding: 0.5rem;
}

.message {
  @extend %tableInfo;
}

.city {
  @extend %tableInfo;
}

.func {
  color: #fff;
  background: rgb(36, 36, 35);
  border: 1px solid rgb(163, 160, 160);
}

.id {
  color: #fff;
  background: rgb(36, 36, 35);
  border: 1px solid rgb(163, 160, 160);
}

.span_pseudo,
.chiller_cb span:before,
.chiller_cb span:after {
  content: "";
  display: inline-block;
  background: #fff;
  width: 0;
  height: 0.2rem;
  position: absolute;
  transform-origin: 0% 0%;
}

.chiller_cb {
  position: relative;
  height: 2rem;
  display: flex;
  align-items: center;
}
.chiller_cb input {
  display: none;
}
.chiller_cb input:checked ~ span {
  background: #fd2727;
  border-color: #fd2727;
}
.chiller_cb input:checked ~ span:before {
  width: 1rem;
  height: 0.15rem;
  transition: width 0.1s;
  transition-delay: 0.3s;
}
.chiller_cb input:checked ~ span:after {
  width: 0.4rem;
  height: 0.15rem;
  transition: width 0.1s;
  transition-delay: 0.2s;
}
.chiller_cb input:disabled ~ span {
  background: #ececec;
  border-color: #dcdcdc;
}
.chiller_cb input:disabled ~ label {
  color: #dcdcdc;
}
.chiller_cb input:disabled ~ label:hover {
  cursor: default;
}
.chiller_cb label {
  padding-left: 2rem;
  position: relative;
  z-index: 2;
  cursor: pointer;
  margin-bottom: 0;
}
.chiller_cb span {
  display: inline-block;
  width: 1.2rem;
  height: 1.2rem;
  border: 2px solid #ccc;
  position: absolute;
  left: 0;
  transition: all 0.2s;
  z-index: 1;
  box-sizing: content-box;
}
.chiller_cb span:before {
  transform: rotate(-55deg);
  top: 1rem;
  left: 0.37rem;
}
.chiller_cb span:after {
  transform: rotate(35deg);
  bottom: 0.35rem;
  left: 0.2rem;
}

.checked_diametr_span {
  background: rgb(253, 253, 252);
  color: #fd2727;
  font-size: 1rem;
  font-weight: bold;
  text-shadow: 1px 1px 0px rgb(255, 255, 255);
}

.dop {
  color: #fff;
  font-size: 0.8rem;
  font-weight: bold;
}

.dopTel {
  color: #000;
  font-size: 0.8rem;
  font-weight: bold;
}

.r {
  color: #fd2727;
}

.r_find {
  background-color: chocolate;
  color: #fcfafa;
  font-weight: 700;
}

.bg-blue {
  background: #292d57;
}

h1 {
}

.opacity {
  opacity: 1;
}
.opacity:hover {
  opacity: 0.8;
}

.capture {
  font-family: "Russo One", sans-serif;
  letter-spacing: 5px;
  padding-left: 60px;
  font-size: 14px;
  margin-top: 1px;
}

.logo {
  // width:340px;
  color: #000;

  font-family: "Russo One", sans-serif;

  font-size: 14px;
  margin-top: 1px;
}

  .basket{
    
    position: fixed;
    right:5px;
    top: 5px;
  
    z-index: 100;
    
  }
</style>