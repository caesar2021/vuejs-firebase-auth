<template>
	<h1>Register</h1>
	<register-component @signup="accountCreated"/>
</template>

<script setup>
	import RegisterComponent from '@/components/Register.vue'
	import { useRoute, useRouter } from 'vue-router'
	const route = useRoute()
	const router = useRouter()

	const accountCreated = () => {
		const { redirect } = router.query
		router.push( redirect ?? { name: 'login' } )
	}


</script>