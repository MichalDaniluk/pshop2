
<template>
<div id="cartoptions">
params: {{ this.$route.params.id }}
    <h1>Twój koszyk</h1>
    <h3>Zalogowany: </h3>
    <p>Masz w koszyku <span>{{ lista.length }}</span> produkty</p>

    <div class="row">
        <div class="col-9">

        <div  v-if="lista !== null">
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
                <tr v-for="product in lista" :key="product.id">
                    <td class="text-center"><img class="w-25" v-bind:src="'/images/products/' + product.image"></td>
                    <td>{{ product.name }}</td>
                    <td class="text-center"><input type="text" name="count" v-model="product.count" class="text-center w-50" v-on:change="poprawIlosc(product.id, product.count)"></td>
                    <td>{{ product.price }} zł</td>
                    <td>{{ product.priceGross }} zł</td>
                    <td>{{ product.tax }}</td>
                    <td>{{ product.unit }}</td>
                    <td><span v-on:click="remove(product.id)" class="btn btn-danger" >usuń</span></td>
                </tr>

            </table>
        </div>
        <p v-else>Brak pozycji w koszyku</p>



        <div class="row">
            <div class="col">
                <span class="btn btn-danger" v-on:click="clear">usuń wszytko</span>
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
                    <div class="col">{{ showCartValue }} zł</div>
                </div>
                <div class="row">
                    <div class="col">Wysyłka</div>
                    <div class="col">25,00 zł</div>
                </div>
                <div class="row">
                    <div class="col">Suma</div>
                    <div class="col" v-if="cartvalue > 0 ">{{ cartvalue + 25 }} zł</div>
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
            lista: []
        }
    },
    mounted() {
        this.getList();

        axios.get(`${this.$store.state.api}/cart/value`)
        .then(function(response){
            this.$store.state.cart.value = response.data.lista;
        });

    },
    computed: {
        showCartValue: function()
        {
            return this.cartvalue
        }
    },
    methods:{
        getList: function() {
            axios.get(`${this.$store.state.api}/cart/get`)
            .then(function(response)
            {
                if( response.data.lista )
                {
                    this.lista = response.data.lista;
                }
            });
        },

        clear: function(){
            axios.get(`${this.$store.state.api}/cart/clear`)
            .then(function(response)
            {
                this.lista = response.data.lista;
                this.$store.state.value = 0;

                axios.get(`${this.$store.state.api}/cart/get`)
                .then(function(response)
                {
                    if( response.data.lista )
                    {
                        this.lista = response.data.lista;
                        this.$store.state.cart.count = response.data.lista.lenght;
                    }
                });

            });
        },
        remove: function(id){
            axios.get(`${this.$store.state.api}/cart/remove/${id}`)
            .then(function(response){
                options.lista = response.data.lista;

                axios.get(`${this.$store.state.api}/cart/get`)
                .then(function(response)
                {
                    if( response.data.lista )
                    {
                        this.$store.state.cart.count = response.data.lista.lenght;
                    }
                });

            });
        },
        poprawIlosc: function(id, count)
        {
            axios.get(`${this.$store.state.api}/cart/add/${id}/${count}`)
            .then(function(response)
            {

                axios.get(`${this.$store.state.api}/cart/value`)
                .then(function(response)
                {
                    if( response.data.lista )
                    {
                        this.$store.state.cart.value = response.data.lista;
                    }
                });

                axios.get(`${this.$store.state.api}/cart/get`)
                .then(function(response)
                {
                    if( response.data.lista )
                    {
                        this.lista = response.data.lista;
                        this.$store.state.cart.count = response.data.lista.lenght;
                    }
                });
            });
        }
    }
}

</script>