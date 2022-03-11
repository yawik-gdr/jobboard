<template>
  <div>
    {{ val.length > max ? val.substring(0,max) + ' ...' : val }}
    <q-tooltip v-if="val.length > max" :delay="300">
      {{ val }}
    </q-tooltip>
  </div>
</template>

<script>

export default {
  name: 'MaxLength',
  props: {
    val: {
      type: String,
      required: true,
      default: ''
    },
    max: {
      type: Number,
      required: true,
      default: 100
    }
  },
};
</script>
