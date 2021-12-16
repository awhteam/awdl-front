import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "../components/HomePage";
import Player from "../components/Player";
import NotFoundPage from "../components/NotFoundPage";
import { AllCards } from "../components/Cards";
import Genres from "../components/Genres";

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
        <Route path="/anime/genre/:genreId">
          <Genres />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default AppRouter;
