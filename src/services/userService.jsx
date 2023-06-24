import instance from "../utils/axios";

const userService = (event) => {
    event.preventDefault()
    async function fetchDataUsers(){
        return instance.get("account/info")
        
    }
}
export default userService