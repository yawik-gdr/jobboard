<template>
  <q-scroll-area :style="'height: ' + $q.screen.height + 'px;'">
    <q-infinite-scroll :offset="250" @load="getJobs">
      <div ref="scrollTargetRef" class="row">
        <span v-for="(val, index) in internalJobs" :key="index+'_'+val.id" class="col-12">
          <q-card class="jobs fit">
            <q-card-section>
              <q-item
                clickable
                @click="emitData(val.attributes, index, '1')"
              >
                <q-item-section avatar>
                  <q-img
                    v-if="val.attributes.logo"
                    fit="contain"
                    :src="jobDetailUrlInternal + val.attributes.logo.url"
                    height="50px"
                    width="100px"
                  >
                    <template #loading>
                      <q-spinner-orbit size="xs" color="grey" />
                    </template>
                  </q-img>
                  <q-icon v-else size="xl" name="domain" color="secondary" style="height: 50px; width: 100px;" />
                  <date :date="val.datePublishStart" />
                </q-item-section>
                <q-item-section>
                  <q-item-label align="left">
                    {{ val.attributes.jobTitle }}
                  </q-item-label>
                  <q-item-label align="left" caption>
                    {{ val.attributes.organization }}
                  </q-item-label>
                  <q-item-label align="left" caption>{{ val.attributes.formattedAddress }}</q-item-label>
                </q-item-section>
              </q-item>
            </q-card-section>
          </q-card>
        </span>
        <span v-for="(val, index) in rows" :key="val.id" class="col-12">
          <q-card class="jobs fit">
            <q-card-section>
              <q-item
                :class="index==selectedIndex?'highlights':''"
                clickable
                @click="emitData(val, index)"
              >
                <q-item-section avatar>
                  <q-img
                    fit="contain"
                    :src="jobDetailUrl + 'logo/' + val.companyId"
                    height="50px"
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
import convertToSlug from 'src/lib/utils.js';
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
  },
  emits: ['click'],
  setup()
  {
    const scrollTargetRef = ref(null);
    return {
      jobsUrl: `${process.env.YAWIK_EXTERNAL_SEARCH_URL}`,
      internalJobsUrl: `${process.env.YAWIK_SEARCH_URL}/api/jobs`,
      jobDetailUrlInternal: `${process.env.YAWIK_JOB_URL}`,
      scrollTargetRef,
      jobDetailUrl: `${process.env.YAWIK_EXTERNAL_JOB_URL}`,
      loading: false,
      start: 0,
      rowsPerPage: 20,
    };
  },
  data()
  {
    return {
      rows: [],
      selectedIndex: null,
      pagination: {
        sortBy: 'date',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10
      },
      internalJobs: [],
      isInternal: false,
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
  beforeMount()
  {
    const internal = this.$route.params.internal;
    console.log('internal ', internal);
    if (internal === undefined || internal === '')
    {
      console.log('internal in s ', internal);
      this.isInternal = true;
    }
    else
    {
      console.log('not undefined');
      this.isInternal = this.$route.params.internal === '1';
    }
  },
  mounted()
  {
    //  this.getInternalJobs();
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
          let selectedjob = false;
          switch (routeName)
          {
            case 'jobs':
              params = {
                sort: ['jobTitle:asc'],
                filters: {
                  q: '*'
                },
                pagination: {
                  pageSize: this.rowsPerPage,
                  page: this.start
                }
              };
              break;
            case 'search-jobs':
              params = {
                sort: ['jobTitle:asc'],
                filters: {
                  q: this.$route.params.q
                },
                pagination: {
                  pageSize: this.rowsPerPage,
                  page: this.start
                }

              };
              break;
            case 'selected-job':
              selectedjob = true;
              params = {
                sort: ['jobTitle:asc'],
                filters: {
                  q: { id: this.$route.params.id }
                },
                pagination: {
                  pageSize: this.rowsPerPage,
                  page: this.start
                }
              };
              break;
            case 'jobs-in':
              params = {
                sort: ['jobTitle:asc'],
                filters: {
                  q: this.$route.params.q
                },
                pagination: {
                  pageSize: this.rowsPerPage,
                  page: this.start
                },
              };

              break;

            case 'jobs-by':
              params = {
                sort: ['jobTitle:asc'],
                filters: {
                  q: this.$route.params.q
                },
                pagination: {
                  pageSize: this.rowsPerPage,
                  page: this.start
                },
              };
              break;
            case 'jobs-near-by': {
              const lat = JSON.parse(this.$route.params.coordinates).lat;
              const lng = JSON.parse(this.$route.params.coordinates).lng;
              let dist = this.$route.params.distance || 20;
              dist = +dist;
              params = {
                sort: ['jobTitle:asc'],
                filters: {
                  q: this.$route.params.q,
                  lat: lat,
                  lng: lng,
                  d: dist,
                },
                pagination: {
                  pageSize: this.rowsPerPage,
                  page: this.start
                },
                publicationState: 'live',
                locale: ['en']
              };

              break;
            }
          }
          if (selectedjob)
          {
            const selectedId = parseInt(this.$route.params.id);
            const i = this.internalJobs.findIndex(({ id }) => id === selectedId);
            if (i !== -1)
            {
              this.emitData(this.internalJobs[i].attributes, i, '1');
            }
            else
            {
              this.$axios.get(this.internalJobsUrl, {
                params: {

                  filters: {
                    id: {
                      $in: [selectedId],
                    },
                  },

                  populate: 'html,logo',
                  sort: 'publishedAt:desc'

                }
              }
              ).then(response =>
              {
                this.internalJobs = response.data.data;
                if (this.isInternal)
                {
                  const selectedId = parseInt(this.$route.params.id);
                  const i = this.internalJobs.findIndex(({ id }) => id === selectedId);
                  if (i !== -1)
                  {
                    this.emitData(this.internalJobs[i].attributes, i, '1');
                  }
                  else
                  {
                    this.emitData(this.internalJobs[0].attributes, 0, '1');
                  }
                }
              }).finally(() =>
              {
                this.loading = false;
                done(true);
              });

              //             this.emitData(this.internalJobs[0].attributes, 0, '1');
            }
          }
          else
          {
            this.loading = true;
            this.$axios.get(this.jobsUrl + '/api/solrGetJobs', {
              params: params
            }).then(response =>
            {
              this.internalJobs = response.data.data;
              if (this.isInternal)
              {
                const selectedId = parseInt(this.$route.params.id);
                const i = this.internalJobs.findIndex(({ id }) => id === selectedId);
                if (i !== -1)
                {
                  this.emitData(this.internalJobs[i].attributes, i, '1');
                }
                else
                {
                  this.emitData(this.internalJobs[0].attributes, 0, '1');
                }
              }
            }).finally(() =>
            {
              this.loading = false;
              done(true);
            });
          }

          /*this.$axios.get(this.jobsUrl, {
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
              if (!this.isInternal)
              {
                this.emitData(this.rows[0], 0);
              }
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
          });*/
        },
        getInternalJobs(pagination = { pagination: this.pagination })
        {
          this.$axios.get(this.internalJobsUrl, {
            params: {
              'pagination[page]': pagination.pagination.page,
              'pagination[pageSize]': pagination.pagination.rowsPerPage,
              populate: 'html,logo',
              sort: 'publishedAt:desc'
            }
          }
          ).then(response =>
          {
            this.internalJobs = response.data.data;
            if (this.isInternal)
            {
              const selectedId = parseInt(this.$route.params.id);
              const i = this.internalJobs.findIndex(({ id }) => id === selectedId);
              if (i !== -1)
              {
                this.emitData(this.internalJobs[i].attributes, i, '1');
              }
              else
              {
                this.emitData(this.internalJobs[0].attributes, 0, '1');
              }
            }
          }).finally(() =>
          {
          });
        },
        emitData(job, index, internal = '0')
        {
          if (job != null)
          {
            const id = job.id;
            const title = internal === '1' ? convertToSlug(job.jobTitle) : convertToSlug(job.title);
            if (typeof window !== 'undefined')
            {
              window.history.pushState('', 'Title', `/jobs/${id}/${title}`);
            }
            this.$emit('click', {
              job: job,
              internal: internal
            });
            this.$router.push({
              name: 'selected-job',
              params: {
                id: id,
                title: title,
                internal: internal
              }
            });
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
