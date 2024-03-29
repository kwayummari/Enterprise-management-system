"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCodeBranch,
  faDeleteLeft,
  faEllipsisVertical,
  faListNumeric,
  faLocation,
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
import { validateEditingSupplier,  validateSupplier } from "../gateway/validators";
import { faEdit } from "@fortawesome/free-regular-svg-icons";

interface Users {
  id: number;
  name: string;
  tin: string;
  phone: string;
  date: string;
  location: string;
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
  const [suppliers, setSuppliers] = useState<Users[]>([]);
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>("");
  const [showModal2, setShowModal2] = useState(false);
  const handleShowModal2 = () => setShowModal2(true);
  const handleCloseModal2 = () => setShowModal2(false);
  const [deleteId, setDeleteId] = useState<number>();
  const [showModal3, setShowModal3] = useState(false);
  const handleShowModal3 = () => setShowModal3(true);
  const handleCloseModal3 = () => setShowModal3(false);
  const [editId, setEditId] = useState<number>();
  const [editFullname, setEditFullname] = useState<string | null>("");
  const [editPhone, setEditPhone] = useState<string | null>("");
  const [editBranch, setEditBranch] = useState<string | null>("");
  const [editLocation, setEditLocation] = useState<string | null>("");
  const [editTin, setEditTin] = useState<string | null>("");
  const companyId = localStorage.getItem('companyId');
  useEffect(() => {
    getSuppliers();
  }, []);

  const getSuppliers = async () => {
    const userData = {
      companyId: companyId,
    };
    try {
      const value = await apiGateway.create("suppliers", userData);
      const branchData = await apiGateway.create("getBranch", userData);
      setBranchData(branchData.branch);
      setSuppliers(value.suppliers);
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
        name: { value: string };
        phone: { value: string };
        tin: { value: string };
        location: { value: string };
        branch: { value: string };
      };
      const userData = {
        name: target.name.value,
        phone: target.phone.value,
        tin: target.tin.value,
        location: target.location.value,
        branch: target.branch.value,
        companyId: companyId,
      };

      validateSupplier(userData);

      const registeringResponse = await apiGateway.create(
        "register_supplier",
        userData
      );
      setSuccess(registeringResponse.message);
      getSuppliers();
      handleCloseModal();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };
  const editing = async (e: SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();
  
    setSubmitting(true);
    try {
      const target = e.target as typeof e.target & {
        phone: { value: string };
        name: { value: string };
        tin: { value: string };
        branch: { value: string };
        location: { value: string };
      };
  
      const userData = {
        id: editId,
        phone: target.phone.value,
        name: target.name.value,
        tin: target.tin.value,
        location: target.location.value,
        branch: target.branch.value,
        companyId: companyId,
      };
  
      validateEditingSupplier(userData);
  
      const editingResponse = await apiGateway.create("edit_supplier", userData);
      setSuccess(editingResponse.message);
      getSuppliers();
      handleCloseModal3();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };
  
  const handleDeleteConfirmation = async () => {
    const userData = {
      id: deleteId,
    };
    const deletingResponse = await apiGateway.create(
      "deleteSupplier",
      userData
    );
    setSuccess(deletingResponse.message);
    handleCloseModal2();
    getSuppliers();
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
        onClose={() => setError("")}
        dismissible
      >
        {success}
      </Alert>
      <div className="row">
        <div className="col-md-12">
          <Card>
            <CardHeader>
              Supplier &amp; Management
              <span style={{ marginLeft: "20px" }}>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={handleShowModal}
                >
                  Add Supplier
                </button>
                <Modal show={showModal} onHide={handleCloseModal} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>Add Supplier</Modal.Title>
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
                          name="name"
                          required
                          disabled={submitting}
                          placeholder="Name"
                          aria-label="name"
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
                          aria-label="Phone"
                        />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupText>
                          <FontAwesomeIcon icon={faListNumeric} fixedWidth />
                        </InputGroupText>
                        <FormControl
                          name="tin"
                          required
                          disabled={submitting}
                          placeholder="Tin number"
                          aria-label="Tin number"
                        />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupText>
                          <FontAwesomeIcon icon={faLocation} fixedWidth />
                        </InputGroupText>
                        <FormControl
                          name="location"
                          required
                          disabled={submitting}
                          placeholder="Location"
                          aria-label="Location"
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
                          placeholder="Branch"
                          aria-label="branch"
                        >
                          <option value="">Select Branch</option>
                          {branchData.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </FormControl>
                      </InputGroup>
                      <Row className="align-items-center">
                        <Col xs={6}>
                          <Button
                            className="px-4"
                            variant="dark"
                            type="submit"
                            disabled={submitting}
                          >
                            Register Supplier
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
            </CardHeader>
            <CardBody>
              <br />
              <div className="table-responsive">
                <table className="table border mb-0">
                  <thead className="table-light fw-semibold">
                    <tr className="align-middle">
                      <th>Fullname</th>
                      <th>Phone number</th>
                      <th>Tin number</th>
                      <th>Location</th>
                      <th>Branch</th>
                      <th aria-label="Action" />
                    </tr>
                  </thead>
                  <tbody>
                    {suppliers.map((supplier) => (
                      <tr key={supplier.id} className="align-middle">
                        <td>
                          <div>{supplier.name}</div>
                          <div className="small text-black-50">
                            <span>New</span> | {supplier.date}
                          </div>
                        </td>
                        <td>
                          <div>{supplier.phone}</div>
                        </td>
                        <td>
                          <div>{supplier.tin}</div>
                        </td>
                        <td>
                          <div>{supplier.location}</div>
                        </td>
                        <td>
                          <div>{supplier.branch}</div>
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
                              <Button
                                type="button"
                                variant="success"
                                className="m-2 text-white"
                                onClick={() => {
                                  handleShowModal3();
                                  setEditId(supplier.id);
                                  setEditBranch(supplier.branch);
                                  setEditLocation(supplier.location);
                                  setEditFullname(supplier.name);
                                  setEditPhone(supplier.phone);
                                  setEditTin(supplier.tin)
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
                                  setDeleteId(supplier.id);
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
                          <Modal
                            show={showModal2}
                            onHide={handleCloseModal2}
                            centered
                          >
                            <Modal.Header closeButton>
                              <Modal.Title>Delete User</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              Are you sure you want to delete this user?
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
                                    Delete User
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
                              <Modal.Title>Edit Supplier</Modal.Title>
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
                                    aria-label="Name"
                                    value={editFullname ?? ''}
                                    onChange={(e) => setEditFullname(e.target.value)}
                                  />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                  <InputGroupText>
                                    <FontAwesomeIcon
                                      icon={faLocation}
                                      fixedWidth
                                    />
                                  </InputGroupText>
                                  <FormControl
                                    name="location"
                                    required
                                    disabled={submitting}
                                    onChange={(e) => setEditLocation(e.target.value)}
                                    placeholder="Location"
                                    aria-label="Location"
                                    value={editLocation ?? ''}
                                  />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                  <InputGroupText>
                                    <FontAwesomeIcon
                                      icon={faPhone}
                                      fixedWidth
                                    />
                                  </InputGroupText>
                                  <FormControl
                                    name="phone"
                                    required
                                    disabled={submitting}
                                    onChange={(e) => setEditPhone(e.target.value)}
                                    placeholder="Phone"
                                    aria-label="phone"
                                    value={editPhone ?? ''}
                                  />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                  <InputGroupText>
                                    <FontAwesomeIcon
                                      icon={faCodeBranch}
                                      fixedWidth
                                    />
                                  </InputGroupText>
                                  <FormControl
                                    as="select"
                                    name="branch"
                                    required
                                    value={editBranch ?? ''}
                                    onChange={(e) => setEditBranch(e.target.value)}
                                    disabled={submitting}
                                    placeholder="Branch"
                                    aria-label="branch"
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
                                    <FontAwesomeIcon
                                      icon={faListNumeric}
                                      fixedWidth
                                    />
                                  </InputGroupText>
                                  <FormControl
                                    name="tin"
                                    required
                                    disabled={submitting}
                                    onChange={(e) => setEditTin(e.target.value)}
                                    placeholder="Tin Number"
                                    aria-label="Tin Number"
                                    value={editTin ?? ''}
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
                                      Edit Supplier
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
