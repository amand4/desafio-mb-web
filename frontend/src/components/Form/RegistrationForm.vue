<script setup>
import { ref } from 'vue'
import { post } from '../../services/api'
import StepInitialInformation from '../Steps/StepInitialInformation.vue'
import StepAdditionalInformation from '../Steps/StepAdditionalInformation.vue'
import StepCredentials from '../Steps/StepCredentials.vue'
import StepSummaryConfirmation from '../Steps/StepSummaryConfirmation.vue'

const currentStep = ref(1)
const formData = ref({})
const isLoading = ref(false)

const stepComponents = {
  1: StepInitialInformation,
  2: StepAdditionalInformation,
  3: StepCredentials,
  4: StepSummaryConfirmation
}

const handleContinueStep = (data) => {
  updateFormData(data)
  goToNextStep()
}

const handlePreviousStep = () => {
  goToPreviousStep()
}


const handleSubmit = async (formData) => {
  try {
    isLoading.value = true
    const data = { ...formData.value }
    const response = await post('/registration', data)
    if (response.ok) {
      console.error('Erro ao enviar dados para a API:')
      formData.value = {}
      window.location.reload()
    }
  } catch (error) {
    console.error('Erro ao enviar dados para a API:', error)
  } finally {
    isLoading.value = false
  }
}

function updateFormData(data) {
  formData.value = { ...formData.value, ...data }
}

function goToNextStep() {
  currentStep.value++
}

function goToPreviousStep() {
  currentStep.value--
}
</script>

<style scoped>
@import url("./style.css")
</style>

<template>
  <section class="userRegistration">
    <div>
      <div class="userRegistration__header">
        <p class="userRegistration__title">Etapa <span> {{ currentStep }} </span> do 4</p>
      </div>
      <form @submit.prevent="handleSubmit" class="userRegistration__form">
        <component :is="stepComponents[currentStep]" @back="handlePreviousStep" @continue="handleContinueStep"
          @submit="handleSubmit" :formData="formData" isLoading />
      </form>
    </div>
  </section>

</template>