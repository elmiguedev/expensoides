<template>
  <div class="container">
    <h1>Hola, soy el index</h1>
    <div class="row">
      <div v-for="apartment in apartments" :key="apartment.id" class="column">
        <p>{{ apartment.owner }}</p>
        <p>{{ apartment.floor }} - {{ apartment.number }}</p>
      </div>
    </div>
    <button @click="getApartments()">Deptos</button>
  </div>
</template>

<script>
import ApartmentService from "../services/apartment.service";

export default {
  data() {
    return {
      apartments: [],
    };
  },
  methods: {
    getApartments() {
      ApartmentService.getAll().then((apartments) => {
        this.apartments = apartments.data;
      });
    },
  },
};
</script>

<style>
.container {
  width: 100%;
}
.column {
  background-color: darkslateblue;
  color: white;
  padding: 1em;
  margin: 1em;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
}
.row {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>