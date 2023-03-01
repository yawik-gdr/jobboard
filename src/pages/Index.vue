<template>
  <q-page class="row justify-center">
    <q-carousel
      v-if="$route.path === '/'"
      v-model="slide"
      class="full-width"
      animated height="30vh"
    >
      <q-carousel-slide
        name="first"
        :img-src="background"
        class="text-white"
      >
        <div class="absolute-center full-width">
          <div class="claim text-center text-h4 q-mb-lg">{{ $t('sightly-different-jobboard') }}</div>
          <div class="full-width justify-center">
            <search-form />
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>
    <search-section style="min-height: 700px; width: 100%;" class="full-width" />
    <!--
    <advantages />
    <news-and-topics />
-->
  </q-page>
</template>

<script>
import { defineComponent } from 'vue';
import SearchSection from 'src/components/sections/SearchSection.vue';
import SearchForm from 'src/components/SearchForm.vue';
// import Advantages from 'src/components/sections/Advantages.vue';
// import NewsAndTopics from 'src/components/sections/NewsAndTopics.vue';

export default defineComponent({
  name: 'Index',
  setup()
  {
    return {
      slide: 'first',
    };
  },
  components: {
    SearchForm,
    SearchSection,
    //    Advantages,
    //    NewsAndTopics
  },
  computed:
  {
    background()
    {
      return process.env.YAWIK_BACKGROUND;
    }
  }

});
</script>

<i18n>
{
  "en": {
    "sightly-different-jobboard": "a slightly different job board ...",
  },
  "de": {
    "sightly-different-jobboard": "eine etwas andere Stellenbörse ...",
  },
  "fr": {
    "sightly-different-jobboard": "une bourse de l'emploi un peu différente ...",
  }
}
</i18n>
