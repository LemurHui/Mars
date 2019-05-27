<template>
    <div class="my-body">
        <BackHomeHead/>
        <div class="home-main">
            <div class="home-start-display">
                <ProductDisplay/>
            </div>
        </div>
    </div>
</template>

<script>
  import BackHomeHead from '@/components/login/BackHomeHead.vue'
  // import Imax from '../components/Imax.vue'
  import ProductDisplay from '../components/ProductDisplay.vue'
  export default {
    name: "TradeCenter",
    components:{
      BackHomeHead,
      // Imax,
      ProductDisplay
    }
  }
</script>

<style scoped>

    .home-main{
        margin-top: 80px;
        width: 100%;
        z-index: -2;
    }


    .home-start-display{
        height:auto;
        width: 800px;
        margin: 50px auto 50px auto;
        display: block;
        z-index: -2;
    }


</style>