<template>
  <v-app id="inspire">
    <v-navigation-drawer
      class="above-navbar"
      v-model="drawer"
      app
      temporary
      hide-overlay
    >

      <v-list dense>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>COVID-19 Dash</v-list-item-title>
          </v-list-item-content>

        </v-list-item>

        <v-divider></v-divider>

        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-view-dashboard</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon>mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Settings</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      class="above-navbar"
      app
      clipped-left
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>COVID-19 Dashboard</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height no-padding"
        fluid
      >
        <!-- <v-row
          align="center"
          justify="center"
        >
          <v-col class="shrink"> -->
            <!-- <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn
                  :href="source"
                  icon
                  large
                  target="_blank"
                  v-on="on"
                >
                  <v-icon large>mdi-code-tags</v-icon>
                </v-btn>
              </template>
              <span>Source</span>
            </v-tooltip>
            <v-tooltip right>
              <template v-slot:activator="{ on }">
                <v-btn
                  icon
                  large
                  href="https://codepen.io/johnjleider/pen/bXNzZL"
                  target="_blank"
                  v-on="on"
                >
                  <v-icon large>mdi-codepen</v-icon>
                </v-btn>
              </template>
              <span>Codepen</span>
            </v-tooltip> -->
            <BaseMap/>
            <!-- <HelloWorld/> -->
          <!-- </v-col>
        </v-row> -->
      </v-container>
    </v-content>

    <v-footer app>
      <span>&copy; 2020 Kendall Park</span>
    </v-footer>
  </v-app>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue';
import BaseMap from './components/BaseMap.vue';

export default {
  name: 'App',
  components: {
    // HelloWorld,
    BaseMap,
  },
  props: {
    source: String,
  },
  data: () => ({
    drawer: null,
  }),
  created() {
    this.$vuetify.theme.dark = true;
  },
  beforeCreate() {
    this.$store.dispatch('fetchNYTCountyData');
  },
};
</script>

<style lang="scss">
  .container.no-padding {
    padding: 0;
  }
  // .above-map {
  //   z-index: 2000 !important;
  // }
  // .above-navbar {
  //   z-index: 2001 !important;
  // }

  .v-navigation-drawer--absolute {
    z-index: 2001 !important;
  }
  .v-navigation-drawer--fixed {
    z-index: 2006 !important;
  }
  .v-navigation-drawer--clipped
  :not(.v-navigation-drawer--temporary)
  :not(.v-navigation-drawer--is-mobile) {
    z-index: 2004 !important;
  }
  .v-navigation-drawer--temporary {
    z-index: 2007 !important;
  }
  .v-navigation-drawer--mobile {
    z-index: 2006 !important;
  }

</style>
