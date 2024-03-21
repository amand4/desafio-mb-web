<script>
import { onMounted, ref } from 'vue'
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
    const localFormData = ref({ ...props.formData })
    const errors = ref({})

    onMounted(() => {
      localFormData.value = { ...props.formData }
    })

    const navigateToPreviousStep = () => {
      emit('back')
    }

    const navigateToNextStep = () => {
      if (validateForm()) {
        emit('continue', localFormData.value)
      }
    }

    const validateForm = () => {
      errors.value = {}

      if (!localFormData.value.password) {
        errors.value.password = 'O campo senha é obrigatório'
      }

      return Object.values(errors.value).every(error => !error)
    }

    return {
      localFormData,
      navigateToPreviousStep,
      navigateToNextStep,
      errors,
      validateForm
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
      <input class="form-group__input" type="password" id="password" name="password" v-model="localFormData.password" @input="validateForm">
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
