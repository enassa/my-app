import React from "react";
import ImageLibraryProvider from "../../components/image-library/image-library-hook";
import ElectionProvider from "./context/create-election-context";
import CreateElection from "./create-election";

export default function CreateElectionWrapper() {
  return (
    <ElectionProvider>
      <ImageLibraryProvider>
        <CreateElection />
      </ImageLibraryProvider>
    </ElectionProvider>
  );
}
