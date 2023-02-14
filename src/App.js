import React, { useEffect, useState } from "react";
import Modal from 'react-modal';
import "./App.css";

function generatePosterPath(path) {
  return `https://image.tmdb.org/t/p/w500/${path}`
}
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    color: 'black',
    width: '800px',
    height: '400px',
    textAlign: 'center',
  },
};
function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [clickedMovie, setClickedMovie] = useState();
  function openModal (movie) {
    setModal(true)
    setClickedMovie(movie)
  }
  function closeModal() {
    setModal(false);
  }
  async function getMovies () {
    const response = await fetch ("https://api.themoviedb.org/3/movie/popular?api_key=f28aa71682075a83b20e0e121c7582e3&language=en-US&page=1")
    const data = await response.json()
    console.log(data)
    setMovies(data.results)
    setTimeout(() => {
      setLoading(false)
    }, 3000);
  }
useEffect(()=> {
  getMovies()
}, [])
console.log(movies)
if (loading) {
  return (
    <div className="loader"></div>
  )
}
  return (
    <div> 
      <header>
      <h1>IDMovies</h1>
  </header>
    <div className="movies">
      {movies.map((movie) => (
        <div onClick={()=>openModal(movie)} className="movie">
          <div className="text">{movie.original_title}</div>
          <img src= {generatePosterPath(movie?.poster_path )}></img>
          </div>
      ))}
      </div>
      <Modal
        isOpen={modal}
        style={customStyles}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <div style={{backgroundImage: `url(${generatePosterPath(clickedMovie?.poster_path)})`, objectFit: "cover", width: "100%", height: "100%", backgroundSize: "100% 100%", opacity:"0.5"}}>
        <h1>{clickedMovie?.original_title}</h1>
        </div>
      </Modal>
      </div>
  );
}
export default App;