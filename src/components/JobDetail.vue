<template>
  <div v-if="selectedJob!=null" class="row justify-center">
    <div class="col-md-10 q-mt-md">
      <div>
        <q-card>
          <q-item>
            <q-item-section avatar>
              <q-img v-if="selectedJob.logo" fit="contain" :src="jobDetailUrl + selectedJob.logo.url" height="100px" width="150px">
                <template #loading>
                  <q-spinner-orbit size="xs" color="grey" />
                </template>
              </q-img>
            </q-item-section>

            <q-item-section>
              <q-item-label align="left">
                {{ selectedJob.jobTitle }}
              </q-item-label>
              <q-item-label align="left" caption>
                {{ selectedJob.organization }}
              </q-item-label>
              <q-item-label caption>
                {{ selectedJob.formattedAddress }}
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
              {{ a }}
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>{{ selectedJob.introLabel }}</q-item-label>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <q-item-label caption v-html="selectedJob.intro" />
              <h2>{{ selectedJob.jobTitle }}</h2>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>{{ selectedJob.taskLabel }}</q-item-label>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <q-item-label caption v-html="selectedJob.tasks" />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>{{ selectedJob.profileLabel }}</q-item-label>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <q-item-label caption v-html="selectedJob.profile" />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>{{ selectedJob.offerLabel }}</q-item-label>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <q-item-label caption v-html="selectedJob.offer" />
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section>
              <q-item-label>{{ selectedJob.contactInfoLabel }}</q-item-label>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <q-item-label caption v-html="selectedJob.contactInfo" />
            </q-item-section>
          </q-item>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>

import { useMeta } from 'quasar';
import { defineComponent, ref } from 'vue';

const ld = {
  '@context': 'https://schema.org/',
  '@type': 'JobPosting'
};

export default defineComponent({

  name: 'JobDetail',
  setup()
  {
    const title = ref('yawik jobboard');
    const description = ref('yawik jobboard');
    const keywords = ref('yawik jobboard');
    const job = ref('');

    // NOTICE the parameter here is a function
    // Under the hood, it is converted to a Vue computed prop for reactivity
    useMeta(() =>
    {
      return {
        // whenever "title" from above changes, your meta will automatically update
        title: title.value,
        titleTemplate: title => `${title} @ yawik`,
        meta: {
          description: {
            name: 'description',
            content: description.value
          },
          keywords: {
            name: 'keywords',
            content: keywords.value
          },
        },
        script: {
          job: {
            type: 'application/ld+json',
            innerHTML: job.value
          }
        },
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
      description.value = val; // will automatically trigger a Meta update due to the binding
    }

    function pageJob(val)
    {
      job.value = val; // will automatically trigger a Meta update due to the binding
    }

    return {
      jobDetailUrl: `${process.env.YAWIK_JOB_URL}`,
      pageTitle,
      pageDescription,
      pageKeywords,
      pageJob
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
      const id = this.$route.params.id;
      return process.env.YAWIK_APPLY_URL + '/?job=' + id;
    }
  },
  watch: {
    selectedJob(newVal, oldVal)
    {
      //console.log(ld);
      this.pageTitle(newVal.jobTitle);
      this.pageJob(`${JSON.stringify(ld)}`);
    }
  },
  mounted()
  {
    this.pageTitle(this.selectedJob.jobTitle);
    this.pageJob(`${JSON.stringify(ld)}`);
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
    "address": "Address",
    "apply": "Apply"
  },
  "de": {
    "search-placeholder": "Anzeigentitel, Firma oder Ort",
    "address": "Addresse",
    "apply": "Bewerben"
  },
  "fr": {
    "search-placeholder": "Titre de l'annonce, entreprise ou lieu",
    "address": "Adresse",
    "apply": "Appliquer"
  }

}
</i18n>
