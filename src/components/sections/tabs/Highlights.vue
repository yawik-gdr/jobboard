<template>
  <div class="row justify-center" align="center">
    <div class="col-12">
      <div class="text-h6">{{ $t('first-ad') }}</div>
    </div>
    <div class="col-12">
      <div class="row justify-center q-gutter-md">
        <span v-for="val in rows" :key="val.id" class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
          <q-card class="jobs fit">
            <q-card-section>
              <q-item
                clickable
                @click="route(val.id, val.attributes.jobTitle)"
              >
                <q-item-section avatar>
                  <q-img fit="contain" :src="jobHost + val.attributes.logo.formats.thumbnail.url" height="50px"
                         width="100px"
                  />
                  <my-date :date="val.attributes.publishedAt" />
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
        <stellenmarkt />
      </div>
    </div>
  </div>
</template>

<script>

import MyDate from 'src/components/Date.vue';
import Stellenmarkt from 'src/components/sections/tabs/ExternalStellenmarkt.vue';

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Highlights',
  components:
  {
    MyDate,
    Stellenmarkt
  },
  data()
  {
    return {
      loading: false,
      pagination: {
        sortBy: 'date',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10
      },
      rows: [],
      jobsUrl: `${process.env.YAWIK_API_URL}/api/jobs`,
    };
  },
  computed:
      {
        jobHost()
        {
          return process.env.YAWIK_JOB_URL;
        },
      },
  mounted()
  {
    this.getJobs();
  },
  methods: {
    route(id, title)
    {
      this.$router.push({
        name: 'jobs',
        params: {
          id: id,
          title: title
        }
      });
    },
    getJobs(pagination = { pagination: this.pagination })
    {
      this.loading = true;
      this.$axios.get(this.jobsUrl, {
        params: {
          'pagination[page]': pagination.pagination.page,
          'pagination[pageSize]': pagination.pagination.rowsPerPage,
          populate: 'html,logo',
          sort: 'publishedAt:desc'
        }
      }
      ).then(response =>
      {
        this.rows = response.data.data;
        this.setPagination(response.data.meta.pagination);
      }).finally(() =>
      {
        this.loading = false;
      });
    },
    setPagination(pagination)
    {
      this.pagination = {
        sortBy: 'asc',
        descending: true,
        rowsNumber: pagination.total,
        page: pagination.page,
        rowsPerPage: pagination.pageSize
      };
    },
  }
});
</script>

<style lang="scss">

  body
  {
    font-family: sans-serif;
    padding: 1em;
  }

  .jobs
  {
    background-color: $primary-light;
  }

</style>

<i18n>
{
  "en": {
    "search-placeholder": "Job title, Company or Location",
    "first-ad": "Place your first ad! Free of charge.",
  },
  "de": {
    "search-placeholder": "Anzeigentitel, Firma oder Ort",
    "first-ad": "Schalten sie ihre erste Anzeige! Kostenlos.",
  },
  "fr": {
    "search-placeholder": "Anzeigentitel, Firma oder Ort",
    "first-ad": "Schalten sie ihre erste Anzeige! Kostenlos.",
  },
}
</i18n>
