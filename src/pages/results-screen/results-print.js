import React, { useRef, useState } from "react";
import {
  ArrowDownward,
  ArrowDropDown,
  ArrowDropUp,
  Download,
  EmailOutlined,
  HowToReg,
  HowToVote,
  Logout,
  PhoneOutlined,
  Print,
  Refresh,
  TerminalOutlined,
  WhatsApp,
  WhatsappOutlined,
} from "@mui/icons-material";
import GridLayOut from "../../components/grid_layout/GridLayout";
import { elections } from "../../components/contants/dummy-data";
import { getAsObjectFromSession } from "../../contants/libraries/easy";
import ResultsCard from "../../components/results-card/results-card";
import { useElectionServices } from "../../redux/slices/election-slice/election-hook";
import { useEffect } from "react";
import { useReactToPrint } from "react-to-print";

export default function ResultsPrint() {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // const { openedElection } = useElectionServices();
  const { loading, logoutAsync, getLatesResultsAsync, electionResults } =
    useElectionServices();
  let resultsCache = getAsObjectFromSession("resultsData");
  const openedElection = electionResults ?? {};
  const [activeResults, setActiveResults] = useState([0]);
  const [hovered, setHovered] = useState(false);
  const addOrRemoveFromSelected = (index) => {
    let newItems = [];
    if (activeResults.includes(index)) {
      newItems = activeResults.filter((item) => item !== index);
      setActiveResults([...newItems]);
      return;
    }
    newItems = [...activeResults, index];
    setActiveResults([...newItems]);
  };

  const ejectContestants = () => {
    // CHEK IF AN ELECTION IS OPENDED AND IF IT HAS POSITIONS
    let positions =
      !!openedElection && Array.isArray(openedElection?.Positions)
        ? openedElection?.Positions
        : [];

    // LOOP THROUGH ALL POSITIONS AND PRINT OUT CONTESTANTS FOR EACH POSITION
    return positions.map((item, index) => {
      let contestants = Array.isArray(openedElection.Contestants)
        ? openedElection.Contestants
        : [];
      console.log(contestants);
      let contestantsForThePosition = contestants?.filter(
        (contestant) =>
          contestant?.Position.toLowerCase() === item?.Title?.toLowerCase()
      );
      let dropDown = activeResults.includes(index);

      return (
        <div key={index} className="flex flex-col w-full  p-5 ">
          <table
            style={{
              width: "100%",
              backgroundColor: "indigo",
              height: "150px",
            }}
          >
            <tr style={{ width: "100%", align: "center" }}>
              <td style={{ width: "100%", align: "center" }}>
                <span
                  onClick={() => handlePrint()}
                  className="text-white cursor-pointer hover:text-gray-50 absolute right-[40px] top-[40px]"
                >
                  <Print />
                </span>
                <div className=" flex absolute top-[15px] left-[35px] w-auto justify-center items-center mt-[20px]">
                  <img
                    style={{ width: "30%", border: 0 }}
                    src="https://firebasestorage.googleapis.com/v0/b/koinovote-361416.appspot.com/o/emailtemplateimages%2Fapplogowhite.png?alt=media&token=29b942e8-ecfc-429e-bfea-fa4d2e0379e7"
                    alt="logo"
                    title="image"
                    // style={{width:144, height:144}}
                  />
                  <div style={{ fontSize: 25, color: "white", marginLeft: 10 }}>
                    <span>
                      Koino<b>Vote</b>
                    </span>
                  </div>
                </div>
              </td>
            </tr>
            <tr
              className="text-white "
              style={{ width: "100%", align: "center" }}
            >
              <div className="w-full h-full  flex flex-col justify-center items-center relative">
                <h2 className="text-3xl ">{openedElection.Title} results</h2>
                <div className="mb-[10px] w-full text-center">
                  {openedElection.TotalVoted} out of{" "}
                  {openedElection.NumberOfVoters} votes recorded
                </div>
                <div className="text-xs w-full absolute bottom-[10px] flex justify-center items-center">
                  <PhoneOutlined style={{ fontSize: 15, marginRight: 5 }} />
                  <span className="mr-[15px]">0549546822</span>
                  <WhatsappOutlined style={{ fontSize: 15, marginRight: 5 }} />
                  <span className="mr-[15px]">0501595639</span>
                  <EmailOutlined style={{ fontSize: 15, marginRight: 5 }} />
                  <span> koinovot@gmail.com</span>
                </div>
              </div>
            </tr>
          </table>
          <div className="w-full flex items-center mt-[40px] mb-[40px]">
            <span
              onClick={() => {
                addOrRemoveFromSelected(index);
              }}
              className="whitespace-nowrap  cursor-pointer bg-blue-500 flex justify-between py-2 pl-3 text-white rounded-sm px-2 w-auto mr-2"
            >
              {item?.Title}
              <>{dropDown ? <ArrowDropUp /> : <ArrowDropDown />}</>
            </span>
            <div className="w-full bg-slate-500 h-[0.5px] "></div>
          </div>
          <div
            className={` ${
              dropDown ? "h-auto" : "h-[0px] "
            } transition-all duration-300 flex w-full overflow-hidden `}
          >
            <GridLayOut
              style={{
                // gridTemplateColumns: "repeat(4,1fr)",
                justifyContent: "center",
                padding: 40,
                backgroundColor: "#DFDFDF",
              }}
              className="grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xlg:grid-cols-5"
            >
              {contestantsForThePosition
                .sort((a, b) => b?.VotesCount - a?.VotesCount)
                .map((contestant, count) => {
                  console.log("=====", contestant);
                  return (
                    <div className="mb-[15px]">
                      <ResultsCard
                        key={count}
                        info={contestant}
                        position={count + 1}
                      />
                    </div>
                  );
                })}
            </GridLayOut>
          </div>
          {/* <div
            className={` ${
              dropDown ? "h-auto" : "h-[0px] "
            } transition-all duration-300 flex w-full overflow-hidden md:`}
          >
            <div
              style={{
                padding: 40,
                backgroundColor: "#DFDFDF",
              }}
              className="flex justify-start flex-wrap items-center w-full content-start"
            >
              {contestantsForThePosition
                .sort((a, b) => b?.VotesCount - a?.VotesCount)
                .map((contestant, count) => {
                  console.log("=====", contestant);
                  return (
                    <div className="lg:mr-[42px] mb-[30px] md:mr-[70px] sm:mr-[50px] mr-[40px]">
                      <ResultsCard
                        key={count}
                        info={contestant}
                        position={count + 1}
                      />
                    </div>
                  );
                })}
            </div>
          </div> */}
        </div>
      );
      // sort((a, b) => a - b)
    });
  };
  let percentageProgress =
    (parseInt(resultsCache?.TotalVoted) /
      parseInt(resultsCache?.NumberOfVoters)) *
    100;
  console.log(percentageProgress);
  const myref = useRef();
  let checkFirst = myref.current;

  useEffect(() => {
    if (electionResults === undefined && !loading) {
      getLatesResultsAsync({
        orgCode: resultsCache?.orgCode,
        electionId: resultsCache?.electionId,
        token: resultsCache?.token,
      });
    }
    checkFirst++;
    setTimeout(() => {
      handlePrint();
    }, 500);
  }, []);
  return (
    <div ref={componentRef} className="w-full h-auto flex flex-col ">
      <div className="flex w-auto h-full flex-col ">{ejectContestants()}</div>
    </div>
  );
}
