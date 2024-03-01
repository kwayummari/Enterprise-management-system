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
import { validateEditingRole, validateRoleData } from "../gateway/validators";
import {
  faAdd,
  faDeleteLeft,
  faEdit,
  faEllipsisVertical,
  faRouble,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

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
  const companyId = localStorage.getItem("companyId");
  const [deleteId, setDeleteId] = useState<number>();
  const [showModal3, setShowModal3] = useState(false);
  const handleShowModal3 = () => setShowModal3(true);
  const handleCloseModal3 = () => setShowModal3(false);
  const [editId, setEditId] = useState<number>();
  const [editName, setEditName] = useState<string | null>("");
  const [showModal2, setShowModal2] = useState(false);
  const handleShowModal2 = () => setShowModal2(true);
  const handleCloseModal2 = () => setShowModal2(false);
  useEffect(() => {
    getBranches();
  }, []);

  const getBranches = async () => {
    try {
      const userData = {
        companyId: companyId,
      };
      const value = await apiGateway.create("getBranch", userData);
      setRoles(value.branch);
    } catch (err: any) {
      setError(err.message);
    }
  };
  const handleDeleteConfirmation = async () => {
    try {
      const userData = {
        id: deleteId,
        companyId: companyId,
      };
      const deletingResponse = await apiGateway.create("delete_branch", userData);
      setSuccess(deletingResponse.message);
      handleCloseModal2();
      getBranches();
    }
    catch (err: any) {
      setError(err.message);
      handleCloseModal2();
    }
  };
  const editing = async (e: SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();
  
    setSubmitting(true);
    try {
      const target = e.target as typeof e.target & {
        name: { value: string };
      };
  
      const userData = {
        id: editId,
        name: target.name.value,
      };
      validateEditingRole(userData);
  
      const editingResponse = await apiGateway.create("edit_branch", userData);
      setSuccess(editingResponse.message);
      getBranches();
      handleCloseModal3();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
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
        companyId: companyId,
      };

      validateRoleData(userData);

      const registeringResponse = await apiGateway.create(
        "register_branch",
        userData
      );
      setSuccess(registeringResponse.message);
      getBranches();
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
      <Alert
        variant="success"
        show={success !== ""}
        onClose={() => setSuccess("")}
        dismissible
      >
        {success}
      </Alert>
      <span style={{ marginLeft: "20px", marginBottom: "20px" }}>
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add Branch</Modal.Title>
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
                    Register Branch
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
              bg="white"
              text="dark"
              className="mb-4"
              style={{ height: "70px" }}
            >
              <CardBody
                className="pb-0 d-flex align-items-start"
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <div onClick={() => handleEditRole(role.id)}>{role.name}</div>
                <div>
                  <Dropdown align="end">
                    <DropdownToggle
                      as="button"
                      bsPrefix="btn"
                      className="btn-link rounded-0 text-black-50 shadow-none p-0"
                      id="action-user1"
                    >
                      <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                    </DropdownToggle>
                    <DropdownMenu>
                      <Button
                        type="button"
                        variant="success"
                        className="m-2 text-white"
                        onClick={() => {
                          handleShowModal3();
                          setEditId(role.id);
                          setEditName(role.name)
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
                        <FontAwesomeIcon fixedWidth icon={faDeleteLeft} />{" "}
                        Delete
                      </Button>
                    </DropdownMenu>
                  </Dropdown>
                  <Modal show={showModal2} onHide={handleCloseModal2} centered>
                    <Modal.Header closeButton>
                      <Modal.Title>Delete Branch</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      Are you sure you want to delete this branch?
                      <Row className="align-items-center">
                        <Col xs={6}>
                          <Button
                            className="px-4"
                            variant="danger"
                            disabled={submitting}
                            onClick={() => {
                              handleDeleteConfirmation();
                            }}
                          >
                            Delete Branch
                          </Button>
                        </Col>
                      </Row>
                    </Modal.Body>
                    <Modal.Footer>
                      <button
                        className="btn btn-dark"
                        onClick={handleCloseModal2}
                      >
                        Close
                      </button>
                    </Modal.Footer>
                  </Modal>
                  <Modal
                            show={showModal3}
                            onHide={handleCloseModal3}
                            centered
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>Edit Branch</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <Form onSubmit={editing}>
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
                                    name="name"
                                    required
                                    disabled={submitting}
                                    placeholder="Name"
                                    aria-label="name"
                                    value={editName ?? ''}
                                    onChange={(e) => setEditName(e.target.value)}
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
                                      Edit Branch
                                    </Button>
                                  </Col>
                                </Row>
                              </Form>
                            </Modal.Body>
                            <Modal.Footer>
                              <button
                                className="btn btn-dark"
                                onClick={handleCloseModal3}
                              >
                                Close
                              </button>
                            </Modal.Footer>
                          </Modal>
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
                <div>
                  <FontAwesomeIcon icon={faAdd} fixedWidth /> Add Branch
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </>
  );
}
