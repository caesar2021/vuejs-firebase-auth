<template>
  <header>
    <nav>
      <router-link :to="{ name: 'home' }">Home</router-link>
      <router-link :to="{ name: 'about' }">About</router-link>
      <router-link :to ="{ name: 'authenticated' }">Authenticated</router-link>
      <template v-if="!authenticated">
        <router-link :to="{ name: 'login' }">Login</router-link>
        <router-link :to="{ name: 'register' }">Register</router-link>
      </template>
      <a href="#" @click.prevent="logOut" v-else>Logout</a>
    </nav>
  </header>

  <router-view />
</template>

<script setup>
  import { onBeforeMount, computed } from 'vue'
  import { useSessionStore } from '@/stores/session'
  import { useRouter } from 'vue-router'

  const session = useSessionStore()
  const router = useRouter()

  const authenticated = computed(()=>session.isAuthenticated)

  onBeforeMount(()=>{
    session._init()
  })

  const logOut = () => {
    session.signOut()
      .then(()=>{
        router.push({name:"login"})
      })
  }

</script>