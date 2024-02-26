'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons'
import {
  Alert,
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import apiGateway from '../gateway/gateways'

interface Roles {
  id: number;
  name: string;
}

export default function Page() {
  const [error, setError] = useState<string | null>('');
  const [roles, setRoles] = useState<Roles[]>([]);
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
      <div className="row">
        {roles.map(role => (
          <div className="col-sm-6 col-lg-3">
            <Card bg="primary" text="white" className="mb-4">
              <CardBody className="pb-0 d-flex justify-content-between align-items-start">
                <div>
                  <div>{role.name}</div>
                </div>
                <Dropdown align="end">
                  <DropdownToggle
                    as="button"
                    bsPrefix="btn"
                    className="btn-link rounded-0 text-white shadow-none p-0"
                    id="dropdown-chart1"
                  >
                    <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem onClick={() => handleEditRole(role.id)}>Edit Role</DropdownItem>
                    <DropdownItem href="#/action-2">Another action</DropdownItem>
                    <DropdownItem href="#/action-3">Something else</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </CardBody>
              <div className="mt-3 mx-3" style={{ height: '70px' }}>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </>
  )
}
