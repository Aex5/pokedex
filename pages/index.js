export async function getStaticProps() {
  const req = await fetch(`https://pokeapi.co/api/v2/pokemon`);
  const { results } = await req.json();
  const pokemon = results.map((poke, index) => {
    const paddedIndex = `00${index + 1}`.slice(-3);
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedIndex}.png`;

    return { ...poke, image };
  });

  return {
    props: {
      pokemon,
    },
  };
}

export default function index(props) {
  return (
    <>
      <div className="w-full bg-slate-50 flex flex-col items-center">
        <h1>Pokemon List</h1>
        <div className="w-[45rem] grid grid-cols-3 place-items-center">
          {props.pokemon.map((p, index) => {
            return (
              <div key={index}>
                <img src={p.image} alt={p.name} />
                <p>{p.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
