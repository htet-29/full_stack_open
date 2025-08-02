import Header from "./components/Header.jsx";
import Content from "./components/Content.jsx";
import Total from "./components/Total.jsx";

const App = () => {
    const course = 'Half Stack application development'
    const parts = [
        {
            name: 'Fundamentals of React',
            exercises: 10
        },
        {
            name: 'Using props to pass data',
            exercises: 7
        },
        {
            name: 'State of a component',
            exercises: 14
        }
    ]

    return (
        <div>
            <Header title={course} />
            <Content parts={parts} />
            <Total parts={parts}/>
        </div>
    )
}

export default App