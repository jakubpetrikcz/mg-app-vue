<template>
  <ion-page>
    <HeaderComponent name="Search" :showBtn="false" :showSearchBar="true" />
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
                v-for="list in popularList"
                :key="list.id.value"
              >
                <MovieCardComponent
                  :title="list.title"
                  :imgSrc="imageUrl + list.poster_path"
                  :router="'/tab2/' + list.id"
                  :voterRating="list.vote_average"
                  :isAddBtn="false"
                  :isRatingBtn="true"
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
import { getPopularList } from "@/services/ApiConnect";

export default defineComponent({
  name: "Tab2Page",
  components: {
    HeaderComponent,
    MovieCardComponent,
    IonContent,
    IonPage,
    IonList,
    IonGrid,
    IonRow,
    IonCol,
  },
  data() {
    return {
      popularList: [],
      imageUrl: "http://image.tmdb.org/t/p/original/",
    };
  },
  mounted() {
    getPopularList(1).then((r) => {
      this.popularList = r.results;
      console.log(this.popularList);
    });
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
