<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons>
          <ion-back-button defaultHref="/"></ion-back-button>
        </ion-buttons>
        <ion-title class="logo-container">
          <a href="/">
            <img src="../../public/assets/mg-icon.png" alt="" />
          </a>
        </ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div className="main-content">
        <div className="images-content">
          <ion-button slot="end" fill="clear" @click="getItems()">
            <ion-icon
              slot="icon-only"
              class="bookmark"
              :icon="bookmark"
            ></ion-icon>
            <ion-icon class="add" :icon="add"></ion-icon>
          </ion-button>
          <ion-img :src="imageUrl + movie.backdrop_path"></ion-img>
          <ion-badge class="badge">
            <span>{{ movie.vote_average }}</span>
            <i className="fas fa-star"></i>
          </ion-badge>
        </div>
        <div className="information-container ion-margin-start ion-margin-end">
          <div className="ion-margin-bottom">
            <h1>{{ movie.title }}</h1>
            <ion-row className="ion-justify-content-start">
              <ion-col
                className="ion-justify-content-start"
                size="3"
                sizeLg="1"
                sizeMd="2"
                sizeSm="3"
                sizeXs="4"
              >
                <span>{{ movie.release_date }}</span>
              </ion-col>
              <ion-col
                className="ion-justify-content-start"
                size="3"
                sizeLg="1"
                sizeMd="2"
                sizeSm="3"
                sizeXs="4"
              >
                <span>{{ runTime }}</span>
              </ion-col>
            </ion-row>
          </div>
          <ion-toolbar>
            <div class="ion-margin-bottom">
              <ion-chip v-for="genre in movie.genres" :key="genre.id.value">{{
                genre.name
              }}</ion-chip>
            </div>
          </ion-toolbar>
          <p className="overview">{{ movie.overview }}</p>
        </div>
        <div className="ion-margin-end">
          <ion-list>
            <ion-list-header>
              <h3>Director</h3>
            </ion-list-header>
            <ion-item>
              <ion-avatar slot="start">
                <img :src="imageUrl + director.profile_path" />
              </ion-avatar>
              <ion-label>
                <h2>{{ director.name }}</h2>
              </ion-label>
            </ion-item>
          </ion-list>
        </div>
        <div className="ion-margin-end">
          <ion-list>
            <ion-list-header>
              <h3>Casting</h3>
            </ion-list-header>
            <ion-item v-for="actor in cast" :key="actor.id.value">
              <ion-avatar slot="start">
                <img :src="imageUrl + actor.profile_path" />
              </ion-avatar>
              <ion-label>
                <h2>{{ actor.name }}</h2>
                <h4>{{ actor.character }}</h4>
              </ion-label>
            </ion-item>
          </ion-list>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
  IonContent,
  IonImg,
  IonButton,
  IonIcon,
  IonBadge,
  IonRow,
  IonCol,
  IonChip,
  IonList,
  IonListHeader,
  IonItem,
  IonAvatar,
  IonLabel,
} from "@ionic/vue";
import { getCreditsList, getMovieDetailList } from "@/services/ApiConnect";
import { bookmark, add } from "ionicons/icons";

export default defineComponent({
  name: "MovieDetails",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonTitle,
    IonContent,
    IonImg,
    IonButton,
    IonIcon,
    IonBadge,
    IonRow,
    IonCol,
    IonChip,
    IonList,
    IonListHeader,
    IonItem,
    IonAvatar,
    IonLabel,
  },
  setup() {
    return {
      bookmark,
      add,
    };
  },
  data() {
    return {
      movie: [],
      director: [],
      cast: [],
      runTime: "",
      imageUrl: "https://image.tmdb.org/t/p/w500/",
    };
  },
  mounted() {
    const id = this.$route.params.id as string;

    getMovieDetailList(id).then((r) => {
      this.movie = r;
      this.runTime = calcTime(r.runtime);
    });

    getCreditsList(id).then((r) => {
      r.crew.filter((member: any) => {
        if (member.job === "Director") {
          this.director = member;
        }
      });

      this.cast = r.cast;
    });

    const calcTime = (time: any) => {
      const hours = Math.floor(time / 60);
      const mins = time % 60;
      return `${hours}h ${mins}m`;
    };
  },
  methods: {
    getItems() {
      const id = this.$route.params.id as string;

      getMovieDetailList(id).then((changesDetail) => {
        const items: any[] = [];
        if (JSON.parse(localStorage.getItem("items") || "[]") === null) {
          items.push(changesDetail);

          localStorage.setItem("items", JSON.stringify(items));
        } else {
          const localItems = JSON.parse(localStorage.getItem("items") || "[]");
          localItems.map((details: any) => {
            if (changesDetail.id !== details.id) {
              if (items[changesDetail.title] === undefined) {
                items[changesDetail.title] = changesDetail.title;
              }
              items.push(details);
            }
          });
          items.push(changesDetail);
          localStorage.setItem("items", JSON.stringify(items));
        }
      });
    },
  },
});
</script>

<style lang="scss" scoped>
ion-header {
  ion-back-button {
    color: #3880ff;
  }

  .logo-container {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    img {
      outline: none;
      width: 40px;
      aspect-ratio: auto 40 / 40;
      height: 40px;
    }
  }
}

.main-content {
  position: relative;

  ion-toolbar {
    --background: transparent;
  }

  ion-chip {
    background: #004e89;
    color: #ffffff;
  }
}

.images-content {
  position: relative;

  ion-button {
    position: absolute;
    bottom: -20px;
    left: 20px;
    z-index: 10;
    font-size: 2.8rem;
    width: 50px;
    height: 50px;
    --background: transparent;
    --box-shadow: none;
    --vertical-align: middle;
    --padding-start: 0px;
    --padding-end: 0px;
    margin: 0;

    .bookmark {
      color: #e01e37;
    }
  }

  .add {
    color: white;
    position: absolute;
    top: 42%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.1rem;
  }
}

.badge {
  position: absolute;
  bottom: -20px;
  right: 20px;
  background: transparent;
  color: #ffbe0b;

  i {
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
    font-size: 3.5rem;
    position: relative;
    z-index: 10;
  }

  span {
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: black;
    font-size: 1.4rem;
    z-index: 12;
  }
}

.information-container {
  h1 {
    font-weight: bold;
  }

  span {
    color: #161a1d;
  }

  .overview {
    letter-spacing: 0.0325rem;
    line-height: 1.5rem;
  }
}
</style>
