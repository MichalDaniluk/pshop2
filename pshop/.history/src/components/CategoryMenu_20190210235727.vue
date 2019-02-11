<template>
    <nav class="sidebar text-light position-fixed" style="height:100vh">
        <div id="categoriesList">
            <div class="sidebar-sticky">
                <ul class="nav flex-column">
                    <li class="nav-item ml-1" v-for="category in categories" key="category.id">{{ category.nazwa }}</li>
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
            categories: []
        }
    },
    created() {
        this.loadCategory();
    },
    methods: {
        loadCategory() {
            Axios.get(`${this.$store.state.api}/products/bycategory/${this.categoryId}`)
            .then( function(response) {
                this.categories = response.lista
            })
        }
    }
}
</script>