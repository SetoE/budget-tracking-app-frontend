<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex justify-between items-center">
        <h1 class="text-3xl font-bold tracking-tight text-gray-900">Transactions</h1>
        <router-link :to="{ name: 'TransactionCreate' }"
          class="py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-600 flex justify-between items-center">
          <PlusIcon class="h-5 w-5 text-white"></PlusIcon>
          Add new Transaction
        </router-link>
      </div>
      <div class="grid grid-cols-1 gap-3 sm:grid-cols-1 md:grid-cols-1">
        <div v-for="transaction in transactions" :key="transaction.id"
          class="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[75px]">
          <div v-html="transaction.description" class="overflow-hidden flex-1"></div>
        </div>
      </div>
    </template>
  </PageComponent>
</template>

<script setup>
import { PlusIcon } from '@heroicons/vue/20/solid'
import PageComponent from '../components/PageComponent.vue';
import { computed } from 'vue';
import store from '../store';

const transactions = computed(() => store.state.transactions);

</script>