<template>
  <q-form action="/jobs" method="post" class="row justify-center q-gutter-md">
    <q-input
      v-model="jobQuery"
      bg-color="white"
      outlined
      class="col-md-3 col-xs-6"
      type="text"
      color="primary"
      name="q"
      :label="$t('what')"
      clearable
      clear-icon="close"
      @keydown.enter="searchJobs"
      @update:model-value="jobQuery=$helpers.removeSpecialCharacters(jobQuery)"
    />
    <q-input
      id="location"
      ref="location"
      v-model="location"
      :label="$t('where')"
      color="primary"
      bg-color="white"
      class="desktop-only gt-sm col-md-3 col-xs-6"
      name="location"
      clearable
      clear-icon="close"
      outlined
      @update:model-value="location=location"
    />
    <q-select
      v-model="distance"
      bg-color="white"
      class="desktop-only  col-md-2 col-xs-6"
      square
      outlined
      :options="options"
      option-value="id"
      option-label="val"
      :label="$t('distance')"
    />

    <q-btn
      class="col-md-2 col-xs-6"
      color="primary"
      no-caps
      :label="$t('search')"
      @click="searchJobs"
    />
  </q-form>
</template>

<script>

import { defineComponent } from 'vue';
import { GET_SEARCH, SET_SEARCH } from 'src/store/names';
import { mapGetters, mapMutations } from 'vuex';

export default defineComponent({
  name: 'SearchForm',
  emits: ['q'],
  data()
  {
    return {
      googleSearchBox: null,
      options: [
        {
          id: 5,
          val: '5 km'
        },
        {
          id: 10,
          val: '10 km'
        },
        {
          id: 20,
          val: '20 km'
        },
        {
          id: 30,
          val: '30 km'
        },
        {
          id: 40,
          val: '40 km'
        },
        {
          id: 50,
          val: '50 km'
        },
        {
          id: 100,
          val: '100 km'
        }
      ]
    };
  },
  computed: {
    ...mapGetters([GET_SEARCH]),
    jobQuery:
      {
        get()
        {
          return this[GET_SEARCH].query;
        },
        set(val)
        {
          this[SET_SEARCH]({ query: val });
        }
      },
    location:
      {
        get()
        {
          return this[GET_SEARCH].location;
        },
        set(val)
        {
          this[SET_SEARCH]({ location: val });
        }
      },
    coordinates:
      {
        get()
        {
          return this[GET_SEARCH].coordinates;
        },
        set(val)
        {
          this[SET_SEARCH]({ coordinates: val });
        }
      },
    distance:
      {
        get()
        {
          return this[GET_SEARCH].distance;
        },
        set(val)
        {
          this[SET_SEARCH]({ distance: val });
        }
      },
  },

  mounted()
  {
    if (window.google)
    {
      const autocompleteInput = this.$refs.location.getNativeElement();
      this.googleSearchBox = new window.google.maps.places.Autocomplete(autocompleteInput, {
        fields: ['formatted_address', 'address_components', 'geometry'],
        types: ['(cities)']
      });
      this.googleSearchBox.setComponentRestrictions({ country: ['de', 'at'] });
      this.googleSearchBox.addListener('place_changed', () =>
      {
        const place = this.googleSearchBox.getPlace();
        this.locationChanged(place);
      }
      );
    }
  },
  methods:
      {
        ...mapMutations([SET_SEARCH]),

        searchJobs()
        {
          if (this.location !== null && this.location !== '')
          {
            console.log('jobs-near-by');
            this.$router.push({
              name: 'jobs-near-by',
              params: {
                q: this.jobQuery || '*',
                location: this.location,
                distance: this.distance || 20,
                coordinates: JSON.stringify(this.coordinates),
              }
            });
          }
          else if (this.jobQuery !== null && this.jobQuery !== '')
          {
            this.$router.push({
              name: 'search-jobs',
              params: {
                q: this.jobQuery
              }
            });
          }
          else
          {
            this.$router.push({
              name: 'jobs'
            });
          }
        },
        locationChanged(place)
        {
          // const addressComponents = place.address_components;
          console.log(place.geometry.location.lat());
          console.log(place.geometry.location.lng());
          this.coordinates = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
          };
          this.location = place.formatted_address;
        },
        escapeLucene(value)
        {
          this.jobQuery = value.replace(/[^a-zA-Z0-9 ]/g, '');
        }
      },
});
</script>

<style lang="scss" scoped>
  .q-field--outlined
  {
    border-radius: 5px;
    outline: none;
  }

  .pac-container
  {
    margin-top: -200px;
    z-index: 100000 !important;
  }

</style>

<i18n>
  {
  "en": {
  "search": "find jobs",
  "what": "what are you looking for?",
  "where": "where do you search?",
  "distance":"Distance",
  },
  "de": {
  "search": "Jobs finden",
  "what": "Was suchen Sie?",
  "where": "Wo suchen Sie?",
  "distance":"Umkreis",
  },
  "fr": {
  "search": "Trouver des jobs",
  "what": "que cherchez-vous ?",
  "where": "où cherchez-vous ?",
  "distance":"Rayon",
  }
  }
</i18n>
