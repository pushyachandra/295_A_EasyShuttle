import React, { useState, useEffect } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Collapse,
  Text,
  TableContainer,
  TableCaption,
  ButtonGroup,
  Tfoot,
  IconButton,
  Link,
} from "@chakra-ui/react";
// import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import EditShuttleForm from "./EditShuttleForm";
import VehicleDetailsModal from "./VehicleDetailsModal";
import axios from "axios";
import { backendUrl, headers } from "../utils/config";

const fakeShuttleData = [
  {
    shuttleNumber: "S001",
    capacity: 20,
    vehicle: "6565945d67757f4d75e13675",
    vehicleName: "V001",
    source: "Source A",
    destination: "Destination B",
    startTime: "08:00 AM",
    endTime: "09:30 AM",
    stops: ["Stop 1", "Stop 2", "Stop 3"],
    estimatedTime: "1 hour",
  },
  {
    shuttleNumber: "S001",
    capacity: 20,
    vehicle: "6565945d67757f4d75e13675",
    vehicleName: "V001",
    source: "Source A",
    destination: "Destination B",
    startTime: "08:00 AM",
    endTime: "09:30 AM",
    stops: ["Stop 1", "Stop 2", "Stop 3"],
    estimatedTime: "1 hour",
  },
  {
    shuttleNumber: "S001",
    capacity: 20,
    vehicle: "6565945d67757f4d75e13675",
    vehicleName: "V001",
    source: "Source A",
    destination: "Destination B",
    startTime: "08:00 AM",
    endTime: "09:30 AM",
    stops: ["Stop 1", "Stop 2", "Stop 3"],
    estimatedTime: "1 hour",
  },
  {
    shuttleNumber: "S001",
    capacity: 20,
    vehicle: "6565945d67757f4d75e13675",
    vehicleName: "V001",
    source: "Source A",
    destination: "Destination B",
    startTime: "08:00 AM",
    endTime: "09:30 AM",
    stops: ["Stop 1", "Stop 2", "Stop 3"],
    estimatedTime: "1 hour",
  },
  {
    shuttleNumber: "S001",
    capacity: 20,
    vehicle: "6565945d67757f4d75e13675",
    vehicleName: "V001",
    source: "Source A",
    destination: "Destination B",
    startTime: "08:00 AM",
    endTime: "09:30 AM",
    stops: ["Stop 1", "Stop 2", "Stop 3"],
    estimatedTime: "1 hour",
  },
  {
    shuttleNumber: "S001",
    capacity: 20,
    vehicle: "6565945d67757f4d75e13675",
    vehicleName: "V001",
    source: "Source A",
    destination: "Destination B",
    startTime: "08:00 AM",
    endTime: "09:30 AM",
    stops: ["Stop 1", "Stop 2", "Stop 3"],
    estimatedTime: "1 hour",
  },
  {
    shuttleNumber: "S001",
    capacity: 20,
    vehicle: "6565945d67757f4d75e13675",
    vehicleName: "V001",
    source: "Source A",
    destination: "Destination B",
    startTime: "08:00 AM",
    endTime: "09:30 AM",
    stops: ["Stop 1", "Stop 2", "Stop 3"],
    estimatedTime: "1 hour",
  },
];

const ViewShuttleRoutes = () => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedShuttle, setSelectedShuttle] = useState(null);
  const [selectedVehicleDetails, setSelectedVehicleDetails] = useState(null);
  const [routeData, setRouteData] = useState([]);

  // Fetch shuttle data when the component mounts
  useEffect(() => {
    const fetchRouteData = async () => {
      try {
        const response = await axios.get(
          `${backendUrl}/api/routes/getRouteInfo`,
          {
            headers: headers,
          }
        );
        setRouteData(response.data);
        // console.log(routeData);
      } catch (error) {
        console.error("Error fetching route data:", error);
      }
    };
    fetchRouteData();
  }, []);

  const handleEdit = (shuttle) => {
    setSelectedShuttle(shuttle);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (editedShuttle) => {
    // Handle saving the edited shuttle details (e.g., send to server, update state)
    console.log("Saving edited shuttle:", editedShuttle);
    setSelectedShuttle(null);
    setIsEditModalOpen(false);
  };
  const itemsPerPage = 5; // Number of items to display per page
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedIndex, setExpandedIndex] = useState(-1);

  const handleExpand = (index) => {
    setExpandedIndex((prevIndex) => (prevIndex === index ? -1 : index));
  };

  const totalPages = Math.ceil((routeData.length || 0) / itemsPerPage);
  // console.log(routeData || []);
  const visibleShuttles = routeData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const fetchVehicleDetails = async (vehicleId) => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/vehicles//getVehicle/${vehicleId}`,
        {
          headers: headers,
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching vehicle details:", error);
      throw error;
    }
  };

  const handleVehicleLinkClick = async (vehicleId) => {
    try {
      const vehicleDetails = await fetchVehicleDetails(vehicleId);
      setSelectedVehicleDetails(vehicleDetails);
      setIsEditModalOpen(true);
      // console.log(vehicleDetails);
    } catch (error) {
      console.error("Error fetching vehicle details:", error);
    }
  };

  return (
    <Box
      direction="column"
      textAlign="start"
      alignItems="flex-start"
      justifyContent={"flex-start"}
    >
      <h2>View Shuttle Routes</h2>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Route No</Th>
            <Th>Capacity</Th>
            <Th>Vehicle</Th>
            <Th>Source</Th>
            <Th>Destination</Th>
            <Th>Start Time</Th>
            <Th>End Time</Th>
            <Th>Stops List</Th>
            <Th>Time to Destination</Th>
            {/* <Th>Actions</Th> */}
          </Tr>
        </Thead>
        <Tbody>
          {visibleShuttles.map((shuttle, index) => (
            <React.Fragment key={index}>
              <Tr>
                <Td width={"170px"} sx={{ textAlign: "center" }}>
                  {index + 1}
                </Td>
                <Td sx={{ textAlign: "center" }}>{shuttle.capacity}</Td>
                <Td>
                  <Link
                    onClick={() => handleVehicleLinkClick(shuttle.vehicleId)}
                  >
                    <Text
                      mt={2}
                      textColor={"teal"}
                      fontWeight={"bold"}
                      textDecorationLine={"underline"}
                    >
                      {shuttle.vehicleName}
                    </Text>
                  </Link>
                </Td>
                <Td>{shuttle.source}</Td>
                <Td>{shuttle.destination}</Td>
                <Td width={"130px"}>{shuttle.startTime}</Td>
                <Td width={"130px"}>{shuttle.endTime}</Td>
                <Td width={"150px"} sx={{ textAlign: "center" }}>
                  <Button
                    onClick={() => handleExpand(index)}
                    colorScheme="teal"
                  >
                    {expandedIndex === index ? "Collapse" : "Expand"}
                  </Button>
                </Td>
                <Td sx={{ textAlign: "center" }} width={"200px"}>
                  {shuttle.estimatedTime}
                </Td>
                {/* <Td width={"130px"} sx={{ textAlign: "center" }}>
                  <IconButton
                    icon={<EditIcon />}
                    colorScheme="teal"
                    aria-label="Edit"
                    size="sm"
                    mr={2}
                    onClick={() => handleEdit(shuttle)}
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    colorScheme="red"
                    aria-label="Delete"
                    size="sm"
                  />
                </Td> */}
              </Tr>
              <Collapse in={expandedIndex === index}>
                <Tr>
                  <Td colSpan={11}>
                    <Box p="4">
                      <Text fontWeight="bold">Stops List:</Text>
                      <ul>
                        {shuttle.stops.map((stop, stopIndex) => (
                          <li key={stopIndex}>{stop}</li>
                        ))}
                      </ul>
                    </Box>
                  </Td>
                </Tr>
              </Collapse>
            </React.Fragment>
          ))}
        </Tbody>
        {/* <Tfoot>
          <Tr>
            <Td colSpan={10}>
              <TableContainer>
                <TableCaption></TableCaption>
              </TableContainer>
            </Td>
          </Tr>
        </Tfoot> */}
      </Table>
      <Box marginTop={2} justifyContent={"flex-end"} display={"flex"}>
        <ButtonGroup isAttached>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              colorScheme={currentPage === i + 1 ? "teal" : "gray"}
            >
              {i + 1}
            </Button>
          ))}
        </ButtonGroup>
      </Box>
      {selectedShuttle && (
        <EditShuttleForm
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          shuttle={selectedShuttle}
          onSave={handleSaveEdit}
        />
      )}
      {selectedVehicleDetails && (
        <VehicleDetailsModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          vehicleDetails={selectedVehicleDetails}
        />
      )}
    </Box>
  );
};

export default ViewShuttleRoutes;
