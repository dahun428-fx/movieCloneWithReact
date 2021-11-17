import { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import LandingPage from './components/views/LanadingPage/LandingPageHoc';
import LoginPage from './components/views/LoginPage/LoginPageHoc';
import "antd/dist/antd.css";
import NavBar from './components/views/NavBar/NavBar';
import { Footer } from 'antd/lib/layout/layout';
import RegisterPage from './components/views/RegisterPage/RegisterPageHoc';
import Auth from './hoc/auth';
import MovieDetailPage from './components/views/MovieDetail/MovieDetailPageHoc';
import MyFavoritePage from './components/views/MyFavoritePage/MyFavoritePageHoc';


function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NavBar />
      <div style={{paddingTop:'69px', minHeight:'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)}/>
          <Route exact path="/login" component={Auth(LoginPage, false)}/>
          <Route exact path="/register" component={Auth(RegisterPage, false)}/>
          <Route exact path="/movie/:movieId" component={Auth(MovieDetailPage, null)} />
          <Route exact path="/myFavorite" component={Auth(MyFavoritePage, true)}/>
        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
