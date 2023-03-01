<template>
  <div class="row justify-center">
    <q-card style="width: 100%;">
      <q-tabs
        v-model="tab"
        inline-label
        outside-arrows
        mobile-arrows
        no-caps
        active-color="primary"
        indicator-color="secondary"
      >
        <q-tab class="col-md-2" name="highlights" icon="star" :label="$t('highlights')" />
        <q-tab class="col-md-2" name="industries" icon="mdi-factory" :label="$t('industries')" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated class="full-width">
        <q-tab-panel name="highlights">
          <highlights />
        </q-tab-panel>

        <q-tab-panel name="highlights">
          <highlights />
        </q-tab-panel>

        <q-tab-panel name="industries">
          <industries />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script>

import { ref } from 'vue';
import highlights from 'src/components/sections/tabs/Highlights.vue';
// import companies from 'src/components/sections/tabs/Customers.vue';
import industries from 'src/components/sections/tabs/Industries.vue';
// import cities from 'src/components/sections/tabs/Cities.vue';

export default {
  name: 'SearchSection',
  components: {
    highlights,
    industries
    //    companies,
    //    cities,
  },
  setup()
  {
    return {
      tab: ref('highlights'),
    };
  }
};
</script>

<i18n>
{
  "en": {
    "companies": "Companies",
    "cities": "Cities",
    "industries": "Labs",
    "highlights": "Highlights",
  },
  "fr": {
    "companies": "Entreprises",
    "cities": "Villes",
    "industries": "Laboratoire",
    "highlights": "Points forts",
  }
}
</i18n>
