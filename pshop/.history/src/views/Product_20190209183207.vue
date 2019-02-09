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
                    <div class="col">
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
                        <input type="text" value="1" class="w-50">
                        <button class="btn btn-warning" @click="addToCart(product.id, 1)"><i class="fas fa-shopping-cart"></i> dodaj do koszyka</button>
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
            id: 0
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
        addToCart: function(p,c)
        {
            this.$store.state.cart.push(p,c)

            // Axios.get(`${this.$store.state.api}/cart/add/${p}/${c}`)
            // .then(function()
            // {
            //     Axios.get(`${this.$store.state.api}/cart/get`)
            //     .then((response) => {
            //             this.$store.state.count = response.data.lista.length;
            //     });

            //     Axios.get(`${this.$store.state.api}/cart/value`)
            //     .then((response) => {
            //             this.$store.state.value = response.data.lista;
            //     });
            // });
        }
    }
}
</script>