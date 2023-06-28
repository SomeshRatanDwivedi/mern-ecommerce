import {object, ref, string} from 'yup'

export const loginSchema=object({
    email:string().email().required(),
    password:string().required().min(6)
})

export const profileUpdateSchema = object({
    email: string().email().required(),
    name: string().min(4).required(),
})

export const signupSchema = object({
    
    email: string().email().required(),
    password: string().required().min(6),
    confirm_password:string().required().min(6).oneOf([ref("password"), null], "Password and confirm password must match")
})

export const updatePasswordSchema=object({
    oldPassword: string().min(6).required(),
    newPassword:string().min(6).required(),
    confirmNewPassword: string().required().min(6).oneOf([ref("newPassword"), null], "New password and confirm new password must match")
})

export const forgotPasswordSchema = object({
    email: string().email().required(),
})


export const resetPasswordSchema=object({
    newPassword: string().min(6).required(),
    confirmNewPassword: string().required().min(6).oneOf([ref("newPassword"), null], "New password and confirm new password must match")
})


