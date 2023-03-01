<template>
  <div v-if="selectedJob!=null" class="row justify-center">
    <div class="col-md-10 q-mt-md">
      <div>
        <q-card>
          <q-item>
            <q-item-section avatar>
              <q-img v-if="selectedJob.logo"
                     fit="contain"
                     :src="jobDetailUrl + selectedJob.logo.url"
                     height="100px" width="150px"
              >
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
                target="_blank"
                rel="noopener noreferrer"
                color="secondary"
              >
                {{ $t('btn.apply') }}
              </q-btn>
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

import createJsondLd from 'src/lib/createJsonLd.js';
import { useMeta } from 'quasar';
import { defineComponent, ref } from 'vue';

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
      /*const id = this.$route.params.id;
      return process.env.YAWIK_APPLY_URL + '/?job=' + id;*/
      let link = '';

      if ('keyValuePortalApplyUrl314' in this.selectedJob)
      {
        link = this.selectedJob.keyValuePortalApplyUrl314;
      }
      else if ('keyValuePortalApplyUrl449' in this.selectedJob)
      {
        link = this.selectedJob.keyValuePortalApplyUrl449;
      }
      else if ('keyValuePortalApplyUrl1143' in this.selectedJob)
      {
        link = this.selectedJob.keyValuePortalApplyUrl1143;
      }
      else if ('keyValuePortalApplyUrl1599' in this.selectedJob)
      {
        link = this.selectedJob.keyValuePortalApplyUrl1599;
      }
      else if ('applyEmail' in this.selectedJob)
      {
        link = 'mailto:' + this.selectedJob.applyEmail;
      }
      console.log('Link', link);
      console.log('Link', this.selectedJob);
      return link;
    }
  },
  watch: {
    selectedJob(newVal, oldVal)
    {
      const json = createJsondLd(newVal);
      console.log('JSON', json);
      this.pageTitle(newVal.jobTitle);
      this.pageJob(`${createJsondLd(this.selectedJob)}`);
    }
  },
  mounted()
  {
    this.pageTitle(this.selectedJob.jobTitle);
    this.pageJob(`${createJsondLd(this.selectedJob)}`);
  },
});
</script>

<style lang="scss">
  .highlights
  {
    background-color: $secondary;
  }
</style>
