// @flow
export type LoginData = {
  userID: string,
  accessToken: string,
  appId: string,
};

export type FBMe = {
  name:string,
  id: string,
}

// https://developers.facebook.com/docs/sharing/reference/share-dialog
export type FBShareOption = {
  href: String,
  hashtag: ?string,
  mobile_iframe: boolean,
}

export type FBShareResponse = {
  post_id: ?String,
  error_message: ?string,
}
