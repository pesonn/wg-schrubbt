import React, { useState, useEffect, useContext } from "react";
import firebase, { getFirebaseCollectionFrom } from "../../firebase";
import { Link } from "react-router-dom";
import styled from "styled-components";
import OverviewName from "../../components/OverviewName";
import AppTitle from "../../components/AppTitle";

export default function Overview(props) {
  const [mbs, setMBs] = useState([]);
  const [appDetails, setAppDetails] = useState({
    name: "Fenske putzt!",
    description: "Das ist euer Putzplan für diese Woche:",
  });

  /* 
  Hier müssen die Userdaten abgerufen werden. 
  Dann muss die user.uid gespeichert werden. 
  Dann muss entsprechend des Users die Gruppe aus der DAtenbank gezogen werden.
  Aus dieser Gruppe muss die ID des zugehörigen Documents aus der putzt-app
  collection gezogen
  */

  let groupdocid = null;

  const getUserData = () => {
    if (props.user) {
      getFirebaseCollectionFrom("users")
        .doc(props.user.uid)
        .onSnapshot((snapshot) => {
          groupdocid = snapshot.data().groupID;
        });
    }
  };
  const getPutzplanData = () => {
    if (props.user) {
      console.log(groupdocid);
      getFirebaseCollectionFrom("putzt-app")
        .doc(groupdocid)
        .collection("putzplan")
        .orderBy("name", "asc") // sortiert anzeige alphabetisch
        .onSnapshot((snapshot) => {
          const dbdata = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            const dbid = doc.id;
            dbdata.push({ ...data, dbid });
          });
          setMBs(dbdata);
        });
    }
  };
  useEffect(() => {
    getUserData();
    getPutzplanData();
  }, [props.user]);

  return (
    <>
      <OverviewList>
        <AppTitle appdetails={appDetails} />
        <ListOfNames>
          {mbs.map((item) => (
            <>
              <OverviewName item={item} />
            </>
          ))}
        </ListOfNames>
      </OverviewList>
      <LegalsLink>
        <Link to="/Legals">Legals</Link>
      </LegalsLink>
    </>
  );
}

const OverviewList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80vw;
  margin-left: 10vw;
  padding: 8vh 0 0 0;
  min-height: 350px;
`;

const ListOfNames = styled.section`
  height: 50vh;
  width: 100%;
  margin-top: 3vh;
  display: flex;
  flex-wrap: wrap;
`;

const LegalsLink = styled.sub`
  position: absolute;
  bottom: 15px;
  right: 30px;
  font-size: 0.8rem;
`;
