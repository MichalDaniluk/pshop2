<template>
  <div id="start" class="col-md-12">

    <div class="row mt-2 border-bottom mb-2"><h2>Bestsellery</h2></div>
    <div class="row">
        <div class="col-md-2 col-xs-12"  v-for="item in bestsellers" :key="item.id">
            <ProductBox :item="item" @addedToCard="addToCard"></ProductBox>
        </div>
    </div>

    <div class="row mt-5 border-bottom mb-2"><h2>Promocje</h2></div>
    <div class="row">
        <div class="col-md-2 col-xs-12"  v-for="item in promotions" :key="item.id">
            <ProductBox v-bind:item="item" @addedToCard="addToCard"></ProductBox>
        </div>
    </div>

    <div class="row mt-5 border-bottom mb-2"><h2>Najlepsze ceny</h2></div>
    <div class="row">
        <div class="col-md-2 col-xs-12"  v-for="item in bestprices" :key="item.id">
            <ProductBox v-bind:item="item" @addedToCard="addToCard"></ProductBox>
        </div>
    </div>

    <div class="row mt-5 border-bottom mb-2"><h2>Produkty innowacyjne</h2></div>
    <div class="row">
        <div class="col-md-2 col-xs-12"  v-for="item in innovatives" :key="item.id">
            <ProductBox v-bind:item="item" @addedToCard="addToCard"></ProductBox>
        </div>
    </div>

    <div class="row mt-5 border-bottom mb-2"><h2>Wyprzedaż</h2></div>
    <div class="row">
        <div class="col-md-2 col-xs-12" v-for="item in sales" :key="item.id">
            <ProductBox v-bind:item="item" @addedToCard="addToCard"></ProductBox>
        </div>
    </div>

</div>
</template>

<script>

import ProductBox from '../components/ProductBox'
import Axios from 'axios'

export default {
    name: 'product-box',
    data() {
      return {
        bestsellers: [],
        promotions: [],
        bestprices: [],
        innovatives: [],
        sales: []
      }
    },
    components: {
      ProductBox
    },
    mounted() {
        this.getBestsellers();
        this.getPromotions();
        this.getPrices();
        this.getInnovatives();
        this.getSales();
    },
    methods: {
        addToCard(item, count) {
            let element = {item,count}
            this.$store.state.card.items.push( element );
        },
        getBestsellers: function() {
            Axios.get(`${this.$store.state.api}/products/bestsellers`)
            .then((response) =>  { this.bestsellers = response.data.lista });
        },
        getPromotions: function() {
            Axios.get(`${this.$store.state.api}/products/promotion`)
            .then((response) =>  { this.promotions = response.data.lista });
        },
        getPrices: function() {
            Axios.get(`${this.$store.state.api}/products/bestprice`)
            .then((response) =>  { this.bestprices = response.data.lista });
        },
        getInnovatives: function() {
            Axios.get(`${this.$store.state.api}/products/innovative`)
            .then((response) =>  { this.innovatives = response.data.lista });
        },
        getSales: function() {
            Axios.get(`${this.$store.state.api}/products/sale`)
            .then((response) =>  { this.sales = response.data.lista });
        }
    }

}

</script>