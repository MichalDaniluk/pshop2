<template>

<div>
    <div class="text-center mb-2 border-bottom">
        <img class="w-50 pb-2" :src="`/images/products/${item.image}`" :alt="item.name">
    </div>
    <div v-html="item.name" class="border-bottom h6">
        {{ item.name }}
    </div>
    <div class="h5">
        {{ item.price }} <span class="h7">zł / {{ item.unit }}</span>
    </div>
    <button v-on:click="$emit('AddToCart', item, 1 )" class="btn btn-primary w-100">
        dodaj do koszyka
    </button>
    <router-link :to="{name:'product', params: {id: item.id} }" class="btn btn-warning w-100">
        zobacz więcej
    </router-link>
</div>

</template>

<script>
import Axios from 'axios'
export default {
    name: 'product-box',
    props: {
        title: {
            type:String,
            required: true
        },
        item: {
            type:Object,
            required: true
        }
    },
    methods: {

    }
}
</script>