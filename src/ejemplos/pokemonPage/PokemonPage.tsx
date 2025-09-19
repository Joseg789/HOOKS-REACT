// Componente PokemonPage que muestra informacion de un pokemon
//obtenidos desde la pokeapi https://pokeapi.co/

import useCounter from "./hooks/useCounter"; //importamos el custom hook useCounter
import usePokemon from "./hooks/usePokemon";

export const PokemonPage = () => {
  const { count, increment, decrement } = useCounter(); //usamos el custom hook useCounter
  //OBTENEMOS LOS DATOS DEL POKEMON CON NUESTRO CUSTOM HOOK usePokemon
  const { pokemon, formattedId } = usePokemon({ id: count });

  //mostramos un loading mientras obtenemos el pokemon
  if (!pokemon) {
    return (
      <div className="bg-gradient flex flex-col items-center">
        <h1 className="text-2xl font-thin text-white">Pokémon</h1>
        <h3 className="text-xl font-bold text-white">Cargando...</h3>
      </div>
    );
  }
  //SI EL POKEMON NO EXISTE (ES NULL)
  if (!pokemon) {
    return (
      <div className="bg-gradient flex flex-col items-center">
        <h1 className="text-2xl font-thin text-white">Pokémon</h1>
        <h3 className="text-xl font-bold text-white">No Existe</h3>
      </div>
    );
  }

  //mostramos la informacion del pokemon
  return (
    <div className="bg-gradient flex flex-col items-center">
      <h1 className="text-2xl font-thin text-white">Pokémon</h1>
      <h3 className="text-xl font-bold text-white">
        {/* como ya verificamos que pokemon no es null no hace falta indicar el pokemon?. como opcional */}
        {formattedId} {pokemon.name}
      </h3>
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${count}.png`}
        alt=""
      />

      <div className="flex gap-2">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">
          <span onClick={decrement}>Anterior</span>
        </button>

        <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">
          <span onClick={increment}>Siguiente</span>
        </button>
      </div>
    </div>
  );
};
