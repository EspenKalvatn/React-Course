import { useState } from 'react'

const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    return (
        <div>
            <h1>give feedback</h1>

            <Button handleClick={() => setGood(good + 1)} text={'good'}/>
            <Button handleClick={() =>setNeutral(neutral + 1)} text={'neutral'}/>
            <Button handleClick={() =>setBad(bad + 1)} text={'bad'}/>

            <h1>statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad}/>

        </div>
    )
}

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>
const StatisticLine = ({prefix, value, suffix}) => <div>{prefix} {value} {suffix}</div>

const Statistics = ({good, neutral, bad}) => {
    const feedbackCount = good + neutral + bad

    if (feedbackCount === 0) {
        return (
            <div>
                <p>No feedback given</p>
            </div>
        )
    }

    return (
        <div>
            <StatisticLine prefix={'good'} value={good}/>
            <StatisticLine prefix={'neutral'} value={neutral}/>
            <StatisticLine prefix={'bad'} value={bad}/>
            <StatisticLine prefix={'all'} value={feedbackCount}/>
            <StatisticLine prefix={'average'} value={(good + bad * -1) / feedbackCount}/>
            <StatisticLine prefix={'positive'} value={good / feedbackCount * 100} suffix={'%'}/>
        </div>
    )
}


export default App