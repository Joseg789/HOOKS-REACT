import { useEffect, useState } from "react";

type Props = {
  // definir las props que necesite el hook
  id: number;
};
//creamos un type para los pokemon
interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
}
//creamos un custom hook para obtener la informacion de un pokemon desde la pokeapi Y usamos el id que le pasamos por props para obtener el pokemon correspondiente
function usePokemon({ id }: Props) {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null); //estado para guardar el pokemon
  const [loading, setLoading] = useState(false); //estado para manejar la carga del pokemon

  //logica para obtener el pokemon desde la pokeapi
  //usamos axios o fetch para obtener el pokemon desde la pokeapi

  const getPokemon = async () => {
    setLoading(true); //ponemos loading en true mientras obtenemos el pokemon
    //usamos fetch para obtener el pokemon desde la pokeapi
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    const newPokemon: Pokemon = {
      id: data.id,
      name: data.name,
      imageUrl: ` https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    };
    setPokemon(newPokemon);
    setLoading(false); //ponemos loading en false una vez que hemos obtenido el pokemon
  };

  useEffect(() => {
    getPokemon();
  }, [id]);

  //retornamos el pokemon y cualquier otra cosa que necesitemos
  //retornamos alfabeticamente
  return {
    loading,
    pokemon,
    formattedId: `#${String(id).padStart(3, "0")}`, //formateamos el id para que tenga 3 digitos con ceros a la izquierda
  };
}

export default usePokemon;
