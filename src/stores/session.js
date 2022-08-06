import { defineStore } from 'pinia'
import firebase from '@/firebase'
import { 
  getAuth, 
  onAuthStateChanged, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInAnonymously,
  signOut
} from 'firebase/auth'

export const useSessionStore = defineStore({
  id: 'session',
  state: () => ({
    auth: null,
    user: null
  }),
  getters: {
    isAuthenticated: (state) => state.user ? true : false,
    getAuth: (state) => state.auth,
  },
  actions: {

    SET_AUTH(payload) {
      this.auth = payload
    },
    SET_USER(payload) {
      this.user = payload
    },

    _init() {
      this.SET_AUTH( getAuth() );
      onAuthStateChanged(this.getAuth,  user => {
        this.SET_USER(user)
      })
    },
    login(payload){
      return signInWithEmailAndPassword(this.getAuth, payload.email, payload.password)
        .then( result => {
          this.SET_USER(result.user)
        } )
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
