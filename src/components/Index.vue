<template>
  <div class="container">
        <div class="row" style="margin-top:50px;">

          <div class="col s12 m6 l4" v-for="item in items"  :key="item.id" >
            <div class="card  ">
              <div class="card-content ">
                <div class="right delete-icon" @click="deleteItem(item.id)"> <i class="material-icons">delete</i></div>
                <span class="card-title"> {{ item.title }} </span>

                <div class="item-tags">
                    <ul>
                        <li v-for="(tag, i) in item.tags" :key="i"> {{ tag }} </li>
                    </ul>
                </div>

                <div class="edit-button">
                   <router-link :to="{name: 'EditItem', params: { slug: item.slug }}">  <i class="material-icons">edit</i> </router-link>
                </div>
              </div>
            </div>
          </div>

          <!-- loading animation -->
          
          <div class="loading" v-if="!loaded"> 

            <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>

          </div>


        </div>
  </div>
</template>

<script>

import db from '@/firebase/config'

export default {
  name: 'Index',
  data () {
    return {
        items: [],
        loaded: false
    }
  },
  methods: {
      deleteItem(id){
        db.collection('items').doc(id).delete().then(() => {
            this.items = this.items.filter(item => {
                return item.id !== id
            })
        })

      }
  },

  created(){

    db.collection('items').get().then(snapshot => {

      this.loaded = true

      snapshot.forEach(doc => {
          let item = doc.data()
          item.id = doc.id
          
          this.items.push(item)
      })
    })

    
  }


}
</script>

<style >

.card-title {
    padding-bottom: 20px;
    text-align: center;
}

.card ul{
    display: flex;
    justify-content: center;
}

.card li {
    background: #ddd;
    padding: 5px 15px;
    margin: 0 5px;
    border-radius: 39px;
}

.delete-icon {
    position: absolute;
    top: 15px;
    right: 15px;
    color: #A8A8A7;
}

.edit-button {
    width: 50px;
    height: 50px;
    background-color: #F83561;
    line-height: 62px;
    text-align: center;
    color: #fff;
    border-radius: 50%;
    position: absolute;
    right: 20px;
}

.edit-button a{
  color:#fff;
}

/* Loading animation */

.loading {
    position: absolute;
    left: 46%;
    top: 40%;
}

.lds-roller {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-roller div {
  animation: lds-roller 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  transform-origin: 32px 32px;
}
.lds-roller div:after {
  content: " ";
  display: block;
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ddd;
  margin: -3px 0 0 -3px;
}
.lds-roller div:nth-child(1) {
  animation-delay: -0.036s;
}
.lds-roller div:nth-child(1):after {
  top: 50px;
  left: 50px;
}
.lds-roller div:nth-child(2) {
  animation-delay: -0.072s;
}
.lds-roller div:nth-child(2):after {
  top: 54px;
  left: 45px;
}
.lds-roller div:nth-child(3) {
  animation-delay: -0.108s;
}
.lds-roller div:nth-child(3):after {
  top: 57px;
  left: 39px;
}
.lds-roller div:nth-child(4) {
  animation-delay: -0.144s;
}
.lds-roller div:nth-child(4):after {
  top: 58px;
  left: 32px;
}
.lds-roller div:nth-child(5) {
  animation-delay: -0.18s;
}
.lds-roller div:nth-child(5):after {
  top: 57px;
  left: 25px;
}
.lds-roller div:nth-child(6) {
  animation-delay: -0.216s;
}
.lds-roller div:nth-child(6):after {
  top: 54px;
  left: 19px;
}
.lds-roller div:nth-child(7) {
  animation-delay: -0.252s;
}
.lds-roller div:nth-child(7):after {
  top: 50px;
  left: 14px;
}
.lds-roller div:nth-child(8) {
  animation-delay: -0.288s;
}
.lds-roller div:nth-child(8):after {
  top: 45px;
  left: 10px;
}
@keyframes lds-roller {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}


</style>
