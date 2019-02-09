<template>
    <div id="prodshow">
        <div class="row" style="margin-top:60px;">
            <div class="col-2 text-center">
                <img :src="`/images/products/${product.image}`" :alt="product.name">
            </div>
            <div class="col-1"></div>
            <div class="col-8">
                <div class="row">
                    <div class="col">
                        <h1 class="product-name">{{ product.name }}</h1>
                    </div>
                </div>
                <div class="row pt-3 pb-3 border-top border-bottom">
                    <div class="col">
                        <span class="product-price">{{ product.price }} PLN netto / {{ product.unit }}</span><br>
                        <span class="product-price-sm">{{ product.priceGross }} PLN brutto / {{ product.unit }}</span>
                    </div>
                    <div class="col">
                        indeks: <span class="font-weight-bold">{{ product.indexNumber }}</span><br>
                        nr katalogowy: <span class="font-weight-bold">{{ product.catalogNumber }}</span><br>
                        producent: <span class="font-weight-bold">{{ product.manufacturer }}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="col" v-html="product.description">
                        {{ product.description }}
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <p>Wybierz interesującą Cię ilość produktów i dodaj je do swojego koszyka</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col">
                        <input type="text" v-model="quantity" class="w-25">
                        <button class="btn btn-warning" @click="addToCart"><i class="fas fa-shopping-cart"></i> dodaj do koszyka</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>

import Axios from 'axios'

export default {
    name: 'Product',
    data() {
        return {
            product: null,
            id: 0,
            quantity:1
        }
    },
    mounted() {
        Axios.get(`${this.$store.state.api}/products/get/${this.id}`)
        .then((response) => {
            this.product = response.data.lista
        })
    },
    created() {
        this.id = this.$route.params.id;
    },

    methods:{
        addToCart()
        {
            let product = {};
            product.item = this.product
            product.quantity = this.quantity;

            this.$store.dispatch('addToCart', {
                product
          })
        }
    }
}
</script>