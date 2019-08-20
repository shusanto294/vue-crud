<template>
    <div class="container add-item">

        <h3 style="text-align:center;padding:0 0 50px 0"> Add new Item </h3>

        <form class="add-item-form" @submit.prevent="addNewItem">
            <label for="title" >Item title</label>
            <input type="text" name="title" v-model="title" @keydown.enter.prevent>

            <div class="tag" v-for="(tag, i) in tags" :key="i"> 
                <label for="title">Tag</label>
                <input type="text" name="title" v-model="tags[i]" @keydown.enter.prevent>

                <div class="delete-tag"> <i @click="deleteTag(tag)" class="material-icons">delete</i></div>
            </div>  

            <label for="title">Add a tag  ( Press Enter to add a new tag ) </label>
            <input type="text" name="title" v-model="tag" @keydown.enter.prevent="addTag" >

            <button type="submit" class="submit btn">Add new Item</button>

        </form>

        <p style="text-align:center;color:red;padding-top:20px;" v-if="msg">{{ msg }}</p>
    </div>
</template>

<script>

import db from '@/firebase/config'
import slugify from 'slugify'

export default {
    name: 'AddItem',
    data(){
        return{
            title: null,
            slug: null,
            tag: null,
            tags: [],
            msg: null
        }
    },
    methods: {
        addNewItem(){

            if(this.title){

                this.slug = slugify(this.title , {
                    replacement: '-',   
                    remove: /[*+~.()'"!:@#^]/g ,
                    lower: true   
                 })

                db.collection('items').add({
                    title: this.title,
                    slug: this.slug,
                    tags: this.tags,

                }).then(() => {
                    this.$router.push({name: 'Index'})

                }).catch(err => {
                    console.log(err)
                })

               

            }else{
                this.msg = "You must input a title to add new item"
            }
            
        },
        addTag(){
            this.tags.push(this.tag)
            this.tag = null
        },

        deleteTag(tag){

            this.tags = this.tags.filter(tagFromArray => {
               return tagFromArray != tag
            })
        }
    }
}
</script>

<style>
.add-item {
    padding: 0 50px;
}

button.submit.btn {
    margin-top: 20px;
    position: relative;
    left: 42%;
}

.delete-tag{
    position: relative;
}

.delete-tag i.material-icons {
    position: absolute;
    top: -50px;
    right: 0px;
    color: #A8A8A7;
    cursor: pointer;
}

</style>