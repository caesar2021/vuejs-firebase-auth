<template>
	<form action="/" method="POST" @submit.prevent="formSubmit">
		<div v-if="state.error">{{ state.error.message }}</div>
		<div>
			<label>Email Address</label>
			<input type="email" v-model="state.form.email" required/>
		</div>
		<div>
			<label>Password</label>
			<input type="password" v-model="state.form.password" required/>
		</div>
		<div>
			<button type="submit">Sign in</button>
			<br/>
			<button type="button" @click="anon">Sign in Anonymously</button>
			<br/>
		</div>
	</form>
</template>

<script setup>
	import { reactive, onMounted } from 'vue'
	import { useSessionStore } from '@/stores/session'

	const emit = defineEmits(['authenticated'])

	const session = useSessionStore()

	const state = reactive({
		form: {
			email: "",
			password: "",
		},
		error: null
	})

	const formSubmit = () => {
		state.error = null;
		session.login(state.form)
			.then(()=>{
				emit("authenticated")
			})
			.catch(err => {
				state.error = err
			})
	}

	const anon = () => {
		state.error = null;
		session.loginAnonymously()
			.then(()=>{
				emit("authenticated")
			})
			.catch(err => {
				state.error = err
			})
	}

</script>