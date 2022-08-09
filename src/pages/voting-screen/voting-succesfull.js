import { Check, CheckCircle, HowToVote } from "@mui/icons-material";
import React, { useEffect } from "react";
import PopUpButton from "../../components/popup-button/popup-button";
import { useNavigate } from "react-router-dom";
import { ALL_URLS } from "../../contants/urls/rout-links";
import {
  encodeToB64,
  getAsObjectFromSession,
  removeItemsFromLocalStorage,
  removeItemsFromSessionStorage,
} from "../../contants/libraries/easy";

export default function VotingSuccesfull() {
  const navigate = useNavigate();
  useEffect(() => {
    removeItemsFromSessionStorage(["activePosition", "votingElection"]);
    let cachedUrl = getAsObjectFromSession("cachedUrl");
    setTimeout(() => {
      if (cachedUrl?.url !== undefined) {
        navigate(cachedUrl.url);
      } else {
        console.log("could not return to verification screen");
      }
    }, 3000);
  });
  return (
    <div className="w-full z-[-3] h-full flex justify-center items-center bg-[white">
      <div className="bg z-[-2] relative flex justify-center  flex-col items-center">
        {/* pulser */}
        <div className="bg z-[-1] top-0 w-[300px] h-[300px] animate-ping rounded-full bg-green-500 absolute px-2"></div>
        <PopUpButton
          noText={true}
          innerStyles={{
            backgroundColor: "#116149",
            display: "flex",
            borderRadius: "100%",
            minWith: 300,
            minHeight: 300,
            width: 300,
            height: 300,
            flexFlow: "column",
            justifyContent: "center",
            alignItems: "center",

            border: "1px solid white",
          }}
          handleClick={() => {
            // if (activePosition < totalNumberOfPosition) {
            //   setActivePosition(activePosition + 1);
            // }
            // if (validateVote()) {
            //   submitVote();
            // }
          }}
        >
          <Check style={{ fontSize: 100 }} />
          <>Vote recorded</>
        </PopUpButton>
        {/* <h1 className="text">Congrats🥳 your vote has been recorded!!</h1> */}
      </div>
    </div>
  );
}
