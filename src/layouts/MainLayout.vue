<template>
  <q-layout view="lHh Lpr lFf">
    <q-header reveal elevated>
      <toolbar @toggle-drawer="toggleLeftDrawer" />
    </q-header>

    <q-footer bordered class="bg-white text-primary">
      <q-tabs no-caps active-color="primary" indicator-color="transparent" class="text-grey">
        <q-route-tab name="imprint" :label="$t('imprint')" to="/info/de/impressum" />
        <q-route-tab name="privacy" :label="$t('privacy')" to="/info/de/privacy" />
        <div>{{ $t('Quasar v') + $q.version }}</div>
      </q-tabs>
    </q-footer>

    <q-drawer
      v-model="leftDrawerOpen"
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          {{ $t('differently_because') }}
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
    <q-page-sticky position="bottom-right" class="z-top" :offset="[20, 20]">
      <q-btn
        fab
        icon="add"
        color="secondary"
        :label="$t('create-job')"
        type="a"
        :href="linkhost"
      />
    </q-page-sticky>
  </q-layout>
</template>

<script>

import EssentialLink from 'components/EssentialLink.vue';
import Toolbar from 'components/Toolbar.vue';
import { useMeta } from 'quasar';
import { defineComponent, ref } from 'vue';
import frontMatter from 'front-matter';

const metaData = {
  title: 'JobBoard',
  titleTemplate: title => `${title} - Trouver des offres d'emploi`,
  meta: {
    description: {
      name: 'description',
      content: 'Le Jobboard Yawik propose une recherche pour les offres d\'emploi créées avec le Jobwizard'
    },
    keywords: {
      name: 'keywords',
      content: 'Jobboard, annonces d\'emploi, offres d\'emploi'
    }
  },
  link: {
    material: {
      rel: 'canonical',
      href: typeof window === 'undefined' ? '' : 'https://jobboard.yawik.org' + window.location.pathname
    }
  },
  noscript: {
    default: 'Le Jobboard Yawik nécessite Javascript'
  }
};

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink,
    Toolbar
  },

  setup()
  {
    useMeta(metaData);
    const leftDrawerOpen = ref(false);

    return {
      metas: [],
      leftDrawerOpen,
      toggleLeftDrawer()
      {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      }
    };
  },
  computed:
  {
    essentialLinks()
    {
      const linksList = [

        /* {
          title: this.$t('form_title'),
          caption: this.$t('form_caption'),
          icon: 'feed',
          link: 'https://form.yawik.org'
        }, */
        {
          title: this.$t('jobs_title'),
          caption: this.$t('jobs_caption'),
          icon: 'view_list',
          link: `${process.env.YAWIK_POST_URL}`
        },
        {
          title: this.$t('src_title'),
          caption: this.$t('src_caption'),
          icon: 'code',
          link: 'https://github.com/yawik-gdr/'
        },
      ];
      return linksList;
    },
  },
  mounted()
  {
    const illustrations = require.context(
      '../pages/infos',
      true,
      /^.*\.md$/
    );
    this.linkhost = `${process.env.YAWIK_POST_URL}`;
    const arr = illustrations.keys();
    const records = arr.slice(Math.max(arr.length - 6, 0)).reverse();

    records.forEach(fileName =>
    {
      const data = illustrations(fileName).default;
      const content = frontMatter(data);
      const attributes = content.attributes;
      console.log(fileName);

      attributes.filename = fileName;
      this.metas.push(content.attributes);
    });
  }
});

</script>

<i18n>
  {
  "en": {
  "jobboard": "Job portal",
  "applicants": "Applicants",
  "search": "find jobs",
  "what": "what are you looking for?",
  "where": "where do you search?",
  "jobs": "Jobs",
  "create-job": "Create Job",
  "infos-for-applicant": "Candidate information",
  "jobs_title": "Jobs annoucement management",
  "jobs_caption": "Create, manage and publish jobs",
  "form_title": "Application forms",
  "form_caption": "Structured applications by mail",
  "docs": "Documentation",
  "src_title": "Open Source",
  "src_caption": "Sources located at Github",
  "sightly-different-jobboard": "a slightly different job board ...",
  "differently_because": "differently, because it's 100% open source."
  },
  "de": {
  "jobboard": "Stellenbörse",
  "applicants": "Bewerber",
  "search": "Jobs finden",
  "what": "was suchen sie?",
  "where": "wo suchen sie?",
  "create-job": "Stellenanzeige erstellen",
  "jobs": "Stellenanzeigen",
  "infos-for-applicant": "Bewerberinformatinen",
  "jobs_title": "Anzeigenverwaltung",
  "jobs_caption": "Stellenanzeigen anlegen, verwalten und veröffentlichen",
  "form_title": "Bewerbungsformulare",
  "form_caption": "Bewerbungen strukturiert per Mail",
  "docs": "Dokumentation",
  "src_title": "Open Source",
  "src_caption": "Quellen auf Github",
  "sightly-different-jobboard": "eine etwas andere Stellenbörse ...",
  "differently_because": "anders, weil es 100% open source ist."
  },
  "fr": {
  "jobboard": "Bourse d'emploi",
  "applicants": "Candidates",
  "search": "Trouver des jobs",
  "what": "que cherchez-vous ?",
  "where": "où cherchez-vous ?",
  "create-job": "Créer une offre d'emploi",
  "jobs": "Offres d'emploi",
  "infos-for-applicant": "Informations sur le candidat",
  "jobs_title": "Gestion des annonces",
  "jobs_caption": "Créer, gérer et publier des offres d'emploi",
  "form_title": "Formulaires de candidature",
  "form_caption": "Candidatures structurées par e-mail",
  "docs": "Documentation",
  "src_title": "Open Source",
  "src_caption": "Les sources sur Github",
  "sightly-different-jobboard": "une bourse de l'emploi un peu différente ...",
  "differently_because": "différent, car il est 100% open source."
  }
  }
</i18n>
