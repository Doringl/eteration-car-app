import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DetailPage from "./pages/DetailPage";
import ListPage from "./pages/ListPage";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/detail/:id' children={<DetailPage />} exact />
        <Route path='/' children={<ListPage />} />
      </Switch>
    </Router>
  );
};
export default App;
