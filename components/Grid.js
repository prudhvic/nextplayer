import React, { useState } from "react";
const songs = [
  {
    name: "jacinto-1",
    displayName: "Electric Chill Machine",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-2",
    displayName: "Seven Nation Army (Remix)",
    artist: "Jacinto Design",
  },
  {
    name: "jacinto-3",
    displayName: "Goodnight, Disco Queen",
    artist: "Jacinto Design",
  },
  {
    name: "metric-1",
    displayName: "Front Row (Remix)",
    artist: "metric-artist",
  },
];
const Grid = ({ setCurrentSong, setFirstCome, isPlaying, currentSong }) => {
  //   let [songindex, setSong] = useState();
  let updateSong = (index) => {
    // setSong(index);
    setCurrentSong(index);
    // setFirstCome(true);
  };
  return (
    <section className="music-grid">
      {songs.map((song, index) => {
        return (
          <div
            key={song.name}
            className={
              currentSong == index && isPlaying
                ? "song-flex song-active"
                : "song-flex"
            }
            onClick={() => updateSong(index)}
          >
            <img src={`../img/${song.name}.jpg`} />
            <div className="details-song">
              <h2>{song.artist}</h2>
              <p>{song.displayName}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
};

export default Grid;
