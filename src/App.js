import {useEffect ,useState} from 'react'
import Recipe from './Recipe'
import './App.css';

const App = () => {

  const APP_ID = '6e9bc73e';
  const APP_KEY = '590266a9c5e09d71f54d59dc850da3f2';
  //const exampleREQ = `https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`;
  
  const [recipes,setRecipes] = useState([]);
  const [search,setSearch] = useState("");
  const [query,setQuery] = useState("chicken");

  useEffect( () =>{
    getRecipes()
  },[query]);
  
  const getRecipes = async () =>{
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`)
    const data = await response.json();
    setRecipes(data.hits)
  };
  const updateSearch = e =>{
    setSearch(e.target.value)
  };
  const getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch("");
  };
  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input 
        className="search-bar" 
        value={search}
        type="text" 
        onChange={updateSearch}/>
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe 
        key={recipe.recipe.label} 
        title={recipe.recipe.label} 
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))}
      </div>
     
    </div>
  );
}

export default App;
