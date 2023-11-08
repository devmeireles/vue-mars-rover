<template>
  <div class="rover-form px-4">
    <h1 class="text-3xl text-green-400 font-semibold mb-4">Mars Rover</h1>
    <form @submit.prevent="startRover">
      <div class="mb-4">
        <label for="plateauSize" class="block text-sm font-medium text-gray-200"
          >Plateau Size:</label
        >
        <input
          type="number"
          id="plateauSize"
          :value="plateauSize"
          class="mt-1 p-2 rounded-md border border-gray-300 focus:ring focus:ring-green-200 focus:border-green-100 focus:outline-none w-full"
        />
      </div>
      <div class="mb-4">
        <label for="landingPosition" class="block text-sm font-medium text-gray-200"
          >Landing Position:</label
        >
        <input
          type="text"
          id="landingPosition"
          :value="landingPosition"
          class="mt-1 p-2 rounded-md border border-gray-300 focus:ring focus:ring-green-200 focus:border-green-100 focus:outline-none w-full"
        />
      </div>
      <div class="mb-4">
        <label for="instructions" class="block text-sm font-medium text-gray-200"
          >Instructions:</label
        >
        <input
          type="text"
          id="instructions"
          :value="instructions"
          class="mt-1 p-2 rounded-md border border-gray-300 focus:ring focus:ring-green-200 focus:border-green-100 focus:outline-none w-full"
        />
      </div>
      <button
        type="submit"
        class="w-full py-2 px-4 bg-green-400 text-white rounded-md hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-200"
      >
        Start Rover
      </button>
    </form>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    plateauSize: Number,
    landingPosition: String,
    instructions: String
  },
  methods: {
    startRover() {
      this.$emit('startRover')
    }
  }
}
</script>
