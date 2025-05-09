import api from './api';

export default {
  getOffers() {
    return api.get('/offers');
  },

  setOffer(offer) {
    return api.post('/offers', offer);
  },

  updateOffer(offer) {
    return api.put(`/offers/${offer.id}`, offer);
  },

  deleteOffer(offerId) {
    return api.delete(`/offers/${offerId}`);
  },
};
