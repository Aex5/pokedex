import { useState } from "react";

export default function index(props) {
  const [page, setPage] = useState(9);
  const [dataPokemon, setDataPokemon] = useState(props.initPokemon);

  async function getPokemon() {
    const req = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${page}`);
    const { results } = await req.json();

    const pokemon = results.map((poke, index) => {
      const paddedIndex = `00${index + 1}`.slice(-3);
      const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedIndex}.png`;

      return { ...poke, image };
    });

    setDataPokemon(pokemon);
    setPage(page + 9);
  }
  return (
    <>
      <div className="w-full bg-slate-50 flex flex-col items-center">
        <h1>Pokemon List</h1>
        <div className="w-[45rem] grid grid-cols-3 place-items-center">
          {dataPokemon.map((p, index) => {
            return (
              <div key={index}>
                <img src={p.image} alt={p.name} />
                <p>{`00${index + 1}`.slice(-3)}</p>
                <p>{p.name}</p>
              </div>
            );
          })}
        </div>
        <button onClick={getPokemon}>get pokemon</button>
      </div>
    </>
  );
}

// get initial data pokemon from api
export async function getStaticProps() {
  const req = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=9`);
  const { results } = await req.json();

  const initPokemon = results.map((poke, index) => {
    const paddedIndex = `00${index + 1}`.slice(-3);
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedIndex}.png`;

    return { ...poke, image };
  });

  return {
    props: {
      initPokemon,
    },
  };
}
