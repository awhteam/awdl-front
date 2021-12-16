import { Helmet } from "react-helmet";
import "./style.scss";

import * as React from "react";
import { Box, ButtonGroup, Button, Grid, Typography } from "@mui/material";
import { baseUrl } from "../../utils/constants";
import axios from "../../utils/axiosConfig";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import ousamaImage from "../../assets/images/ousama_ranking.webp";
import { MALCard } from "../Cards";
import { amber } from "@mui/material/colors";

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [animeRawData, setAnimeRawData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await axios
        .get(
          `${baseUrl}/anime/season/2021/fall?limit=10&fields=id,title,studios,num_episodes,source,genres,broadcast,synopsis,mean,num_list_users`
        )
        .then((response) => {
          console.log("animeData ", response.data);
          setAnimeRawData(response.data.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log("error: ", err);
        });
    }
    fetchData();
  }, []);

  const createData = (input) => {
    const anime = input.node;
    console.log("anime", anime);
    return {
      id: anime.id,
      title: anime.title,
      studio: anime.studios[0],
      epi: anime.num_episodes,
      source: anime.source.replace("_"," "),
      genres: anime.genres.slice(0,5),
      poster: anime.main_picture.medium.replace("-cdn.myanimelist.net",".awdl.ml"),
      synposis: anime.synopsis,
      release_date: anime.broadcast ? `${anime.broadcast.day_of_the_week} ${anime.broadcast.start_time}`: "???",
      score: anime.mean,
      members: anime.num_list_users,
    };
  };

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
          <div style={{ padding: "100px", display: "flex",justifyContent:"center" }}>
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
            >
              {animeList.map((anime, i) => (
                <Grid item md={6} sm={6} xs={12} xl={4} key={i}>
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
