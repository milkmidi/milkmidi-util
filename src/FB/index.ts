
/* eslint no-unused-expressions:0 */
/* global FB */

import type { LoginData, FBMe, FBShareResponse } from './types';

export const FACEBOOK_STATUS_CONNECTED = 'connected';
export const FACEBOOK_STATUS_NOT_AUTHORIZED = 'not_authorized';

let SDK_INITED = false;

const data:LoginData = {
  userID: '',
  accessToken: '',
  appId: '',
};

export const getUserID = () => data.userID;
export const getAccessToken = () => data.accessToken;

export const init = (appId:string, version:string = 'v2.10'):Promise<void> => {
  if (SDK_INITED) {
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    data.appId = appId;
    window.fbAsyncInit = () => {
      FB.init({
        appId,
        autoLogAppEvents: true,
        xfbml: true,
        version,
      });
      SDK_INITED = true;
      resolve();
    };
    /* eslint-disable */
    (function (d, s, id) {
      var js,fjs = d.getElementsByTagName(s)[0];
      if ( d.getElementById( id ) ) { return; }
      js = d.createElement(s); js.id = id;
      js.src = '//connect.facebook.net/zh_TW/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    /* eslint-enable */
  });
};

export const getLoginStatus = ():Promise<LoginData> => (
  new Promise((resolve, reject) => {
    window.FB.getLoginStatus(({ status, authResponse }) => {
      if (status === FACEBOOK_STATUS_CONNECTED) {
        data.userID = authResponse.userID;
        data.accessToken = authResponse.accessToken;
        resolve(data);
      } else {
        reject();
      }
    });
  })
);


export const login = (scope:string = ''):Promise<LoginData> => (
  new Promise((resolve, reject) => {
    window.FB.login(({ authResponse }) => {
      if (authResponse) {
        data.userID = authResponse.userID;
        data.accessToken = authResponse.accessToken;
        resolve(data);
      } else {
        reject(new Error('Facebook login cancelled'));
      }
    }, { scope });
  })
);

export const loginRedirect = (appId:string, redirectUri:string) => {
  const params = [
    `client_id=${appId}`,
    `redirect_uri=${encodeURIComponent(redirectUri)}`,
  ];
  window.location.href = `https://www.facebook.com/dialog/oauth?${params.join('&').toString()}`;
};

export const logout = (): Promise<any> => (
  new Promise((resolve) => {
    window.FB.logout(result => resolve(result));
  })
);

export const getMe = ():Promise<FBMe> => new Promise(resolve => FB.api('/me', res => resolve(res)));


export const sharer = (url:string) => {
  window.open(`https://www.facebook.com/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
};

/**
 * @param {string} href
 * @return {Promise}
 */
export const share = (href:string):Promise<FBShareResponse> => (
  new Promise((resolve) => {
    window.FB.ui({
      method: 'share',
      mobile_iframe: true,
      href,
    }, (res) => {
      resolve(res);
    });
  })
);

/**
 * @link https://developers.facebook.com/docs/sharing/reference/share-dialog
 * @param {string} href
 * @param {string} appId
 * @param {string} redirectUri
 */
export const shareRedirect = (href:string, appId:string, redirectUri:string):void => {
  const params = [
    `app_id=${appId}`,
    'display=popup',
    `href=${encodeURIComponent(href)}`,
    `redirect_uri=${encodeURIComponent(redirectUri)}`,
  ];
  window.location.href = `https://www.facebook.com/dialog/share?${params.join('&').toString()}`;
};


/**
 * scripe
 * @param {string} url
 */
export const scrape = (url:string):Promise<string> => new Promise((resolve, reject) => {
  const xhr = new XMLHttpRequest();
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.open('POST', 'https://graph.facebook.com/');
  xhr.onload = () => {
    if (xhr.status === 200) {
      resolve(xhr.responseText);
    } else {
      reject(xhr.status);
    }
  };
  xhr.send(`id=${url}&scrape=true`);
});
