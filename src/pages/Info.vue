<template>
  <q-page padding>
    <q-card
      v-if="toc.length"
      class="gt-xs float-right q-ma-md"
      flat
      bordered
    >
      <q-card-section horizontal>
        <!-- We use 'q-expansion-item' to enable toggling (hide/show) the TOC -->
        <q-expansion-item
          default-opened
          icon="toc"
          label="Table of contents"
        >
          <q-separator />
          <q-list>
            <template v-for="item in toc">
              <q-item
                v-if="!item.children.length"
                :key="item.id"
                :to="`#${item.id}`"
              >
                <q-item-section>{{ item.label }}</q-item-section>
              </q-item>
              <q-expansion-item
                v-else
                :key="item.id"
                default-opened
                :label="item.label"
                :to="`#${item.id}`"
              >
                <q-list>
                  <q-item
                    v-for="childItem in item.children"
                    :key="childItem.id"
                    dense
                    :inset-level="0.2"
                    :to="`#${childItem.id}`"
                  >
                    <q-item-section>{{ childItem.label }}</q-item-section>
                  </q-item>
                </q-list>
              </q-expansion-item>
            </template>
          </q-list>
        </q-expansion-item>
      </q-card-section>
    </q-card>
    <q-markdown :src="markdown" toc @data="onToc" />
  </q-page>
</template>

<script>
import { QMarkdown } from '@quasar/quasar-ui-qmarkdown';
import frontMatter from 'front-matter';
import { useMeta } from 'quasar';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'Info',
  components: {
    QMarkdown
  },
  setup()
  {
    const title = ref('yawik jobboard');
    const description = ref('yawik jobboard');
    const keywords = ref('yawik jobboard');

    // NOTICE the parameter here is a function
    // Under the hood, it is converted to a Vue computed prop for reactivity
    useMeta(() =>
    {
      return {
        // whenever "title" from above changes, your meta will automatically update
        title: title.value,
        titleTemplate: title => `${title} - Yawik News`,
        meta: {
          description: {
            name: 'description',
            content: description.value
          },
          keywords: {
            name: 'keywords',
            content: keywords.value
          },
        }
      };
    });

    function pageTitle(val)
    {
      title.value = val; // will automatically trigger a Meta update due to the binding
    }

    function pageKeywords(val)
    {
      keywords.value = val;
    }

    function pageDescription(val)
    {
      description.value = val;
    }

    return {
      pageTitle,
      pageDescription,
      pageKeywords
    };
  },
  data()
  {
    return {
      markdown: null,
      date: null,
      category: null,
      toc: [],
    };
  },
  watch: {
    '$route'(path)
    {
      console.log('route watcher');
      const file = this.$route.path.split('/').pop();
      this.load(file);
    },
    '$i18n.locale': function(newVal, oldVal)
    {
      console.log('locale change', newVal);
      this.$router.push({
        name: 'info',
        params: {
          lang: newVal,
          filename: this.$route.params.filename,
        }
      });
    }
  },
  mounted()
  {
    this.load();
  },
  methods:
  {
    onToc(toc)
    {
      this.toc = toc;
    },
    load(file)
    {
      const fileName = file || this.$route.params.filename;
      const lang = this.$route.params.lang;
      console.log('file', fileName);
      console.log('lang', lang);
      import('./infos/' + lang + '/' + fileName + '.md').then(m =>
      {
        const data = m.default;
        const content = frontMatter(data);
        const attributes = content.attributes;
        this.pageDescription(attributes.desc);
        this.pageTitle(attributes.title);
        this.pageKeywords(attributes.keywords);
        this.markdown = content.body;
        this.category = attributes.cat;
        this.date = attributes.date;
      });
    }
  }
});
</script>
