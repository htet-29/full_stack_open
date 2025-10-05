import Part from "../utils/Part.jsx";

const Content = ({parts}) => {
    return (
        <ul style={{padding: 0}}>
            {parts.map(part => 
                <Part key={part.id} name={part.name} exercises={part.exercises}/>
            )}
        </ul>        
    )
}

export default Content