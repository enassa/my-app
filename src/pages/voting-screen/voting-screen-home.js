import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getAsObjectFromSession } from "../../contants/libraries/easy";

export default function VotingScreenHome() {
  let isValidated = getAsObjectFromSession("votingElection");
  let cachedUrl = getAsObjectFromSession("cachedUrl");
  useEffect(() => {
    isValidated === undefined &&
      window.location.assign(!!cachedUrl ? cachedUrl.url : "/");
  });
  return (
    <div className="w-full h-full flex justify-start flex-col">
      {!!isValidated ? (
        <Outlet />
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <div></div>
        </div>
      )}
    </div>
  );
}
