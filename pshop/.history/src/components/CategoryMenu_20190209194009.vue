<template>
    <div>
        <h2>Kategorie</h2>
    </div>
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
            category:0,
            list: []
        }
    },
    created() {
        this.loadCategory();
    },
    methods: {
        loadCategory() {
            Axios.get(`${this.$store.api}/category/get/${category}`)
            .then( function(response) {
                this.list = response.lista
            })
        }
    }
}
</script>