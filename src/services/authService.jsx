import instance from "../utils/axios";

const AuthService = (event) => {
    event.preventDefault()

    async function login(username, userpassword){
        
        console.log("authService test login")
        return instance
            .post("/account/login", {
                username, 
                userpassword
            })
        
    }

    async function logout(){
        console.log("authService test logout")
        return instance.post("/")
    }
    
}
export default AuthService 