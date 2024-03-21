<script>
import RegistrationForm from '../components/Form/RegistrationForm.vue'

export default {
  name: "UserRegistrationView",
  components: {
    RegistrationForm
  }
}
</script>

<template>
  <header>
    <img alt="Mb logo" class="logo" src="../assets/logo-mb.svg" width="125" height="125" />
  </header>
  <RegistrationForm />
</template>
