import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.scss";

function NoPage() {
  const navigate = useNavigate();

  return <div class="NoPage">404</div>;
}

export default NoPage;
