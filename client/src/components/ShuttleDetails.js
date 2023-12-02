import React, { useState, useEffect } from "react";
import {
  Box,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  // AlertDescription,
  // HStack,
  Flex,
  // CloseButton,
  // IconButton,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { CloseIcon } from "@chakra-ui/icons";
import axios from "axios";
import { Stack } from "react-bootstrap";
import WarningAlert from "./Misc/Warning";
import Error from "./Misc/Error";
import { backendUrl, headers } from "../utils/config";

const ShuttleDetail = ({ userId }) => {
  const [shuttleData, setShuttleData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedShuttle, setEditedShuttle] = useState({});
  const [loading, setLoading] = useState(true);
  const [vehicleCount, setVehicleCount] = useState(0);
  // const [companies, setCompanies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [newCompany, setNewCompany] = useState("");
  const [errorResp, setError] = useState("");
  const [originalCompanies, setOriginalCompanies] = useState([]);
  const [editedCompanies, setEditedCompanies] = useState([]);
  const fetchShuttleData = async () => {
    try {
      const response = await axios.get(
        `${backendUrl}/api/shuttles/getShuttleData`,
        {
          headers: headers,
        }
      );
      // console.log(response.data);
      setShuttleData(response.data.shuttle || []);
      setVehicleCount(response.data.vehicleCount || 0);

      if (response.data.shuttle) {
        // setCompanies(response.data.shuttle.companiesAssociated);
        setOriginalCompanies(response.data.shuttle.companiesAssociated);
        setEditedCompanies(response.data.shuttle.companiesAssociated);
      }
      setLoading(false);
      // console.log(shuttleData);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
      console.error("Error fetching shuttle data:", error);
      setErrorMessage("Error fetching shuttle data. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchShuttleData();
  }, [userId]);

  const addShuttle = async (newShuttle) => {
    try {
      await axios.post(`${backendUrl}/api/shuttles/updateShuttle`, newShuttle, {
        headers: headers,
      });
      fetchShuttleData();
      setIsAdding(false);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
        console.log(errorResp);
      }
      console.error("Error adding shuttle data:", error);
    }
  };

  const handleAddClick = () => {
    setIsAdding(true);
  };

  const handleSave = async () => {
    const newShuttle = {
      ...editedShuttle,
      companiesAssociated: editedCompanies,
    };

    // const newShuttle = { ...editedShuttle, companiesAssociated: companies };
    try {
      await axios.post(`${backendUrl}/api/shuttles/updateShuttle`, newShuttle, {
        headers: headers,
      });
      setIsEditing(false);
      setError("");
      setIsAdding(false);
      fetchShuttleData();
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.error);
      }
      console.error("Error saving shuttle data:", error);
    }
  };

  const handleCancel = () => {
    setError("");
    setIsEditing(false);
    setIsAdding(false);
  };

  const handleEditClick = (shuttle) => {
    setIsEditing(true);
    setEditedShuttle({ ...shuttle });
    setEditedCompanies([...originalCompanies]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedShuttle((prevShuttle) => ({ ...prevShuttle, [name]: value }));
  };
  const handleAddCompany = () => {
    if (newCompany.trim() !== "") {
      // setCompanies([...companies, newCompany.trim()]);
      setEditedCompanies([...editedCompanies, newCompany.trim()]);
      setNewCompany("");
    }
  };

  const handleRemoveCompany = (index) => {
    const updatedCompanies = [...editedCompanies];
    updatedCompanies.splice(index, 1);
    // setCompanies(updatedCompanies);
    setEditedCompanies(updatedCompanies);
  };

  return (
    <>
      {shuttleData.length === 0 && !isAdding ? (
        <>
          <Button colorScheme="teal" float={"right"} onClick={handleAddClick}>
            Add Shuttle Data
          </Button>
          <Box
            mt={"10rem"}
            // border={"1px solid white"}
            // borderRadius={10}
            // padding={5}
          >
            <WarningAlert
              title={errorMessage || "Shuttle Data Not Available !"}
              description={
                errorMessage ? null : "Please add the data to view here"
              }
            />
          </Box>
          {/* <Box
            mt={"5rem"}
            border={"1px solid white"}
            borderRadius={10}
            padding={5}
          >
            <Text textAlign={"center"} fontWeight={"bold"}>
              {errorMessage || "Shuttle Data Not Available"}
            </Text>
          </Box> */}
        </>
      ) : (
        <Flex
          align="center"
          justify="center"
          paddingTop={"5rem"}
          paddingLeft={"10rem"}
        >
          <Box
            sx={{
              border: "1px solid white",
              w: "100%",
              padding: 10,
              borderRadius: 10,
              justifyContent: "center",
            }}
          >
            <Stack key={shuttleData.id}>
              <Text>Shuttle Number: {shuttleData.shuttleNumber}</Text>
              <Text>Shuttle Name: {shuttleData.shuttleName}</Text>
              <Text fontWeight="bold">Companies Associated With:</Text>
              {originalCompanies.length > 0 ? (
                <ul>
                  {originalCompanies.map((company, index) => (
                    <li key={index}>{company}</li>
                  ))}
                </ul>
              ) : (
                "None"
              )}
              <Text>No of Vehicles Owned: {vehicleCount}</Text>
              <Text>
                Joined On:{" "}
                {new Date(shuttleData.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>

              <Button
                mt={5}
                // bg={"#FCCB06"}
                colorScheme="teal"
                onClick={() => handleEditClick(shuttleData)}
              >
                Edit
              </Button>
            </Stack>

            {/* Add/Edit Modal */}
            <Modal
              isOpen={isEditing || isAdding}
              onClose={handleCancel}
              size="md"
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  {isAdding ? "Add Shuttle" : "Edit Shuttle"}
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <VStack spacing={4}>
                    <FormControl>
                      <FormLabel>Shuttle Number</FormLabel>
                      <Input
                        type="text"
                        name="shuttleNumber"
                        value={editedShuttle.shuttleNumber || ""}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                    <FormControl>
                      <FormLabel>Shuttle Name</FormLabel>
                      <Input
                        type="text"
                        name="shuttleName"
                        value={editedShuttle.shuttleName || ""}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Companies Associated With</FormLabel>
                      <VStack align="start">
                        {editedCompanies.map((company, index) => (
                          <Flex key={index} justify="space-between" w="100%">
                            <Text>{company}</Text>
                            <CloseIcon
                              cursor="pointer"
                              color="red.500"
                              onClick={() => handleRemoveCompany(index)}
                            />
                          </Flex>
                        ))}
                      </VStack>
                      <Flex mt={2}>
                        <Input
                          type="text"
                          placeholder="Add new company"
                          value={newCompany}
                          onChange={(e) => setNewCompany(e.target.value)}
                        />
                        <AddIcon
                          mt={2}
                          ml={2}
                          cursor="pointer"
                          color="teal.500"
                          onClick={handleAddCompany}
                        />
                      </Flex>
                    </FormControl>
                  </VStack>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="teal" onClick={handleSave} mr={2}>
                    Save
                  </Button>
                  <Button onClick={handleCancel}>Cancel</Button>
                </ModalFooter>
                {errorResp && (
                  <Alert status="error">
                    <AlertIcon />
                    <AlertTitle>{errorResp}</AlertTitle>
                  </Alert>
                )}
              </ModalContent>
            </Modal>
          </Box>
        </Flex>
      )}
    </>
  );
};

export default ShuttleDetail;
