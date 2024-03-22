<script>
import { ref } from 'vue'
import { validateForm } from "../../utils/validationSchemas"
import ButtonComponent from '../../components/Button/ButtonComponent.vue'

export default {
  name: 'StepAdditionalInformation',
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
      name: props.formData.name,
      cpf: props.formData.cpf,
      email: props.formData.email,
      dateBirth: props.formData.dateBirth,
      phone: props.formData.phone,
      socialReason: props.formData.socialReason,
      cnpj: props.formData.cnpj,
      openDate: props.formData.openDate,
      type: props.formData.type
    })
    const errors = ref({})
    const registrationType = localFormData.value.type

    const handleFormInput = () => {
      validateForm(localFormData, errors, registrationType)
    }
    
    const navigateToNextStep = () => {
        if(validateForm(localFormData, errors, registrationType)){
        emit("continue", localFormData.value)
      }
    }

    const navigateToPreviousStep = () => {
      emit('back')
    }

    return {
      localFormData,
      navigateToPreviousStep,
      validateForm,
      errors,
      isValid: validateForm,
      navigateToNextStep,
      handleFormInput
    }
  },
}
</script>

<style scoped>
  @import url("./style.css")
</style>


<template>
  <div class="form-step">
    <div v-if="localFormData.type == 'pf'">
      <h2 class="form-step__title"> Pessoa Física</h2>
      <div class="form-group">
        <div class="form-group__label">
          <label for="name" class="form-group__label-text">Nome *
          </label>
          <p class="form-group__error-message" v-if="errors.name">
            {{ errors.name }}
          </p>
        </div>
        <input class="form-group__input" type="text" id="name" name="name" v-model="localFormData.name"
          @input="handleFormInput">
      </div>
      <div class="form-group">
        <div class="form-group__label">
          <label for="cpf" class="form-group__label-text">CPF *</label>
          <p class="form-group__error-message" v-if="errors.cpf">{{ errors.cpf }}</p>
        </div>
        <input class="form-group__input" type="text" id="cpf" name="cpf" v-model="localFormData.cpf"
          @input="handleFormInput">
      </div>
      <div class="form-group">
        <div class="form-group__label">
          <label for="dateBirth" class="form-group__label-text">Data de nascimento *</label>

          <p class="form-group__error-message" v-if="errors.dateBirth">{{ errors.dateBirth }}</p>
        </div>
        <input class="form-group__input" type="date" id="dateBirth" name="dateBirth" v-model="localFormData.dateBirth"
          @input="handleFormInput">
      </div>
      <div class="form-group">
        <div class="form-group__label">
          <label for="phone" class="form-group__label-text">Telefone *</label>

          <p class="form-group__error-message" v-if="errors.phone">{{ errors.phone }}</p>
        </div>
        <input class="form-group__input" type="tel" id="phone" name="phone" v-model="localFormData.phone"
          @input="handleFormInput">
      </div>

    </div>

    <div v-else>
      <h2 class="form-step__title"> Pessoa Jurídica</h2>

      <div class="form-group">
        <div class="form-group__label">
          <label for="socialReason" class="form-group__label-text">Razão social *</label>

          <p class="form-group__error-message" v-if="errors.socialReason">{{ errors.socialReason }}</p>
        </div>
        <input class="form-group__input" type="text" id="socialReason" name="socialReason"
          v-model="localFormData.socialReason" @input="handleFormInput">
      </div>
      <div class="form-group">
        <div class="form-group__label">
          <label for="cnpj" class="form-group__label-text">CNPJ *</label>

          <p class="form-group__error-message" v-if="errors.cnpj">{{ errors.cnpj }}</p>
        </div>
        <input class="form-group__input" type="text" id="cnpj" name="cnpj" v-model="localFormData.cnpj"
          @input="handleFormInput">
      </div>
      <div class="form-group">
        <div class="form-group__label">
          <label for="openDate" class="form-group__label-text">Data de abertura *</label>

          <p class="form-group__error-message" v-if="errors.openDate">{{ errors.openDate }}</p>
        </div>
        <input class="form-group__input" type="date" id="openDate" name="openDate" v-model="localFormData.openDate"
          @input="handleFormInput">
      </div>
      <div class="form-group">
        <div class="form-group__label">
          <label for="phone" class="form-group__label-text">Telefone *</label>

          <p class="form-group__error-message" v-if="errors.phone">{{ errors.phone }}</p>
        </div>
        <input class="form-group__input" type="tel" id="phone" name="phone" v-model="localFormData.phone"
          @input="handleFormInput">
      </div>
    </div>

    <div class="form__step--buttons">
      <ButtonComponent type="button" label="Voltar" @click="navigateToPreviousStep" background="#fff" color="#ff9901" />
      <ButtonComponent type="button" label="Continuar" @click="navigateToNextStep" />
    </div>
  </div>
</template>