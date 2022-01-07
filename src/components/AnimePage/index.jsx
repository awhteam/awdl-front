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
  fa_demographics,
} from "../../utils/translations";
import Navbar from "../Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "@mui/material";

const AnimePage = () => {
  const [loading, setLoading] = useState(true);
  const [animeData, setAnimeData] = useState([]);
  const [animeDetails, setAnimeDetails] = useState([]);
  const params = useParams();
  const animeId = params.animeId;
  const color = animeData.cover_color ? animeData.cover_color : "cyan";
  document.documentElement.style.setProperty("--color-anime-cover", color);
  const isMobile = useMediaQuery("(max-width: 768px)");

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
                <a
                  key={id}
                  title={table[id]["fa"]}
                  href={`/anime/${section}/${id}/${table[id]["en"]}`}
                >
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
            دموگرافیک: ids_to_text(
              data.demographics,
              "demographic",
              fa_demographics
            ),
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
      <Navbar />
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
        <div
          style={{ overflowX: "hidden", marginTop: "75px" }}
          className="anime-page"
        >
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
                {!isMobile && (
                  <p className="summary">
                    خلاصه داستان:
                    <p className="description">{animeData.synopsis}</p>
                  </p>
                )}
                <Button
                  variant="outlined"
                  className="tg_btn"
                  href={`https://t.me/AnimWorldDL/${animeData.tg_main_post}`}
                >
                  مشاهده پست تلگرامی
                  <FontAwesomeIcon
                    icon={["fab", "telegram"]}
                    size="lg"
                    className="mr4"
                  />
                </Button>
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
            {isMobile && (
              <p className="summary">
                <h4> خلاصه داستان:</h4>

                <p className="description">{animeData.synopsis}</p>
              </p>
            )}
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
                    <span className="label">{label}:</span>
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
