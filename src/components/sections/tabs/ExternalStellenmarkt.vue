<template>
  <span v-for="val in data" :key="val.id" class="col-lg-3 col-md-3 col-sm-4 col-xs-12">
    <q-card class="jobs fit">
      <q-card-section>
        <q-item
          clickable
          disable
        >
          <q-item-section avatar>
            <q-img fit="contain" :src="val.organizationLogo" width="100px" height="50px" />
            <my-date :date="val.dateStart" />
          </q-item-section>

          <q-item-section>
            <q-item-label align="left">
              {{ val.title }}
            </q-item-label>
            <q-item-label align="left" caption>
              {{ val.organization }}
            </q-item-label>
            <q-item-label align="left" caption>{{ val.location }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-card-section>
    </q-card>
  </span>
</template>

<script>

import MyDate from 'src/components/Date.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ExternalStellenmarkt',
  components:
  {
    MyDate
  },
  data()
  {
    return {
      filter: {
        q: '',
        l: '',
        d: ''
      },
      tableFilter: {},
      loading: false,
      pagination: {
        sortBy: 'date',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10
      },
      data: [],
    };
  },
  computed:
      {
        host()
        {
          return process.env.YAWIK_EXTERNAL_JOBS;
        },
      },
  mounted()
  {
    this.onRequest({
      pagination: this.pagination
    });
  },
  methods: {
    route(id, title)
    {
      this.$router.push({
        name: 'jobs',
        params: {
          id: id,
          title: title
        }
      });
    },
    onRequest(props)
    {
      const {
        page,
        rowsPerPage,
        rowsNumber,
        sortBy,
        descending
      } = props.pagination;

      this.loading = true;

      // emulate server
      setTimeout(() =>
      {
        // get all rows if "All" (0) is selected
        const fetchCount = rowsPerPage === 0 ? rowsNumber : rowsPerPage;

        // fetch data from "server"
        const returnedData = this.fetchFromServer(
          page,
          fetchCount,
          sortBy,
          descending,
          this.filter
        );
        console.log(returnedData);

        // clear out existing data and add new
        this.data.splice(0, this.data.length, ...returnedData);

        // don't forget to update local pagination object
        this.pagination.page = page;
        this.pagination.rowsPerPage = rowsPerPage;
        this.pagination.sortBy = sortBy;
        this.pagination.descending = descending;

        // ...and turn of loading indicator
        this.loading = false;
      }, 2000);
    },

    // emulate ajax call
    // SELECT * FROM ... WHERE...LIMIT...
    fetchFromServer(page, count, sortBy, descending, filter)
    {
      const data = [];
      const query = {
        json: '1',
        page: page,
        count: count,
        q: 'vue',
        l: filter.l,
        d: filter.d,
      };

      const queryStr = Object.keys(query)
        .map(k => `${k}=${encodeURIComponent(query[k])}`)
        .join('&');

      this.$axios
        .get(this.host + '?' + queryStr)
        .then(response =>
        {
          this.data = response.data.jobs;
          this.pagination.rowsNumber = response.data.total;
          this.pagination.page = response.data.currentPage;
        })
        .catch(() =>
        {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: 'Loading failed',
            icon: 'report_problem'
          });
        });

      return data;
    },

    setFilter()
    {
      this.tableFilter = {
        q: this.filter.q,
        l: this.filter.l,
        d: this.filter.d
      };
    }
  }
});
</script>

<style lang="scss">

  body
  {
    font-family: sans-serif;
    padding: 1em;
  }

  .jobs
  {
    background-color: $primary-light;
  }

</style>
