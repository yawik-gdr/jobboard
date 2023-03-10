<template>
  <div class="row justify-center" align="center">
    <div class="col-12">
      <div class="text-h6">{{ $t('first-ad') }}</div>
    </div>
    <div class="col-12">
      <div class="row justify-center q-gutter-md">
        <span v-for="val in rows" :key="val.id" class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
          <q-card
            class="fit cursor-pointer"
            @click="route(val.id, convertToSlug(val.attributes.jobTitle), 1)"
          >
            <q-card-section>
              <q-item>
                <q-item-section avatar>
                  <q-img v-if="val.attributes.logo"
                         fit="contain"
                         :src="jobHost + val.attributes.logo.url"
                         height="50px"
                         width="100px"
                  >
                    <template #loading>
                      <q-spinner-orbit size="xs" color="grey" />
                    </template>
                  </q-img>
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
        <jwn />
      </div>
    </div>
  </div>
</template>

<script>

import MyDate from 'src/components/Date.vue';
import convertToSlug from 'src/lib/utils.js';
import Jwn from 'src/components/sections/tabs/ExternalJwn.vue';

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Highlights',
  components:
  {
    MyDate,
    Jwn
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
      jobsUrl: `${process.env.YAWIK_SEARCH_URL}/api/jobs`,
    };
  },
  computed:
  {
    jobHost()
    {
      return process.env.YAWIK_SEARCH_URL;
    },
    convertToSlug()
    {
      return convertToSlug;
    }
  },
  mounted()
  {
    this.getJobs();
  },
  methods: {
    route(id, title, internal)
    {
      this.$router.push({
        name: 'selected-job',
        params: {
          id: id,
          title: title,
          internal: internal
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
  }

</style>

<i18n>
{
  "en": {
    "search-placeholder": "Job title, Company or Location",
    "first-ad": "",
  },
  "de": {
    "search-placeholder": "Anzeigentitel, Firma oder Ort",
    "first-ad": "Schalten sie ihre erste Anzeige! Kostenlos.",
  },
  "fr": {
    "search-placeholder": "Emploi, Laboratoire, ou Lieu",
    "first-ad": "",
  },
}
</i18n>
