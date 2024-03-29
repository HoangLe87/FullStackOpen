import { useState } from 'react'


const Button = ({func, text}) => {
  return (
    <button onClick={func}>{text}</button>
  )
}

const MostVotes = ({all, anecdotes}) => {
  let maxVotes = Math.max(...all)
  let index = all.indexOf(maxVotes)
  return (
    <>
    <div>{anecdotes[index]}</div>
    <p>has {all[index]} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [all, setAll] = useState(new Array(anecdotes.length).fill(0))

  const nextFunc = () => {
    let randomIndex = Math.floor(Math.random()*(anecdotes.length-1))
    setSelected(randomIndex)
  }

  const voteFunc = () => {
    let newArray = [...all]
    newArray[selected]+=1
    setAll(newArray)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <br/>
      <p>has {all[selected]}</p>
      <br/>
      <div> 
        <Button text='vote' func={voteFunc}/>
        <Button text='next anecdote' func={nextFunc}/>
      </div>
      <h1>Anecdotes with most votes</h1>
      <MostVotes anecdotes={anecdotes} all={all}/>
    </div>
  )
}

export default App
