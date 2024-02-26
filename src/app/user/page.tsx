"use client";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCodeBranch,
  faEllipsisVertical,
  faEnvelope,
  faLock,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import {
  Alert,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Row,
} from "react-bootstrap";
import React, { SyntheticEvent, useEffect, useState } from "react";
import apiGateway from "../gateway/gateways";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import Link from "next/link";
import router from "next/router";
import { validateRegistrationData } from "../gateway/validators";

interface Users {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  date: string;
  branch: string;
  branch_name: string;
  role: string;
  role_name: string;
}
interface DropdownItem {
  id: number;
  name: string;
}

export default function Page() {
  const [error, setError] = useState<string | null>("");
  const [branchData, setBranchData] = useState<DropdownItem[]>([]);
  const [users, setUsers] = useState<Users[]>([]);
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>("");
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const value = await apiGateway.read("users");
      const branchData = await apiGateway.read("getBranch");
      const rolesData = await apiGateway.read("getAllRoles");
      setBranchData(branchData.branch);
      setUsers(value.users);
    } catch (err: any) {
      setError(err.message);
    }
  };
  const registering = async (e: SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();

    setSubmitting(true);
    try {
      const target = e.target as typeof e.target & {
        phone: { value: string };
        fullname: { value: string };
        email: { value: string };
        branch: { value: string };
        password: { value: string };
      };
      const userData = {
        phone: target.phone.value,
        fullname: target.fullname.value,
        email: target.email.value,
        password: target.password.value,
        branch: target.branch.value,
      };

      validateRegistrationData(userData);

      const registeringResponse = await apiGateway.create(
        "register_user",
        userData
      );
      console.log(registeringResponse);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Alert
        variant="danger"
        show={error !== ""}
        onClose={() => setError("")}
        dismissible
      >
        {error}
      </Alert>
      <div className="row">
        <div className="col-md-12">
          <Card>
            <CardHeader>
              User &amp; Management
              <span style={{ marginLeft: "20px" }}>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={handleShowModal}
                >
                  Add User
                </button>
                <Modal show={showModal} onHide={handleCloseModal} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>Add User</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={registering}>
                      <Alert
                        variant="danger"
                        show={error !== ""}
                        onClose={() => setError("")}
                        dismissible
                      >
                        {error}
                      </Alert>
                      <Alert
                        variant="success"
                        show={success !== ""}
                        onClose={() => setSuccess("")}
                        dismissible
                      >
                        {success}
                      </Alert>
                      <InputGroup className="mb-3">
                        <InputGroupText>
                          <FontAwesomeIcon icon={faUser} fixedWidth />
                        </InputGroupText>
                        <FormControl
                          name="fullname"
                          required
                          disabled={submitting}
                          placeholder="Fullname"
                          aria-label="fullname"
                        />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupText>
                          <FontAwesomeIcon icon={faEnvelope} fixedWidth />
                        </InputGroupText>
                        <FormControl
                          name="email"
                          required
                          disabled={submitting}
                          placeholder="Email"
                          aria-label="Email"
                        />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupText>
                          <FontAwesomeIcon icon={faPhone} fixedWidth />
                        </InputGroupText>
                        <FormControl
                          name="phone"
                          required
                          disabled={submitting}
                          placeholder="Phone"
                          aria-label="phone"
                        />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupText>
                          <FontAwesomeIcon icon={faCodeBranch} fixedWidth />
                        </InputGroupText>
                        <FormControl
                          as="select"
                          name="branch"
                          required
                          disabled={submitting}
                          // value={selectedItem ? selectedItem : ""}
                          placeholder="Phone"
                          aria-label="phone"
                          // onChange={(e) =>
                          //   handleDropdownChange(parseInt(e.target.value))
                          // }
                        >
                          <option value="">Select Branch</option>
                          {branchData.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </FormControl>
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupText>
                          <FontAwesomeIcon icon={faLock} fixedWidth />
                        </InputGroupText>
                        <FormControl
                          type="password"
                          name="password"
                          required
                          value={"Password@2024"}
                          disabled={true}
                          placeholder="Password"
                          aria-label="Password"
                        />
                      </InputGroup>
                      <Row className="align-items-center">
                        <Col xs={6}>
                          <Button
                            className="px-4"
                            variant="dark"
                            type="submit"
                            disabled={submitting}
                          >
                            Register User
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </Modal.Body>
                  <Modal.Footer>
                    <button className="btn btn-dark" onClick={handleCloseModal}>
                      Close
                    </button>
                    {/* Add any other buttons or actions you need */}
                  </Modal.Footer>
                </Modal>
              </span>
            </CardHeader>
            <CardBody>
              <br />
              <div className="table-responsive">
                <table className="table border mb-0">
                  <thead className="table-light fw-semibold">
                    <tr className="align-middle">
                      {/* <th className="text-center" aria-label="icon">
                        <FontAwesomeIcon icon={faUsers} fixedWidth />
                      </th> */}
                      <th>Fullname</th>
                      <th>Email</th>
                      <th>Phone number</th>
                      <th>Branch</th>
                      <th>Role</th>
                      <th aria-label="Action" />
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.id} className="align-middle">
                        {/* <td className="text-center">
                        <div className="avatar avatar-md d-inline-flex position-relative">
                          <Image
                            fill
                            sizes="40px"
                            className="rounded-circle"
                            src="/assets/img/avatars/1.jpg"
                            alt="user@email.com"
                          />
                          <span
                            className="avatar-status position-absolute d-block bottom-0 end-0 bg-success rounded-circle border border-white"
                          />
                        </div>
                      </td> */}
                        <td>
                          <div>{user.fullname}</div>
                          <div className="small text-black-50">
                            <span>New</span> | {user.date}
                          </div>
                        </td>
                        <td>
                          <div>{user.email}</div>
                        </td>
                        <td>
                          <div>{user.phone}</div>
                        </td>
                        <td>
                          <div>{user.branch_name}</div>
                        </td>
                        <td>
                          <div>{user.role_name}</div>
                        </td>
                        <td>
                          <Dropdown align="end">
                            <DropdownToggle
                              as="button"
                              bsPrefix="btn"
                              className="btn-link rounded-0 text-black-50 shadow-none p-0"
                              id="action-user1"
                            >
                              <FontAwesomeIcon
                                fixedWidth
                                icon={faEllipsisVertical}
                              />
                            </DropdownToggle>

                            <DropdownMenu>
                              <DropdownItem href="#/action-1">
                                Info
                              </DropdownItem>
                              <DropdownItem href="#/action-2">
                                Edit
                              </DropdownItem>
                              <DropdownItem
                                className="text-danger"
                                href="#/action-3"
                              >
                                Delete
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
