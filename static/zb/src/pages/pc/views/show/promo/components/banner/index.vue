<template>
  <div class="promo_banner">
    <video playsinline="" autoplay="" muted="" loop="" class="mv_banner">
      <source src="/static/video/banner.mp4" type="video/mp4">
    </video>
    <div class="container center">
      <img class="banner_title" src="./images/banner_txt.png">
    </div>
    <div class="triangle" style="top: 82.47px; left: 50%; opacity: 0.463454; transform: scale(0.8) rotate(321deg); animation-duration: 7s;"></div>
    <div class="triangle1" style="top: 76.4691px; left: 60%; opacity: 0.470933; transform: scale(0.7) rotate(92deg); animation-duration: 6.26s;"></div>
    <div class="triangle" style="top: 253.796px; left: 70%; opacity: 0.620388; transform: scale(0.8) rotate(31deg); animation-duration: 11.04s;"></div>
    <div class="triangle1" style="top: 296.789px; left: 80%; opacity: 0.301299; transform: scale(0.5) rotate(325deg); animation-duration: 5s;"></div>
    <div class="triangle" style="top: 200.641px; left: 90%; opacity: 0.44564; transform: scale(1.2) rotate(61deg); animation-duration: 12.1s;"></div>
    <div class="triangle1" style="top: 172.422px; left: 100%; opacity: 0.559787; transform: scale(0.8) rotate(193deg); animation-duration: 8.78s;"></div>
  </div>
</template>
<script>
  export default {
    name: "",
    data() {
      return {

      }
    }

  }

</script>
<style lang="scss" scoped>
  // .promo-banner{
  //   height: 260px;
  //   background:url(./images/banner.png) center center no-repeat;
  //   background-size:cover;
  // }
    .promo_banner {
      display: block;
      height: 484px;
      width: 100%;
      overflow: hidden;
      position: relative;
      .mv_banner {
        position: absolute;
        left: 50%;
        min-width: 100%;
        width: auto;
        // height: 484px;
        z-index: -100;
        -webkit-transform: translateX(-50%);
        transform: translateX(-50%);
        background-size: cover;
      }
      .banner_title {
        margin-top: 45px;
        position: relative;
        z-index: 2;
      }
      .triangle {
        position: absolute;
        width: 289px;
        height: 289px;
        background: url(./images/triangle_06.png) no-repeat;
        z-index: -1px;
        -webkit-animation: trianglemove 0ms -.8s linear infinite alternate;
        animation: trianglemove 0ms -0.8s linear infinite alternate;
      }
      .triangle1 {
        position: absolute;
        width: 289px;
        height: 289px;
        background: url(./images/triangle_06.png) no-repeat;
        z-index: -1px;
        -webkit-animation: trianglemove1 0ms -.8s linear infinite alternate;
        animation: trianglemove1 0ms -0.8s linear infinite alternate;
      }
    }
    @-webkit-keyframes trianglemove {
      0% {
        left:0;
        opacity:0.3;
        -webkit-transform:scale(0.5) rotate(0deg) ;
        transform:scale(0.5) rotate(0deg);
      }

      to {
        left:2000px;
        opacity:0.9;
        -webkit-transform: scale(1.5) rotate(1turn);
        transform: scale(1.5) rotate(1turn);
      }
    }


  @keyframes trianglemove {
   0% {
        left:0;
        opacity:0.3;
        -webkit-transform:scale(0.5) rotate(0deg) ;
        transform:scale(0.5) rotate(0deg);
      }

      to {
        left:2000px;
        opacity:0.9;
        -webkit-transform: scale(1.5) rotate(1turn);
        transform: scale(1.5) rotate(1turn);
      }
  }
  @-webkit-keyframes trianglemove1 {
      0% {
        left:1600px;
        opacity:0.8;
        -webkit-transform:scale(1.5) rotate(1turn) ;
        transform:scale(1.5) rotate(1turn);
      }

      to {
        left:-100px;
        opacity:0.3;
        -webkit-transform: scale(0.3) rotate(0deg);
        transform: scale(0.3) rotate(0deg);
      }
    }


  @keyframes trianglemove1 {
   0% {
        left:1600px;
        opacity:0.8;
        -webkit-transform:scale(1.3) rotate(1turn) ;
        transform:scale(1.3) rotate(1turn);
      }

      to {
        left:-300px;
        opacity:0.3;
        -webkit-transform: scale(0.5) rotate(0deg);
        transform: scale(0.5) rotate(0deg);
      }
  }
</style>
