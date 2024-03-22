<script>
import UserRegistrationView from './views/UserRegistrationView.vue'

export default {
  name: "App",
  components: {
    UserRegistrationView
  }
}
</script>

<template>
  <UserRegistrationView />
  <notifications />
</template>
