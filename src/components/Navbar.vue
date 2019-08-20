<template>
    <nav>
        <div class="nav-wrapper">
            <router-link :to="{name: 'Index'}"> CRUD </router-link>
            <div class="right add-icon"> <router-link :to="{name: 'AddItem'}"> <i class="material-icons">add</i> </router-link></div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'Navbar',
        data(){
            return {
                
            }
        }
    }
</script>

<style>


.nav-wrapper {
    background-color: #2E43A1;
    padding:0 50px
}

.add-icon i {

    width: 50px!Important;
    height: 50px!Important;
    border: 1px solid EE6E73;
    line-height: 48px!Important;
    text-align: center;
    position: relative;
    top: 35px;
    background: #F83561;
    color: #fff;
    border-radius: 50%;

}

</style>