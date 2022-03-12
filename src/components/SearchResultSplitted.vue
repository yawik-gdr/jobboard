<template>
  <q-scroll-area :style="'height: ' + $q.screen.height + 'px;'">
    <q-infinite-scroll :offset="250" @load="getJobs">
      <div ref="scrollTargetRef" class="row">
        <span v-for="(val, index) in rows" :key="val.id" class="col-12">
          <q-card class="jobs fit">
            <q-card-section>
              <q-item
                :class="index==selectedIndex?'highlights':''"
                clickable
                @click="emitData(val, index)"
              >
                <q-item-section avatar>
                  <q-img fit="contain" :src="jobDetailUrl + 'logo/' + val.companyId" height="50px"
                         width="100px"
                  >
                    <template #loading>
                      <q-spinner-orbit size="xs" color="grey" />
                    </template>
                  </q-img>
                  <date :date="val.datePublishStart" />
                </q-item-section>
                <q-item-section>
                  <q-item-label align="left">
                    {{ val.title }}
                  </q-item-label>
                  <q-item-label align="left" caption>
                    {{ val.companyName }}
                  </q-item-label>
                  <q-item-label align="left" caption>{{ val.regionText }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>
        </span>
      </div>
      <template #loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </q-scroll-area>
</template>

<script>
import Date from 'src/components/Date.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'SearchResultSplitted',
  components:
      {
        Date
      },
  props: {
    query:
      {
        type: String,
        required: false,
        default: '*'
      },
    distance:
      {
        type: Object,
        required: false,
        default: null
      },
    coordinates:
      {
        type: Object,
        required: false,
        default: null
      },
    region:
      {
        type: String,
        required: false,
        default: null
      },
    company:
      {
        type: String,
        required: false,
        default: null
      }
  },
  emits: ['click'],
  setup()
  {
    const scrollTargetRef = ref(null);
    return {
      jobsUrl: `${process.env.YAWIK_EXTERNAL_API_JWN}`,
      scrollTargetRef,
      jobDetailUrl: `${process.env.YAWIK_EXTERNAL_JOB_JWN}`,
      loading: false,
      start: 0,
      rowsPerPage: 20,
    };
  },
  data()
  {
    return {
      rows: [],
      selectedIndex: null
    };
  },
  watch: {
    query(newVal, oldVal)
    {
      this.resetAttrib();
    },
    coordinates(newVal, oldVal)
    {
      this.resetAttrib();
    },
    distance(newVal, oldVal)
    {
      this.resetAttrib();
    }
  },
  methods:
      {
        resetAttrib()
        {
          this.rows = [];
          this.start = 0;
          this.getJobs(1);
        },
        getJobs(index, done)
        {
          const routeName = this.$route.name;
          let params = {};
          switch (routeName)
          {
            case 'jobs':
              params = {
                q: '*',
                start: this.start,
                rows: this.rowsPerPage,
                sort: 'score desc,random_123 desc',
              };
              break;
            case 'search-jobs':
              params = {
                q: this.query,
                start: this.start,
                rows: this.rowsPerPage,
                sort: 'score desc,random_123 desc',
              };
              break;
            case 'selected-job':
              params = {
                q: this.query,
                start: this.start,
                bq: this.selectedIndex ? '' : 'id:' + this.$route.params.id + '^1000',
                rows: this.rowsPerPage,
                sort: 'score desc,random_123 desc',
              };
              break;
            case 'jobs-in':
              params = {
                q: this.query,
                start: this.start,
                rows: this.rowsPerPage,
                sort: 'score desc,random_123 desc',
                fq: `regionList:${this.region}`
              };
              break;
            case 'jobs-by':
              params = {
                q: this.query,
                start: this.start,
                rows: this.rowsPerPage,
                sort: 'score desc,random_123 desc',
                fq: `companyTag:"${this.company}"`
              };
              break;
            case 'jobs-near-by':
            {
              const lat = this.coordinates.lat;
              const lng = this.coordinates.lng;
              const dist = this.distance.id || 20;
              params = {
                q: this.query,
                start: this.start,
                rows: this.rowsPerPage,
                sort: `geodist(lonLat,${lat},${lng}) asc, isTopJob desc`,
                fq: `{!geofilt pt=${lat},${lng} sfield=geoLocation d=${dist}}`
              };
              break;
            }
          }

          this.loading = true;
          this.$axios.get(this.jobsUrl, {
            params: params
          }).then(response =>
          {
            this.rows = this.rows.concat(response.data.response.docs);
            const selectedId = parseInt(this.$route.params.id);
            const i = this.rows.findIndex(({ id }) => id === selectedId);
            if (i !== -1)
            {
              this.emitData(this.rows[i], i);
            }
            else
            {
              this.emitData(this.rows[0], 0);
            }
            this.start = index * this.rowsPerPage;
            const totalRecords = response.data.response.numFound;
            const stop = this.rows.length >= totalRecords;
            console.log('Rows Length# ' + this.rows.length);
            console.log('Should Stop# ' + stop);
            console.log('Total Records ' + totalRecords);
            if (typeof done !== 'undefined')
            {
              done(stop);
            }
          }).finally(() =>
          {
            this.loading = false;
          });
        },
        convertToSlug(title)
        {
          return title.toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
        },
        emitData(job, index)
        {
          if (job != null)
          {
            const id = job.id;
            const title = this.convertToSlug(job.title);
            if (typeof window !== 'undefined')
            {
              window.history.pushState('', 'Title', `/jobs/${id}/${title}`);
            }
            this.selectedIndex = index;
            this.$emit('click', { job: job });
          }
        }
      }
});
</script>

<style lang="scss" scoped>
  .highlights
  {
    background-color: $secondary-light;
  }

  .q-card__section--vert
  {
    padding: 0px;
  }

</style>

<i18n>
{
  "en": {
  "search-placeholder": "Job title, Company or Location",
  },
  "de": {
  "search-placeholder": "Anzeigentitel, Firma oder Ort",
  }
}
</i18n>
