<template>
  <l-map
    :zoom="zoom"
    :center="center"
    @update:zoom="zoomUpdated"
    @update:center="centerUpdated"
    @update:bounds="boundsUpdated"
  >
    <l-tile-layer :url="url"></l-tile-layer>
  </l-map>
</template>

<script>
import { LMap, LTileLayer } from 'vue2-leaflet';

export default {
  name: 'MyAwesomeMap',
  components: {
    LMap,
    LTileLayer,
    // LMarker,
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 5,
      center: [39.833333, -98.583333],
      bounds: null,
      // maxBounds: [[90, 180], [-90, -180]],
      // minZoom: 2,
      // maxBoundsViscosity: 1,
    };
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    boundsUpdated(bounds) {
      this.bounds = bounds;
    },
  },
  // mounted() {
  //   this.$nextTick(() => {
  //     this.$refs.myMap.mapObject.ANY_LEAFLET_MAP_METHOD();
  //   });
  // },
};
</script>
