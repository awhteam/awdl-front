import { Helmet } from "react-helmet-async";
import "./style.scss";

import * as React from "react";
import { Box, ButtonGroup, Button, Grid, Typography } from "@mui/material";
import {
  baseUrl,
  cdnUrl,
  mobileCheck,
  getMobileOperatingSystem,
} from "../../utils/constants";
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
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

const AnimePage = () => {
  const [loading, setLoading] = useState(true);
  const [animeData, setAnimeData] = useState([]);
  const [animeDetails, setAnimeDetails] = useState([]);
  const [animeTitle, setAnimeTitle] = useState(null);

  const params = useParams();
  const animeId = params.animeId;
  const color = animeData.cover_color ? animeData.cover_color : "cyan";
  document.documentElement.style.setProperty("--color-anime-cover", color);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [expanded, setExpanded] = useState(false);
  const mobileOS = getMobileOperatingSystem();
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const humanFileSize = (size) => {
    var i = Math.floor(Math.log(size) / Math.log(1024));
    return (
      (size / Math.pow(1024, i)).toFixed(2) * 1 + " " + ["MB", "GB", "TB"][i]
    );
  };

  useEffect(() => {
    axios
      .get(`${baseUrl}/anime/${animeId}`)
      .then((response) => {
        const data = response.data;
        console.log("animeData ", data);
        setAnimeTitle(data.title[1] ?? data.title[0]);
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
                  href={`/anime/${section}/${id}/${table[id]["en"].replace(
                    / /g,
                    "_"
                  )}`}
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
            "تعداد قسمت‌ها": data.episodes,
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
        <div style={{ overflowX: "hidden" }} className="anime-page">
          <Helmet>
            <title>{`${animeTitle} | AW_DL`}</title>
          </Helmet>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${cdnUrl}${animeData.banner_image})`,
            }}
          >
            <div className="shadow"></div>
          </div>

          <div className="header">
            <div className="container" style={{ minHeight: "250px" }}>
              <div className="content" dir="rtl">
                <h1>{animeTitle}</h1>
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
                    src={`${cdnUrl}${animeData.cover_image}`}
                    className="cover"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="anime-details" dir="rtl">
            {isMobile && (
              <p className="summary">
                <h3> خلاصه داستان:</h3>

                <p className="description">{animeData.synopsis}</p>
              </p>
            )}
            <h3>اطلاعات بیشتر</h3>
            <div className="anime-details__data">
              {animeDetails.map((section, idx) => (
                <div
                  key={idx}
                  className="section"
                  style={{ borderRight: `5px solid ${animeData.cover_color}` }}
                >
                  {Object.entries(section).map(([label, value]) => (
                    <div key={label}>
                      <span className="label">{label}:</span>
                      <span>{value ? value : "نامشخص"}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {(animeData.files) && (
              <div className="download-box">
                <h3>باکس دانلود</h3>

                <div className="download-section">
                  {Object.entries(animeData.files).map(([key, files], i) => {
                    if(files['filesize'])
                      return <div>فعلا سمت فرانتش اوکی نشده</div>
                    const fileSizes = Object.values(files).map(
                      (x) => x? x["filesize"]:0
                    );
                    const totalFileSize = fileSizes.reduce((a, b) => a + b);
                    const avgFileSize = totalFileSize / fileSizes.length;
                    return (
                      <Accordion
                        key={i}
                        expanded={expanded === `panel${i}`}
                        onChange={handleChange(`panel${i}`)}
                      >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography>کیفیت: {key}</Typography>

                          <Typography>
                            میانگین حجم:{" "}
                            <span dir="ltr">{humanFileSize(avgFileSize)}</span>
                          </Typography>

                          {!isMobile && (
                            <Typography>
                              مجموع حجم:{" "}
                              <span dir="ltr">
                                {humanFileSize(totalFileSize)}
                              </span>
                            </Typography>
                          )}
                          <Typography>هاردساب فارسی</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {Object.entries(files)
                            .sort()
                            .map(([epi, file], i) => {
                              if (!file) return <div>یافت نشد</div>;
                              const fileName = encodeURIComponent(
                                file["filename"]
                              );
                              const fileUrl = `https://dl.awdl.ml/watch/${file["msg_id"]}/${fileName}`;

                              return (
                                <div className="epi">
                                  قسمت {epi}:
                                  <span>
                                    {mobileCheck() ? (
                                      mobileOS === "iOS" ? (
                                        <a
                                          href={`vlc-x-callback://x-callback-url/stream?url=${fileUrl}`.replace(
                                            /%20/g,
                                            "_"
                                          )}
                                        >
                                          پخش آنلاین
                                        </a>
                                      ) : (
                                        <a
                                          href={`intent:${fileUrl}#Intent;package=com.mxtech.videoplayer.ad;S.title=${fileName};b.decode_mode=2;end`}
                                        >
                                          پخش آنلاین
                                        </a>
                                      )
                                    ) : (
                                      <Link to={`watch/${file["msg_id"]}`}>
                                        پخش آنلاین
                                      </Link>
                                    )}
                                  </span>
                                  {/* <span>
                        <FontAwesomeIcon
                        icon={["fab", "telegram"]}
                        className="mr4"
                        />
                        <a href={`https://t.me/AWHTarchive/${file['msg_id']}`}>
                          دانلود از تلگرام
                        </a>
                        </span> */}
                                  {/* <span>
                         {file['filename']}
                        </span>

                        <span>
                         {file['filesize']}
                        </span> */}
                                </div>
                              );
                            })}
                        </AccordionDetails>
                      </Accordion>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnimePage;
