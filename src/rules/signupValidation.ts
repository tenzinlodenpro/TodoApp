export const nameValidation = (val:string) => (val && val.length > 0) || 'Name must be filled in.'

export function emailValidation (email:string): boolean {
    return /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/.test(email);
}

export function passwordValidation (password: string): string[] {
    let criteriaCheck: string[] = []
    if(password.length < 10) criteriaCheck.push('* Password must be at least 10 characters long.')
    if(!(/^(?=.*[A-Z])/.test(password))) criteriaCheck.push('* Password must have at least 1 capital letter.')
    if(!(/^(?=.*[0-9])/.test(password))) criteriaCheck.push('* Password must have at least 1 number.')
    if(!(/^(?=.*[!@#\$%\^&\*_\-=+])/.test(password))) criteriaCheck.push('* Password must have at least 1 symbol character.')
    return criteriaCheck
}

 