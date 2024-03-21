<script>
import { ref } from 'vue'
import ButtonComponent from '../Button/ButtonComponent.vue'

export default {
  name: 'StepInitialInformation',
  components: {
    ButtonComponent
  },
  props: {
    formData: {
      required: true
    }
  },
  setup(props, { emit }) {
    const localFormData = ref({ ...props.formData })
    const errors = ref({})

    const validateForm = () => {
      errors.value = {}

      if (!localFormData.value.email) {
        errors.value.email = 'O campo email é obrigatório'
      } else if (localFormData.value.email.length < 5) {
        errors.value.email = 'O campo email deve ter no mínimo 5 caracteres'
      }

      if (!localFormData.value.type) {
        errors.value.type = 'Por favor, escolha um tipo de cadastro'
      }
      return Object.values(errors.value).every(error => !error)
    }

    const navigateToNextStep = () => {
      if (validateForm()) {
        emit('continue', localFormData.value)
      }

    }

    const radioOptions = [
      { id: 'pf', value: 'pf', label: 'Pessoa Física' },
      { id: 'pj', value: 'pj', label: 'Pessoa Jurídica' }
    ]

    return {
      localFormData,
      navigateToNextStep,
      errors,
      validateForm,
      radioOptions
    }
  }
}
</script>

<style scoped>
  @import url("./style.css")
</style>

<template>
  <div class="form-step">
      <h2 class="form-step__title"> Seja bem vindo(a)</h2>
      <div class="form-group">
        <div class="form-group__label">
        <label 
          :for="'email'" 
          class="form-group__label-text">Endereço de e-mail*
        </label>
        <p class="form-group__error-message" v-if="errors.email">
          {{ errors.email }}
        </p>
        </div>

        <input
          class="form-group__input"
          type="email"
          id="email"
          name="email"
          v-model="localFormData.email"
          @input="validateForm"
        />
       
      </div>
      <div class="form-group radio-container">
        <div
          class="form-group__radio-input"
          v-for="(option, index) in radioOptions"
          :key="index"
        >
          <input
            type="radio"
            @change="validateForm"
            :id="option.id"
            :value="option.value"
            v-model="localFormData.type"
          />
          <label :for="option.id"> {{ option.label }} </label>
        </div>
      </div>
      <p class="form-group__error-message" v-if="errors.type">
        {{ errors.type }}
      </p>
      <ButtonComponent type="button" label="Continuar" @click="navigateToNextStep" />
    </div>
</template>