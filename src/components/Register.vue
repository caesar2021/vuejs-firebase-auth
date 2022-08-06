<template>
	<form action="/" method="POST" @submit.prevent="formSubmit">
		<div v-if="state.error">
			{{ state.error.message }}
		</div>
		<div>
			<label>Email Address</label>
			<input type="email" v-model="state.form.email" required/>
		</div>
		<div>
			<label>Password</label>
			<input type="password" v-model="state.form.password" required/>
		</div>
		<div>
			<button type="submit">Sign up</button>
		</div>
	</form>
</template>

<script setup>
	import { reactive } from 'vue'
	import { useSessionStore } from '@/stores/session'
	

	const emit = defineEmits(['signup'])

	const session = useSessionStore()

	const state = reactive({
		form: {
			email: "",
			password: ""
		},
		error: null
	})

	const formSubmit = () => {
		state.error = null
		session.signUp(state.form)
			.then(()=>{
				emit("signup")
			})
			.catch((err)=>{
				state.error = err
			})
	}

</script>