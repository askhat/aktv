<template lang="pug">
v-dialog(:value="active", persistent, :max-width="maxWidth")
  v-card
    v-card-title.grey.lighten-3
      .headline Authentication
    v-divider
    v-card-text
      v-text-field(
        append-icon="perm_identity",
        :rules="[rules.required]",
        v-model="username",
        label="Username")
      v-text-field(
        :append-icon="concealPassword ? 'visibility' : 'visibility_off'",
        :type="concealPassword ? 'password' : 'text'",
        :rules="[rules.required]",
        v-model="password",
        label="Password",
        @click:append="concealPassword = !concealPassword")
    v-divider
    v-card-actions
      v-btn(flat, color="primary", :disabled="!canLogIn" @click="proceed") Log in
      v-btn(flat, color="red", @click="cancel") Cancel
</template>

<script>
export default {
  props: {
    active: { type: Boolean, required: true },
    maxWidth: { type: Number, default: 320 }
  },
  data () {
    return {
      /**
       * Wether to conceal password
       */
      concealPassword: true,
      username: '',
      password: '',
      rules: {
        required: v => !!v || 'Required.'
      }
    }
  },
  computed: {
    canLogIn () {
      return this.username && this.password
    }
  },
  methods: {
    proceed () {
      const { username, password } = this
      this.$emit('proceed', { username, password })
    },
    cancel () {
      this.$emit('cancel')
    }
  }
}
</script>
