<template>
  <div class="row q-gutter-md justify-center" align="center">
    <div class="text-h6 full-width">{{ $t('cities') }}</div>
    <span v-for="(val,i) in cities" :key="i" class="col-lg-2 col-md-3 col-sm-6 col-xs-12">
      <q-card class="q-py-md-md">
        <q-item clickable type="a" :href="val.extra.wikipedia">
          <q-item-section avatar>
            <q-icon size="xl" :name="val.extra.wappen" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{ val.city }}</q-item-label>
            <q-item-label caption>
              {{ val.extra.region }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
        <q-card-actions align="center">
          <q-btn
            no-caps
            size="sm"
            :label="val.c + ' ' + $t('jobs')"
            :to="`/jobs-in/${val.city}`"
          />
          <q-btn v-if="val.extra.url" size="sm" flat
                 :icon="val.extra.icon" type="a"
                 :href="val.extra.url" no-caps
          >
            <q-tooltip>
              {{ $t('weitere Jobs in') }} {{ val.city }}
            </q-tooltip>
          </q-btn>
        </q-card-actions>
      </q-card>
    </span>
  </div>
</template>

<script>
import citiesValid from 'src/assets/data/citiesValid.json';
import citiesExtra from 'src/assets/data/citiesExtra.json';

export default {
  name: 'Cities',
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
      jobsUrl: `${process.env.YAWIK_EXTERNAL_SEARCH_URL}`,
      // jobDetailUrl: `${process.env.YAWIK_JOB_URL}`,
    };
  },
  computed:
      {
        cities()
        {
          const data = [];
          let i,
            idx,
            extra;

          console.debug(citiesValid);
          for (i = 0; i < this.rows.length; i++)
          {
            idx = citiesValid.findIndex((w) => w === this.rows[i]);
            extra = citiesExtra.findIndex((w) => w.name === this.rows[i]);
            if (idx >= 0)
            {
              console.debug(i, extra, idx, this.rows[i]);
              data.push({
                city: this.rows[i],
                c: this.rows[i + 1],
                extra: extra >= 0 ? citiesExtra[extra] : {}
              });
              if (data.length > 17)
              {
                break;
              }
            }
            i++;
          }
          return data;
        }
      },
  mounted()
  {
    this.getJobs();
  },
  methods:
      {
        getJobs(pagination = { pagination: this.pagination })
        {
          console.log('URL:', this.jobsUrl);
          this.loading = true;
          this.$axios.get(this.jobsUrl, {
            params: {
              q: '*',
              rows: 0,
              fl: 'id'
            }
          }
          ).then(response =>
          {
            this.rows = response.data.facet_counts.facet_fields.regionList;
          }).finally(() =>
          {
            this.loading = false;
          });
        },
      }
};
</script>

<i18n>
  {
  "en": {
  "cities": "Cities and regions with IT jobs",
  },
  "de": {
  "cities": "Städte und Regionen mit IT Jobs",
  },
  "fr": {
  "cities": "Villes et régions avec emplois IT",
  },
  }
</i18n>
