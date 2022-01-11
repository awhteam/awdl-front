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
  fa_status,
  fa_themes,
  fa_demographics,
  fa_sections,
} from "../../utils/translations";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useParams } from "react-router";
import Navbar from "../Navbar";
import Pagination from "@mui/material/Pagination";
import { useLocation, useHistory } from "react-router-dom";

export const Genres = () => {
  const params = useParams();
  const history = useHistory();
  const sectionId = params.sectionId;
  const section = params.section;
  const search = useLocation().search;
  const urlSearch = new URLSearchParams(search);
  const [page, setPage] = React.useState(parseInt(urlSearch.get("page")) || 1);

  const handlePageChange = (event, value) => {
    setPage(value);
    history.push(`?page=${value}`);
  };
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
    setLoading(true);
    axios
      .get(`${baseUrl}/anime/${section}/${sectionId}?page=${page}`)
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
  }, [page,section,sectionId]);

  const animeList = animeData.data;
  const pageCounts = Math.ceil(animeData.total / 18);

  return (
    <div style={{ overflowX: "hidden" }}>
      <Navbar />

      <div style={{ marginTop: "20px" }}>
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
              color="#255DAD"
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
                  href={`/anime/top`}
                >
                  بهترین انیمه ها
                </Link>
                <Typography key="3" color="text.primary">
                  {fa_sections[section]} {faTitle}
                </Typography>
              </Breadcrumbs>

              <MALCardLayout animeList={animeList} />
              <Pagination
                page={page}
                className="pagination"
                onChange={handlePageChange}
                color="primary"
                count={pageCounts}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export const TopAnimes = () => {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const [animeData, setAnimeData] = useState([]);
  const search = useLocation().search;
  const urlSearch = new URLSearchParams(search);
  const [page, setPage] = React.useState(parseInt(urlSearch.get("page")) || 1);

  const handlePageChange = (event, value) => {
    setPage(value);
    urlSearch.set("page", value);
    history.push(`?${urlSearch.toString()}`);
  };

  const urlParams = {};
  urlSearch.forEach((value, key) => {
    if (key != "page") urlParams[key] = value;
  });
  console.log(" urlParams", urlParams);
  const table = {
    season: fa_seasons,
    format: fa_formats,
    status: fa_status,
  };
  const urlParamKeys = Object.keys(urlParams);
  const urlKey = urlParamKeys[0];
  console.log(urlKey);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${baseUrl}/anime/top${search}`)
      .then((response) => {
        console.log("animeData ", response.data);
        setAnimeData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("error: ", err);
      });
  }, [page,search]);

  const animeList = animeData.data;
  const pageCounts = Math.ceil(animeData.total / 18);
  return (
    <div style={{ overflowX: "hidden" }}>
      <Navbar />

      <div style={{ marginTop: "20px" }}>
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
              color="#255DAD"
              height={100}
              width={100}
            />
          </div>
        ) : (
          <>
            <div className="mal-card-layout">
              <Breadcrumbs
                dir="rtl"
                separator={<NavigateBeforeIcon fontSize="small" />}
              >
                <Link underline="hover" key="1" color="inherit" href="/">
                  خانه
                </Link>
                {urlParamKeys.length == 1 ? (
                  <Link
                    underline="hover"
                    key="2"
                    color="inherit"
                    href={`/anime/top`}
                  >
                    بهترین انیمه ها
                  </Link>
                ) : (
                  <Typography key="2" color="text.primary">
                    بهترین انیمه ها
                  </Typography>
                )}
                {urlParamKeys.length == 1 && (
                  <Typography key="3" color="text.primary">
                    {table[urlKey]
                      ? table[urlKey][urlSearch.get(urlKey).toUpperCase()]
                      : urlSearch.get(urlKey)}
                  </Typography>
                )}
              </Breadcrumbs>

              <MALCardLayout animeList={animeList} />

              <Pagination
                page={page}
                className="pagination"
                onChange={handlePageChange}
                color="primary"
                count={pageCounts}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};
