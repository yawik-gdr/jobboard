<template>
  <span v-for="(val, i) in rows" :key="i" class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
    <q-card
      class="jobs fit cursor-pointer"
      @click="route(val.doclist.docs[0].id, val.doclist.docs[0].title)"
    >
      <q-card-section>
        <div
          class="text-left  text-no-wrap"
        >
          <max-length
            :val="val.doclist.docs[0].title"
            :max="40"
            class="text-primary"
          />
        </div>
        <div
          class="text-left cursor-pointer text-no-wrap text-subtitle2"
          @click="company(val.doclist.docs[0].companyName)"
        >
          <max-length
            :val="val.doclist.docs[0].companyName"
            :max="40"
          />
        </div>
        <q-separator />
        <q-item>
          <q-item-section avatar>
            <q-img
              fit="contain"
              :src="jobDetailUrl + 'logo/' + val.doclist.docs[0].companyId"
              height="50px"
              width="100px"
            >
              <template #loading>
                <q-spinner-orbit size="xs" color="grey" />
              </template>
            </q-img>

          </q-item-section>
          <q-item-section>
            <q-item-label align="left" caption>
              {{ val.doclist.docs[0].regionText }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
      <q-card-action class="relativ-position absolute-bottom">
        <q-badge color="grey-2"><my-date :date="val.doclist.docs[0].datePublishStart" /></q-badge>
      </q-card-action>
      <q-card-action>
        <q-badge
          v-if="val.doclist.numFound > 1"
          color="secondary"
          floating
          class="cursor-pointer"
          @click="company(val.doclist.docs[0].companyName)"
        >
          {{ val.doclist.numFound }}
          <q-tooltip>
            {{ val.doclist.numFound }}
            {{ $t('more') }}
          </q-tooltip>
        </q-badge>
      </q-card-action>
    </q-card>
  </span>
</template>

<script>

import MyDate from 'src/components/Date.vue';
import MaxLength from 'src/components/MaxLength.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ExternalJwn',
  components:
  {
    MyDate,
    MaxLength
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
      jobsUrl: `${process.env.YAWIK_EXTERNAL_API_JWN}`,
      jobDetailUrl: `${process.env.YAWIK_EXTERNAL_JOB_JWN}`
    };
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
      console.log('URL:', this.jobsUrl);
      this.loading = true;
      this.$axios.get(this.jobsUrl, {
        params: {
          q: '*',
          fq: 'isActive:1',
          rows: 12,
          group: true,
          fl: 'id,companyName,title,companyId,datePublishStart,regionText',
          'group.field': 'companyTag',
          'group.sort': 'datePublishStart desc',
          sort: 'datePublishStart desc'
        }
      }
      ).then(response =>
      {
        this.rows = response.data.grouped.companyTag.groups;
        this.companies = response.data.facet_counts.facet_fields.companyTag;

        this.setPagination(response.data.grouped.companyTag);
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
        rowsNumber: 12,
        page: 0,
        rowsPerPage: pagination.groups.length
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
