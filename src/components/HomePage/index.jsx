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
      <div className="title">{anime.title[1]}</div>
    </a>
  );
};
const AnimeSlider = ({ animeList }) => {
  return (
    <div className="carousal-container">
      <Swiper slidesPerView={"auto"} navigation={useMobile() ? false : true}>
        {animeList.map((anime, i) => (
          <SwiperSlide key={i}>
            <AnimeCard anime={anime} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const HomePageSlider = ({ title, url }) => {
  const [loading, setLoading] = useState(true);
  const [animeData, setAnimeData] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}${url}`)
      .then((response) => {
        console.log("animeData ", response.data);
        setAnimeData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  }, []);
  const animeList = animeData;

  return (
    <div dir="rtl" className="home-page-slider">
      <h3>{title}</h3>

      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ReactLoading type="cylon" color="#255DAD" height={100} width={100} />
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
      <div style={{ marginTop: "40px" }}>
        <HomePageSlider title="بهترین انیمه ها" url="/20anime/top" />
      </div>
      <HomePageSlider title="جدیدترین ها" url="/20anime/recent/added" />
      <HomePageSlider
        title="آخرین آپدیت شده ها"
        url="/20anime/recent/updated"
      />
    </div>
  );
};

export default HomePage;
