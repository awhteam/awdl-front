import { Helmet } from "react-helmet-async";
import "./style.scss";

import { Box, ButtonGroup, Button, Grid, Typography } from "@mui/material";
import { baseUrl } from "../../utils/constants";
import axios from "axios";
import apiInstance from "../../utils/axiosConfig";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { MALCard } from "../Cards";
import Navbar from "../Navbar";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Keyboard } from "swiper/core";
import "swiper/swiper-bundle.min.css";
import { useMobile } from "../../utils/detectSource";

SwiperCore.use([Navigation, Keyboard]);
const AnimeCard = ({ anime }) => {
  return (
    <a className="anime_mini-card" href={`/anime/${anime.mal_id}`}>
      <div className="cover">
        <img src={`${baseUrl}${anime.cover_image}`} />
      </div>
      <div className="title">
      {anime.title[1]}
      </div>
    </a>
  );
};
const AnimeSlider = ({ animeList }) => {
  return (
    <div className="carousal-container" >
      <div style={{ width: "90%", maxWidth: "90%" }}>
        <Swiper slidesPerView={"auto"} navigation={useMobile() ? false : true}>
          {animeList.map((anime, i) => (
            <SwiperSlide key={i}>
              <AnimeCard anime={anime} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

const BestAnime = () => {
  const [loading, setLoading] = useState(true);
  const [animeData, setAnimeData] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/anime/top`)
      .then((response) => {
        console.log("animeData ", response.data);
        setAnimeData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  }, []);
  const animeList = animeData.data;

  return (
    <div dir="rtl" style={{ margin: "100px" }}>
      <h2>بهترین انیمه ها</h2>

      {loading ? (
        <div
          style={{
            padding: "100px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ReactLoading
            type="spinningBubbles"
            color="blue"
            height={100}
            width={100}
          />
        </div>
      ) : (
        <AnimeSlider animeList={animeList} />
      )}
    </div>
  );
};
const HomePage = () => {
  return (
    <div>
      <Navbar />
      <BestAnime />
    </div>
  );
};

export default HomePage;
