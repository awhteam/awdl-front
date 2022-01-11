import "./style.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import Navbar from "../Navbar";
import { baseUrl } from "../../utils/constants";
import {AnimeSlider} from '../Cards/anilist'

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
