
<template>
<div id="cartoptions">

    <h1>Twój koszyk</h1>
    <h3>Zalogowany: </h3>
    <p>Masz w koszyku <span>{{ this.$store.getters.cartcount }}</span> produkty</p>

    <div class="row">
        <div class="col-9">

        <cartList cart="this.$store.cart"></cartList>

        <p v-else>Brak pozycji w koszyku</p>

        <div class="row">
            <div class="col">
                <span class="btn btn-danger" @click="clear">usuń wszytko</span>
            </div>
        </div>
    </div>
    <div class="col-3">

        <div class="row">
            <div class="col text-left">

                <h2 class="cart-form">Forma płatności</h2>
                <div class="form-check">
                    <input class="form-check-input" type="radio" value="gotowka" v-model="platnosc">
                    <label class="form-check-label" for="gotowka">gotówka</label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="radio" value="przelew" v-model="platnosc">
                    <label class="form-check-label" for="przelew">przedpłata przelewem</label>
                </div>

            </div>
        </div>

        <div class="row">
            <div class="col text-left mt-5">
                <h2 class="cart-form">Forma transportu</h2>

                <div class="form-check">
                    <input class="form-check-input" type="radio" value="wlasny" v-model="transport">
                    <label class="form-check-label" for="gotowka">Odbiór własny w siedzibie firmy (+0 zł)</label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="radio" value="warszawa" v-model="transport">
                    <label class="form-check-label" for="gotowka">Wysyłka na terenie Warszawy transportem własnym (+25 zł)</label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="radio" value="kurier" v-model="transport">
                    <label class="form-check-label" for="gotowka">Wysyłka kurierem DPD (+25 zł)</label>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col mt-5 text-left">
                <h2 class="cart-form">Podsumowanie</h2>
            </div>
        </div>

        <div class="row">
            <div class="col text-left">
                <div class="row">
                    <div class="col">Kwota całkowita</div>
                    <div class="col">{{ this.$store.getters.cartvalue }} zł</div>
                </div>
                <div class="row">
                    <div class="col">Wysyłka</div>
                    <div class="col">{{ prowizja }} zł</div>
                </div>
                <div class="row">
                    <div class="col">Suma</div>
                    <div class="col" v-if="this.$store.getters.cartvalue > 0">{{ this.$store.getters.cartvalue + prowizja }} zł</div>
                    <div class="col" v-else>0 zł</div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col mt-5">
                <a class="btn btn-warning btn-block" href="/">kupuj dalej</a>
                <a class="btn btn-warning btn-block" href="/order/add">zamów</a>
            </div>
        </div>
    </div>

    </div>
</div>
</template>

<script>
import cartList from '../components/CartList.vue'
export default {

    name: 'cart',
    data() {
        return {
            domain: this.$store.state.domain,
            platnosc:'przelew',
            transport:"wlasny",
            quantity:1
        }
    },
    computed: {
        prowizja() {
            return this.transport == 'kurier' || this.transport == 'warszawa' ? 25 : 0;
        }
    },
    methods:{
        clear() {
            this.$store.dispatch('clearCart')
        },
        remove: function(index) {
            this.$store.dispatch('removeFromCart', {
                index
            })
        },
        changeQuantity: function(index, quantity)
        {
            this.quantity = quantity;
            this.$store.dispatch('changeQuantity', {
                    index,
                    quantity
            })
        }
    }
}

</script>