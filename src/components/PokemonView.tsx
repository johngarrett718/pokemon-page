import { Pokemon } from "./PokemonType"

interface PokemonViewProps extends Pokemon {}

const capitalize = (string: String) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const PokemonView = ({
  name,
  height,
  weight,
  moves,
  pictureURL,
  types,
  hp
}: PokemonViewProps) => {
  return (
    <div className="card">
      <div className="title">
        <h3>{capitalize(name)}</h3>
        <span>HP: {hp}</span>
      </div>
      <div>
      <img src={pictureURL} alt={name}/>
      </div>
      <div className="types">
        <span>{types.length > 1 ? 'Types':'Type'}:</span>
        <span>{types.map(capitalize).join(', ')}</span>
      </div>
      <div className="types">
        <span>Height: {height} ft.</span>
        <span>Weight: {weight} lbs.</span>
      </div>
      <div>
        <h4>Moves</h4> 
        <ul>
          {moves.slice(0,4).map(capitalize).map(move => <li>{move}</li> )}
        </ul>
      </div>
    </div>
  )
}