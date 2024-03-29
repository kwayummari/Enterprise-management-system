"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCodeBranch,
  faDeleteLeft,
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
import {
  validateEditingData,
  validateRegistrationData,
} from "../gateway/validators";
import { faEdit } from "@fortawesome/free-regular-svg-icons";

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
interface Permissions {
  increase: string;
  find: string;
  upgrade: string;
  remove: string;
}

export default function Page() {
  const [error, setError] = useState<string | null>("");
  const [branchData, setBranchData] = useState<DropdownItem[]>([]);
  const [roleData, setRoleData] = useState<DropdownItem[]>([]);
  const [users, setUsers] = useState<Users[]>([]);
  const [permissions, setPermissions] = useState<Permissions>({
    increase: "0",
    find: "0",
    upgrade: "0",
    remove: "0",
  });
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
  const [editEmail, setEditEmail] = useState<string | null>("");
  const [editFullname, setEditFullname] = useState<string | null>("");
  const [editPhone, setEditPhone] = useState<string | null>("");
  const [editBranch, setEditBranch] = useState<string | null>("");
  const [editRole, setEditRole] = useState<string | null>("");
  const companyId = localStorage.getItem("companyId");
  const roleId = localStorage.getItem("roleId");
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const userData = {
      companyId: companyId,
    };
    const permissionRequirement = {
      id: roleId,
    };
    try {
      const value = await apiGateway.create("getUserByCompanyId", userData);
      const branchData = await apiGateway.create("getBranch", userData);
      const rolesData = await apiGateway.create("getAllRoles", userData);
      const permissionData = await apiGateway.create(
        "getPermission",
        permissionRequirement
      );
      setPermissions(permissionData.contents["0"]);
      setBranchData(branchData.branch);
      setRoleData(rolesData.roles);
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
        role: { value: string };
        password: { value: string };
      };
      const userData = {
        phone: target.phone.value,
        fullname: target.fullname.value,
        email: target.email.value,
        password: target.password.value,
        branch: target.branch.value,
        role: target.role.value,
        companyId: companyId,
      };

      validateRegistrationData(userData);

      const registeringResponse = await apiGateway.create(
        "register_user",
        userData
      );
      setSuccess(registeringResponse.message);
      getUsers();
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
        fullname: { value: string };
        email: { value: string };
        branch: { value: string };
        role: { value: string };
        password: { value: string };
      };

      const userData = {
        id: editId,
        phone: target.phone.value,
        fullname: target.fullname.value,
        email: target.email.value,
        password: target.password.value,
        branch: target.branch.value,
        role: target.role.value,
      };

      validateEditingData(userData);

      const editingResponse = await apiGateway.create("edit_user", userData);
      setSuccess(editingResponse.message);
      getUsers();
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
      "deleteUserById",
      userData
    );
    setSuccess(deletingResponse.message);
    handleCloseModal2();
    getUsers();
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
              User &amp; Management
              <span style={{ marginLeft: "20px" }}>
                {permissions.increase === "1" && (
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={handleShowModal}
                  >
                    Add user
                  </button>
                )}

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
                          <FontAwesomeIcon icon={faCodeBranch} fixedWidth />
                        </InputGroupText>
                        <FormControl
                          as="select"
                          name="role"
                          required
                          disabled={submitting}
                          placeholder="Role"
                          aria-label="role"
                        >
                          <option value="">Select Role</option>
                          {roleData.map((item) => (
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
                              {permissions.upgrade === "1" && (
                                <Button
                                  type="button"
                                  variant="success"
                                  className="m-2 text-white"
                                  onClick={() => {
                                    handleShowModal3();
                                    setEditId(user.id);
                                    setEditBranch(user.branch);
                                    setEditEmail(user.email);
                                    setEditFullname(user.fullname);
                                    setEditPhone(user.phone);
                                    setEditRole(user.role);
                                  }}
                                >
                                  <FontAwesomeIcon fixedWidth icon={faEdit} />
                                  Edit
                                </Button>
                              )}
                              {permissions.remove === "1" && (
                                <Button
                                  type="button"
                                  variant="danger"
                                  className="m-2 text-white"
                                  onClick={() => {
                                    handleShowModal2();
                                    setDeleteId(user.id);
                                  }}
                                >
                                  <FontAwesomeIcon
                                    fixedWidth
                                    icon={faDeleteLeft}
                                  />{" "}
                                  Delete
                                </Button>
                              )}
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
                              <Modal.Title>Edit User</Modal.Title>
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
                                    name="fullname"
                                    required
                                    disabled={submitting}
                                    placeholder="Fullname"
                                    aria-label="fullname"
                                    value={editFullname ?? ""}
                                    onChange={(e) =>
                                      setEditFullname(e.target.value)
                                    }
                                  />
                                </InputGroup>
                                <InputGroup className="mb-3">
                                  <InputGroupText>
                                    <FontAwesomeIcon
                                      icon={faEnvelope}
                                      fixedWidth
                                    />
                                  </InputGroupText>
                                  <FormControl
                                    name="email"
                                    required
                                    disabled={submitting}
                                    onChange={(e) =>
                                      setEditEmail(e.target.value)
                                    }
                                    placeholder="Email"
                                    aria-label="Email"
                                    value={editEmail ?? ""}
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
                                    onChange={(e) =>
                                      setEditPhone(e.target.value)
                                    }
                                    placeholder="Phone"
                                    aria-label="phone"
                                    value={editPhone ?? ""}
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
                                    value={editBranch ?? ""}
                                    onChange={(e) =>
                                      setEditBranch(e.target.value)
                                    }
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
                                      icon={faCodeBranch}
                                      fixedWidth
                                    />
                                  </InputGroupText>
                                  <FormControl
                                    as="select"
                                    name="role"
                                    required
                                    value={editRole ?? ""}
                                    onChange={(e) =>
                                      setEditRole(e.target.value)
                                    }
                                    disabled={submitting}
                                    placeholder="Role"
                                    aria-label="role"
                                  >
                                    <option value="">Select Role</option>
                                    {roleData.map((item) => (
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
                                      Edit User
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
