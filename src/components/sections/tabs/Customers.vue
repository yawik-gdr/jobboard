<template>
  <div class="row q-gutter-md justify-center" align="center">
    <div class="text-h6 text-secondary full-width">{{ $t('companies') }}</div>
    <div class="row justify-center q-gutter-md">
      <span v-for="(val, i) in rows" :key="i" class="col-lg-2 col-md-3 col-sm-4 col-xs-12">
        <q-card class="fit shadow-3">
          <q-badge v-if="val.doclist.numFound" color="secondary" floating>
            {{ val.doclist.numFound }}
            <q-tooltip>
              {{ val.doclist.numFound }}
              {{ $t('more') }}
              {{ link(val.doclist.docs[0]) }}

            </q-tooltip>
          </q-badge>
          <q-card-section>
            <q-img
              :src="logo(val.doclist.docs[0])"
              fit="contain"
              img-class="company-logo"
              height="50px"
            >
              <q-tooltip>
                {{ val.doclist.docs[0].companyName }}
              </q-tooltip>
            </q-img>
          </q-card-section>
          <q-card-section>
            <div>
              {{ desc(val.doclist.docs[0]) }}
            </div>
            <br>
          </q-card-section>
          <q-card-action class="relative-position absolute-bottom bg-grey-3">
            <q-btn
              :label="$t('jobs')"
              no-caps
              flat
              :to="`/jobs-by/${val.doclist.docs[0].companyName}`"
              class="vertical-bottom"
            />
            <q-btn
              v-if="link(val.doclist.docs[0])"
              :icon="icon(val.doclist.docs[0])"
              flat
              type="a"
              :href="link(val.doclist.docs[0])"
            />
          </q-card-action>
        </q-card>
      </span>
    </div>
    {{ company }}
  </div>
</template>

<script>
import customerExtra from 'src/assets/data/customers.json';

export default {
  name: 'Customers',
  props: {
    company: {
      type: [String, Object],
      required: false,
      default: ''
    }
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
      companies: [],
      rows: [],
      jobsUrl: `${process.env.YAWIK_EXTERNAL_API_JWN}`,
      jobDetailUrl: `${process.env.YAWIK_EXTERNAL_JOB_JWN}`,
    };
  },
  mounted()
  {
    this.getCompanies();
  },
  methods:
  {
    logo(val)
    {
      const i = customerExtra.findIndex(o => o.name === val.companyName);
      return i >= 0 && customerExtra[i].logo ? customerExtra[i].logo : this.jobDetailUrl + 'logo/' + val.companyId;
    },
    desc(val)
    {
      const i = customerExtra.findIndex(o => o.name === val.companyName);
      return i === -1 ? '' : customerExtra[i].description;
    },
    link(val)
    {
      const i = customerExtra.findIndex(o => o.name === val.companyName);
      let link = '';
      if (i > 0)
      {
        if (customerExtra[i].url)
        {
          link = customerExtra[i].url;
        }
        else if (customerExtra[i].home)
        {
          link = customerExtra[i].home;
        }
      }
      return link;
    },
    icon(val)
    {
      const i = customerExtra.findIndex(o => o.name === val.companyName);
      let icon1 = '';
      if (i > 0)
      {
        if (customerExtra[i].url)
        {
          icon1 = 'mdi-wikipedia';
        }
        else if (customerExtra[i].home)
        {
          icon1 = 'home';
        }
      }
      return icon1;
    },
    getCompanies(pagination = { pagination: this.pagination })
    {
      console.log('URL:', this.jobsUrl);
      this.loading = true;
      this.$axios.get(this.jobsUrl, {
        params: {
          q: '*',
          fq: 'isActive:1',
          rows: 12,
          group: true,
          fl: 'id,companyName,companyId',
          'group.field': 'companyTag',
          'group.sort': 'datePublishStart desc',
          sort: 'random_124 desc'
        }
      }
      ).then(response =>
      {
        this.rows = response.data.grouped.companyTag.groups;
        this.companies = response.data.facet_counts.facet_fields.companyTag;
      }).finally(() =>
      {
        this.loading = false;
      });
    },
  }
};
</script>

<style lang="scss">

.company-logo
{
  filter: grayscale(1);
}

.company-logo:hover
{
  filter: grayscale(0);
}

</style>

<i18n>
{
  "en": {
    "companies": "happy customers.",
  },
  "de": {
    "companies": "zufriedene Kunden.",
  },
  "fr": {
    "companies": "des clients satisfaits",
  },
}
</i18n>
