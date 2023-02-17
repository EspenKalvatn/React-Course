const Header = (props) => {
    return (
        <>
            <h1>{props.course}</h1>
        </>
    )
}

const Content = (props) => {
    return (
        <>
            <Part part={props.parts[0]} exercise={props.exercises[0]}/>
            <Part part={props.parts[1]} exercise={props.exercises[1]}/>
            <Part part={props.parts[2]} exercise={props.exercises[2]}/>

        </>
    )
}

const Part = (props) => {
    return (
        <>
            <p>{props.part} {props.exercise}</p>
        </>
    )
}

const Total = (props) => {
    let total = props.exercises.reduce((currentTotal, current) => currentTotal + current, 0)
    return (
        <>
            <p>Number of exercises {total}</p>
        </>
    )
}

const App = () => {
    const course = 'Half Stack application development'
    const part1 = 'Fundamentals of React'
    const exercises1 = 10
    const part2 = 'Using props to pass data'
    const exercises2 = 7
    const part3 = 'State of a component'
    const exercises3 = 14

    const parts = [part1, part2, part3]
    const exercises = [exercises1, exercises2, exercises3]

    // const myCourse = {
    //     name: 'Half Stack application development',
    //     parts: [
    //         {
    //             part: 'Fundamentals of React',
    //             exercises: 10
    //         },
    //         {
    //             part: 'Using props to pass data',
    //             exercises: 7
    //         },
    //         {
    //             part: 'State of a component',
    //             exercises: 14
    //         }
    //     ]
    // }

    return (
        <div>
            <Header course={course}/>
            <Content parts={parts} exercises={exercises}/>
            <Total exercises={exercises}/>
        </div>
        // <div>
        //     <Header course={myCourse.name}/>
        //     <Content parts={myCourse.parts.map(part => part.part)} exercises={myCourse.parts.map(part => part.exercises)}/>
        //     <Total exercises={myCourse.parts.map(part => part.exercises)}/>
        // </div>
    )
}

export default App