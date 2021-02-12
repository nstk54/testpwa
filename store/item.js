export const state = () => ({
    offers: [],
  })
  
  export const mutations = {
    setOffers(state, offers) {
      state.offers = offers;
      console.log("index",offers.index)
      if (offers.index==1)
      {
        state.offers=[],
        state.offers = offers;
      }
      else{
        state.offers = offers;
      }

      let count =0;
      console.log("state===",state.offers.data);
      Object.values(state.offers.data).forEach(function(value) {
        
        value.long=value.message;
       // console.log("iteracija",count,"value",value.long)
        value.message=value.message
        .replace(/(<.*br.*>)|(\n)/g, " ")
          .substr(0, 80);
          
          count+=1;
          
        
      }, state.offers.data);

      console.log( ':______');
    },

    fullmessageMut(state,current_offer){

     // state.users.data[change_id.id].message="adasd";
      //console.log("fgdfgdf",state.users.data[2].message);


      if (current_offer.info != true) {
        console.log("iffffff",current_offer.info);

        state.offers.data[current_offer.id].message=state.offers.data[current_offer.id].message
          .replace(/(<.*br.*>)|(\n)/g, " ")
          .substr(0, current_offer.minChars)+' ';
          console.log("fgdfgdf",current_offer.minChars);
          console.log("messsss", state.offers.data[current_offer.id].message);
      } 
      else {
        state.offers.data[current_offer.id].message=state.offers.data[current_offer.id].long+' ';
        console.log("messsss", state.offers.data[current_offer.id].message);
      }



    }
  }
  
  export const actions = {
    async fetch({commit},page=1) {
      // console.log("req++",req)
      const offers = await this.$axios.$get("posts?page="+page)
     // console.log("wwwww",offers);
      offers.index=2;
     
      commit('setOffers', offers)

    },

    async offers_filter({commit},check) {

      //console.log("chec_vuex",page);
      let res="";
      let len="";
     
      let offers = await this.$axios.$post("getoffers", {
        diam: check.diametr,
        type: check.type,
        page: check.page,
      })
      .then((response) => {
       
        console.log("----------",response);
        res=response;
        len=response.length;
      })
      .catch((e) => {
        console.log("Error Response", e);

       
      });

     res.index=1;
     
     
      console.log("yyyyyyy",check)
      commit('setOffers', res)

    },

  }
  
  export const getters = {
    offers: s => s.offers
  }
