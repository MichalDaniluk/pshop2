<template>
    <div>
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
                    <td class="text-center"><img class="w-25" :src="`${domain}/images/products/${JSON.parse(product).item.image}`"></td>
                    <td>{{ JSON.parse(product).item.name }}</td>
                    <td class="text-center"><input type="text" name="count" v-bind:value="JSON.parse(product).quantity" class="text-center w-50" @keyup="changeQuantity(index,quantity)"></td>
                    <td>{{ JSON.parse(product).item.price }} zł</td>
                    <td>{{ JSON.parse(product).item.gross }} zł</td>
                    <td>{{ JSON.parse(product).item.tax }}</td>
                    <td>{{ JSON.parse(product).item.unit }}</td>
                    <td><span @click="remove(index)" class="btn btn-danger" >usuń</span></td>
                </tr>

            </table>
        </div>
    </div>
</template>

<script>
export default {
    name:'cart-list',
    data() {
        return {
            
        }
    }
}
</script>