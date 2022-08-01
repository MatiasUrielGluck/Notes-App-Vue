<template>
    <div class="category">
        <i class="fa-solid fa-tag fa-xl"></i>
        <p>{{category.name}}</p>
        <i class="fa-solid fa-x" @click="deleteCategory()"></i>
    </div>
</template>

<script>
import Notes from '../services/Notes'
export default {
    name: "CategoryComponent",
    props: {
        category: Object,
        directNote: Object
    },

    data: function() {
        return {
            localNote: this.directNote
        }
    },

    methods: {
        deleteCategory() {
            Notes.removeCategory(this.directNote.id + '?removecategory=' + this.category.id, this.category.id)
            let index = this.directNote.Categories.find(cat => {
                return cat.id === this.category.id
            })
            this.localNote.Categories.splice(index, 1)
        }
    }
}
</script>

<style scoped>
.category {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

i:last-of-type {
    cursor: pointer;
}
</style>