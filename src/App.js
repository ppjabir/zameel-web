import React , { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './Home';
import { About } from './About';
import { FeatureVideos } from './FeatureVideos';
import { NoMatch } from './NoMatch';
import { NavigationBar } from './components/NavigationBar';
import {SiteContext} from './SiteContext';
import 'bootstrap/dist/css/bootstrap.min.css';
var _ = require('lodash');

const BASE_API_URL = "http://portal.zameelapp.com/api/";
const BASE_FILE_URL = "http://files.zameelapp.com/";
const YOUTUBE_THUMB_IMAGE = "https://img.youtube.com/vi/";

function App() {
  const [siteData, setSiteData] = useState(null);
  useEffect(() => {
    const options = {
      url: '/api/gethometabdata',
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      data: {
        userId: '123',
        lastMediaId: '0',
        language: 'en',
        token: 'fgfgfg'
      }
    };
    
    axios(options)
    .then(response => {
      //console.log(response);
      response.data.banner_list = _.orderBy(response.data.banner_list, ['order'], ['asc']);
      response.data.video_list = _.orderBy(response.data.video_list, ['published_at'], ['desc']);
      console.log('actual response', response)
      setSiteData(response.data);
    });
  }, []);
  
  const zameelContextData = {
    siteData,
    apiURL: BASE_API_URL,
    fileURL: BASE_FILE_URL,
    youTubeThumb: YOUTUBE_THUMB_IMAGE
  }
  return (
    <>
      <SiteContext.Provider value={zameelContextData}>
        
        
          <Router>
          <NavigationBar />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/about" component={About} />
              <Route exact path="/featureVideos" component={FeatureVideos} />
              <Route component={NoMatch} />
            </Switch>
          </Router>
          
        
        <footer className='footer mt-auto py-3 bg-secondary "color-nav" text-white'>
          <div className="text-center">
            <small>@copyright&copy;wisdom islamic organization</small>
          </div>
        </footer>
      </SiteContext.Provider>
    </>
  );
}

export default App;



