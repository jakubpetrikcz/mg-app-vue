<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons>
          <ion-back-button defaultHref="/"></ion-back-button>
        </ion-buttons>
        <ion-title class="logo-container">
          <a href="/">
            <img src="../../public/assets/mg-icon.png" alt="" />
          </a>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div className="main-content">
        <div className="images-content">
          <!-- <ion-img :src="imageUrl + item.backdrop_path"></ion-img> -->
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  // IonImg,
} from "@ionic/vue";
import { getMovieDetailList } from "@/services/ApiConnect";

export default defineComponent({
  name: "MovieDetails",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    // IonImg,
  },
  data() {
    return {
      movie: {},
      imageUrl: "http://image.tmdb.org/t/p/original/",
    };
  },
  mounted() {
    const id = this.$router.currentRoute.value.params.id;
    console.log(typeof id);
    // getMovieDetailList(id).then((r) => {
    //   this.movie = r.results;
    // });
  },
});
</script>

<style lang="scss" scoped>
ion-header {
  ion-back-button {
    color: #3880ff;
  }

  .logo-container {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    img {
      outline: none;
      width: 40px;
      aspect-ratio: auto 40 / 40;
      height: 40px;
    }
  }
}
</style>
