<template>
  <ion-page>
    <HeaderComponent
      name="Search"
      :showBtn="false"
      :showSearchBar="true"
      :searchText="searchText"
      :setSearchText="segmentChanged"
    />
    <ion-content :fullscreen="true">
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
                :router="'/search/' + list.id"
                :voterRating="list.vote_average"
                :isAddBtn="false"
                :isRatingBtn="true"
              />
            </ion-col>
          </ion-row>
        </ion-grid>
        <ion-infinite-scroll
          @ionInfinite="loadData($event)"
          threshold="100px"
          id="infinite-scroll"
        >
          <ion-infinite-scroll-content
            loading-spinner="bubbles"
            loading-text="Loading more data..."
          >
          </ion-infinite-scroll-content>
        </ion-infinite-scroll>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
} from "@ionic/vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import MovieCardComponent from "@/components/MovieCardComponent.vue";
import { getPopularList, getSearchList } from "@/services/ApiConnect";

export default defineComponent({
  name: "Tab2Page",
  components: {
    HeaderComponent,
    MovieCardComponent,
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  },
  data() {
    return {
      popularList: [] as any,
      imageUrl: "https://image.tmdb.org/t/p/w500/",
      searchText: "",
      page: 1,
    };
  },
  mounted() {
    this.filterData();
  },
  methods: {
    segmentChanged(ev: any) {
      this.popularList = [];
      this.page = 1;
      this.searchText = ev.target.value;
      this.filterData();
    },
    filterData() {
      if (this.searchText.length !== 0) {
        getSearchList(this.page, this.searchText).then((r) => {
          this.popularList = this.popularList.concat(r.results);
        });
      } else {
        getPopularList(this.page).then((r) => {
          this.popularList = this.popularList.concat(r.results);
        });
      }
    },
    loadData(ev: any) {
      this.page = this.page + 1;
      this.filterData();
      ev.target.complete();
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
