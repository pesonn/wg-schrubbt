import React, { useState, useEffect } from "react";
import firebase, { getFirebaseCollectionFrom } from "../firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import AppTitle from "../components/AppTitle";
import Button from "../components/Button";

export default function Admin(props) {
  firebase.auth().languageCode = "de";
  const uiConfig = {
    signInFlow: "popup",
    signInSuccessUrl: "/",
    signInOptions: [
      {
        provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        requireDisplayName: true,
      },
      {
        provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        scopes: ["https://www.googleapis.com/auth/plus.login"],
      },
    ],
  };

  return (
    <>
      <AppTitle
        appdetails={{ name: "Hello Admin", description: "" }}
      ></AppTitle>
      <Button>starte den Test</Button>

      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
    </>
  );
}
