import React from "react";
import { VStack, ChakraProvider, CSSReset } from "@chakra-ui/react";
import ShuttleDetail from "./ShuttleDetails";

const ShuttlePage = () => {
  const shuttleData = {
    id: "123",
    name: "Shuttle One",
    joinedOn: "2023-01-01",
    vehiclesOwned: 5,
    companiesCollaborated: "Company A, Company B",
  };

  return (
    <ChakraProvider>
      <CSSReset />
      <h2 style={{ textAlign: "center" }}>Shuttle Details</h2>
      {/* <VStack spacing={4} align="start" p={4}> */}
      <ShuttleDetail shuttle={shuttleData} />
      {/* </VStack> */}
    </ChakraProvider>
  );
};

export default ShuttlePage;
