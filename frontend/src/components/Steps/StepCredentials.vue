<script>
import { ref } from 'vue'
import { validateForm } from "../../utils/validationSchemas"
import ButtonComponent from '../../components/Button/ButtonComponent.vue'

export default {
  name: 'StepCredentials',
  components: {
    ButtonComponent
  },
  props: {
    formData: {
      required: true
    }
  },
  setup(props, { emit }) {
    const localFormData = ref({
      password: props.formData.password
    })
    const errors = ref({})

    const navigateToPreviousStep = () => {
      emit('back')
    }

    const handleFormInput = () => {
      validateForm(localFormData, errors)
    }

    const navigateToNextStep = () => {
      if (validateForm(localFormData, errors)) {
        emit('continue', localFormData.value)
      }
    }

    return {
      localFormData,
      navigateToPreviousStep,
      navigateToNextStep,
      errors,
      handleFormInput
    }
  }
}
</script>

<style scoped>
  @import url("./style.css")
</style>

<template>
  <div class="form-step">
    <h2 class="form-step__title"> Senha de acesso </h2>
    <div class="form-group">
      <div class="form-group__label">
        <label for="password" class="form-group__label-text">Sua senha *</label>
        <p class="form-group__error-message" v-if="errors.password">{{ errors.password }}</p>
      </div>
      <input class="form-group__input" type="password" id="password" name="password" v-model="localFormData.password" @input="handleFormInput">
    </div>

    <div class="form__step--buttons">
      <ButtonComponent
        type="button"
        label="Voltar"
        @click="navigateToPreviousStep"
        background="#fff"
        color="#ff9901"
      />
    
      <ButtonComponent
        type="button"
        label="Continuar"
        @click="navigateToNextStep"
      />
    </div>
  </div>
</template>
