export const state = () => ({
    fav_offers: [],
  })


  export const getters = {
    fav_offers: s => s.fav_offers
  }


  export const mutations = {
    setFavOffers(state, fav_offers) {
        console.log("fav=====",fav_offers);
      state.fav_offers = fav_offers;

    }

  
  }