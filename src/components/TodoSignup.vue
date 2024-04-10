<script setup lang="ts">
    import { ref } from 'vue'
    import { type User, useUserStore } from '@/stores/UserStore' 
    import { nameValidation, emailValidation, passwordValidation } from '@/rules/signupValidation'
    import { useRouter } from 'vue-router'

    //external control
    const userStore = useUserStore()
    const router = useRouter()

    //store current date in YYYY/MM/DD format
    const currentDate = new Date().toJSON().slice(0,10).replace(/-/g, '/')

    //Store user data from form
    const user = ref<User>({
        id: -1,
        firstName: '',
        lastName: '',
        email: '',
        dob: currentDate
    })

    //refs for password
    const password = ref('')
    const confirmPassword = ref('')
    const isPwd = ref(true)
    const isConfirmPwd = ref(true)

    //Form component for validation
    const form = ref()
    const passwordCheck = ref<string[]>([])

    //form validation
    async function onSubmit () {
        passwordCheck.value = []
        if(password.value !== confirmPassword.value){
            passwordCheck.value.push('* Two entered passwords must match.')
        }
        passwordCheck.value = passwordCheck.value.concat(passwordValidation(password.value))
        if(passwordCheck.value.length === 0){
            const success = await form.value.validate()
            if(success){
                user.value.id = ++userStore.idCount
                userStore.createNewUser(user.value)
                userStore.currentUser = userStore.idCount
                userStore.loggedIn = true
                console.log(userStore.users)
                console.log(userStore.currentUser)
                userStore.passwords.set(userStore.currentUser, password.value)
                router.push(`/profile/${user.value.id}`)
            }
        }
    }
    function onReset () {
        user.value.firstName = ''
        user.value.lastName = ''
        user.value.email = ''
        user.value.dob = currentDate
        passwordCheck.value = []
        password.value = ''
        confirmPassword.value = ''
        form.value.resetValidation()
    }
</script>
<template>
    <div class="row justify-center items-start">
        <q-card style="width:1000px" square flat bordered>
            <q-card-section>
                <div class="text-center text-h3">Sign Up</div>
            </q-card-section>
            <q-card-section class="row justify-center">
                <q-form 
                    @submit.prevent="console.log(user)" 
                    style="width: 500px;" 
                    class="column q-ma-lg"
                    ref="form"
                >
                    <q-input
                        v-model="user.firstName"
                        label="Enter Firstname"
                        clearable
                        :rules="[nameValidation]"
                    />
                    <q-input
                        v-model="user.lastName"
                        label="Enter Lastname"
                        clearable 
                        :rules="[nameValidation]"
                    />
                    <q-input 
                        v-model="user.email"
                        label="Enter Email"
                        clearable
                        :rules="[(val) => emailValidation(val) || 'Must be a valid email.']"
                    />
                    <q-input 
                        class="q-mt-md" 
                        v-model="user.dob" 
                        :rules="['date']" 
                        label="Enter Birthday: YYYY/MM/DD"
                        >
                        <template v-slot:before>
                            <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy cover :breakpoint="600">
                                <q-date v-model="user.dob">
                                    <q-tooltip>Click to open date picker</q-tooltip>
                                </q-date>
                            </q-popup-proxy>
                            </q-icon>
                        </template>
                    </q-input>
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
                    <q-input 
                        v-model="confirmPassword"  
                        :type="isConfirmPwd ? 'password' : 'text'" 
                        label="Confirm Password"
                        counter
                        >
                        <template v-slot:append>
                        <q-icon
                            :name="isConfirmPwd ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="isConfirmPwd = !isConfirmPwd"
                        />
                        </template>
                    </q-input>
                    <div v-if="passwordCheck.length > 0" class="bg-grey-5 rounded-borders q-mt-md">
                        <div class="text-subtitle1 q-pa-sm"><b> Password Criteria </b></div>
                        <q-list>
                            <q-item 
                                v-for="(criteria, i) in passwordCheck" 
                                :key="i" 
                                class="text-negative"
                            >
                                {{ criteria }}
                            </q-item>
                        </q-list>
                    </div>
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
        </q-card>
    </div>
</template>