import React from "react";
import plyr from "plyr";
import './style.scss'

export const PlyR = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const { options, onReady } = props;

  React.useEffect(() => {
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = (playerRef.current = new plyr(
        videoElement,
        options,
        () => {
          console.log("player is ready");
          onReady && onReady(player);
        }
        ));
        player.source = props.source;
    } else {
      
    }
  }, [options, videoRef]);

  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.destroy();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div>
      <video ref={videoRef} className="js-plyr plyr" >      </video>
    </div>
  );
};

export default PlyR;
