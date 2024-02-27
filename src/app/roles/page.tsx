'use client'
import {
  Alert,
  Button,
  Card,
  CardBody,
  Col,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Row,
} from 'react-bootstrap'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import apiGateway from '../gateway/gateways'
import InputGroupText from 'react-bootstrap/esm/InputGroupText';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { validateRoleData } from '../gateway/validators';

interface Roles {
  id: number;
  name: string;
}

export default function Page() {
  const [error, setError] = useState<string | null>('');
  const [roles, setRoles] = useState<Roles[]>([]);
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>("");
  useEffect(() => {
    getRoles();
  }, []);

  const getRoles = async () => {
    try {
      const value = await apiGateway.read('getRoles');
      setRoles(value.roles);
    } catch (err: any) {
      setError(err.message);
    }
  };
  const handleEditRole = (roleId: number) => {
    localStorage.setItem('editRoleId', String(roleId));
    window.location.href = '/permissions';
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
      };

      validateRoleData(userData);

      const registeringResponse = await apiGateway.create(
        "register_role",
        userData
      );
      setSuccess(registeringResponse.message);
      getRoles();
      handleCloseModal()
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
        show={error !== ''}
        onClose={() => setError('')}
        dismissible
      >
        {error}
      </Alert>
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
        {roles.map(role => (
          <div className="col-sm-6 col-lg-3">
            <Card onClick={() => handleEditRole(role.id)} bg="white" text="dark" className="mb-4" style={{ height: '70px' }}>
              <CardBody className="pb-0 d-flex justify-content-between align-items-start">
                <div>
                  <div>{role.name}</div>
                </div>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </>
  )
}
