import React,{useState,useEffect} from "react"
import {Link} from "react-router-dom"
import axios from "axios"

const Exercise = (props) => {

    return (
        <tr>
            <td>{props.exercise.username}</td>
            <td>{props.exercise.description}</td>
            <td>{props.exercise.duration}</td>
            <td>{props.exercise.date.substring(0,10)}</td>
            <td>
                <Link to = {`/edit/${props.exercise._id}`}>EDIT</Link> | <a href = "#" onClick = {() => {props.deleteExercise(props.exercise._id)}}>DELETE</a>
            </td>
        </tr>
    )
}

const ExercisesList = () => {

    const [exercises,setExercises] = useState([])

    const deleteExercise = (id) => {

        axios.delete(`http://localhost:5000/exercises/delete/${id}`)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        setExercises(exercises.filter(exercise => exercise._id !== id))
    }

    const exerciseList = () => {

        return exercises.map(exercise => {
            return (
                <Exercise exercise = {exercise} deleteExercise = {deleteExercise} key = {exercise._id} />
            )
        })
    }

    useEffect(() => {
        axios.get("http://localhost:5000/exercises/")
            .then(res => {
                setExercises(res.data)
            })
            .catch(err => console.log(err))
    },[])

    return (
        <div>
            <h3>EXERCISES LIST</h3>
            <table className = "table">
                <thead className = "thead-light">
                    <tr>
                        <th>USERNAME</th>
                        <th>DESCRIPTION</th>
                        <th>DURATION</th>
                        <th>DATE</th>
                        <th>ACTIONS</th>
                    </tr>
                </thead>
                <tbody>
                    {exerciseList()}
                </tbody>
            </table>
        </div>
    )
}

export default ExercisesList