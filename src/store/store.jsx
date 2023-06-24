// import AuthService from "../services/authService";
// import {makeAutoObservable} from "mobx"


// const Store = () => {
//     const login = async (username, userpassword) =>{
//         try{
//             const response = await AuthService.login(username, userpassword)
//             localStorage.setItem('expire', response.data.expire) //expire записался
//             localStorage.setItem('accesstoken', response.data.accessToken)//token записался
//             this.setIsLogged(true)
//             console.log("response.data"+ response.data)
            
//         } 
//         catch (error) {
//             console.log('Ошибка в блоке async login:', error.response);
//         }
//     }


//     const logout = async () => {
//         try{
//             const response = await AuthService.logout();
//             localStorage.removeItem('expire') //expire удалился
//             localStorage.removeItem('accesstoken')//token удалился
//             this.setIsLogged(false)
//         } 
//         catch (error) {
//             console.log('Ошибка в блоке async logout:', error.response);
//         }
//     }
// }
// export default Store;