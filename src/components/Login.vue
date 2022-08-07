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
			<br/>
			<div v-if="!state.confirm">
				<input type="text" v-model="state.phone" placeholder="Enter phone number"/>
				<div ref="recaptchaContainer"></div>
				<button type="button" @click="phone">Sign in with Phone</button>
			</div>
			<div v-else>
				<input type="text" v-model="state.code" placeholder="Enter Code"/>
				<button type="button" @click="confirmPhone">Confirm</button>
			</div>
		</div>
	</form>
</template>

<script setup>
	import { reactive, onMounted, ref } from 'vue'
	import { useSessionStore } from '@/stores/session'

	const recaptchaContainer = ref(null)

	const emit = defineEmits(['authenticated'])

	const session = useSessionStore()

	const state = reactive({
		form: {
			email: "",
			password: "",
		},
		phone: "",
		verifier: null,
		error: null,
		confirm: null
	})

	const formSubmit = () => {
		state.error = null;
		session.login(state.form)
			.then(()=>{
				emit("authenticated")
			})
			.catch(err => state.error = err)
	}

	const anon = () => {
		state.error = null;
		session.loginAnonymously()
			.then(()=>{
				emit("authenticated")
			})
			.catch(err => state.error = err)
	}

	const phone = () => {
		state.error = null;
		state.verifier = session.phoneLoginReCaptcha(
			recaptchaContainer.value
		)
		session.phoneLogin(
			state.phone,
			state.verifier
		).then(confirmationResult=>{
			state.confirm = confirmationResult
			//console.log({ confirmationResult })
			//confirmationResult.confirm("444444")
			//	.then(response => {
			//		emit("authenticated")
			//	})
			//	.catch( err => state.error = err)
		}).catch(err => state.error = err)
	}

	const confirmPhone = () => {
		state.error = null;
		state.confirm.confirm(state.code)
			.then( response => {
				emit("authenticated")
			})
			.catch(err => state.error = err)
	}

</script>