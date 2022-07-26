import Link from "next/link";
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
        <h1 className="text-3xl mb-8">Pokemon List</h1>
        <div className="w-[45rem] grid grid-cols-3 place-items-center gap-10">
          {dataPokemon.map((p, index) => {
            return (
              <div
                key={index}
                className="flex flex-col justify-center items-center w-[15rem] py-5 text-center capitalize text-lg bg-slate-100 rounded-xl"
              >
                <p>{`00${index + 1}`.slice(-3)}</p>
                <img src={p.image} alt={p.name} />
                <p>{p.name}</p>
                <Link href={`/pokemon/${p.name}`}>
                  <a className="text-sm bg-slate-200 py-1 px-5 rounded-md">
                    more info
                  </a>
                </Link>
              </div>
            );
          })}
        </div>
        <button
          onClick={getPokemon}
          className="px-4 bg-slate-800 text-white rounded-md my-10"
        >
          Load More
        </button>
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
