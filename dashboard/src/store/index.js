import Vue from 'vue';
import Vuex from 'vuex';
import * as d3 from 'd3';

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    countyCaseData: null,
    countyCaseMax: 0,
  },
  mutations: {
    setCountyData(state, payload) {
      state.countyCaseData = payload;
    },
    setCountyCaseMax(state, payload) {
      state.countyCaseMax = payload;
    },
  },
  actions: {
    fetchNYTCountyData({ commit }) {
      d3.csv('https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv').then((data) => {
        data.forEach((d) => {
          /* eslint-disable no-param-reassign */
          d.cases = +d.cases;
          d.deaths = +d.deaths;
          d.datetime = Date.parse(d.date);
          d.key = `${d.county}, ${d.state}`;
          d.countyMissing = d.county === 'Unknown';
          /* eslint-enable no-param-reassign */
        });
        const counties = d3.nest()
          .key((d) => d.fips)
          // .key((d) => d.cases)
          // .key(d => d.deaths)
          .rollup((v) => d3.sum(v, (d) => d.cases))
          .object(data);
        console.log(counties);
        // .rollup(v => d3.sum(v, d => d.deaths))

        commit('setCountyCaseMax', d3.max(data, (d) => d.cases));
        commit('setCountyData', counties);
        // console.log(data);
      });
    },
  },
  modules: {
  },
});
