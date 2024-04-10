import { defineStore } from 'pinia'
import { userList } from '@/data/UserList'
import { passwordMap } from '@/data/PasswordMap'

export interface User {
    id: number,
    firstName: string,
    lastName: string,
    email: string,
    dob: string,
}

const admins = [0]

export const useUserStore = defineStore('userStore', {
    state: () => ({
        idCount: userList.length - 1,
        users: userList,
        passwords: passwordMap,
        loggedIn: false,
        currentUser: -1,
        isAdmin: false
    }),
    actions: {
        createNewUser(newUser: User): void{ 
            this.users.push(newUser)
        },
        loginUser(email:string, password: string): number{
            //user check
            for(const user of this.users){
                if( user.email === email){
                    if(this.passwords.get(user.id) === password) return user.id
                    else return -2
                }
            }
            return -1
        },
        logoutUser(id: number): void{
            this.loggedIn = false
            this.currentUser = -1
            if(this.isAdmin) this.isAdmin = false
        },
        checkIfAdmin(id: number): boolean{
            return (id in admins)? true : false
        }
    }
})

