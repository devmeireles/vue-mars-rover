<template>
  <div class="rover-view flex flex-col min-h-screen p-12">
    <div ref="roverRef">
      <Rover />
    </div>
  </div>
</template>

<script lang="ts">
import Rover from '@/components/Rover.vue'

export default {
  name: 'RoverView',
  components: {
    Rover
  },
  data() {
    return {}
  }
}
</script>
