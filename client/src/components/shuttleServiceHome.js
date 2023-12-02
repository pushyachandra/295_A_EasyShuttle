import React, { useState } from "react";
import {
  ChakraProvider,
  CSSReset,
  Box,
  VStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import ViewShuttleRoutes from "./ViewRoutes";
import ShuttlePage from "./Shuttle";
import VehicleTable from "./Vehicle";
import AddShuttleRoute from "./AddShuttleRoute";

const ShuttleRoutes = () => (
  <div>
    <h2>View Shuttle Routes</h2>
  </div>
);

const ManageShuttleRoutes = () => (
  <div>
    <h2>Manage Shuttle Routes</h2>
  </div>
);

const ViewVehicles = () => (
  <div>
    <h2>View Vehicles</h2>
  </div>
);

const AddVehicles = () => (
  <div>
    <h2>Manage Vehicles</h2>
  </div>
);

const App = () => {
  const [tabIndex, setTabIndex] = useState(0);

  return (
    <ChakraProvider>
      <CSSReset />
      <Box
        bg="black"
        color="white"
        minH="100vh"
        p={8}
        display="flex"
        padding={"3rem"}
      >
        <VStack spacing={8} align="stretch" w="100%" maxW="2000px">
          <Tabs
            isFitted
            colorScheme="teal"
            index={tabIndex}
            onChange={(index) => setTabIndex(index)}
          >
            <TabList>
              <Tab>Shuttle</Tab>
              <Tab>Shuttle Routes</Tab>
              <Tab>Manage Shuttle Routes</Tab>
              <Tab>Vehicles</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <ShuttlePage />
              </TabPanel>
              <TabPanel>
                <ViewShuttleRoutes />
              </TabPanel>
              <TabPanel>
                <AddShuttleRoute />
              </TabPanel>
              <TabPanel>
                <VehicleTable />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

export default App;
