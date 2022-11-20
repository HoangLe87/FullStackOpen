const Persons = ({display}) => {
    return (
        <div>
            {display.map(i=><div key={i.id}>{i.name} {i.number}</div>)}
        </div>
    )
}

export default Persons