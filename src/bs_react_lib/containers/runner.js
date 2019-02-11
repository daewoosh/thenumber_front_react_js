//**core-js/map */
import 'core-js/es6/map';
//**core-js/set */
import 'core-js/es6/set';
//**core-js/object */
import 'core-js/es6/object';
//**core-js/array */
import 'core-js/es6/array';
//**core-js/es6/promise */
import 'core-js/es6/promise';

import injectTapEventPlugin from 'react-tap-event-plugin';
import { render } from 'react-dom';
import React, { Fragment } from 'react';

injectTapEventPlugin();


const LoadComponent = () => {
  return (
    <div>
      Загрузка...
    </div>
  )
}

const renderReact = (component, elName) => {
  console.log("5. Start renderReact elName="+elName);
  render(component,
    document.getElementById(elName),
  );
}

const loadDeveloper = (app) => {
  console.log("3. Start loadDeveloper");
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log("4. process.env.NODE_ENV !== 'production");
      import('mobx-react-devtools')
        .then((DevTools) => {
          resolve(
            <Fragment>
              {app}
              {/* <DevTools.default /> */}
            </Fragment>
          )
        })
    }
    else {
      console.log("4. process.env.NODE_ENV == 'production");
      resolve(app);
    }
  });

};

function loadIntl(app) {
  const proms = [];
  console.log("1. Start loadIntl");
  return new Promise((resolve, reject) => {
    if (!window.Intl) {
      console.log("2. window.Intl is false");
      proms.push(import('intl'));
      proms.push(import('intl/locale-data/jsonp/en.js'))
      Promise.all(proms)
        .then(() => {
          resolve(app);
        })
    }
    else {
      console.log("2. window.Intl is true");
      resolve(app);
    }
  });
}

const onDeviceReady = ({ app, elName }) => {
  //загрузили intl
  console.log("0. Start onDeviceReady");
  loadIntl(app)
    .then((app) => {
      return loadDeveloper(app);//загрузили все для продакт
    })
    .then((app) => {
      renderReact(app, elName);
    })
}

const run = ({ app, elName }) => {
  if (window.cordova) {
    renderReact(LoadComponent, elName);
    document.addEventListener('deviceready', ()=> onDeviceReady({ app, elName }), false);
    // подписка универсальных ссылок
    universalLinks.subscribe('showRecomendation', eventData => {
      location.hash = eventData.hash;
    });
  }
  else {
    onDeviceReady({ app, elName });
  }
}

export default run;
