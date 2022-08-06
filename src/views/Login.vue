<template>
	<div>
		<h1>Login</h1>
		<login-component @authenticated="loggedIn"/>
	</div>
</template>

<script setup>
	import { onMounted } from 'vue'
	import { useRouter, useRoute } from 'vue-router'
	import LoginComponent from '@/components/Login.vue'
	
	const router = useRouter()
	const route = useRoute()

	const loggedIn = () => {
		const { redirect } = route.query

		console.log("called!!")

		if(redirect){
			router.push(redirect)
		} else {
			router.push({ name: 'home' })
		}

	}

</script>