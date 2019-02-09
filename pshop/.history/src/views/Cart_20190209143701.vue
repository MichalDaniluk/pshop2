
<template>
<div id="cartoptions">

    <h1>Twój koszyk</h1>
    <h3>Zalogowany: </h3>
    <p>Masz w koszyku <span>{{ this.$store.getters.cartcount }}</span> produkty</p>

    <div class="row">
        <div class="col-9">

        <div  v-if="this.$store.state.cart.length > 0">
            <table class="table table-bordered">
                <tr>
                    <th>Obrazek</th>
                    <th>Product name</th>
                    <th>Ilość</th>
                    <th>Cena netto</th>
                    <th>Cena brutto</th>
                    <th>Vat</th>
                    <th>Miara</th>
                    <th>Opcje</th>
                </tr>
                <tr v-for="(product, index) in this.$store.state.cart" :key="product.id">
                    <td class="text-center"><img class="w-25" :src="'/images/products/' + product[index].image"></td>
                    <td>{{ product[index].name }}</td>
                    <td class="text-center"><input type="text" name="count" v-model="product.quantity" class="text-center w-50" v-on:change="poprawIlosc(product.id, product.quantity)"></td>
                    <td>{{ product[index].price }} zł</td>
                    <td>{{ product[index].priceGross }} zł</td>
                    <td>{{ product[index].tax }}</td>
                    <td>{{ product[index].unit }}</td>
                    <td><span @click="remove(index)" class="btn btn-danger" >usuń</span></td>
                </tr>

            </table>
        </div>
        <p v-else>Brak pozycji w koszyku</p>

        <div class="row">
            <div class="col">
                <span class="btn btn-danger" @click="clear">usuń wszytko</span>
            </div>
        </div>
    </div>
    <div class="col-3">

        <div class="row">
            <div class="col">

                <p class="cart-form">1. Forma płatności</p>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="gotowka">
                    <label class="form-check-label" for="gotowka">gotówka</label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="przelew" checked="checked">
                    <label class="form-check-label" for="przelew">przedpłata przelewem</label>
                </div>

            </div>
        </div>

        <div class="row">
            <div class="col">
                <p class="cart-form">2. Forma transportu</p>

                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="wlasny">
                    <label class="form-check-label" for="gotowka">Odbiór własny w siedzibie firmy (+0 zł)</label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="warszawa">
                    <label class="form-check-label" for="gotowka">Wysyłka na terenie Warszawy transportem własnym (+25 zł)</label>
                </div>

                <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="kurier">
                    <label class="form-check-label" for="gotowka">Wysyłka kurierem DPD (+25 zł)</label>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <p class="cart-form">3. Podsumowanie</p>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <div class="row">
                    <div class="col">Kwota całkowita</div>
                    <div class="col">{{ this.$store.getters.cartcount }} zł</div>
                </div>
                <div class="row">
                    <div class="col">Wysyłka</div>
                    <div class="col">25,00 zł</div>
                </div>
                <div class="row">
                    <div class="col">Suma</div>
                    <div class="col" v-if="this.$store.getters.cartvalue > 0 ">{{ this.$store.getters.cartvalue + 25 }} zł</div>
                    <div class="col" v-else>0 zł</div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col">
                <a class="btn btn-warning btn-block" href="/">kupuj dalej</a>
                <a class="btn btn-warning btn-block" href="/order/add">zamów</a>
            </div>
        </div>
    </div>

    </div>
</div>
</template>

<script>

export default {

    name: 'cart',
    data() {
        return {

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
        poprawIlosc: function(id, count)
        {

        }
    }
}

</script>