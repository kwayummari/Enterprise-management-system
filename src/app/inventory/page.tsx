"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCodeBranch,
  faCut,
  faDeleteLeft,
  faEllipsisVertical,
  faListNumeric,
  faLocation,
  faMoneyBill,
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
  validateEditingSupplier,
  validateProductData,
} from "../gateway/validators";
import { faEdit, faFileText } from "@fortawesome/free-regular-svg-icons";

interface Users {
  id: number;
  name: string;
  description: string;
  phone: string;
  quantity: string;
  buyingPrice: string;
  sellingPrice: string;
  productNumber: string;
  branchId: { id: number; name: string }[];
  date: string;
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
  const [permissions, setPermissions] = useState<Permissions>({
    increase: "0",
    find: "0",
    upgrade: "0",
    remove: "0",
  });
  const [error, setError] = useState<string | null>("");
  const [branchData, setBranchData] = useState<DropdownItem[]>([]);
  const [taxData, setTaxData] = useState<DropdownItem[]>([]);
  const [products, setProducts] = useState<Users[]>([]);
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
  const companyId = localStorage.getItem("companyId");
  const userId = localStorage.getItem("userId");
  const roleId = localStorage.getItem("roleId");
  useEffect(() => {
    getSuppliers();
  }, []);

  const getSuppliers = async () => {
    const productData = {
      companyId: companyId,
    };
    const permissionRequirement = {
      id: roleId,
    };
    try {
      const value = await apiGateway.create("products", productData);
      console.log(value);
      const branchData = await apiGateway.create("getBranch", productData);
      const taxData = await apiGateway.create("tax", productData);
      const permissionData = await apiGateway.create(
        "getPermission",
        permissionRequirement
      );
      setPermissions(permissionData.contents["1"]);
      setBranchData(branchData.branch);
      setTaxData(taxData.tax);
      setProducts(value.products);
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
        description: { value: string };
        quantity: { value: string };
        buyingPrice: { value: string };
        sellingPrice: { value: string };
        productNumber: { value: string };
        taxType: { value: string };
        branch: { value: string };
      };
      const userData = {
        name: target.name.value,
        description: target.description.value,
        quantity: target.quantity.value,
        buyingPrice: target.buyingPrice.value,
        sellingPrice: target.sellingPrice.value,
        productNumber: target.productNumber.value,
        taxType: target.taxType.value,
        branchId: target.branch.value,
        companyId: companyId,
        userId: userId,
      };

      validateProductData(userData);

      const registeringResponse = await apiGateway.create(
        "register_product",
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
        name: { value: string };
        description: { value: string };
        quantity: { value: string };
        buyingPrice: { value: string };
        sellingPrice: { value: string };
        productNumber: { value: string };
        taxType: { value: string };
        branch: { value: string };
      };
      const userData = {
        name: target.name.value,
        description: target.description.value,
        quantity: target.quantity.value,
        buyingPrice: target.buyingPrice.value,
        sellingPrice: target.sellingPrice.value,
        productNumber: target.productNumber.value,
        taxType: target.taxType.value,
        branchId: target.branch.value,
        companyId: companyId,
        userId: userId,
      };

      validateProductData(userData);

      const editingResponse = await apiGateway.create(
        "edit_supplier",
        userData
      );
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
    try {
      const userData = {
        id: deleteId,
      };
      const deletingResponse = await apiGateway.create(
        "delete_product",
        userData
      );
      console.log(deletingResponse)
      setSuccess(deletingResponse.message);
      handleCloseModal2();
      getSuppliers();
    } catch (error: any) {
      setError(error.message);
      handleCloseModal2();
    } finally {
      setSubmitting(false)
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
        onClose={() => setError("")}
        dismissible
      >
        {success}
      </Alert>
      <div className="row">
        <div className="col-md-12">
          <Card>
            <CardHeader>
              Inventory &amp; Management
              <span style={{ marginLeft: "20px" }}>
                {permissions.increase === "1" && (
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={handleShowModal}
                  >
                    Add Products
                  </button>
                )}
                <Modal show={showModal} onHide={handleCloseModal} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>Add Products</Modal.Title>
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
                          <FontAwesomeIcon icon={faFileText} fixedWidth />
                        </InputGroupText>
                        <FormControl
                          name="description"
                          required
                          disabled={submitting}
                          placeholder="Description"
                          aria-label="Description"
                        />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupText>
                          <FontAwesomeIcon icon={faListNumeric} fixedWidth />
                        </InputGroupText>
                        <FormControl
                          name="quantity"
                          required
                          disabled={submitting}
                          placeholder="Quantity"
                          aria-label="Quantity"
                        />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupText>
                          <FontAwesomeIcon icon={faMoneyBill} fixedWidth />
                        </InputGroupText>
                        <FormControl
                          name="buyingPrice"
                          required
                          disabled={submitting}
                          placeholder="Buying Price"
                          aria-label="Buying Price"
                        />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupText>
                          <FontAwesomeIcon icon={faMoneyBill} fixedWidth />
                        </InputGroupText>
                        <FormControl
                          name="sellingPrice"
                          required
                          disabled={submitting}
                          placeholder="Selling Price"
                          aria-label="Selling Price"
                        />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupText>
                          <FontAwesomeIcon icon={faListNumeric} fixedWidth />
                        </InputGroupText>
                        <FormControl
                          name="productNumber"
                          required
                          disabled={submitting}
                          placeholder="Product Number"
                          aria-label="Product Number"
                        />
                      </InputGroup>
                      <InputGroup className="mb-3">
                        <InputGroupText>
                          <FontAwesomeIcon icon={faCut} fixedWidth />
                        </InputGroupText>
                        <FormControl
                          as="select"
                          name="taxType"
                          required
                          disabled={submitting}
                          placeholder="Tax Type"
                          aria-label="Tax Type"
                        >
                          <option value="">Select Tax Type</option>
                          {taxData.map((item) => (
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
                      <th>Name</th>
                      <th>Description</th>
                      <th>Quantity</th>
                      <th>Buying Price</th>
                      <th>Selling Price</th>
                      <th>Product Number</th>
                      <th>Branch</th>
                      <th aria-label="Action" />
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="align-middle">
                        <td>
                          <div>{product.name}</div>
                          <div className="small text-black-50">
                            <span>New</span> | {product.date}
                          </div>
                        </td>
                        <td>
                          <div>{product.description}</div>
                        </td>
                        <td>
                          <div>{product.quantity}</div>
                        </td>
                        <td>
                          <div>{product.buyingPrice}</div>
                        </td>
                        <td>
                          <div>{product.sellingPrice}</div>
                        </td>
                        <td>
                          <div>{product.productNumber}</div>
                        </td>
                        <td>
                          <div>
                            {product.branchId.map((branch) => (
                              <span key={branch.id}>{branch.name}</span>
                            ))}
                          </div>
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
                                  setEditId(product.id);
                                  const branchName =
                                    product.branchId[0]?.name ?? "";
                                  setEditBranch(branchName);
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
                                  setDeleteId(product.id);
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
                              <Modal.Title>Delete Product</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              Are you sure you want to delete this product?
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
                                    Delete product
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
                                    value={editFullname ?? ""}
                                    onChange={(e) =>
                                      setEditFullname(e.target.value)
                                    }
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
                                    onChange={(e) =>
                                      setEditLocation(e.target.value)
                                    }
                                    placeholder="Location"
                                    aria-label="Location"
                                    value={editLocation ?? ""}
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
                                    value={editTin ?? ""}
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
