<template>
  <ion-page>
    <HeaderComponent
      name="Movie Generator"
      :showBtn="true"
      :showSearchBar="false"
    />
    <ion-content :fullscreen="true">
      <SliderComponent title="Trends" :isTrend="true" />
      <SliderComponent title="Top Rated" :isTrend="false" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonPage, IonContent } from "@ionic/vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import SliderComponent from "@/components/SliderComponent.vue";

export default defineComponent({
  name: "Tab1Page",
  components: {
    HeaderComponent,
    SliderComponent,
    IonContent,
    IonPage,
  },
});
</script>

<style lang="scss" scoped></style>
