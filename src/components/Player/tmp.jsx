import { Helmet } from "react-helmet";
import * as React from "react";

import "./style.scss";
import ReactPlayer from './react-player'

const CustomPlayer = () => {
  return (
    <>
      <div style={{ overflowX: "hidden" }}>
        <Helmet>
          <title>هاردساب انیمه | AW_DL</title>
        </Helmet>
      </div>
      <ReactPlayer playing controls url='https://dl.awdl.ml/[AWHT]100-man%20no%20Inochi%20no%20Ue%20ni%20Ore%20wa%20Tatteiru-07-720p.mkv' />
    </>
  );
};

export default CustomPlayer;
