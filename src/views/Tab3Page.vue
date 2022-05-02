<template>
  <ion-page>
    <HeaderComponent name="Watchlist" :showBtn="false" :showSearchBar="false" />
    <ion-content :fullscreen="true">
      <ion-list>
        <div>
          <ion-grid>
            <ion-row>
              <ion-col
                size-lg="2"
                size-md="4"
                size-sm="6"
                size-xs="6"
                v-for="list in results"
                :key="list.id.value"
              >
                <MovieCardComponent
                  :title="list.title"
                  :imgSrc="imageUrl + list.poster_path"
                  :router="'/tab3/' + list.id"
                />
              </ion-col>
            </ion-row>
          </ion-grid>
        </div>
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonPage,
  IonContent,
  IonList,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import MovieCardComponent from "@/components/MovieCardComponent.vue";

export default defineComponent({
  name: "Tab3Page",
  components: {
    HeaderComponent,
    IonContent,
    IonPage,
    IonList,
    IonGrid,
    IonRow,
    IonCol,
    MovieCardComponent,
  },
  data() {
    return {
      results: [],
      imageUrl: "http://image.tmdb.org/t/p/original/",
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.results = JSON.parse(localStorage.getItem("items") || "{}");
    },
  },
});
</script>

<style lang="scss" scoped>
ion-col {
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

  .no-margin {
    margin: 0;
  }
}
</style>
