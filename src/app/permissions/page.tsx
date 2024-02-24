'use client'
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Alert, Card, CardBody, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'react-bootstrap';
import apiGateway from '../gateway/gateways';

interface Permissions {
  id: number;
  name: string;
  find: string;
  increase: string;
  upgrade: string;
  remove: string;
}

interface SelectedPermission {
  id: number;
  typeValue: keyof Permissions; // This ensures that only valid keys of Permissions can be used
  status: string;
}

export default function Page() {
  const [error, setError] = useState<string | null>('');
  const [permissions, setPermissions] = useState<Permissions[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<SelectedPermission[]>([]);
  const roleId = localStorage.getItem('editRoleId');

  useEffect(() => {
    getPermissions();
  }, []);

  const getPermissions = async () => {
    try {
      const userData = {
        id: roleId,
      };
      const value = await apiGateway.create('getPermission', userData);
      setPermissions(value.contents);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handlePermissionSelect = (permissionId: number, type: keyof Permissions, status: string) => {
    const index = selectedPermissions.findIndex(item => item.id === permissionId && item.typeValue === type);
    const newSelectedPermissions = [...selectedPermissions];
    
    if (index !== -1) {
      // Remove the selected permission if it already exists
      newSelectedPermissions.splice(index, 1);
    } else {
      // Add the selected permission with the opposite status
      newSelectedPermissions.push({ id: permissionId, typeValue: type, status: status === '1' ? '0' : '1' });
      console.log(selectedPermissions)
    }
    
    setSelectedPermissions(newSelectedPermissions);
  };
  

  const isPermissionSelected = (permissionId: number, type: keyof Permissions) => {
    return selectedPermissions.some(item => item.id === permissionId && item.typeValue === type);
  };

  const getCheckedStatus = (permissionId: number, type: keyof Permissions) => {
    const selectedPermission = selectedPermissions.find(item => item.id === permissionId && item.typeValue === type);
    if (selectedPermission) {
      return selectedPermission.status === '1' ? true : false;
    }
    return permissions.find(permission => permission.id === permissionId)?.[type] === '1' ? true : false;
  };

  const handleEditPermissions = async (selectedPermissions: SelectedPermission[]) => {
    try {
      const userData = {
        permissions: selectedPermissions,
      };
      console.log(userData);
      const value = await apiGateway.create('updateRoles', userData);
      setSelectedPermissions([])
      getPermissions()
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
        {permissions.map(permission => (
          <div key={permission.id} className="col-sm-6 col-lg-3">
            <Card bg="white" text="dark" className="mb-4 border">
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
              <div className="mt-3 mx-3" style={{ display: 'flex', flexDirection: 'column' }}>
                <label style={{ marginBottom: '5px' }}>
                  <input
                    type="radio"
                    checked={getCheckedStatus(permission.id, 'find')}
                    onChange={() => handlePermissionSelect(permission.id, 'find', permission.find)}
                  />
                  <span style={{ marginLeft: '10px' }}>Get Data</span>
                </label>
                <label style={{ marginBottom: '5px' }}>
                  <input
                    type="radio"
                    checked={getCheckedStatus(permission.id, 'increase')}
                    onChange={() => handlePermissionSelect(permission.id, 'increase', permission.increase)}
                  />
                  <span style={{ marginLeft: '10px' }}>Post Data</span>
                </label>
                <label style={{ marginBottom: '5px' }}>
                  <input
                    type="radio"
                    checked={getCheckedStatus(permission.id, 'upgrade')}
                    onChange={() => handlePermissionSelect(permission.id, 'upgrade', permission.upgrade)}
                  />
                  <span style={{ marginLeft: '10px' }}>Update Data</span>
                </label>
                <label style={{ marginBottom: '5px' }}>
                  <input
                    type="radio"
                    checked={getCheckedStatus(permission.id, 'remove')}
                    onChange={() => handlePermissionSelect(permission.id, 'remove', permission.remove)}
                  />
                  <span style={{ marginLeft: '10px' }}>Delete Data</span>
                </label>
              </div>
            </Card>
          </div>
        ))}
        <button type="button" className="btn btn-dark" onClick={() => handleEditPermissions(selectedPermissions)}>Submit</button>
      </div>
    </>
  );
}
