import { createStore } from 'vuex';
import axiosClient from '../axios';

const tmpTransactions = [
  {
    id: 100,
    amount: '129.00',
    description: "Spotify subscription",
    status: "Paid",
    payee_payor: 'Spotify',
    category_id: 1,
    date: "2022-12-16",
    time: "16:00:00",
  },
  {
    id: 200,
    amount: '7000.00',
    description: "Car mortgage",
    status: "Paid",
    payee_payor: 'Papa',
    category_id: 2,
    date: "2022-12-15",
    time: "12:00:00",
  },
  {
    id: 300,
    amount: '1500.00',
    description: "Electricity",
    status: "Paid",
    payee_payor: 'Papa',
    category_id: 3,
    date: "2022-12-15",
    time: "08:00:00",
  },
  {
    id: 400,
    amount: '1500.00',
    description: "Internet Bill",
    status: "Paid",
    payee_payor: 'Papa',
    category_id: 3,
    date: "2022-12-15",
    time: "13:00:00",
  },
];

const store = createStore({
  state: {
    user: {
      data: {
      },
      token: sessionStorage.getItem("TOKEN"),
    },
    transactions: [...tmpTransactions],
  },
  getters: {},
  actions: {
    saveTransaction({ commit }, transaction) {
      let response;

      if (transaction.id) {
        response = axiosClient
          .put(`/transaction/${transaction.id}`, transaction)
          .then((res) => {
            commit("updateTransaction", res.data);
            return res;
          });
      } else {
        response = axiosClient.post(`/transaction`, transaction).then((res) => {
          commit("saveTransaction", res.data);
          return res;
        });
      }

      return response;
    },
    register({ commit }, user) {
      return axiosClient.post('/register', user)
        .then(({ data }) => {
          commit('setUser', data);
          return data;
        });
    },
    login({ commit }, user) {
      return axiosClient.post('/login', user)
        .then(({ data }) => {
          commit('setUser', data);
          return data;
        });
    },
    logout({ commit }) {
      return axiosClient.post('/logout')
        .then(response => {
          commit('logout');
          return response;
        });
    },
  },
  mutations: {
    saveTransaction: (state, transaction) => {
      state.transactions = [...state.transactions, transaction.data];
    },
    updateTransaction: (state, transaction) => {
      state.transactions = state.transactions.map((t) => {
        if (t.id == transaction.data.id) {
          return transaction.id;
        }
        return t;
      });
    },
    logout: (state) => {
      state.user.data = {};
      state.user.token = null;
      sessionStorage.removeItem("TOKEN");
    },
    setUser: (state, userData) => {
      state.user.token = userData.token;
      state.user.data = userData.user;
      sessionStorage.setItem("TOKEN", userData.token);
    }
  },
  modules: {},
});

export default store;