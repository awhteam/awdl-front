import { Helmet } from "react-helmet-async";
import * as React from "react";

import "./style.scss";
import ReactPlayer from "../Player/react-player";
import VideoJS from "../Player/VideoJS";
import Plyr from "../Player/PlyR";
import {dlUrl} from '../../utils/constants'

import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useParams } from "react-router";
import Navbar from "../Navbar";

const WatchPage = () => {
  const params = useParams();
  const msgId = params.msgId;

  const playerRef = React.useRef(null);
  const [player, setPlayer] = React.useState("default");
  const changePlayer = (event) => {
    setPlayer(event.target.value);
  };

  const videoSrc = {
    type: "video",
    sources: [
      {
        src: `${dlUrl}/watch/${msgId}`,
        type: "video/mp4",
      },
    ],
  };
  const videoJsOptions = {
    // lookup the options in the docs for more options
    autoplay: true,
    controls: true,
    responsive: true,
    width: 640,
    sources: videoSrc.sources,
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    // you can handle player events here
    player.on("waiting", () => {
      console.log("player is waiting");
    });

    player.on("dispose", () => {
      console.log("player will dispose");
    });
  };

  return (
    <>
      <Navbar />
      <div className="watch-anime">
        <div className="player">
          {player == "default" && (
            <ReactPlayer playing controls url={videoSrc.sources[0].src} />
          )}
          {player == "videoJS" && (
            <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
          )}
          {player == "plyR" && <Plyr source={videoSrc} />}
        </div>
        <div  className="player-options">
          <FormControl component="fieldset">
            <FormLabel component="legend">Player</FormLabel>
            <RadioGroup
              defaultValue="default"
              name="radio-buttons-group"
              value={player}
              onChange={changePlayer}
            >
              <FormControlLabel
                value="default"
                control={<Radio />}
                label="Default (Browser Default Player)"
              />
              <FormControlLabel
                value="videoJS"
                control={<Radio />}
                label="Video.js"
              />
              <FormControlLabel value="plyR" control={<Radio />} label="PlyR" />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
    </>
  );
};

export default WatchPage;
