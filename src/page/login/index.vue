<template>
  <div class="login">
    login
  </div>
</template>
<script>
export default {
  name: 'login',
  methods: {
    login() {
      const token = 'DDSELL'
      sessionStorage.setItem('token', token)
    }
  },
  created() {
    //this.login()
  }
}
</script>
<style>

</style>
