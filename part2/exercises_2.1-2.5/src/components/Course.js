const Course = ({ course }) => {
    const sumExercises = course.parts.reduce((total, part) => total + part.exercises, 0)

    return (
        <div>
            <Header course={course}/>
            <Content course={course}/>
            <p><b>total of {sumExercises} exercises</b></p>
        </div>
    )
}

const Header = ({course}) => {
    return (
        <div>
            <h1>{course.name}</h1>
        </div>
    )
}

const Content = ({course}) => {
    return (
        <div>
            {course.parts.map(part =>
                <Part part={part}/>
            )}
        </div>
    )
}

const Part = ({part}) => {
    return (
        <div>
            {part.name} {part.exercises}
        </div>
    )
}

export default Course