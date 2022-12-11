import { createStore } from 'vuex';

const store = createStore({
  state: {
    user: {
      data: {
        name: 'Seto Sato',
        email: 'tom@example.com',
        imageUrl:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      token: 123,
    }
  },
  getters: {},
  actions: {},
  mutations: {},
  modules: {},
});

export default store;