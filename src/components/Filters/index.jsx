import { Helmet } from "react-helmet-async";
import "./style.scss";

import * as React from "react";
import {
  Box,
  ButtonGroup,
  Button,
  Grid,
  Typography,
  Breadcrumbs,
  Link,
} from "@mui/material";
import { baseUrl } from "../../utils/constants";
import axios from "axios";
import apiInstance from "../../utils/axiosConfig";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { MALCard, MALCardLayout } from "../Cards";
import {
  fa_formats,
  fa_seasons,
  fa_genres,
  fa_themes,
  fa_demographics,
  fa_sections,
} from "../../utils/translations";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useParams } from "react-router";
import Navbar from "../Navbar";

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
    poster: anime.image_url.replace("cdn.myanimelist.net", "api.awdl.ml"),
    synopsis: anime.synopsis,
    release_date: anime.airing_start,
    type: anime.type,
    score: anime.score,
    members: anime.members,
  };
};

export const Genres = () => {
  const params = useParams();
  const sectionId = params.sectionId;
  const section = params.section;

  const tables = {
    genre: fa_genres,
    theme: fa_themes,
    demographic: fa_demographics,
  };
  const [loading, setLoading] = useState(true);
  const [animeData, setAnimeData] = useState([]);
  const [title, setTitle] = useState([]);
  const [faTitle, setFaTitle] = useState([]);

  useEffect(() => {
    axios
      .get(`${baseUrl}/anime/${section}/${sectionId}/0`)
      .then((response) => {
        console.log("animeData ", response.data);
        setAnimeData(response.data);
        setLoading(false);
        if (section == "studio") {
          const temp = response.data.data[0].studios_names[sectionId];
          setTitle(temp);
          setFaTitle(temp);
        } else {
          setTitle(tables[section][sectionId]["en"]);
          setFaTitle(tables[section][sectionId]["fa"]);
        }
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  }, []);

  const animeList = animeData.data;
  return (
    <div style={{ overflowX: "hidden" }}>
      <Navbar />

      <div style={{marginTop:"100px"}}>
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
            <Helmet>
              <title>{`${title} | AW_DL`}</title>
            </Helmet>
            <div className="mal-card-layout">
              <Breadcrumbs
                dir="rtl"
                separator={<NavigateBeforeIcon fontSize="small" />}
              >
                <Link underline="hover" key="1" color="inherit" href="/">
                  خانه
                </Link>
                <Link
                  underline="hover"
                  key="2"
                  color="inherit"
                  href={`/anime/`}
                >
                  انیمه ها
                </Link>
                <Typography key="3" color="text.primary">
                  {fa_sections[section]} {faTitle}
                </Typography>
              </Breadcrumbs>

              <MALCardLayout animeList={animeList} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export const Producers = () => {
  const params = useParams();
  const producer = params.producerId;
  const [loading, setLoading] = useState(true);
  const [animeRawData, setAnimeRawData] = useState([]);
  useEffect(() => {
    axios
      .get(`https://api.jikan.moe/v3/producer/${producer}/1`)
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
          dir="rtl"
        >
          انیمه های استودیو {params.producerName}
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
          <MALCardLayout animeList={animeList.slice(0, 10)} />
        )}
      </div>
    </div>
  );
};
