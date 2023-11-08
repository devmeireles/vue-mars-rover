<template>
  <div class="explore-result text-gray-200">
    <h2 class="text-xl font-semibold">Rover Status</h2>
    <p><strong>Final Position: </strong> {{ finalPosition }}</p>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    finalPosition: String
  }
}
</script>
