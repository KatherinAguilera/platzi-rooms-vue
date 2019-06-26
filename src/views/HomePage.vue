<template>
  <!-- default layout (header footer search) -->
  <default-layout>
    <section class="container py-6">
      <h1 class="text-3xl font-light text-grey-darkest mb-3">Recommended</h1>
      <div class="section">
        <tiny-slider>
          <div class="slider-item">
            <img class="recommend center" width="850"  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80">
            </div>
          <div class="slider-item">
            <img class="recommend center" width="850"  src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1273&q=80">
          </div>
          <div class="slider-item">
            <img class="recommend center" width="850"  src="https://images.unsplash.com/photo-1463797221720-6b07e6426c24?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80">
          </div>
          <div class="slider-item">
            <img class="recommend center" width="850"  src="https://images.unsplash.com/photo-1520097411146-bbd8b2a661c1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80">
          </div>
          <div class="slider-item">
            <img class="recommend center" width="850"  src="https://images.unsplash.com/photo-1520097197299-12e7e93eb674?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80">
          </div>
          <div class="slider-item">
            <img class="recommend center" width="850"  src="https://images.unsplash.com/photo-1537141648896-c18bc166303c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2152&q=80">
          </div>
        </tiny-slider>
      </div>
    </section>
    <section class="container py-6">
      <h1 class="text-3xl font-light text-grey-darkest mb-3">Explore</h1>
      <div class="section__explore grid-container mb-8">
        <div class="house__card mb-3" v-for="room in rooms" :key="room['.key']">
          <div class="house__thumbnail relative overflow-hidden">
            <img class="house__image absolute w-full" width="250" :src="room.featured_image">
          </div>
          <div class="house__content bg-white p-3 border rounded">
            <div class="house__type font-semibold text-xs uppercase text-teal-dark mb-1">
            {{room.type}}
            </div>
            <div class="house__title font-bold mb-2">{{ room.title }}</div>
            <div class="house__price text-xs">
              <span class="font-bold">{{room.price}} MXN</span> per night
            </div>
          </div>
        </div>
      </div>
      <div class="text-center">
        <a
          class="py-3 px-12 bg-yellow-dark no-underline text-yellow-darker text-lg rounded"
          href="#">Show all</a>
      </div>
    </section>
  </default-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import TinySlider from '@/components/TinySlider.vue';


export default {
  name: 'HomePage',
  beforeCreate() {
    this.$store.dispatch('FETCH_ROOMS', 12);
  },
  computed: {
    ...mapGetters([
      'rooms'
    ]),
  },
  components: {
    DefaultLayout,
    TinySlider
  },
};
</script>

<style lang="css">
  .section__explore {
    grid-template-columns: repeat(4, 1fr);
  }

  .house__card > .house__thumbnail {
    height: 170px;
  }

  .house__thumbnail > .house__image {
    width: 100%;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
  }

  @media(max-width: 992px) {
    .house__card > .house__thumbnail {
      height: 150px;
    }
    .section__explore {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media(max-width: 576px) {
    .section__explore {
      grid-template-columns: repeat(1, 1fr);
    }

    .house__card > .house__thumbnail {
      height: 120px;
    }
  }
</style>
