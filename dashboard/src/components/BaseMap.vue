<template>
  <l-map
    :zoom="zoom"
    :center="center"
    @update:zoom="zoomUpdated"
    @update:center="centerUpdated"
    @update:bounds="boundsUpdated"
  >
    <l-tile-layer :url="url"></l-tile-layer>
    <l-geo-json
      v-if="countyCaseData"
      :geojson="counties"
      :optionsStyle="countyStyleFn"></l-geo-json>
    <l-geo-json :geojson="states" :optionsStyle="statesStyle"></l-geo-json>
  </l-map>
</template>

<script>
import * as topojson from 'topojson-client';
import * as d3 from 'd3';
import { LMap, LTileLayer, LGeoJson } from 'vue2-leaflet';
import us from '../data/counties-10m.json';

const countyGeojson = topojson.feature(us, us.objects.counties);
const stateGeojson = topojson.feature(us, us.objects.states);

export default {
  name: 'MyAwesomeMap',
  components: {
    LMap,
    LTileLayer,
    LGeoJson,
    // LMarker,
  },
  data() {
    return {
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      zoom: 5,
      center: [39.833333, -98.583333],
      bounds: null,
      counties: countyGeojson,
      states: stateGeojson,
      statesStyle: {
        color: '#333',
        weight: 1,
        opacity: 1,
        fillOpacity: 0,
      },
      // maxBounds: [[90, 180], [-90, -180]],
      // minZoom: 2,
      // maxBoundsViscosity: 1,
    };
  },
  computed: {
    countyCaseData() {
      return this.$store.state.countyCaseData;
    },
  },
  methods: {
    countyStyleFn(feature) {
      const styles = {
        color: d3.interpolateOrRd(0),
        weight: 0.2,
        opacity: 1,
        fillOpacity: 0.5,
      };
        // console.log(this.$store.state);
      if (!this.$store.state.countyCaseData) {
        return styles;
      }
      const logScale = d3.scaleSymlog()
        .domain([0, this.$store.state.countyCaseMax])
        .range([0, 1]);
      const countyCases = this.$store.state.countyCaseData[feature.id];
      if (countyCases) {
        // console.log(countyCases / this.$store.state.countyCaseMax);
        // console.log(this.$store.state.countyCaseMax);
        styles.color = d3.interpolateOrRd(logScale(countyCases));
      }
      return styles;
    },
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
};
</script>
