<template>
  <div v-if="selectedJob!=null" class="row">
    <div class="col-12">
      <div>
        <q-card bordered>
          <q-item>
            <q-item-section avatar>
              <q-img fit="contain" :src="jobDetailUrl + 'logo/' + selectedJob.companyId" height="100px" width="150px">
                <template #loading>
                  <q-spinner-orbit size="xs" color="grey" />
                </template>
              </q-img>
            </q-item-section>

            <q-item-section>
              <q-item-label align="left">
                {{ selectedJob.title }}
              </q-item-label>
              <q-item-label align="left" caption>
                {{ selectedJob.companyName }}
              </q-item-label>
              <q-item-label caption>
                {{ selectedJob.regionText }}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn
                push
                rounded
                size="xl"
                type="a"
                :href="apply"
                color="secondary"
              >
                {{ $t('apply') }}
              </q-btn>
            </q-item-section>
          </q-item>
          <q-card-section class="col-grow overflow-hidden row">
            <q-page class="row col-grow">
              <iframe
                class="col-grow rounded-borders full-height"
                :src="jobDetailUrl + 'job/1/' + selectedJob.id + '.html'"
              />
            </q-page>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>

import { useMeta } from 'quasar';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'JobDetailFrame',
  setup()
  {
    const title = ref('IT Jobs jobboard');
    const description = ref('IT Jobs jobboard');
    const keywords = ref('IT Jobs jobboard');

    // NOTICE the parameter here is a function
    // Under the hood, it is converted to a Vue computed prop for reactivity
    useMeta(() =>
    {
      return {
        // whenever "title" from above changes, your meta will automatically update
        title: title.value,
        titleTemplate: title => `${title} @ IT Jobs`,
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
      title.value = val; // will automatically trigger a Meta update due to the binding
    }

    function pageDescription(val)
    {
      title.value = val; // will automatically trigger a Meta update due to the binding
    }

    return {
      jobDetailUrl: `${process.env.YAWIK_EXTERNAL_JOB_URL}`,
      pageTitle,
      pageDescription,
      pageKeywords
    };
  },
  props: {
    selectedJob: {
      type: [Object, null],
      required: true,
      default: null
    }
  },
  computed:
  {
    apply()
    {
      let link = '';

      if ('keyValuePortalApplyUrl314' in this.selectedJob)
      {
        link = this.selectedJob.keyValuePortalApplyUrl314;
      }
      else if ('keyValuePortalApplyUrl449' in this.selectedJob)
      {
        console.error('pass par la');
        link = this.selectedJob.keyValuePortalApplyUrl449;
      }
      else if ('keyValuePortalApplyUrl1143' in this.selectedJob)
      {
        console.error('pass par la1');
        link = this.selectedJob.keyValuePortalApplyUrl1143;
      }
      else if ('keyValuePortalApplyUrl1599' in this.selectedJob)
      {
        console.error('pass par la2');
        link = this.selectedJob.keyValuePortalApplyUrl1599;
      }
      else if ('applicationEmail' in this.selectedJob)
      {
        console.error('pass par la3');
        link = 'mailto:' + this.selectedJob.applicationEmail;
      }
      console.log('Link', link);
      return link;
    }
  },
  watch: {
    selectedJob(newVal, oldVal)
    {
      console.log('Val changed');
      this.pageTitle(newVal.title);
    }
  },
});
</script>

<style lang="scss">
  .highlights
  {
    background-color: $secondary;
  }
</style>

<i18n>
  {
  "en": {
  "search-placeholder": "Job title, Company or Location",
  "job-title": "Job title",
  "address": "Address",
  "apply": "Apply"
  },
  "de": {
  "search-placeholder": "Anzeigentitel, Firma oder Ort",
  "job-title": "Job title",
  "address": "Address",
  "apply": "Bewerben"
  }
  }
</i18n>
