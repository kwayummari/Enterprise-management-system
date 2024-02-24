'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowDown,
  faArrowUp,
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
import UserChart from '@/components/Dashboard/UserChart'
import IncomeChart from '@/components/Dashboard/IncomeChart'
import ConversionChart from '@/components/Dashboard/ConversionChart'
import SessionChart from '@/components/Dashboard/SessionChart'
import apiGateway from '../gateway/gateways'

interface Permissions {
  id: number;
  name: string;
}

export default function Page() {
  const [error, setError] = useState<string | null>('');
  const [permission, setPermission] = useState<Permissions[]>([]);
  useEffect(() => {
    getPermissions();
  }, []);

  const getPermissions = async () => {
    const userData = {
      id: '1',
    };
    try {
      const value = await apiGateway.create('getPermission', userData);
      console.log(value)
      setPermission(value.contents);
    } catch (err: any) {
      setError(err.message);
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
      <div className="row">
        {permission.map(permission => (
          <div className="col-sm-6 col-lg-3">
            <Card bg="primary" text="white" className="mb-4">
              <CardBody className="pb-0 d-flex justify-content-between align-items-start">
                <div>
                  <div>{permission.name}</div>
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
                    <DropdownItem href="#/action-1">Edit Role</DropdownItem>
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
