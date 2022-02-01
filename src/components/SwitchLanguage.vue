<template>
  <q-btn-dropdown no-caps color="primary">
    <template #label>
      <img
        :src="'flags/' + $root.$i18n.locale + '.svg'" width="28"
        :alt="$root.$i18n.locale.substr(0, 2).toUpperCase()"
        class="q-mr-md"
      >
      {{ $q.platform.is.mobile ? '' : $t('localeName') }}
    </template>

    <q-list>
      <q-item
        v-for="(msg,lang) in $root.$i18n.messages"
        :key="lang"
        v-close-popup
        clickable
        class="items-center"
        @click="setLocale(lang)"
      >
        <q-item-section side>
          <q-icon
            :color="lang === $root.$i18n.locale ? null : 'transparent'"
            name="mdi-check"
          />
        </q-item-section>
        <q-item-label>{{ $root.$i18n.messages[lang].localeName() }}</q-item-label>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script>
import { GET_SETTINGS, SET_SETTINGS } from '../store/names';
import { mapGetters } from 'vuex';
import { useQuasar } from 'quasar';

export default {
  name: 'SwitchLanguage',
  computed:
  {
    ...mapGetters([GET_SETTINGS]),
    defaultLanguage()
    {
      console.log('Settings ' + this[GET_SETTINGS]);
      return this[GET_SETTINGS].defaultLanguage;
    }
  },
  created()
  {
    const $q = useQuasar();
    let lang =process.env.SERVER?'': $q.lang.getLocale().substr(0, 2).toLowerCase();

    if (this[GET_SETTINGS].defaultLanguage !== '')
    {
      lang = this[GET_SETTINGS].defaultLanguage;
    }
    this.$root.$i18n.locale = this.$root.$i18n.availableLocales.includes(lang)
      ? lang
      : this.$root.$i18n.fallbackLocale;
  },
  methods:
  {
    // ...mapMutations([SET_SETTINGS]),
    // ...mapActions([SET_SETTINGS]),
    setLocale(lang)
    {
      console.log('Lang ' + lang);
      this.$store.commit(SET_SETTINGS, { defaultLanguage: lang });
      this.$root.$i18n.locale = lang;
      //this[SET_SETTINGS]({ defaultLanguage: lang });

      import(
        /* webpackInclude: /(fr|de|en-GB)\.js$/ */
        'quasar/lang/' + (lang === 'en' ? 'en-GB' : lang)
      ).then(lang =>
      {
        this.$q.lang.set(lang.default);
      });
      // console.log("Settings "+JSON.stringify(this.$store.getters.GET_SETTINGS))
    }
  }
};
</script>
