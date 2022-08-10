// import React from "react";
// import { Outlet } from "react-router";

// export default function ResultsScreenHome() {
//   return (
//     <div className="w-full h-full flex justify-start flex-col">
//       {<Outlet />}
//     </div>
//   );
// }

import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getAsObjectFromSession } from "../../contants/libraries/easy";

export default function ResultsScreenHome() {
  let isValidated = getAsObjectFromSession("resultsData");
  let cachedUrl = getAsObjectFromSession("cachedResultsUrl");
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
