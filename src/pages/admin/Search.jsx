import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Search = ({users,setSearchResult}) => {
    const handleSubmit = (e)=> e.preventDefault()
    
    const handleSearchChange =(e)=>{
        if(!e.target.value) return setSearchResult(users);
        const resultsArray = users.filter(user=>user.username.toLowerCase().includes(e.target.value.toLowerCase()));
        setSearchResult(resultsArray)
    }
  return (
    <form onSubmit={handleSubmit} className='flex-row justify-center'>
        <input
        className="border h-8" 
        type="text"
        id ="search"
        placeholder="Search user"
        onChange={handleSearchChange}
         />
         <button className="m-0 p-1">
            <FontAwesomeIcon icon ={faMagnifyingGlass}/>
         </button>

    </form>
  )
}

export default Search