<template>
  <ion-card>
    <div v-if="isAddBtn">
      <ion-button fill="clear" @click="getItems(item)">
        <ion-icon slot="icon-only" class="bookmark" :icon="bookmark"></ion-icon>
        <ion-icon class="add" :icon="add"></ion-icon>
      </ion-button>
    </div>
    <div v-if="isRatingBtn">
      <ion-badge class="movie-badge">
        <span>{{ voterRating }}</span>
        <i class="fas fa-star"></i>
      </ion-badge>
    </div>
    <div v-if="isRemoveBtn">
      <ion-button
        fill="clear"
        class="remove-btn"
        @click="removeFunction(movies, index)"
      >
        <ion-icon slot="icon-only" :icon="trash"></ion-icon>
      </ion-button>
    </div>
    <router-link :to="router">
      <img :src="imgSrc" alt="movie image" />
      <h4>{{ title }}</h4>
    </router-link></ion-card
  >
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { IonCard, IonButton, IonIcon, IonBadge } from "@ionic/vue";
import { bookmark, add, trash } from "ionicons/icons";

export default defineComponent({
  name: "MovieCardComponent",
  components: {
    IonCard,
    IonButton,
    IonIcon,
    IonBadge,
  },
  props: {
    title: String,
    imgSrc: String,
    router: String,
    voterRating: Number,
    isAddBtn: Boolean,
    isRatingBtn: Boolean,
    isRemoveBtn: Boolean,
    removeFunction: Function,
    movies: {},
    index: Number,
    item: {},
  },
  mounted() {
    console.log("event", this.movies);
  },
  setup() {
    return {
      bookmark,
      add,
      trash,
    };
  },
  methods: {
    getItems(data: any) {
      console.log(data);
      const items: any[] = [];
      if (JSON.parse(localStorage.getItem("items") || "[]") === null) {
        items.push(data);
        localStorage.setItem("items", JSON.stringify(items));
      } else {
        console.log("Tady ne!");
        const localItems = JSON.parse(localStorage.getItem("items") || "[]");
        localItems.map((details: any) => {
          if (data.id !== details.id) {
            if (items[data.title] === undefined) {
              items[data.title] = data.title;
            }
            items.push(details);
          }
        });
        items.push(data);
        console.log(items);
        localStorage.setItem("items", JSON.stringify(items));
      }
    },
  },
});
</script>

<style lang="scss" scoped>
ion-card {
  width: 100%;
  position: relative;
  box-shadow: none !important;
  margin: 0.5rem;
  overflow: visible;
  text-align: center;

  a {
    text-decoration: none;
  }

  img {
    object-fit: cover;
    border-radius: 12px;
    width: 100%;
    transition: 600ms all ease-in-out;
  }

  h4 {
    margin: 0.5rem;
    margin-top: 0;
    font-size: 1rem;
    font-weight: bold;
    color: #495057;
  }

  ion-button {
    position: absolute;
    top: -5px;
    right: -10px;
    z-index: 10;
    font-size: 2.5rem;
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

    .add {
      color: white;
      position: absolute;
      top: 42%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 1.3rem;
    }
  }

  .movie-badge {
    position: absolute;
    top: -12px;
    right: -20px;
    background: transparent;
    color: #ffbe0b;

    i {
      font-size: 2rem;
    }

    span {
      position: absolute;
      top: 55%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: black;
      font-size: 0.8rem;
      z-index: 12;
    }
  }

  .remove-btn {
    position: absolute;
    top: 0px;
    right: 0px;
    z-index: 10;
    font-size: 1.1rem;
    width: 40px;
    height: 40px;
    --background: #e01e37;
    --box-shadow: none;
    --vertical-align: middle;
    --padding-start: 0px;
    --padding-end: 0px;
    margin: 0;

    ion-icon {
      color: black;
    }
  }
}
</style>
