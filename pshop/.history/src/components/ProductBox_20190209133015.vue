<template>

<div>
    <div class="text-center mb-2 border-bottom">
        <img class="w-50 pb-2" :src="`${this.$store.state.domain}/images/products/${item.image}`" :alt="item.name">
    </div>
    <div v-html="item.name" class="border-bottom h6">
        {{ item.name }}
    </div>
    <div class="h5">
        {{ item.price }} <span class="h7">zł / {{ item.unit }}</span>
    </div>
    <div class="row">
        <div class="col-md-2">
            <input type="text" name="count" id="count" v-model="count" class="mr-2">
        </div>
        <div class="col-md-10">
            <button @click="AddToCart" class="btn btn-primary w-100">do koszyka</button>
        </div>
    </div>
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
        item: {
            type:Object,
            required: true
        }
    },
    data() {
        return {
            count: 1,
            element: this.item
        }
    },
    methods: {
        AddToCart() {
            this.$store.dispatch('addToCard', {
              element: this.item,
              count: this.count
          })
        }
    }
}
</script>