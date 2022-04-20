<template>
  <ion-page>
    <HeaderComponent name="Watchlist" :showBtn="false" :showSearchBar="false" />
    <ion-content :fullscreen="true">
      <ExploreContainer name="Tab 3 page" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonPage, IonContent } from "@ionic/vue";
import ExploreContainer from "@/components/ExploreContainer.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";

export default defineComponent({
  name: "Tab3Page",
  components: {
    ExploreContainer,
    HeaderComponent,
    IonContent,
    IonPage,
  },
});
</script>
