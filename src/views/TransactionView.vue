<template>
  <PageComponent>
    <template v-slot:header>
      <div class="flex items-center justify-between">
        <h1 class="text-3xl font-bold text-gray-900">{{ model.id ? model.description : "Create a Transaction" }}</h1>
      </div>
    </template>

    <form @submit.prevent="saveTransaction">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6 grid grid-cols-6 gap-3">
          <!-- Description -->
          <div class="col-span-6 grid grid-cols-5">
            <div class="col-span-2">
              <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
            </div>
            <div class="col-span-3">
              <textarea id="description" name="description" rows="3" v-model="model.description"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Description..."></textarea>
            </div>
          </div>
          <!--/ Description  -->

          <!-- Amount -->
          <div class="col-span-6 grid grid-cols-5">
            <div class="col-span-2">
              <label for="amount" class="block text-sm font-medium text-gray-700">Amount</label>
            </div>

            <div class="col-span-3">
              <input type="text" name="amount" id="amount" autocomplete="amount" v-model="model.amount"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="0.00">
            </div>
          </div>
          <!--/ Amount -->

          <!-- Status -->
          <div class="col-span-6 grid grid-cols-5">
            <div class="col-span-2">
              <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
            </div>
            <div class="col-span-3">
              <select id="status" name="status" autocomplete="status" v-model="model.status"
                class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                <option>Unpaid</option>
                <option>Paid</option>
                <option>Partially Paid</option>
              </select>
            </div>
          </div>
          <!--/ Status -->

          <!-- Payee_Payor -->
          <div class="col-span-6 grid grid-cols-5">
            <div class="col-span-2">
              <label for="payor_payee" class="block text-sm font-medium text-gray-700">Payor/Payee</label>
            </div>

            <div class="col-span-3">
              <input type="text" name="payor_payee" id="payor_payee" autocomplete="payor_payee"
                v-model="model.payee_payor"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="John Doe...">
            </div>
          </div>
          <!--/ Payee_Payor -->

          <!-- Category -->
          <div class="col-span-6 grid grid-cols-5">
            <div class="col-span-2">
              <label for="category" class="block text-sm font-medium text-gray-700">Category</label>
            </div>
            <div class="col-span-3">
              <select id="category" name="category" autocomplete="category" v-model="model.category_id"
                class="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
                <option disabled>Choose category</option>
                <option>Home Maintenance</option>
                <option>Mortgage</option>
                <option>Loans</option>
              </select>
            </div>
          </div>
          <!--/ Category -->

          <!-- Date -->
          <div class="col-span-6 grid grid-cols-5">
            <div class="col-span-2">
              <label for="date" class="block text-sm font-medium text-gray-700">Date</label>
            </div>
            <div class="col-span-3">
              <input type="date" name="date" id="date" autocomplete="date" v-model="model.date"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            </div>
          </div>
          <!--/ Date -->

          <!-- Time -->
          <div class="col-span-6 grid grid-cols-5">
            <div class="col-span-2">
              <label for="time" class="block text-sm font-medium text-gray-700">Time</label>
            </div>
            <div class="col-span-3">
              <input type="time" name="time" id="time" autocomplete="time" v-model="model.time"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
            </div>
          </div>
          <!--/ Time -->

          <!--/ Transfer Record -->
          <div class="col-span-6 grid grid-cols-5" v-if="!model.id">
            <div class="col-span-2 grid grid-cols-1">
              <label for="time" class="block text-sm font-medium text-gray-700">Add a transfer record</label>
              <small class="block text-sm font-light text-gray-700">If a multi
                transaction transfer, create a new transfer instead</small>
            </div>
            <div class="col-span-3">
              <Switch v-model="model.add_transfer" :class="model.add_transfer ? 'bg-blue-600' : 'bg-gray-200'"
                class="relative inline-flex h-6 w-11 items-center rounded-full">
                <span class="sr-only">Enable notifications</span>
                <span :class="model.add_transfer ? 'translate-x-6' : 'translate-x-1'"
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition" />
              </Switch>
            </div>
          </div>
          <!--/ Transfer Record  -->

          <!-- Submit -->
          <div class="col-span-6 flex justify-end">
            <button type="submit"
              class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Submit</button>
          </div>
          <!--/ Submit -->
        </div>
      </div>

      <div class="pt-6">
        <div class="shadow sm:rounded-md sm:overflow-hidden">
          <div class="px-4 py-5 bg-white space-y-6 sm:p-6 grid grid-cols-6 gap-3">
            <div class="text-base font-medium text-gray-900" aria-hidden="true">Add a transfer record</div>
          </div>
        </div>
      </div>
    </form>
  </PageComponent>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import PageComponent from '../components/PageComponent.vue';
import store from '../store';

const route = useRoute();

let model = ref({
  // user_id:
  amount: 0,
  description: '',
  status: false,
  payee_payor: '',
  category_id: null,
  date: new Date(),
  time: new Date(),
});

if (route.params.id) {
  model.value = store.state.transactions.find(
    (s) => s.id === parseInt(route.params.id)
  );
}

</script>