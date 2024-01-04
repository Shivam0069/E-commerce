import React from "react";
const getUserDetails = () => {
  const userDetailsString = localStorage.getItem("userDetails");
  return userDetailsString ? JSON.parse(userDetailsString) : null;
};
export default function Protected(props) {
  const { Component } = props;
  const data = getUserDetails();
  if (!data || !data.token) {
    window.location.href = "/in";
    return;
  }
  return <div>{data.token && <Component />}</div>;
}
