<template>
  <q-page>
    <q-splitter
      v-model="splitterModel"
      style="height: 95%;"
    >
      <template #before>
        <searchresult @click="getEmittedData" />
      </template>

      <template #after>
        <job-detail v-if="isInternalSelected" :selected-job="selectedJob" />
        <job-detail-frame v-else :selected-job="selectedJob" />
      </template>
    </q-splitter>
    <!-- content -->
  </q-page>
</template>

<script>
import searchresult from 'src/components/SearchResultSplitted.vue';
import JobDetailFrame from 'src/components/JobDetailFrame.vue';
import JobDetail from 'src/components/JobDetail.vue';
import { ref } from 'vue';

export default {
  name: 'Jobs',
  setup()
  {
    return {
      splitterModel: ref(25), // start at 50%
    };
  },
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
