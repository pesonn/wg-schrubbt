import React from "react";
import { Link } from "react-router-dom";
import Emoji from "a11y-react-emoji";
import styled from "styled-components";

export default function OverviewName(props) {
  const Name = styled.h1`
    margin: 0 10% 0 10%;
    width: 80%;
    max-width: 900px;
    min-width: 300px;
    font-size: 6vh;

    & .emoji {
      font-size: 5vh;
      margin: 0 0 0 15px;
    }
  `;

  return (
    <Name key={props.item.id}>
      <Link
        to={{
          pathname: `/${props.item.name || props.item.name.toLowerCase()}`,
          state: {
            data: "test",
          },
        }}
      >
        {props.item.name}{" "}
        {props.item.geputzt ? (
          <Emoji className="emoji" symbol="✅" />
        ) : (
          <Emoji className="emoji" symbol="❌" />
        )}
      </Link>
    </Name>
  );
}