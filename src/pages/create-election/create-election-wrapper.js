import React from "react";
import ElectionProvider from "./context/create-election-context";
import CreateElection from "./create-election";

export default function CreateElectionWrapper() {
  return (
    <ElectionProvider>
      <CreateElection />
    </ElectionProvider>
  );
}
