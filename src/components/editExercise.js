import React,{useState,useEffect} from "react"
import axios from "axios"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

const EditExercise = (props) => {

    const [username,setUsername] = useState("")
    const [description,setDescription] = useState("")
    const [duration,setDuration] = useState(0)
    const [date,setDate] = useState(new Date())
    const [users,setUsers] = useState([])

    const onChangeUsername = (e) => {
        setUsername(e.target.value)
    }
    const onChangeDescription = (e) => {
        setDescription(e.target.value)
    }
    const onChangeDuration = (e) => {
        setDuration(e.target.value)
    }
    const onChangeDate = (date) => {
        setDate(date)
    }
    const onSubmit = (e) => {
        e.preventDefault()
        const exercise = {
            username : username,
            description : description,
            duration : duration,
            date : date
        }
        console.log(exercise)
        axios.post(`http://localhost:5000/exercises/update/${props.match.params.id}`,exercise)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        window.location = "/"
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/exercises/${props.match.params.id}`)
            .then(res => {
                setUsername(res.data.username)
                setDescription(res.data.description)
                setDuration(res.data.duration)
                setDate(new Date(res.data.date))
            })
            .catch(err => console.log(err))

        axios.get("http://localhost:5000/users/")
            .then(res => {
                if (res.data.length > 0) {
                    setUsers(res.data.map(user => user.username))
                }
            })
            .catch(err => console.log(err))
    },[])

    return (
        <div>
            <h3>EDIT EXERCISE LOG</h3>
            <br/>
            <form onSubmit = {onSubmit}>
                <div className = "form-group">
                    <label><h5>USERNAME</h5></label>
                    <br/>
                    <select required className = "form-control" value = {username} onChange = {onChangeUsername}>
                        {users.map((user) => {
                            return (
                                <option key = {user} value = {user}>{user}</option>
                            )
                        })}
                    </select>
                    <br/>
                </div>
                <div className = "form-group">
                    <label><h5>DESCRIPTION</h5></label>
                    <br/>
                    <input type = "text" required className = "form-control" value = {description} onChange = {onChangeDescription} />
                    <br/>
                </div>
                <div className = "form-group">
                    <label><h5>DURATION</h5></label>
                    <br/>
                    <input type = "text" required className = "form-control" value = {duration} onChange = {onChangeDuration} />
                    <br/>
                </div>
                <div className = "form-group">
                    <label><h5>DATE</h5></label>
                    <div>
                        <DatePicker selected = {date} onChange = {onChangeDate} />
                    </div>
                </div>
                <div className = "form-group">
                    <br/>
                    <input type = "submit" value = "Edit" className = "btn btn-primary" />
                    <br/>
                </div>
            </form>
        </div>
    )
}

export default EditExercise