<template>
  <ion-page>
    <!-- <ion-header>
      <ion-toolbar>
        <ion-searchbar
          color="light"
          :value="searchText"
          @ionChange="segmentChanged($event)"
        >
        </ion-searchbar>
      </ion-toolbar>
    </ion-header> -->
    <HeaderComponent
      name="Movie Generator"
      :showBtn="false"
      :showSearchBar="true"
      :searchText="searchText"
      :setSearchText="this.segmentChanged"
    />
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
      </ion-list>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import {
  IonPage,
  IonContent,
  IonList,
  IonGrid,
  IonRow,
  IonCol,
  InfiniteScrollCustomEvent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  // IonToolbar,
  // IonHeader,
  // IonSearchbar,
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
    IonList,
    IonGrid,
    IonRow,
    IonCol,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    // IonToolbar,
    // IonHeader,
    // IonSearchbar,
  },
  data() {
    return {
      popularList: [],
      imageUrl: "http://image.tmdb.org/t/p/original/",
      searchText: "",
      page: 1,
    };
  },
  mounted() {
    getPopularList(this.page).then((r) => {
      this.popularList = r.results;
    });
  },
  methods: {
    segmentChanged(ev: any) {
      this.popularList = [];
      this.page = 1;
      this.searchText = ev.target.value;

      if (this.searchText.length !== 0) {
        getSearchList(this.page, this.searchText).then((r) => {
          this.popularList = r.results;
        });
      } else {
        getPopularList(this.page).then((r) => {
          this.popularList = r.results;
        });
      }
    },
    pushData() {
      if (this.searchText.length !== 0) {
        getSearchList(this.page, this.searchText).then((r) => {
          this.popularList = this.popularList.concat(r.results);
          console.log(this.popularList);
        });
      } else {
        getPopularList(this.page).then((r) => {
          this.popularList = this.popularList.concat(r.results);
          console.log(this.popularList);
        });
      }
    },
    loadData(ev: any) {
      this.page = this.page + 1;
      // Load the new data once we reach the end of the page

      console.log(this.page);
      const res = this.pushData();
      console.log("Loaded data");
      console.log(res);
      ev.target.complete();

      // Once the last page has been fetched, we'll disable infinite loading
      // if (this.page >= this.maxPages) {
      //     ev.target.disabled = true;
      // }
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
