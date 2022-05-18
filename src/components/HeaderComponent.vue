<template>
  <ion-header class="ion-no-border">
    <ion-list lines="none" class="ion-padding-top">
      <ion-item color="primary">
        <ion-label class="page-title">{{ name }}</ion-label>
      </ion-item>
    </ion-list>
    <div class="popover">
      <div v-if="showBtn">
        <ion-button
          id="trigger-button"
          class="generate-btn"
          @click="getDiscoverMovie()"
        >
          <span class="font-span">Generate</span>
        </ion-button>
        <ion-modal
          backdrop-dismiss="true"
          trigger="trigger-button"
          className="modal"
          @click="dismiss()"
        >
          <ion-content>
            <div class="modal-content">
              <div class="modal-card">
                <ion-button class="close-modal-btn" @click="dismiss()">
                  <ion-icon :icon="closeOutline"></ion-icon>
                </ion-button>
                <ion-card>
                  <router-link :to="'/home/' + modalMovie.id">
                    <img
                      :src="imageUrl + modalMovie.poster_path"
                      alt="movie image"
                    />
                    <h4>{{ modalMovie.title }}</h4>
                  </router-link>
                </ion-card>
              </div>
            </div>
          </ion-content>
        </ion-modal>
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
  IonModal,
  IonIcon,
  IonCard,
  IonContent,
  modalController,
} from "@ionic/vue";
import { getDiscoverList } from "@/services/ApiConnect";
import { closeOutline } from "ionicons/icons";

export default defineComponent({
  name: "HeaderComponent",
  components: {
    IonHeader,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonSearchbar,
    IonModal,
    IonIcon,
    IonCard,
    IonContent,
  },
  props: {
    name: String,
    showBtn: Boolean,
    showSearchBar: Boolean,
    searchText: String,
    setSearchText: Function,
  },
  setup() {
    return {
      closeOutline,
    };
  },
  data() {
    return {
      modalMovie: [] as any,
      imageUrl: "https://image.tmdb.org/t/p/w500/",
    };
  },
  mounted() {
    this.getDiscoverMovie();
  },
  methods: {
    getDiscoverMovie() {
      const page = Math.floor(Math.random() * (500 - 1) + 1) + 1;
      const movie = Math.floor(Math.random() * 19);

      getDiscoverList(page).then((data) => {
        this.modalMovie = data.results[movie];
      });
    },

    dismiss() {
      modalController.dismiss({
        dismissed: true,
      });
    },
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

.modal {
  --background: transparent;
  --box-shadow: none;

  ion-content {
    --background: transparent;
    --overflow: hidden;
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }

  .modal-content {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: translateY(25%);
  }

  .modal-card {
    max-width: 274px;
    position: relative;
    overflow: visible;

    .close-modal-btn {
      position: absolute;
      top: -10px;
      right: -5px;
      color: white;
      outline: none;
      border: none;
      z-index: 15;
      --width: 60px;
      --height: 60px;
      --vertical-align: middle;
      --padding-start: 10px;
      --padding-end: 10px;
      --background: #d90429;
    }

    ion-card {
      width: auto;
      height: auto;
      border-radius: 12px;
      overflow: visible;
      border: 5px solid #ffffff;
      background: #fff;

      a {
        text-decoration: none;
      }
    }

    h4 {
      margin: 0.5rem;
      margin-top: 0;
      font-size: 1.2rem;
      font-weight: bold;
      color: #495057;
    }
  }
}
</style>
