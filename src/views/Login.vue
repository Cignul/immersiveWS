<template>
  <v-container fluid fill-height>
    <v-slide-y-transition mode="out-in">
      <v-layout align-center justify-center row>
        <v-form v-if="newUserForm" ref="form" class="elevation-2 pa-5" @submit.prevent="register">
          <v-text-field v-model="newUser.name" type="text" label="Username" required></v-text-field>
          <v-text-field v-model="newUser.email" type="text" label="E-mail" required></v-text-field>
          <v-text-field v-model="newUser.password" type="password" label="Password" required></v-text-field>
          <v-btn type="submit" class="orange ligten-2">
            Submit
          </v-btn>
          <v-btn @click="newUserForm = !newUserForm" class="orange ligten-2">Returning user?</v-btn>
        </v-form>
        <v-form v-else ref="form" class="elevation-2 pa-5" @submit.prevent="loginUser">
          <v-text-field v-model="creds.name" type="text" label="Username" required></v-text-field>
          <v-text-field v-model="creds.password" type="password" label="Password" required></v-text-field>
          <v-btn type="submit" class="orange ligten-2">
            submit
          </v-btn>
          <v-btn @click="newUserForm =! newUserForm" class="orange lighten-2">New user?</v-btn>
        </v-form>
      </v-layout>
    </v-slide-y-transition>
  </v-container>
</template>


<script>
  export default {
    name: 'Home',
    data() {
      return {
        newUserForm: true,
        creds: {
          email: "",
          password: ""
        },
        newUser: {
          email: "",
          password: "",
          name: ""
        }
      }
    },
    methods: {
      register() {
        this.$store.dispatch("register", this.newUser);
      },
      loginUser() {
        this.$store.dispatch("login", this.creds);
      }
    },
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1,
  h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>