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
    </template>

    <div class="grid grid-cols-1 gap-3 sm:grid-cols-1 md:grid-cols-1 container mx-auto">
      <div v-for="transaction in transactions" :key="transaction.id"
        class="flex py-4 px-6 shadow-md bg-white hover:bg-gray-50 h-[75px] justify-between items-center">
        <!-- <div v-html=""></div> -->
        <div>
          <h4 class="font-bold">{{ transaction.description }}</h4>
          <h5 class="font-light">{{ transaction.payee_payor }}</h5>
        </div>
        <div class="flex justify-end items-center">
          <h4 class="font-bold">{{ transaction.amount }}</h4>

          <Menu as="div" class="relative ml-3">
            <div>
              <MenuButton
                class="flex max-w-xs items-center text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <EllipsisVerticalIcon class="h-5 w-5 cursor-pointer">
                </EllipsisVerticalIcon>
              </MenuButton>
            </div>
            <transition enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95">
              <MenuItems
                class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <MenuItem>
                <router-link :to="{ name: 'TransactionView', params: { id: transaction.id } }"
                  class="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-300">
                  Edit
                </router-link>
                </MenuItem>
                <MenuItem>
                <a v-if="transaction.id" type="button" @click="deleteTransaction(transaction)"
                  class="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-300">
                  Delete
                </a>
                </MenuItem>
              </MenuItems>
            </transition>
          </Menu>
        </div>
      </div>
    </div>
  </PageComponent>
</template>

<script setup>
import { PlusIcon, EllipsisVerticalIcon } from '@heroicons/vue/20/solid'
import { Menu, MenuItem, MenuItems, MenuButton } from '@headlessui/vue';
import PageComponent from '../components/PageComponent.vue';
import { computed } from 'vue';
import store from '../store';

const transactions = computed(() => store.state.transactions);

function deleteTransaction(transaction) {
  if (confirm(`Are you sure you want to delete this transaction? Operation can't be undone!`)) {
    console.log(`Deleted ${transaction.id}`);
  }
}
</script>