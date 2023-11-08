<template>
  <div class="rover-view min-h-screen grid grid-cols-[45%_1fr] gap-12 p-24">
    <RoverForm @startRover="startRover" />

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
  name: 'RoverView',
  components: {
    RoverForm,
    ExploreResult,
    ExploreMap
  },
  data() {
    return {
      formData: {
        plateauSize: 0,
        landingPosition: '',
        instructions: ''
      },
      finalPosition: '',
      exploredMap: [] as number[][]
    }
  },
  methods: {
    startRover(formData: any) {
      Object.assign(this.formData, formData)

      const rover = new Rover(
        this.formData.plateauSize,
        this.formData.landingPosition,
        this.formData.instructions
      )
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
