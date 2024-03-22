<script setup>
import { ref } from 'vue'
import StepInitialInformation from '../Steps/StepInitialInformation.vue'
import StepAdditionalInformation from '../Steps/StepAdditionalInformation.vue'
import StepCredentials from '../Steps/StepCredentials.vue'
import StepSummaryConfirmation from '../Steps/StepSummaryConfirmation.vue'
import { useNotification } from "@kyvg/vue3-notification"

const currentStep = ref(1)
const formData = ref({})


const stepComponents = {
  1: StepInitialInformation,
  2: StepAdditionalInformation,
  3: StepCredentials,
  4: StepSummaryConfirmation
}
const { notify }  = useNotification()

const handleContinueStep = (data) => {
  updateFormData(data)
  goToNextStep()
}

const handlePreviousStep = () => {
  goToPreviousStep()
}
const handleSubmit = async () => {
  try {
    const payload = { ...formData.value }
    const BASE_URL = 'http://localhost:3000'

    const response = await fetch(`${BASE_URL}/registration`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    const data = await response.json()

    let notificationType = 'success'

    if (response.ok) {
      formData.value = {}
      currentStep.value = 1
    }

    if (response.status === 400) {
      notificationType = 'error'
    } else if (response.status === 500) {
      notificationType = 'error'
    }
  
    notify({
      title: notificationType === 'success' ? 'Sucesso' : 'Ops, deu erro!',
      text: data.message,
      type: notificationType,
      duration: 5000
    })

    if (!response.ok) {
      console.error('Unexpected server error', response.message)
    }
  } catch (error) {
    console.error('Error:', error.message)
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
          @submit="handleSubmit" :formData="formData" />
      </form>
    </div>
  </section>
</template>