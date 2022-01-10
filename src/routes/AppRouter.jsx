import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "../components/HomePage";
import Player from "../components/Player";
import NotFoundPage from "../components/NotFoundPage";
import { AllCards } from "../components/Cards";
import { Genres,TopAnimes } from "../components/Filters";
import AnimePage from "../components/AnimePage";

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/player">
          <Player />
        </Route>
        <Route path="/cards">
          <AllCards />
        </Route>
        <Route path="/anime/:section(genre|theme|demographic|studio)/:sectionId">
          <Genres/>
        </Route>
        <Route path="/anime/top/">
          <TopAnimes/>
        </Route>
        <Route path="/anime/:animeId([0-9]+)">
          <AnimePage />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
