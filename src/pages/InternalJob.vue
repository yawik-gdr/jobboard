<template>
  <q-page>
    <job-detail v-if="selectedJob!=null" :selected-job="selectedJob" />
  </q-page>
</template>

<script>
import JobDetail from 'src/components/JobDetail.vue';

export default {
  name: 'InternalJob',
  components:
      {
        JobDetail
      },
  data()
  {
    return {
      selectedJob: null,
      jobsUrl: `${process.env.YAWIK_SEARCH_URL}`
    };
  },
  mounted()
  {
    this.getJob();
  },
  methods:
      {
        getEmittedData(value)
        {
          this.selectedJob = value.job;
        },
        getJob()
        {
          this.$axios.get(`${this.jobsUrl}/api/jobs/${this.$route.params.id}`).then(response =>
          {
            this.selectedJob = response.data.success.job;
            console.log('selected job', this.selectedJob);
          });
        }
      }
};
</script>
