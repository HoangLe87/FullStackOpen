import { useState } from 'react'

const Button = ({onClick, text}) => {
  return (
      <button onClick={onClick}>{text}</button>
  )
}

const MostVotes = ({vote, anecdotes}) => {
  const maxVotes = vote.indexOf(Math.max(...vote))
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      {anecdotes[maxVotes]}
      <p>has {vote[maxVotes]} votes</p>
    </div>
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
  const [vote, setVote] = useState(Array(7).fill(0))
  console.log(vote)

  const click = () => {
    let randomNumber = Math.floor(Math.random()*anecdotes.length)
    setSelected(randomNumber)
  }
  const makeVote = () => {
    const newVote = [...vote]
    newVote[selected]+=1
    setVote(newVote)
  }
  
  return (
    <div>
      {anecdotes[selected]}
      <p>has {vote[selected]} votes</p>
      <Button text='vote' onClick={makeVote} /><Button text='next anecdote' onClick={click}/>
      <MostVotes vote={vote} anecdotes={anecdotes}/>
    </div>
  )
}
export default App
