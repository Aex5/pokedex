export async function getServerSideProps(ctx) {
  const name = ctx.query;

  const req = await fetch("https://pokeapi.co/api/v2/pokemon/" + name.id);
  const res = await req.json();

  return {
    props: { res },
  };
}

export default function DetailPokemon(props) {
  return (
    <div>
      <div>
        <p>{props.res.name}</p>
        <p>{props.res.height}</p>
        <p>{props.res.id}</p>
      </div>
    </div>
  );
}
