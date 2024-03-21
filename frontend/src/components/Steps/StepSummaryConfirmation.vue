<template>
  <div class="form-step">
    <h2 class="form-step__title"> Revise suas informações </h2>
    <div class="form-group">
      <div class="form-group__label">
      <label for="email" class="form-group__label-text">Endereço de e-mail * </label>
      <p class="form-group__error-message" v-if="errors.email">{{ errors.email }}</p>
    </div>
    <input class="form-group__input" type="text" id="email" name="email" v-model="localFormData.email" @input="validateForm">
    </div>
    <div class="form-group">
      <div class="form-group__label">
      <label for="name" class="form-group__label-text">Nome *</label>
      <p class="form-group__error-message" v-if="errors.name">{{ errors.name }}</p>
    </div>
    <input class="form-group__input" type="text" id="name" name="name" v-model="localFormData.name" @input="validateForm">

    </div>
    <div class="form-group">
      <div class="form-group__label">
      <label for="cpf" class="form-group__label-text">CPF *</label>
      <p class="form-group__error-message" v-if="errors.cpf">{{ errors.cpf }}</p>
    </div>
    <input class="form-group__input" type="text" id="cpf" name="cpf" v-model="localFormData.cpf" @input="validateForm">

    </div>
    <div class="form-group">
      <div class="form-group__label">
      <label for="dateBirth" class="form-group__label-text">Data de nascimento *</label>
      <p class="form-group__error-message" v-if="errors.dateBirth">{{ errors.dateBirth }}</p>
    </div>
    <input class="form-group__input" type="date" id="dateBirth" name="dateBirth" v-model="localFormData.dateBirth" @input="validateForm">

    </div>
    <div class="form-group">
      <div class="form-group__label">
      <label for="phone" class="form-group__label-text">Número de telefone *</label>
      <p class="form-group__error-message" v-if="errors.phone">{{ errors.phone }}</p>
    </div>
    <input class="form-group__input" type="tel" id="phone" name="phone" v-model="localFormData.phone" @input="validateForm">

    </div>
    <div class="form-group">
      <div class="form-group__label">
      <label for="password" class="form-group__label-text">Senha *</label>
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
        label="Cadastrar"
        @click="onSubmit"
      />
    </div>
  </div>
</template>

<style scoped>
@import url("./style.css")
</style>

<script>
import { ref } from 'vue'
import ButtonComponent from '../../components/Button/ButtonComponent.vue'

export default {
  name: 'StepSummaryConfirmation',
  components: {
    ButtonComponent,
  },
  props: {
    formData: {
      required: true,
      type: Object
    },
  },
  setup(props, { emit }) {
    const localFormData = ref({ ...props.formData })
    const errors = ref({})

    const validateForm = () => {
      errors.value = {}

      if (!localFormData.value.email) {
        errors.value.email = 'O campo email é obrigatório'
      }

      if (!localFormData.value.name) {
        errors.value.name = 'O campo nome é obrigatório'
      }

      if (!localFormData.value.cpf) {
        errors.value.cpf = 'O campo cpf é obrigatório'
      }

      if (!localFormData.value.dateBirth) {
        errors.value.dateBirth = 'O campo data de nascimento é obrigatório'
      }

      if (!localFormData.value.phone) {
        errors.value.phone = 'O campo telefone é obrigatório'
      }

      if (!localFormData.value.password) {
        errors.value.password = 'O campo senha é obrigatória'
      }

      return !Object.values(errors.value).some((error) => error)
    }

    const navigateToPreviousStep = () => {
      emit('back')
    }
    const onSubmit = () => {
      if (validateForm()) {
        emit('submit', localFormData.value)
      }
    }

    return {
      localFormData,
      navigateToPreviousStep,
      validateForm,
      errors,
      onSubmit
    }
  },
}
</script>
