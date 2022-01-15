import { Helmet } from "react-helmet-async";
import "./style.scss";

import * as React from "react";
import {
  Box,
  ButtonGroup,
  Button,
  Grid,
  Typography,
  TextField,
  Switch,
  Tooltip,
  IconButton,
} from "@mui/material";
import { baseUrl } from "../../utils/constants";
import axios from "axios";
import apiInstance from "../../utils/axiosConfig";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { useParams } from "react-router";
import Navbar from "../Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMediaQuery } from "@mui/material";
import { AnilistCardLayout } from "../Cards/anilist";
import { useLocation, useHistory } from "react-router-dom";
import { FindInPage, SavedSearch } from "@mui/icons-material";

const SearchAnime = () => {
  const [loading, setLoading] = useState(false);
  const [animeList, setAnimeList] = useState([]);
  const [pSearch, setPSearch] = React.useState(false);
  const history = useHistory();
  const search = useLocation().search;
  const urlSearch = new URLSearchParams(search);
  const [query, setQuery] = useState(urlSearch.get("q") ?? "");

  const handlePSearchChange = () => {
    setPSearch(!pSearch);
  };
  const triggerSearch = (event) => {
    if (query == "") return;
    setLoading(true);
    axios
      .get(`${baseUrl}/anime/search${pSearch ? "V2" : ""}?q=${query}`)
      .then((response) => {
        const data = response.data;
        setAnimeList(data.data);
        console.log("animeData ", data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  useEffect(triggerSearch, [query, pSearch]);

  const handleChangeValue = (event) => {
    const q = event.target.value;
    if (q === "") {
      setAnimeList([]);
    }
    setQuery(q);
    history.push(`?q=${q}`);
  };
  const clearInput = () => {
    setQuery("");
    setAnimeList([]);
  };
  const isMobile = useMediaQuery("(max-width: 768px)");
  return (
    <div>
      <Navbar />
      <Helmet>
        <title>Search | AW_DL</title>
      </Helmet>

      <div className="search-bar">
        <div className="search-wrap">
          <FontAwesomeIcon size="sm" color="#c9d7e3" icon="search" />
          <input
            onChange={handleChangeValue}
            value={query}
            type="search"
            autoComplete="off"
            placeholder="Search"
            className="search"
          />{" "}
          <FontAwesomeIcon
            color="#c9d7e3"
            className="close"
            icon="times"
            onClick={clearInput}
          />
        </div>
        <Tooltip title="سرچ دقیق">
          <IconButton onClick={ handlePSearchChange } style={{ marginTop: "-5px" }}>
            <SavedSearch fontSize="large" style={{color:pSearch?"#255DAD":"grey"}}/>
          </IconButton>
        </Tooltip>


        {/* <div dir="rtl" style={{ maxWidth: "100px", marginTop: "-5px" }}>
          سرچ دقیق
          <Switch checked={pSearch} onChange={handlePSearchChange} />
        </div> */}
      </div>
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
          <div>
            {animeList.length ? (
              <div className="anilist-card-layout">
                <AnilistCardLayout animeList={animeList} />
              </div>
            ) : (
              <div>
                <h2
                  style={{
                    color: "grey",
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                  }}
                >
                  {query == ""
                    ? "اسم انیمه مورد نظرتون رو وارد کنید"
                    : "انیمه ای یافت نشد"}
                </h2>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAnime;
