function CheckForHabitat(pokeDex) {
  if (pokeDex.habitat) {
    return (
      <>
        <h4 className="title is-3">Habitat:</h4>
        <p className="is-capitalized subtitle is-4">{pokeDex.habitat.name}</p>
      </>
    );
  } else {
    return (
      <>
        <h4 className="title is-4">Habitat:</h4>
        <p className="subtitle is-4" >Currently Unknown</p>
      </>
    );
  }
}
export default CheckForHabitat;
