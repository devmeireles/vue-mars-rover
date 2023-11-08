<template>
  <div class="rover-view min-h-screen flex flex-row items-stretch gap-12 p-24">
    <RoverForm
      :plateauSize="plateauSize"
      :landingPosition="landingPosition"
      :instructions="instructions"
      :finalPosition="finalPosition"
      @startRover="startRover"
    />

    <div class="response flex flex-col items-center gap-6">
      <ExploreResult v-if="finalPosition" :finalPosition="finalPosition" />

      <ExploreMap v-if="exploredMap" :exploredMap="exploredMap" />
    </div>
  </div>
</template>

<script lang="ts">
import ExploreMap from '@/components/ExploreMap.vue'
import ExploreResult from '@/components/ExploreResult.vue'
import RoverForm from '@/components/RoverForm.vue'
import Rover from '@/helpers/rover.helper'

export default {
  name: "RoverView",
  components: {
    RoverForm,
    ExploreResult,
    ExploreMap
  },
  data() {
    return {
      plateauSize: 5,
      landingPosition: '1 2 N',
      instructions: 'LMLMLMLMM',
      finalPosition: '',
      exploredMap: [] as number[][]
    }
  },
  methods: {
    startRover() {
      const rover = new Rover(this.plateauSize, this.landingPosition, this.instructions)
      rover.start()

      if (rover.finalPosition) {
        this.finalPosition = rover.finalPositionForHuman
        this.exploredMap = rover.exploredMap

        console.log(rover)
      }
    }
  }
}
</script>
