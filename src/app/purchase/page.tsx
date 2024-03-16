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
  validateSupplierData,
} from "../gateway/validators";
import { faEdit, faFileText } from "@fortawesome/free-regular-svg-icons";

interface oderData {
  id: number;
  inventoryDetails: {
    name: string;
    description: string;
    quantity: string;
    buyingPrice: string;
    sellingPrice: string;
    productNumber: string;
    date: string;
  };
  branchDetails: {
    name: string;
  };
}

interface DropdownItem {
  id: number;
  name: string;
}

export default function Page() {
  const [error, setError] = useState<string | null>("");
  const [branchData, setBranchData] = useState<DropdownItem[]>([]);
  const [supplierData, setSupplierData] = useState<DropdownItem[]>([]);
  const [supplierId, setSupplierId] = useState<string | null>("");
  const [taxData, setTaxData] = useState<DropdownItem[]>([]);
  const [orders, setOrders] = useState<oderData[]>([]);
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
  useEffect(() => {
    getOder();
  }, []);

  const getOder = async () => {
    const userData = {
      companyId: companyId,
      supplierId: supplierId,
    };
    try {
      const suppliers = await apiGateway.create("suppliers", userData);
      setSupplierData(suppliers.suppliers);
      const purchases = await apiGateway.create("get_purchases", userData);
      console.log(purchases);
      const branchData = await apiGateway.create("getBranch", userData);
      const taxData = await apiGateway.create("tax", userData);
      setBranchData(branchData.branch);
      setTaxData(taxData.tax);
      setOrders(purchases.orders);
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
      getOder();
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

      const editingResponse = await apiGateway.create(
        "edit_supplier",
        userData
      );
      setSuccess(editingResponse.message);
      getOder();
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
      "delete_product",
      userData
    );
    setSuccess(deletingResponse.message);
    handleCloseModal2();
    getOder();
  };
  const total = (price: string, quantity: string): number => {
    const priceValue = parseFloat(price);
    const quantityValue = parseFloat(quantity);

    if (isNaN(priceValue) || isNaN(quantityValue)) {
      throw new Error(
        "Invalid input: price and quantity must be numeric strings"
      );
    }

    const totalValue = priceValue * quantityValue;
    return totalValue;
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
              <span >
                <svg className="sidebar-brand-full" width="118" height="46">
                  <title>CoreUI Logo</title>
                  <use xlinkHref="/assets/brand/coreui.svg#full" />
                </svg>
                <p style={{ fontSize: "13px" }}>
                  CoreUI LDT
                </p>
                <p style={{ fontSize: "13px" }}>
                Dar Es Salaam,
                </p>
                <p style={{ fontSize: "13px", marginBottom: '30px' }}>
                  +255 762 996 305
                </p>
                <p style={{ fontSize: "30px", fontWeight: "bolder" }}>
                  Purchase Order
                </p>
                <Form onSubmit={registering}>
                  <InputGroup
                    className="mb-3"
                    style={{ width: "300px", marginTop: "20px" }}
                  >
                    <InputGroupText>
                      <FontAwesomeIcon icon={faCodeBranch} fixedWidth />
                    </InputGroupText>
                    <FormControl
                      as="select"
                      name="supplier"
                      required
                      disabled={submitting}
                      placeholder="Supplier"
                      aria-label="supplier"
                      onChange={(e) => {
                        setSupplierId(e.target.value);
                        getOder();
                      }}
                    >
                      <option value="">Select Supplier</option>
                      {supplierData.map((item) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </FormControl>
                  </InputGroup>
                </Form>
                <Modal show={showModal} onHide={handleCloseModal} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>Add Order</Modal.Title>
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
                            Add Order
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
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <p style={{ fontSize: "20px", fontWeight: "bolder" }}>
                Purchase Order # 403684
                  </p>
                  <p style={{ fontSize: "20px", fontWeight: "bolder" }}>
                  Date: 2024-03-02
                </p>
                </div>
                <button
                  type="button"
                  className="btn btn-dark"
                  onClick={handleShowModal}
                >
                  Add Order
                </button>
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
                      <th>Price</th>
                      {/* <th>Selling Price</th> */}
                      {/* <th>Product Number</th> */}
                      {/* <th>Branch</th> */}
                      <th>Total</th>
                      <th>Action</th>
                      <th aria-label="Action" />
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="align-middle">
                        <td>
                          <div>{order.inventoryDetails.name}</div>
                          <div className="small text-black-50">
                            <span>New</span> | {order.inventoryDetails.date}
                          </div>
                        </td>
                        <td>
                          <div>{order.inventoryDetails.name}</div>
                        </td>
                        <td>
                          <div>{order.inventoryDetails.quantity}</div>
                        </td>
                        <td>
                          <div>{order.inventoryDetails.buyingPrice}</div>
                        </td>
                        {/* <td>
                          <div>{order.inventoryDetails.sellingPrice}</div>
                        </td>
                        <td>
                          <div>{order.inventoryDetails.sellingPrice}</div>
                        </td>
                        <td>
                          <div>{order.branchDetails.name}</div>
                        </td> */}
                        <td>
                          <div>
                            {total(
                              order.inventoryDetails.buyingPrice,
                              order.inventoryDetails.quantity
                            )}
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
                                  // setEditId(product.id);
                                  // setEditBranch(product.branch);
                                  // setEditLocation(product.quantity);
                                  // setEditFullname(product.sellingPrice);
                                  // setEditPhone(product.buyingPrice);
                                  // setEditTin(product.description)
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
                                  // setDeleteId(product.id);
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
