import React,{useState} from "react"
import axios from "axios"

const CreateUser = () => {

    const [username,setUsername] = useState("")

    const onChangeUsername = (e) => {
        setUsername(e.target.value)
    }
    const onSubmit = (e) => {
        e.preventDefault()
        const user = {
            username : username
        }
        console.log(user)
        axios.post("http://localhost:5000/users/add",user)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        setUsername("")
        window.location = "/"
    }
    return (
        <div>
            <h3>CREATE USER</h3>
            <br/>
            <form onSubmit = {onSubmit}>
                <div className = "form-group">
                    <label><h5>USERNAME</h5></label>
                    <br/>
                    <input type = "text" required className = "form-control" value = {username} onChange = {onChangeUsername} />
                    <br/>
                </div>
                <div className = "form-group">
                    <br/>
                    <input type = "submit" value = "ADD" className = "btn btn-primary" />
                    <br/>
                </div>
            </form>
        </div>
    )
}

export default CreateUser