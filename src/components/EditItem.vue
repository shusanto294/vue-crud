<template>
    <div class="container add-item" v-if="item">

        <h3 style="text-align:center;padding:0 0 20px 0"> Edit Item</h3>

        <form class="add-item-form" @submit.prevent="editItem">
            <label for="title" >Item title</label>
            <input type="text" name="title" v-model="item.title" @keydown.enter.prevent>

            <div class="tag" v-for="(tag, i) in item.tags" :key="i"> 
                <label for="title">Tag</label>
                <input type="text" name="title" v-model="item.tags[i]" @keydown.enter.prevent>

                <div class="delete-tag"> <i @click="deleteTag(tag)" class="material-icons">delete</i></div>
            </div>  

            <label for="title">Add a tag  ( Press Enter to add a new tag ) </label>
            <input type="text" name="title" v-model="tag" @keydown.enter.prevent="addTag" >

            <button type="submit" class="submit btn">Update Item</button>

        </form>

       
    </div>
</template>

<script>

import db from '@/firebase/config'
import slugify from 'slugify'

export default {
    name: 'AddItem',
    data(){
        return{
            tag: null,
            item: null,
            msg: null
        }
    },
    methods: {
        editItem(){
            if(this.item.title){

                this.slug = slugify(this.item.title , {
                    replacement: '-',   
                    remove: /[*+~.()'"!:@#^]/g ,
                    lower: true   
                 })

                db.collection('items').doc(this.item.id).update({
                    title: this.item.title,
                    slug: this.item.slug,
                    tags: this.item.tags,

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
            this.item.tags.push(this.tag)
            this.tag = null
        },

        deleteTag(tag){

            this.item.tags = this.item.tags.filter(tagFromArray => {
               return tagFromArray != tag
            })
        }
    },
    created(){
      
        let item = db.collection('items').where('slug', '==' , this.$route.params.slug)
        item.get().then(snapshot => {
            snapshot.forEach(doc => {
                this.item = doc.data()
                this.item.id = doc.id
            });
        })

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