import HomePage from '../home_page/homePage'

import AutorizationPage from '../authorization/authorization'
import Search from '../search/search'
import Loader from '../loader/loader'
import css from '../main/main.module.css'
import { Routes, Route } from 'react-router-dom'


const Main = (props) => {
  
  return (
    <div className={css.main}>
      <Routes>
          <Route exact path={'/'} element={ <HomePage {...props}/> }/>
          <Route path={'/autorization'} element={ <AutorizationPage {...props}/> }/>
          <Route path={'/search'} element={ <Search {...props}/> }/>
          <Route path={'/loader'} element={ <Loader {...props}/> }/> 
      </Routes>
    </div>
  );
}

export default Main;
