<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="home" href="/home">
          <ion-icon :icon="currentRouteName === '/home' ? home : homeOutline" />
        </ion-tab-button>

        <ion-tab-button tab="search" href="/search">
          <ion-icon
            :icon="currentRouteName === '/search' ? search : searchOutline"
          />
        </ion-tab-button>

        <ion-tab-button tab="watchlist" href="/watchlist">
          <ion-icon
            :icon="
              currentRouteName === '/watchlist' ? bookmark : bookmarkOutline
            "
          />
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import {
  ellipse,
  square,
  triangle,
  bookmarkOutline,
  homeOutline,
  searchOutline,
  home,
  search,
  bookmark,
} from "ionicons/icons";

export default defineComponent({
  name: "TabsPage",
  components: {
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonPage,
    IonRouterOutlet,
  },
  setup() {
    return {
      ellipse,
      square,
      triangle,
      bookmarkOutline,
      homeOutline,
      searchOutline,
      home,
      search,
      bookmark,
    };
  },
  computed: {
    currentRouteName() {
      return this.$route.path;
    },
  },
});
</script>

<style lang="scss" scoped>
ion-tab-bar {
  background-color: #495057;
  border-radius: 15px 15px 0 0;
  border: unset;
  width: 100%;
  margin: 0 auto;
  max-height: 56px;
  height: 56px;
}

ion-tab-button {
  --color: white;
  --color-selected: white;
  background-color: #495057;
  border-radius: 15px 15px 0 0;

  ion-icon {
    font-size: 1.4rem;
  }
}
</style>
