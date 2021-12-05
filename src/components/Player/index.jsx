import { Helmet } from "react-helmet";
import * as React from "react";

import "./style.scss";
import ReactPlayer from "./react-player";
import VideoJS from "./VideoJS";
import Plyr from "./PlyR";


import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

const CustomPlayer = () => {
  const playerRef = React.useRef(null);
  const [player, setPlayer] = React.useState("default");
  const changePlayer = (event) => {
    setPlayer(event.target.value);
  };

  const videoSrc = {
    type: "video",
    sources: [
      {
        src:
          "https://dl.awdl.ml/[AWHT]100-man%20no%20Inochi%20no%20Ue%20ni%20Ore%20wa%20Tatteiru-07-720p.mkv",
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
      <div style={{ overflowX: "hidden" }}>
        <Helmet>
          <title>هاردساب انیمه | AW_DL</title>
        </Helmet>
      </div>

      <div style={{ display: "flex" }}>
        {player == "default" && (
          <ReactPlayer
            playing
            controls
            url={videoSrc.sources[0].src}
          />
        )}
        {player == "videoJS" && (
          <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
        )}
        {player == "plyR" && <Plyr source={videoSrc} />}

        <FormControl component="fieldset" style={{ margin: "50px" }}>
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
    </>
  );
};

export default CustomPlayer;
