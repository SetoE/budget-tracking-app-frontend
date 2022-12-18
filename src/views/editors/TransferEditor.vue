<template>
  <div class="relative rounded-md p-3 hover:bg-gray-100">
    <h3 class="text-sm font-medium leading-5">{{model.name}}</h3>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps({
  transfer: Object,
  index: Number,
});

const emit = defineEmits(["change", "addTransfer", "deleteTransfer"]);

const model = ref(JSON.parse(JSON.stringify(props.transfer)));
</script>
