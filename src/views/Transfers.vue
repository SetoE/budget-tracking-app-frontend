<template>
    <PageComponent>
        <template v-slot:header>
            <div class="flex justify-between items-center">
                <h1 class="text-3xl font-bold tracking-tight text-gray-900">Transfers</h1>
                <router-link :to="{ name: 'TransactionCreate' }"
                    class="py-2 px-3 text-white bg-emerald-500 rounded-md hover:bg-emerald-600 flex justify-between items-center">
                    <PlusIcon class="h-5 w-5 text-white"></PlusIcon>
                    Add new Transfers
                </router-link>
            </div>
        </template>
    </PageComponent>
</template>