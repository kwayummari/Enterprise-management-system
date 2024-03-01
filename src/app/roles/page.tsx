"use client";
import {
  Alert,
  Button,
  Card,
  CardBody,
  Col,
  Dropdown,
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { validateRoleData } from "../gateway/validators";
import { faAdd, faDeleteLeft, faEdit, faEllipsisVertical, faRouble } from "@fortawesome/free-solid-svg-icons";

interface Roles {
  id: number;
  name: string;
}

export default function Page() {
  const [error, setError] = useState<string | null>("");
  const [roles, setRoles] = useState<Roles[]>([]);
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>("");
  const companyId = localStorage.getItem('companyId');
  const [deleteId, setDeleteId] = useState<number>();
  const [showModal3, setShowModal3] = useState(false);
  const handleShowModal3 = () => setShowModal3(true);
  const handleCloseModal3 = () => setShowModal3(false);
  const [editId, setEditId] = useState<number>();
  const [showModal2, setShowModal2] = useState(false);
  const handleShowModal2 = () => setShowModal2(true);
  const handleCloseModal2 = () => setShowModal2(false);
  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = async () => {
    try {
      const userData = {
        companyId: companyId
      }
      const value = await apiGateway.create("getAllRoles", userData);
      setRoles(value.roles);
    } catch (err: any) {
      setError(err.message);
    }
  };
  const handleEditRole = (roleId: number) => {
    localStorage.setItem("editRoleId", String(roleId));
    window.location.href = "/permissions";
  };

  const registering = async (e: SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();

    setSubmitting(true);
    try {
      const target = e.target as typeof e.target & {
        name: { value: string };
      };
      const userData = {
        name: target.name.value,
        companyId: companyId
      };

      validateRoleData(userData);

      const registeringResponse = await apiGateway.create(
        "register_role",
        userData
      );
      setSuccess(registeringResponse.message);
      getRoles();
      handleCloseModal();
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
      <span style={{ marginLeft: "20px", marginBottom: "20px" }}>
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add Role</Modal.Title>
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
                  <FontAwesomeIcon icon={faRouble} fixedWidth />
                </InputGroupText>
                <FormControl
                  name="name"
                  required
                  disabled={submitting}
                  placeholder="Name"
                  aria-label="Name"
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
                    Register Role
                  </Button>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <button className="btn btn-dark" onClick={handleCloseModal}>
              Close
            </button>
          </Modal.Footer>
        </Modal>
      </span>
      <div className="row">
        {roles.map((role) => (
          <div className="col-sm-6 col-lg-3">
            <Card
              onClick={() => handleEditRole(role.id)}
              bg="white"
              text="dark"
              className="mb-4"
              style={{ height: "70px" }}
            >
              <CardBody className="pb-0 d-flex justify-content-between align-items-start">
                <div style={{ display: 'flex', justifyContent: 'space-between'}}>
                  <div>{role.name}</div>
                  <div>
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
                              <Button
                                type="button"
                                variant="success"
                                className="m-2 text-white"
                                onClick={() => {
                                  handleShowModal3();
                                  setEditId(role.id);
                                }}
                              >
                                <FontAwesomeIcon fixedWidth icon={faEdit} />
                                Edit
                              </Button>
                              <Button
                                type="button"
                                variant="danger"
                                className="m-2 text-white"
                                onClick={() => {
                                  handleShowModal2();
                                  setDeleteId(role.id);
                                }}
                              >
                                <FontAwesomeIcon
                                  fixedWidth
                                  icon={faDeleteLeft}
                                />{" "}
                                Delete
                              </Button>
                            </DropdownMenu>
                          </Dropdown>
                </div>
                </div>
              </CardBody>
            </Card>
          </div>
        ))}
        <div className="col-sm-6 col-lg-2">
        <Card
              onClick={() => handleShowModal()}
              bg="secondary"
              text="white"
              className="mb-4"
              style={{ height: "70px" }}
            >
              <CardBody className="pb-0 d-flex justify-content-between align-items-start">
              <div>
                <div><FontAwesomeIcon icon={faAdd} fixedWidth /> Add Role</div>
                </div>
              </CardBody>
          </Card>
          </div>
      </div>
    </>
  );
}
