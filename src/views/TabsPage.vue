<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet></ion-router-outlet>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="tab1" href="/tabs/tab1">
          <ion-icon :icon="home" />
        </ion-tab-button>

        <ion-tab-button tab="tab2" href="/tabs/tab2">
          <ion-icon :icon="search" />
        </ion-tab-button>

        <ion-tab-button tab="tab3" href="/tabs/tab3">
          <ion-icon :icon="bookmark" />
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
  IonLabel,
  IonIcon,
  IonPage,
  IonRouterOutlet,
} from "@ionic/vue";
import {
  ellipse,
  square,
  triangle,
  bookmark,
  home,
  search,
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
      bookmark,
      home,
      search,
    };
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
