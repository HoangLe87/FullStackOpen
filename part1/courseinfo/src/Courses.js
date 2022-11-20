const Courses = ({courses}) => {
    return (
        <div>
            {courses.map(course=><Course key={course.id} course={course}/>)}
        </div>
    )
}


const Course = ({course}) => {
    return (
      <>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Stats parts={course.parts}/>
      </>
    )
}


const Header = ({name}) => {
  return (
    <h1>{name}</h1>
  )
}

const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part=><Part key={part.id} part={part}/>)}
    </div>
  )
}

const Part = ({part}) => {
  return (
    <div>{part.name} {part.exercises}</div>
  )
}

const Stats = ({parts}) => {
  return (
    <div>
      <b>total of {parts.map(part=>part.exercises).reduce((total,increment)=>total+increment,0)} exercises</b>
      </div>
  )
}

export default Courses