<template>
  <ion-page>
    <HeaderComponent name="Search" :showBtn="false" :showSearchBar="true" />
    <ion-content :fullscreen="true">
      <ExploreContainer name="Tab 2 page" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonPage, IonContent } from "@ionic/vue";
import ExploreContainer from "@/components/ExploreContainer.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";

export default defineComponent({
  name: "Tab2Page",
  components: {
    ExploreContainer,
    HeaderComponent,
    IonContent,
    IonPage,
  },
});
</script>
