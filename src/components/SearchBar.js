import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getAllPokemon } from './lib/api';
import FilteredSearch from './FilteredSearch';

const initalSearch = {
  name: ''
};

function SearchBar() {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState(initalSearch);
  const [filteredResults, setFilteredResults] = useState([]);

  const handleChange = (e) => {
    const updatedSearch = { ...initalSearch, [e.target.name]: e.target.value };
    setSearchData(updatedSearch);
    setFilteredResults(
      searchNames.filter((name) => name.match(new RegExp(e.target.value, 'gi')))
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/pokedex-all/${searchData.name}`);
    setFilteredResults([]);
  };

  const [pokemons, setPokemons] = useState(null);

  useEffect(() => {
    getAllPokemon()
      .then((res) => {
        setPokemons(res.data);
      })
      .catch((err) => console.error(err.response));
  }, []);

  if (!pokemons) {
    return <p>Loading</p>;
  }

  const searchNames = pokemons.results.map((pokemon) => pokemon.name);

  return (
    <>
      <section className="section">
        <div className="field container is-grouped">
          <form autoComplete="off">
            <div className="autocomplete-input">
              <input
                className="input is-danger is-small is-rounded"
                type="text"
                onChange={handleChange}
                placeholder="Pokemon Name"
                name="name"
                value={searchData.name}
              />
              <ul className="autocomplete-list has-background-white has-text-black"></ul>
            </div>
          </form>
          <div className="control">
            <input
              type="submit"
              className="button is-small is-rounded is-black"
              onClick={handleSubmit}
            />
          </div>
        </div>
        <ul className="">
          <FilteredSearch
            onClick={{ setFilteredResults, setSearchData }}
            filteredResults={filteredResults}
          />
        </ul>
      </section>
    </>
  );
}
export default SearchBar;
