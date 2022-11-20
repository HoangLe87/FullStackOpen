const PersonFrom = ({name, numberChange, nameChange, add, number}) => {
    return (
      <div>
      <form onSubmit={add}>
        <div>
          <label>name</label>
          <input value={name} onChange={nameChange}/>
        </div>
        <div>
          <label>number</label>
          <input value={number} onChange={numberChange}/>
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
  </div>
    )
  }

  export default PersonFrom