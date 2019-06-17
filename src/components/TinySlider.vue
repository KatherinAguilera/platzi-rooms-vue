<template>
  <div class="slider-wrapper">
    <slot></slot>
  </div>
</template>

<script>
import { tns } from 'tiny-slider/src/tiny-slider';
import 'tiny-slider/dist/tiny-slider.css';

export default {
  name: 'TinySlider',
  data() {
    return {
      // $ antes de una variable significa que no se aplicara reactividad al elemento
      $slider: null,
    };
  },
  mounted() {
    // funcion de inicializacion
    this.init();
  },
  methods: {
    init() {
      const settings = {
        // donde se montara la libreria del slider (elemento padre)
        container: this.$el,
        mode: 'gallery',
      };
      this.$slider = tns(settings);
    }
  },
  beforeDestroy() {
    if (this.$slider) {
      this.$slider.destroy();
    }
  },
}
</script>

