import { Helmet } from "react-helmet-async";
import "./style.scss";

import * as React from "react";
import { Box, ButtonGroup, Button, Grid, Typography } from "@mui/material";
import { baseUrl } from "../../utils/constants";
import axios from "axios";
import apiInstance from "../../utils/axiosConfig";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useParams } from "react-router";
import {
  fa_formats,
  fa_seasons,
  fa_status,
  fa_genres,
  fa_themes,
  fa_demographics
} from "../../utils/translations";

const AnimePage = () => {
  const [loading, setLoading] = useState(true);
  const [animeData, setAnimeData] = useState([]);
  const [animeDetails, setAnimeDetails] = useState([]);
  const params = useParams();
  const animeId = params.animeId;

  useEffect(() => {
    axios
      .get(`${baseUrl}/anime/${animeId}`)
      .then((response) => {
        const data = response.data;
        console.log("animeData ", data);
        setAnimeData(data);
        const translate = (val, table) => (table[val] ? table[val] : val);
        const ids_to_text = (ids, section, table) => {
          return ids.map((id, i) => (
            <>
              {i >= 1 && ", "}
              {table[id] && (
                <a key={id} title={table[id]["fa"]} href={`/anime/${section}/${id}/${table[id]["en"]}`}>
                  {table[id]["fa"]}
                </a>
              )}
            </>
          ));
        };

        const animeDetailsTemp = [
          {
            نوع: translate(data.format, fa_formats),
            فصل: translate(data.season, fa_seasons) + " " + data.year,
            وضعیت: translate(data.status, fa_status),
          },
          {
            "تعداد قسمت": data.episodes,
            "زمان هر قسمت": data.duration + " دقیقه",
            منبع: data.source,
          },
          {
            "ژانر ها": ids_to_text(data.genres, "genre", fa_genres),
            تم: ids_to_text(data.themes, "theme", fa_themes),
            دموگرافیک: ids_to_text(data.demographics, "demographic", fa_demographics),
          },
        ];
        setAnimeDetails(animeDetailsTemp);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  }, []);
  return (
    <div>
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
        <div style={{ overflowX: "hidden" }} className="anime-page">
          <Helmet>
            <title>{animeData.title[1]} | AW_DL</title>
          </Helmet>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${baseUrl}${animeData.banner_image})`,
            }}
          >
            <div className="shadow"></div>
          </div>

          <div className="header">
            <div className="container" style={{ minHeight: "250px" }}>
              <div className="content" dir="rtl">
                <h1>{animeData.title[1]}</h1>
                <p className="description">{animeData.synopsis}</p>
              </div>

              <div className="cover-wrap overlap-banner">
                <div
                  className="cover-wrap-inner"
                  style={{ position: "static" }}
                >
                  <img
                    src={`${baseUrl}${animeData.cover_image}`}
                    className="cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="anime-details" dir="rtl">
            <h4>اطلاعات بیشتر</h4>

            {animeDetails.map((section, idx) => (
              <div
                key={idx}
                className="section"
                style={{ borderRight: `5px solid ${animeData.cover_color}` }}
              >
                {console.log("section", section)}
                {Object.entries(section).map(([label, value]) => (
                  <div key={label}>
                    <span>{label}:</span>
                    <span>{value ? value : "نامشخص"}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimePage;
