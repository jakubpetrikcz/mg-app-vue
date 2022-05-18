<template>
  <ion-item lines="none" color="transparent">
    <ion-label class="title">{{ title }}</ion-label>
  </ion-item>
  <swiper v-if="isTrend" :slides-per-view="2" :loop="true">
    <swiper-slide v-for="list in trendsList" :key="list.id.value">
      <MovieCardComponent
        :title="list.title"
        :imgSrc="imageUrl + list.poster_path"
        :router="'/home/' + list.id"
        :voterRating="NaN"
        :isAddBtn="true"
        :isRatingBtn="false"
        :item="list"
      />
    </swiper-slide>
  </swiper>
  <swiper v-if="!isTrend" :slides-per-view="2" :loop="true">
    <swiper-slide v-for="list in topList" :key="list.id.value">
      <MovieCardComponent
        :title="list.title"
        :imgSrc="imageUrl + list.poster_path"
        :router="'/home/' + list.id"
        :voterRating="NaN"
        :isAddBtn="true"
        :isRatingBtn="false"
        :item="list"
      />
    </swiper-slide>
  </swiper>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonItem, IonLabel } from "@ionic/vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { getTrendingList, getTopRatedList } from "../services/ApiConnect";
import MovieCardComponent from "@/components/MovieCardComponent.vue";

import "swiper/scss";

export default defineComponent({
  name: "SliderComponent",
  components: {
    MovieCardComponent,
    IonItem,
    IonLabel,
    Swiper,
    SwiperSlide,
  },
  props: {
    title: String,
    isTrend: Boolean,
  },
  data() {
    return {
      trendsList: [],
      topList: [],
      imageUrl: "https://image.tmdb.org/t/p/w500/",
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
</style>
