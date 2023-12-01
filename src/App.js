const App = () => {
  const surpriseOptions = [
      'A blue crocodile who is wearing mountain bike helmet and eating turkey',
      'Dwight Shrute from the Office drinking beets juice and wearing black pants',
      'Elon Musk driving Tesla popping cigar on Mars'
  ]

    const getImages = async () => {
      try{
          const options = {
              method: "POST",
              body: JSON.stringify({
                  message: "BLUGH"
              }),
              headers: {
                  "Content-type": "application/json"
              }
          }
          const response = await fetch('http://localhost:8000/images', options)
          const data = await response.json()
      } catch (error) {
          console.error(error)
      }
    }

  return (
    <div className="app">
      <section className="search-section">
        <p>Start with a detailed description
          <span className="surprise">Surprise me</span>
        </p>
        <div className="input-container">
          <input
              placeholder="A cat with a tortoise-shell coat flying to the stars
              with her wings in black..."
          />
          <button onClick={getImages}>Generate</button>
        </div>
      </section>
      <section className="image-section"></section>
    </div>
  );
}

export default App;
