<template>
  <div class="map flex flex-col items-center">
    <div class="row flex" v-for="(row, rowIndex) in exploredMap" :key="rowIndex">
      <div
        class="cell flex justify-center items-center w-12 h-12 border text-xs border-black bg-gray-300"
        :class="{ 'bg-green-300': cell === 1 }"
        v-for="(cell, cellIndex) in row"
        :key="cellIndex"
      >
        {{ cell > 0 ? cell : null }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    exploredMap: Array
  }
}
</script>
