import { Helmet } from "react-helmet-async";
import "./style.scss";

import * as React from "react";
import { Box, ButtonGroup, Button, Modal, Typography } from "@mui/material";
import {
  baseUrl,
  cdnUrl,
  dlUrl,
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
import { PlayCircleOutline } from "@mui/icons-material";
const mobileOS = getMobileOperatingSystem();

const humanFileSize = (size) => {
  var i = Math.floor(Math.log(size) / Math.log(1024));
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 + " " + ["MB", "GB", "TB"][i]
  );
};

const FileDownload = ({ title, file }) => {
  const [openFM, setOpenFM] = useState(false);
  const handleFileModal = () => {
    setOpenFM(!openFM);
  };
  const FMStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleCloseFM = () => {
    setOpenFM(false);
  };
  console.log("title", title);
  if (!file) return <div>یافت نشد</div>;

  const OnlinePlay = () => {
    return (
      <>
        <span>پخش آنلاین</span>
        <FontAwesomeIcon
          icon={["far", "play-circle"]}
          size="lg"
          className="mr4 play-icon"
        />
      </>
    );
  };

  const fileData = {
    'نام فایل': file['filename'],
    'اندازه فایل': humanFileSize(file['filesize']),
  };

  const fileName = encodeURIComponent(file["filename"]);
  const fileUrl = `${dlUrl}/watch/${file["msg_id"]}/${fileName}`;
  const fileDLUrl =
    mobileOS === "iOS"
      ? `vlc-x-callback://x-callback-url/stream?url=${fileUrl}`.replace(
          /%20/g,
          "_"
        )
      : `intent:${fileUrl}#Intent;package=com.mxtech.videoplayer.ad;S.title=${fileName};b.decode_mode=2;end`;
  return (
    <div className="epi">
      {title}:
      <span className="online-play-btn">
        {mobileCheck() ? (
          <a href={fileDLUrl}>
            <OnlinePlay />
          </a>
        ) : (
          <Link to={`watch/${file["msg_id"]}`}>
            <OnlinePlay />
          </Link>
        )}
      </span>
      <span className="file-info-btn" onClick={handleFileModal}>
        مشخصات فایل
      </span>
      <Modal open={openFM} onClose={handleCloseFM}>
        <Box sx={FMStyle}  className="file-modal" dir="rtl">
          <Typography variant="h6" component="h2" >
            مشخصات فایل
          </Typography>
          <Typography sx={{ mt: 2 }} className="file-modal__data">
            {Object.entries(fileData).map(([label, value]) => (
              <div key={label}>
                <div className="label">{label}:</div>
                <div className="value">{value ? value : "نامشخص"}</div>
              </div>
            ))}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

const QualityDesc = ({ quality, files }) => {
  const fileSizes = Object.values(files).map((x) => (x ? x["filesize"] : 0));
  const totalFileSize = fileSizes.reduce((a, b) => a + b);
  const avgFileSize = totalFileSize / fileSizes.length;
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <Typography>کیفیت: {quality}</Typography>

      <Typography>
        میانگین حجم: <span dir="ltr">{humanFileSize(avgFileSize)}</span>
      </Typography>

      {!isMobile && (
        <Typography>
          مجموع حجم: <span dir="ltr">{humanFileSize(totalFileSize)}</span>
        </Typography>
      )}
      <Typography>هاردساب فارسی</Typography>
    </>
  );
};
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
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
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
            {animeData.files && (
              <div className="download-box">
                <h3>باکس دانلود</h3>
                <div className="download-section">
                  {Object.values(animeData.files)[0]["filesize"] ? (
                    <Accordion
                      expanded={expanded === `panel`}
                      onChange={handleChange(`panel`)}
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        هاردساب فارسی
                      </AccordionSummary>
                      <AccordionDetails>
                        {Object.entries(animeData.files)
                          .sort()
                          .map(([q, file], i) => (
                            <FileDownload
                              title={`کیفیت ${q}`}
                              file={file}
                              key={i}
                            />
                          ))}
                      </AccordionDetails>
                    </Accordion>
                  ) : (
                    <>
                      {Object.entries(animeData.files).map(
                        ([key, files], i) => {
                          return (
                            <Accordion
                              key={i}
                              expanded={expanded === `panel${i}`}
                              onChange={handleChange(`panel${i}`)}
                            >
                              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <QualityDesc
                                  quality={key}
                                  files={files}
                                  key={i}
                                />
                              </AccordionSummary>
                              <AccordionDetails>
                                {Object.entries(files)
                                  .sort()
                                  .map(([epi, file], i) => (
                                    <FileDownload
                                      title={`قسمت ${epi}`}
                                      file={file}
                                      key={i}
                                    />
                                  ))}
                              </AccordionDetails>
                            </Accordion>
                          );
                        }
                      )}
                    </>
                  )}
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
