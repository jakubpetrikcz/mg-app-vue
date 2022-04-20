<template>
  <ion-page>
    <HeaderComponent
      name="Movie Generator"
      :showBtn="true"
      :showSearchBar="false"
    />
    <ion-content :fullscreen="true">
      <ExploreContainer name="Tab 1 page" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonPage, IonContent } from "@ionic/vue";
import ExploreContainer from "@/components/ExploreContainer.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";

export default defineComponent({
  name: "Tab1Page",
  components: {
    ExploreContainer,
    HeaderComponent,
    IonContent,
    IonPage,
  },
});
</script>

<style lang="scss" scoped></style>
