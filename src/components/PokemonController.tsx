import axios from "axios"
import { PokemonView } from "./PokemonView"
import { useEffect, useState } from "react"
import { Pokemon } from "./PokemonType"
// import { Button, TextField } from "@mui/material"

interface PokemonFromApi {
  name: string
  height: number
  weight: number
  moves: {
    move: {
      name: string
    }
  }[]
  sprites: {
    front_default: string
  }
  types: {
    type: {
      name: string
    }
  }[]
  stats: {
    base_stat: number
  }[]
}

export const PokemonController = () => {
  const [ pokemon, setPokemon ] = useState<Pokemon>()
  const [ pokemonText, setPokemonText ] = useState<string>('1')

  const fetchPokemon = async(pokemonID: string) => {
    try {
      const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
      const pokemonFromApi: PokemonFromApi = data

      console.log(pokemonFromApi)

      const newPokemon: Pokemon = {
        name: pokemonFromApi.name,
        height: pokemonFromApi.height,
        weight: pokemonFromApi.weight,
        moves: pokemonFromApi.moves.map(moveObj => moveObj.move.name),
        pictureURL: pokemonFromApi.sprites.front_default,
        types: pokemonFromApi.types.map(typeObj => typeObj.type.name),
        hp: pokemonFromApi.stats[0].base_stat
      }

      console.log(newPokemon)

      setPokemon(newPokemon)
    } catch (e) {
      setPokemon(undefined)
    }
  }

  const handleClick = () => {
    fetchPokemon(pokemonText)
  }

  useEffect(() => {
    fetchPokemon('1')
  }, [])

  return (
    <div>
      <header>
        <h1>Find a Pokemon by ID</h1>
        <h2>Gotta Catch 'em All!</h2>
      </header>
      <div className="search">
        <label>Pokemon Number: </label><input type="number" value={pokemonText} onChange={(event) => setPokemonText(event.target.value)}></input>
        <input type="button" onClick={handleClick} value='Search Pokemon by ID'></input>
      </div>
      {
        pokemon ? <PokemonView {...pokemon}/> : 'Pokemon Not Found. Please Enter a Valid Pokemon ID.'
      }
      
    </div>
  )
}