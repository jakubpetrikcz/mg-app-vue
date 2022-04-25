<template>
  <ion-header class="ion-no-border">
    <ion-list lines="none" class="ion-padding-top">
      <ion-item color="primary">
        <ion-label class="page-title">{{ name }}</ion-label>
      </ion-item>
    </ion-list>
    <div class="popover">
      <div v-if="showBtn">
        <ion-button id="trigger-button" class="generate-btn">
          <span class="font-span">Generate</span>
        </ion-button>
      </div>
      <div v-if="showSearchBar">
        <ion-searchbar
          color="light"
          :value="searchText"
          @ionChange="setSearchText"
        >
        </ion-searchbar>
      </div>
    </div>
  </ion-header>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonHeader,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonSearchbar,
} from "@ionic/vue";

export default defineComponent({
  name: "HeaderComponent",
  components: {
    IonHeader,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonSearchbar,
  },
  props: {
    name: String,
    showBtn: Boolean,
    showSearchBar: Boolean,
    searchText: String,
    setSearchText: Function,
  },
});
</script>

<style lang="scss" scoped>
ion-header {
  ion-list {
    background: var(--ion-color-primary);
    border-radius: 0 0 15px 15px;
    padding-bottom: 6vh;

    ion-item {
      .page-title {
        font-weight: bold;
        font-size: 1.2rem;
        letter-spacing: 0.5px;
      }
    }
  }

  .popover {
    margin: 0 8px;
    text-align: center;

    ion-button {
      --border-radius: 20px;
      margin-top: -30px;
      --box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }

    ion-searchbar {
      text-align: start;
      --border-radius: 20px;
      margin-top: -30px;
      --background: white;
      --box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
  }

  .generate-btn {
    margin-top: 20px;
    width: 120px;
    height: 3.125rem;
    font-size: 1.2rem;
    --background: #ff002b;
  }
}
</style>
