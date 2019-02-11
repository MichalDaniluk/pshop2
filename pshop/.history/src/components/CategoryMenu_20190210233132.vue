<template>
    <nav class="sidebar text-light position-fixed vh-100" style="height:100vh">
        <br><br><br>
        <div class="text-right">
            <span class="fas fa-align-justify text-warning"></span>
        </div>
        <div>WSZYSTKIE KATEGORIE</div>
        <div id="categoriesList">
            <div class="sidebar-sticky">
                <ul class="nav flex-column">
                    <li class="nav-item ml-1">Akcesoria komputerowe</li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import Axios from 'axios'
export default {
    name:'category-menu',
    props: {
        categoryId: {
            type:Number,
            required:true
        }
    },
    data() {
        return {
            list: []
        }
    },
    created() {
        this.loadCategory();
    },
    methods: {
        loadCategory() {
            Axios.get(`${this.$store.state.api}/products/bycategory/${this.categoryId}`)
            .then( function(response) {
                this.list = response.lista
            })
        }
    }
}
</script>