import React, { useState, useEffect, useRef } from "react";
import {
  BsFillPlayCircleFill,
  BsFillPauseCircleFill,
  BsCaretLeftFill,
  BsCaretRightFill,
} from "react-icons/bs";
import Grid from "./Grid";

const Music = () => {
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
  let [isPlaying, setIsPlaying] = useState();
  let [firstCome, setFirstCome] = useState(false);
  let audioRef = useRef();
  let progressRef = useRef();
  let progressContainerRef = useRef();
  let [currentState, setCurrentTime] = useState(0);
  let [durationState, setDuration] = useState(0);
  let [progressW, setProgressW] = useState("");
  let [currentSong, setCurrentSong] = useState(0);
  let PlaySong = () => {
    setIsPlaying(true);
    audioRef.current.play();
  };
  let PauseSong = () => {
    setIsPlaying(false);
    audioRef.current.pause();
  };
  let updateProgress = (e) => {
    if (isPlaying) {
      let { duration, currentTime } = audioRef.current;

      let progresswidth = (currentTime / duration) * 100;
      setProgressW(`${progresswidth}%`);

      const durationMinutes = Math.floor(duration / 60);
      let durationSeconds = Math.floor(duration % 60);
      if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`;
      }
      if (durationSeconds) {
        setDuration(`${durationMinutes}:${durationSeconds}`);
      }
      // Calculate display for currentTime
      const currentMinutes = Math.floor(currentTime / 60);
      let currentSeconds = Math.floor(currentTime % 60);
      if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`;
      }
      setCurrentTime(`${currentMinutes}:${currentSeconds}`);
    }
  };
  let setProgress = (e) => {
    console.log(e);
    if (isPlaying) {
      let width = e.target.clientWidth;
      let clickX = e.nativeEvent.offsetX;
      console.log(clickX);
      let { duration } = audioRef.current;
      audioRef.current.currentTime = (clickX / width) * duration;
    }
  };
  let NextSong = () => {
    setCurrentSong((prev) => (prev === songs.length - 1 ? 0 : prev + 1));
    PlaySong();
  };
  let PrevSong = () => {
    setCurrentSong((prev) => (prev === 0 ? songs.length - 1 : prev - 1));
  };
  useEffect(() => {
    if (currentSong >= 0) {
      setIsPlaying(true);
      setProgressW(0);
      setCurrentTime(0);
      setDuration(0);
      audioRef.current.play();
    }
  }, [currentSong]);

  return (
    <main>
      <div>
        <Grid
          setCurrentSong={setCurrentSong}
          setFirstCome={setFirstCome}
          isPlaying={isPlaying}
          currentSong={currentSong}
        />
      </div>
      <div className="music-container">
        <div className="img">
          <img src={`../img/${songs[currentSong].name}.jpg`} />
        </div>
        <audio
          src={`../music/${songs[currentSong].name}.mp3`}
          ref={audioRef}
          onTimeUpdate={updateProgress}
          onEnded={NextSong}
        />
        <div className="details">
          <h2>{songs[currentSong].displayName}</h2>
          <p>{songs[currentSong].artist}</p>
        </div>
        <div className="music-time">
          <h3 className="current-time">
            {currentState ? currentState : "0:00"}
          </h3>
          <h3 className="duration">{durationState ? durationState : "0:00"}</h3>
        </div>
        <div
          className="progress-bar"
          ref={progressContainerRef}
          onClick={setProgress}
        >
          <div
            className="progress"
            style={{ width: progressW }}
            ref={progressRef}
          ></div>
        </div>

        <div className="controls">
          <button onClick={PrevSong}>
            <BsCaretLeftFill className="btn" />
          </button>
          {!isPlaying ? (
            <button onClick={PlaySong}>
              <BsFillPlayCircleFill className="btn" />
            </button>
          ) : (
            <button onClick={PauseSong}>
              {" "}
              <BsFillPauseCircleFill className="btn" />
            </button>
          )}
          <button onClick={NextSong}>
            <BsCaretRightFill className="btn" />
          </button>
        </div>
      </div>
    </main>
  );
};

export default Music;
