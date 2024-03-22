<script>
import { ref } from "vue"
import { validateForm } from "../../utils/validationSchemas"
import ButtonComponent from "../Button/ButtonComponent.vue"

export default {
  name: "StepInitialInformation",
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
      email: props.formData.email,
      type: props.formData.type
    })
    const errors = ref({})

    const handleFormInput = () => {
      validateForm(localFormData, errors)
    }

    const navigateToNextStep = () => {
      if (validateForm(localFormData, errors)) {
        emit("continue", localFormData.value)
      }
    }

    const radioOptions = [
      { id: "pf", value: "pf", label: "Pessoa Física" },
      { id: "pj", value: "pj", label: "Pessoa Jurídica" }
    ]

    return {
      localFormData,
      navigateToNextStep,
      errors,
      radioOptions,
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
    <h2 class="form-step__title">Seja bem vindo(a)</h2>
    <div class="form-group">
      <div class="form-group__label">
        <label :for="'email'" class="form-group__label-text">Endereço de e-mail* </label>
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
        @input="handleFormInput"
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
          @change="handleFormInput"
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
