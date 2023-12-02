import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Flex,
  FormControl,
  FormLabel,
  Select,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  HStack,
  Input,
  VStack,
  Radio,
  RadioGroup,
  Box,
  Stack,
  Text,
} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from "@chakra-ui/icons";

const AddShuttleRoute = () => {
  const token = localStorage.getItem("token");
  const headers = {
    token: token,
  };
  const backendUrl = "http://localhost:8080";
  const [selectedLocation, setSelectedLocation] = useState("");
  const [tableData, setTableData] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [routeData, setRouteData] = useState({
    vehicleId: "",
    vehicleName: "",
    capacity: 0,
    source: "",
    destination: "",
    startTime: "",
    endTime: "",
    stops: [],
    estimatedTime: "",
  });
  const [vehicleData, setVehicleData] = useState({
    id: "",
    vehicleNumber: "",
    type: "",
    totalCapacity: "",
    remainingCapacity: "",
    active: "",
  });
  const [vehiclesList, setVehiclesList] = useState([]);
  const [newStop, setNewStop] = useState("");
  const [originalStops, setOriginalStops] = useState([]);
  const [editedStops, setEditedStops] = useState([]);

  const handleSearch = async () => {
    try {
      const data = [
        {
          id: "1",
          streetName: "Sample Street 1",
          zipCode: "12345",
          time: "10:00 AM",
          numOfPeople: 5,
        },
        {
          id: "2",
          streetName: "Sample Street 2",
          zipCode: "67890",
          time: "12:30 PM",
          numOfPeople: 8,
        },
      ];

      setTableData(data);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const handleRadioChange = (id) => {
    setSelectedVehicle(id);
    setRouteData({
      vehicleId: "",
      vehicleName: "",
      capacity: 0,
      source: "",
      destination: "",
      startTime: "",
      endTime: "",
      stops: [],
      estimatedTime: "",
    });
  };

  const handleSave = () => {
    console.log("Saved Vehicle:", selectedVehicle);
    console.log("Route Data:", routeData);
    setSelectedVehicle(null);
    setRouteData({
      vehicleId: "",
      vehicleName: "",
      capacity: 0,
      source: "",
      destination: "",
      startTime: "",
      endTime: "",
      stops: [],
      estimatedTime: "",
    });
  };

  const handleCancel = () => {
    setSelectedVehicle(null);
    setRouteData({
      vehicleId: "",
      vehicleName: "",
      capacity: 0,
      source: "",
      destination: "",
      startTime: "",
      endTime: "",
      stops: [],
      estimatedTime: "",
    });
  };

  const handleAddStop = () => {
    if (newStop.trim() !== "") {
      // setCompanies([...companies, newCompany.trim()]);
      setEditedStops([...editedStops, newStop.trim()]);
      setNewStop("");
    }
  };

  const handleRemoveStop = (index) => {
    const updatedStops = [...editedStops];
    updatedStops.splice(index, 1);
    setEditedStops(updatedStops);
  };

  const setVehicleAndRouteData = (id) => {
    const fetchVehicleData = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/vehicles/getVehicle/${id}`,
          {
            headers: headers,
          }
        );
        console.log("Response - ", response.data);
        setVehicleData(response.data);
        setRouteData({
          ...routeData,
          vehicleName: response.data.vehicleNumber,
        });
      } catch (error) {
        console.error("Error fetching vehicles data:", error);
      }
    };
    fetchVehicleData();
  };
  useEffect(() => {
    const fetchVehiclesList = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/vehicles/getVehicles`,
          {
            headers: headers,
          }
        );
        console.log("Response - ", response);
        setVehiclesList(response.data || {});
      } catch (error) {
        console.error("Error fetching vehicles data:", error);
      }
    };
    fetchVehiclesList();
    console.log(vehiclesList);
  }, []);

  return (
    <>
      <Flex direction="column" align="center" justify="center">
        <HStack>
          <FormControl>
            <FormLabel htmlFor="location">Select Location</FormLabel>
            <Select
              id="location"
              placeholder="Select location"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="bayArea">Bay Area</option>
              <option value="newYork">New York</option>
              {/* Add more options as needed */}
            </Select>
          </FormControl>

          <Button mt={8} colorScheme="teal" onClick={handleSearch}>
            Search
          </Button>
        </HStack>
      </Flex>
      {tableData.length > 0 && (
        <VStack align="stretch" mt={8}>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Select</Th>
                <Th>Street Name</Th>
                <Th>Zip Code</Th>
                <Th>Time</Th>
                <Th>No of People</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tableData.map((data, index) => (
                <Tr key={index}>
                  <Td>
                    <RadioGroup
                      onChange={() => handleRadioChange(data.id)}
                      value={selectedVehicle}
                    >
                      <Radio value={data.id} />
                    </RadioGroup>
                  </Td>
                  <Td>{data.streetName}</Td>
                  <Td>{data.zipCode}</Td>
                  <Td>{data.time}</Td>
                  <Td>{data.numOfPeople}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </VStack>
      )}
      {selectedVehicle && (
        <Flex direction="column" align="center" justify="center">
          <h2 align="center" style={{ marginTop: "2rem" }}>
            Add Route
          </h2>
          <HStack mt={4}>
            <VStack align="stretch">
              <FormControl>
                <FormLabel htmlFor="vehicleName">Vehicle Name</FormLabel>
                <Select
                  id="vehicleName"
                  placeholder="Select a vehicle"
                  value={vehicleData.id}
                  onChange={(e) => setVehicleAndRouteData(e.target.value)}
                >
                  {vehiclesList.length > 0 &&
                    vehiclesList.map((data, index) => (
                      <option value={data._id}>{data.vehicleNumber}</option>
                    ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="capacity">Capacity</FormLabel>
                <Input
                  id="capacity"
                  type="number"
                  value={routeData.capacity}
                  onChange={(e) =>
                    setRouteData({
                      ...routeData,
                      capacity: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="source">Source</FormLabel>
                <Input
                  id="source"
                  value={routeData.source}
                  onChange={(e) =>
                    setRouteData({ ...routeData, source: e.target.value })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="destination">Destination</FormLabel>
                <Input
                  id="destination"
                  value={routeData.destination}
                  onChange={(e) =>
                    setRouteData({
                      ...routeData,
                      destination: e.target.value,
                    })
                  }
                />
              </FormControl>
            </VStack>

            <VStack align="stretch">
              <FormControl>
                <FormLabel htmlFor="startTime">Start Time</FormLabel>
                <Input
                  id="startTime"
                  value={routeData.startTime}
                  onChange={(e) =>
                    setRouteData({
                      ...routeData,
                      startTime: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="endTime">End Time</FormLabel>
                <Input
                  id="endTime"
                  value={routeData.endTime}
                  onChange={(e) =>
                    setRouteData({
                      ...routeData,
                      endTime: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="stops">Stops </FormLabel>
                <VStack align="start">
                  {editedStops.map((stop, index) => (
                    <Flex key={index} justify="space-between" w="100%">
                      <Text>{stop}</Text>
                      <CloseIcon
                        cursor="pointer"
                        color="red.500"
                        onClick={() => handleRemoveStop(index)}
                      />
                    </Flex>
                  ))}
                </VStack>
                <Flex mt={2}>
                  <Input
                    id="stops"
                    value={routeData.stops.join(",")}
                    onChange={(e) =>
                      setRouteData({
                        ...routeData,
                        stops: e.target.value.split(","),
                      })
                    }
                  />
                  <AddIcon
                    mt={2}
                    ml={2}
                    cursor="pointer"
                    color="teal.500"
                    onClick={handleAddStop}
                  />
                </Flex>
              </FormControl>

              <FormControl>
                <FormLabel htmlFor="estimatedTime">Estimated Time</FormLabel>
                <Input
                  id="estimatedTime"
                  value={routeData.estimatedTime}
                  onChange={(e) =>
                    setRouteData({
                      ...routeData,
                      estimatedTime: e.target.value,
                    })
                  }
                />
              </FormControl>
            </VStack>
            {vehicleData.vehicleNumber.length > 0 && (
              <VStack align="stretch">
                <Flex
                  flexDirection="column"
                  align="center"
                  justify="center"
                  paddingLeft={"10rem"}
                >
                  <h2 align="center" style={{ marginTop: "2rem" }}>
                    Selected vehicle's details :
                  </h2>
                  <Box
                    sx={{
                      border: "1px solid white",
                      w: "100%",
                      padding: 10,
                      borderRadius: 10,
                      justifyContent: "center",
                    }}
                  >
                    <Stack key={vehicleData.id}>
                      <Text>Vehicle Name : {vehicleData.vehicleNumber}</Text>
                      <Text>Type : {vehicleData.type}</Text>
                      <Text>Total Capacity : {vehicleData.totalCapacity}</Text>
                      <Text>
                        Remaining Capacity : {vehicleData.remainingCapacity}
                      </Text>
                      <Text>
                        Status : {vehicleData.active ? `Active` : `Not Active`}
                      </Text>
                    </Stack>
                  </Box>
                </Flex>
              </VStack>
            )}
          </HStack>
          {selectedVehicle && (
            <HStack mt={4}>
              <Button colorScheme="teal" onClick={handleSave}>
                Save
              </Button>
              <Button colorScheme="gray" onClick={handleCancel}>
                Cancel
              </Button>
            </HStack>
          )}
        </Flex>
      )}
    </>
  );
};

export default AddShuttleRoute;
