<template>
  <q-toolbar class="row">
    <q-btn
      flat
      dense
      round
      icon="menu"
      :aria-label="$t('menu')"
      @click="emitData"
    >
      <q-tooltip :delay="1000">
        {{ $t('for-developers') }}
      </q-tooltip>
    </q-btn>
    <q-toolbar-title>
      <q-btn no-caps flat :icon="$q.config.logo" to="/">
        {{ '&nbsp;' + $q.config.sitename }}
      </q-btn>
    </q-toolbar-title>

    <q-separator dark vertical />
    <q-btn v-for="(val1,idx1) in top" :key="idx1" stretch flat no-caps :label="$t(val1.label)">
      <q-menu
        transition-show="jump-down"
        transition-hide="jump-up"
      >
        <q-list>
          <q-item
            v-for="(val2,idx2) in top[idx1].items"
            :key="idx2"
            clickable
            :disable="val2.disable ? true : false"
            :to="(val2.type=='info')?'/info/'+$root.$i18n.locale+val2.to: val2.to"
          >
            <q-item-section avatar>
              <q-icon
                :color="val2.color ? val2.color : 'secondary'"
                :name="val2.icon"
              />
            </q-item-section>
            <q-item-section>{{ $t(val2.label) }}</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
      <q-separator v-if="idx1 != top[idx1].items.length" style="margin: 0 -16px 0 16px;" dark vertical />
    </q-btn>
    <q-separator dark vertical />
    <q-space />
    <login class="q-mr-sm" />
    <switch-language />
  </q-toolbar>
</template>

<script>

import { defineComponent } from 'vue';
import menu from 'src/assets/menu/top';
import SwitchLanguage from 'src/components/SwitchLanguage.vue';
import Login from 'src/components/Login.vue';

export default defineComponent({
  name: 'Toolbar',
  emits: ['toggle-drawer'],
  components: {
    SwitchLanguage,
    Login
  },
  computed:
  {
    top()
    {
      return menu;
    }
  },
  methods:
  {
    emitData(toggleLeftDrawer)
    {
      this.$emit('toggle-drawer');
    }
  }
});
</script>

<i18n>
{
  "en": {
    "for-applicants": "for applicants",
    "for-companies": "for labs/companies",
    "for-developers": "for software developers",
    "create-jobs": "create job posting",
    "find-jobs": "find jobs",
    "general": "general",
    "prices": "prices",
    "remembered-jobs": "saved jobs",
    "about-yawik": "about Yawik",
    "documentation": "Documentation"
  },
  "fr": {
    "for-applicants": "pour les candidats",
    "for-companies": "pour les laboratoires/entreprises",
    "for-developers": "pour les d??veloppeurs de logiciels",
    "create-jobs": "Cr??er une offre d'emploi",
    "find-jobs": "Trouver des jobs",
    "general": "g??n??ral",
    "prices": "prices",
    "remembered-jobs": "annonces d'emploi enregistr??es",
    "about-yawik": "?? propos de Yawik",
    "documentation": "Documentation"
  }
}
</i18n>
