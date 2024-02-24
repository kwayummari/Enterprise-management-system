'use client'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons'
import {
  Alert,
  Card,
  CardBody,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from 'react-bootstrap'
import React, { useEffect, useState } from 'react'
import apiGateway from '../gateway/gateways'

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

export default function Page() {
  const [error, setError] = useState<string | null>('');
  const [users, setUsers] = useState<Users[]>([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const value = await apiGateway.read('users');
      setUsers(value.users);
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
        <div className="col-md-12">
          <Card>
            <CardHeader>
              User &amp; Management
            </CardHeader>
            <CardBody>
              <br />

              <div className="table-responsive">
                <table className="table border mb-0">
                  <thead className="table-light fw-semibold">
                    <tr className="align-middle">
                      {/* <th className="text-center" aria-label="icon">
                        <FontAwesomeIcon icon={faUsers} fixedWidth />
                      </th> */}
                      <th>Fullname</th>
                      <th>Email</th>
                      <th >Phone number</th>
                      <th>Branch</th>
                      <th>Role</th>
                      <th aria-label="Action" />
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id} className="align-middle">
                        {/* <td className="text-center">
                        <div className="avatar avatar-md d-inline-flex position-relative">
                          <Image
                            fill
                            sizes="40px"
                            className="rounded-circle"
                            src="/assets/img/avatars/1.jpg"
                            alt="user@email.com"
                          />
                          <span
                            className="avatar-status position-absolute d-block bottom-0 end-0 bg-success rounded-circle border border-white"
                          />
                        </div>
                      </td> */}
                        <td>
                          <div>{user.fullname}</div>
                          <div className="small text-black-50">
                            <span>New</span>
                            {' '}
                            | {user.date}
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
                              <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                            </DropdownToggle>

                            <DropdownMenu>
                              <DropdownItem href="#/action-1">Info</DropdownItem>
                              <DropdownItem href="#/action-2">Edit</DropdownItem>
                              <DropdownItem
                                className="text-danger"
                                href="#/action-3"
                              >
                                Delete
                              </DropdownItem>
                            </DropdownMenu>
                          </Dropdown>
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
  )
}
