import { tesloApi } from "../../config/api/tesloApi"
import { User } from "../../domain/user";
import type { AuthResponse } from "../../infrastructure/interfaces/auth.responses";





const returnUserToken = (data: AuthResponse) => {

    const user: User = {
        id: data.id,
        email: data.email,
        fullName: data.fullName,
        isActive: data.isActive,
        roles: data.roles,
    }

    return {
        user: user,
        token: data.token
    }

}





export const authLogin = async (email: string, password: string) => {


    email = email.toLowerCase();

    try {
        const { data } = await tesloApi.post<AuthResponse>('/auth/login', {
            email: email,
            password: password,
        });

        return returnUserToken(data);

    } catch (error) {
        console.log(error)
        return null
    }
}


export const authCheckStatus = async () => {

    try {

        const { data } = await tesloApi.get<AuthResponse>('/auth/check-status')

        return returnUserToken(data);

    } catch (error) {
        return null
    }


}


export const register = async (fullName: string, email: string, password: string) => {

    try {

        const { data } = await tesloApi.post<AuthResponse>('/auth/register', {
            fullName: fullName,
            email: email,
            password: password
        })
        console.log(data)
        return returnUserToken(data);

    } catch (error) {
        return null
    }

}
