import React from "react";
import { useParams } from "react-router-dom";

const MyProfile: React.FC = () => {
  const { userId } = useParams();
  return <div>{userId}</div>;
};

export default MyProfile;
