const Total = ({parts}) => {
    const total = parts.reduce((initial, currPart) => {
        return initial + currPart.exercises
    }, 0)

    return (
        <p style={{fontWeight: "bold"}}>total of {total} exercises</p>
    )
}

export default Total