<template>
  <q-page>
    <div class="row">
      <searchresult class="col-4" @click="getEmittedData" />
      <job-detail v-if="isInternalSelected" class="col-8" :selected-job="selectedJob" />
      <job-detail-frame v-else class="col-8" :selected-job="selectedJob" />
    </div>
    <!-- content -->
  </q-page>
</template>

<script>
import searchresult from 'src/components/SearchResultSplitted.vue';
import JobDetailFrame from 'src/components/JobDetailFrame.vue';
import JobDetail from 'src/components/JobDetail.vue';

export default {
  name: 'Jobs',
  components:
      {
        searchresult,
        JobDetailFrame,
        JobDetail,
      },
  data()
  {
    return {
      selectedJob: null,
      isInternalSelected: false
    };
  },
  mounted()
  {

  },
  methods:
      {
        getEmittedData(value)
        {
          this.selectedJob = value.job;
          this.isInternalSelected = value.internal;
          console.log(value);
        }
      },

};
</script>
