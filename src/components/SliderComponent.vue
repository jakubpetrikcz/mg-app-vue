<template>
  <ion-item lines="none" color="transparent">
    <ion-label class="title">{{ title }}</ion-label>
  </ion-item>
  <swiper v-if="isTrend" :slides-per-view="2" :loop="true">
    <swiper-slide v-for="list in trendsList" :key="list.id.value">
      <ion-card
        ><router-link :to="'/tab1/' + list.id">
          <img :src="imageUrl + list.poster_path" alt="movie image" />
          <h4>{{ list.title }}</h4>
        </router-link></ion-card
      >
    </swiper-slide>
  </swiper>
  <swiper v-if="!isTrend" :slides-per-view="2" :loop="true">
    <swiper-slide v-for="list in topList" :key="list.id.value">
      <ion-card>
        <div :router-link="'/tab1/' + list.id">
          <img :src="imageUrl + list.poster_path" alt="movie image" />
          <h4>{{ list.title }}</h4>
        </div></ion-card
      >
    </swiper-slide>
  </swiper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonItem, IonLabel, IonCard } from "@ionic/vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { getTrendingList, getTopRatedList } from "../services/ApiConnect";

import "swiper/scss";

export default defineComponent({
  name: "SliderComponent",
  components: {
    IonItem,
    IonLabel,
    Swiper,
    SwiperSlide,
    IonCard,
  },
  props: {
    title: String,
    isTrend: Boolean,
  },
  data() {
    return {
      trendsList: [],
      topList: [],
      imageUrl: "http://image.tmdb.org/t/p/original/",
    };
  },
  mounted() {
    getTrendingList().then((r) => {
      this.trendsList = r.results;
    });
    getTopRatedList().then((r) => {
      this.topList = r.results;
    });
  },
});
</script>

<style lang="scss">
.swiper-slide {
  display: flex;
  position: relative;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 18px;
  text-align: center;
  box-sizing: border-box;
}
</style>

<style lang="scss" scoped>
.title {
  font-weight: bold;
  font-size: 1.2rem;
  color: var(--ion-color-dark);
}
ion-card {
  width: 100%;
  position: relative;
  box-shadow: none !important;
  margin: 0.5rem;
  overflow: visible;
  text-align: center;

  a {
    text-decoration: none;
  }

  img {
    object-fit: cover;
    border-radius: 12px;
    width: 100%;
    transition: 600ms all ease-in-out;
  }

  h4 {
    margin: 0.5rem;
    margin-top: 0;
    font-size: 1rem;
    font-weight: bold;
    color: #495057;
  }

  ion-button {
    position: absolute;
    top: -5px;
    right: -10px;
    z-index: 10;
    font-size: 2.5rem;
    width: 50px;
    height: 50px;
    --background: transparent;
    --box-shadow: none;
    --vertical-align: middle;
    --padding-start: 0px;
    --padding-end: 0px;
    margin: 0;

    .bookmark {
      color: #e01e37;
    }

    .add {
      color: white;
      position: absolute;
      top: 42%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 1.3rem;
    }
  }

  .movie-badge {
    position: absolute;
    top: -12px;
    right: -20px;
    background: transparent;
    color: #ffbe0b;

    i {
      font-size: 2rem;
    }

    span {
      position: absolute;
      top: 55%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: black;
      font-size: 0.8rem;
      z-index: 12;
    }
  }

  .remove-btn {
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 10;
    font-size: 1.1rem;
    width: 40px;
    height: 40px;
    --background: #e01e37;
    --box-shadow: none;
    --vertical-align: middle;
    --padding-start: 0px;
    --padding-end: 0px;
    margin: 0;

    ion-icon {
      color: black;
    }
  }
}
</style>
