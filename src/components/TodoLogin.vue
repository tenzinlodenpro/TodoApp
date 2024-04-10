<script setup lang="ts">
    import { ref } from 'vue'
    import { useUserStore } from '@/stores/UserStore';
    import { emailValidation } from '@/rules/signupValidation';
    import router from '@/router/router';

    const email = ref('')
    const password = ref('')
    const isPwd = ref(true)
    const loginError = ref('')
    const form = ref()
    const userStore = useUserStore()

    async function onSubmit(){
        loginError.value = ''
        const success = await form.value.validate()
        if(success){
            let id = userStore.loginUser(email.value, password.value)
            if(id >= 0){
                userStore.loggedIn = true
                userStore.currentUser = id
                if(userStore.checkIfAdmin(id)){
                    router.push(`/admin`)
                    userStore.isAdmin = true
                }
                else router.push(`/profile/${id}`)
            }
            else{
                if(id === -1) loginError.value = "Email not found. Please try again."
                else loginError.value = "Incorrect Password. Please try again."
            }
        }
    }
    function onReset(){
        email.value = ''
        password.value = ''
        loginError.value = ''
        form.value.resetValidation()
    }
</script>
<template>
    <div class="row justify-center items-start">
        <q-card style="width:1000px" square flat bordered>
            <q-card-section>
                <div class="text-center text-h3">Log In</div>
            </q-card-section>
            <q-card-section class="row justify-center">
                <q-form
                    @keyup.enter="onSubmit" 
                    style="width: 500px;" 
                    class="column q-ma-lg"
                    ref="form"
                >
                    <q-input 
                        v-model="email"
                        label="Enter Email"
                        clearable
                        :rules="[(val) => emailValidation(val) || 'Must be a valid email.']"
                    />
                    <q-input 
                        v-model="password"  
                        :type="isPwd ? 'password' : 'text'" 
                        label="Enter Password"
                        counter
                        >
                        <template v-slot:append>
                        <q-icon
                            :name="isPwd ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isPwd = !isPwd"
                        />
                        </template>
                    </q-input>
                    <div></div>
                    <span class="q-mt-xl row justify-evenly">
                        <q-btn 
                            label="Submit" 
                            color="primary"
                            class="col-4"
                            @click="onSubmit"
                        />
                        <q-btn 
                            label="Reset"
                            color="secondary"
                            class="col-4"
                            @click="onReset"
                        />
                    </span>
                </q-form>
            </q-card-section>
            <q-card-section v-if="loginError.length > 0" class="row justify-center">
                <div class="text-negative"> {{ loginError }} </div>
            </q-card-section>
            <q-card-section class="row justify-center">
                <span>
                    Don't have an account?
                    <router-link name="signup" to="/signup">Sign Up</router-link>
                </span>
            </q-card-section>
        </q-card>
    </div>
</template>