const Header = ({ course }) => {
    return (
      <h3>{course.name}</h3>
    )
  }
  const Total = ({ sum }) => <p><b>total of exercises {sum}</b></p>
  
  const Part = ({ part }) => <p> {part.name} {part.exercises}</p>
  
  
  const Content = ({ parts }) => {
    return (
        parts.map(part => <div key={part.id}><Part part={part}/> </div>)
    )
  }
  
  const Course = ({course}) => {
    const sum = course.parts.map(part => part.exercises).reduce((a,b)=>a+b)
    return (
      <div>
        <Header course={course}/>
        <Content parts={course.parts}/>
        <Total sum={sum}/>
      </div>
    )
  }

  export default Course
