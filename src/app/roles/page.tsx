'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons'
import {
  Alert,
  Card,
  CardBody,
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
