<template>
  <div class="rover-form px-4">
    <h1 class="text-3xl text-green-400 font-semibold mb-4">Mars Rover</h1>

    <form @submit.prevent="submitForm">
      <div class="mb-6">
        <label for="plateauSize" class="block text-sm font-medium text-gray-200"
          >Plateau Size:</label
        >
        <input
          type="number"
          id="plateauSize"
          v-model="formData.plateauSize"
          class="mt-1 p-2 rounded-md border border-gray-300 focus:ring focus:ring-green-200 focus:border-green-100 focus:outline-none w-full"
        />
        <span class="text-red-300" v-if="v$.formData.plateauSize.$error"
          >Plateau size is required and must be numeric.</span
        >
      </div>
      <div class="mb-6">
        <label for="landingPosition" class="block text-sm font-medium text-gray-200"
          >Landing Position:</label
        >
        <input
          type="text"
          id="landingPosition"
          v-model="formData.landingPosition"
          class="mt-1 p-2 rounded-md border border-gray-300 focus:ring focus:ring-green-200 focus:border-green-100 focus:outline-none w-full"
        />
        <span class="text-red-300" v-if="v$.formData.landingPosition.$error"
          >Landing position is required and must be between 5 and 7 characters.</span
        >
      </div>
      <div class="mb-6">
        <label for="instructions" class="block text-sm font-medium text-gray-200"
          >Instructions:</label
        >
        <input
          type="text"
          id="instructions"
          v-model="formData.instructions"
          class="mt-1 p-2 rounded-md border border-gray-300 focus:ring focus:ring-green-200 focus:border-green-100 focus:outline-none w-full"
        />
        <span class="text-red-300" v-if="v$.formData.instructions.$error">
          Instructions are required.
        </span>
      </div>
      <div class="pt-4">
        <button
          type="submit"
          :disabled="v$.$error"
          class="w-full py-2 px-4 bg-green-400 text-white rounded-md hover:bg-green-500 focus:outline-none focus:ring focus:ring-green-200"
        >
          Start Rover
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { landingPositionValidator } from '@/helpers/landing.validator'
import { useVuelidate } from '@vuelidate/core'
import { required, numeric, minValue, helpers } from '@vuelidate/validators'

export default {
  data() {
    return {
      v$: useVuelidate(),
      formData: {
        plateauSize: 0,
        landingPosition: '',
        instructions: ''
      }
    }
  },
  validations: {
    formData: {
      plateauSize: {
        required,
        numeric,
        minValue: minValue(1)
      },
      landingPosition: {
        required,
        landingPositionValidator: helpers.withMessage(
          'Landing Position is out of pattern',
          landingPositionValidator
        )
      },
      instructions: {
        required
      }
    }
  },
  watch: {
    'formData.landingPosition': {
      handler(value) {
        this.formData.landingPosition = value.replace(/\s/g, "")
      },
    }
  },
  methods: {
    submitForm() {
      this.v$.$touch()

      if (this.v$.$invalid) return

      this.$emit('startRover', this.formData)
    }
  }
}
</script>
