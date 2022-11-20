const Filter = ({filterFunc}) => {
    return (
      <div>
        filter shown with <input id='filterField' onChange={filterFunc}></input>
    </div>
    )
  }

  export default Filter