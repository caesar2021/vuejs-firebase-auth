import { defineStore } from 'pinia'
import firebase from '@/firebase'
import { 
  getAuth, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signInAnonymously,
  signOut,
  RecaptchaVerifier
} from 'firebase/auth'

export const useSessionStore = defineStore({
  id: 'session',
  state: () => ({
    auth: null,
    user: null,
    verifier: null,
  }),
  getters: {
    isAuthenticated: (state) => state.user ? true : false,
    getAuth: (state) => state.auth,
    getVerifier: (state) => state.verifier,
  },
  actions: {

    SET_AUTH(payload) {
      this.auth = payload
    },
    SET_USER(payload) {
      this.user = payload
    },
    SET_VERIFIER(payload){
      this.verifier = payload
    },

    _init() {
      this.SET_AUTH( getAuth() );
      onAuthStateChanged(this.getAuth,  user => {
        this.SET_USER(user)
      })
    },
    login(payload){
      return signInWithEmailAndPassword( this.getAuth, payload.email, payload.password )
        .then( result => {
          this.SET_USER(result.user)
        } )
    },
    phoneLoginReCaptcha(el){
      this.verifier = new RecaptchaVerifier(el, {
        size: 'invisible'
      }, this.getAuth)
      return this.getVerifier
    },
    phoneLogin( payload, verifier ){
      return signInWithPhoneNumber( this.getAuth, payload, verifier)
    },
    confirmCode( payload, confirmationResult ){
      return confirmationResult.confirm(payload)
        .then( result => {
          this.SET_USER(result.user)
        })
    },
    loginAnonymously(){
      return signInAnonymously( this.getAuth )
        .then( result => {
          this.SET_USER(result.user)
        } )
    },
    signUp(payload){
      return createUserWithEmailAndPassword( this.getAuth, payload.email, payload.password )
        .then( result => {
          this.SET_USER(result.user)
        } )
    },
    signOut(){
      return signOut(this.getAuth)
        .then(()=>{
          this.SET_USER(null)
        })
    }
  },
  persist: true
})
