<template>
  <div class="c-city-btns">
    <el-button
      v-for="it in cities"
      :key="it.id"
      :class="{ 'el-button--primary': it.id == c_id }"
      @click="changeCity(it.id)"
    >
      {{ it.name }}
    </el-button>
  </div>
</template>
<script>
import { getCity } from '@/api/admin.js';

export default {
  name: 'CityBtns',
  data() {
    return {
      c_id: '',
      cities: [],
    };
  },
  async created() {
    const { data } = await getCity();
    this.cities = data;
    this.c_id = data[0].id;
    this.$emit('changeCity', this.c_id);
  },
  methods: {
    changeCity(id) {
      this.c_id = id;
      this.$emit('changeCity', this.c_id);
    },
  },
};
</script>
