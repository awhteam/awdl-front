import { Helmet } from "react-helmet-async";
import "./style.scss";

import * as React from "react";
import { Box, ButtonGroup, Button, Grid, Typography } from "@mui/material";
import { baseUrl } from "../../utils/constants";
import axios from "axios";
import apiInstance from "../../utils/axiosConfig";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { MALCard } from "../Cards";

const createData = (input) => {
  const anime = input;
  console.log("anime", anime);
  return {
    mal_id: anime.mal_id,
    title: anime.title,
    studio: anime.producers,
    epi: anime.episodes,
    source: anime.source,
    genres: anime.genres.slice(0, 5),
    poster: anime.image_url.replace(
      "cdn.myanimelist.net",
      "api.awdl.ml"
    ),
    synopsis: anime.synopsis,
    release_date: anime.airing_start,
    type:anime.type,
    score: anime.score,
    members: anime.members,
  };
};


const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [animeRawData, setAnimeRawData] = useState([]);
  useEffect(() => {
    axios
      .get(`https://api.jikan.moe/v3/season/2021/fall`)
      .then((response) => {
        console.log("animeData ", response.data.anime);
        setAnimeRawData(response.data.anime);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  }, []);

 

  const animeList = animeRawData.map(createData);
  return (
    <div style={{ overflowX: "hidden" }}>
      <Helmet>
        <title>هاردساب انیمه | AW_DL</title>
      </Helmet>
      <div>
        <Typography
          component="div"
          style={{ textAlign: "right", margin: "50px" }}
          variant="h5"
        >
          انیمه های فصلی
        </Typography>
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
          <>
            <Grid
              container
              style={{ margin: "auto" }}
              alignItems="center"
              justifyContent="center"
              rowSpacing={4}
              md={10}
              xl={8.5}
              xs={12}
            >
              {animeList.slice(0,10).map((anime, i) => (
                <Grid item md={6} sm={6} xs={10} xl={4} key={i}>
                  <MALCard animeData={anime} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
