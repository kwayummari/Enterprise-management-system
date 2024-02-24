'use client'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEllipsisVertical,
  faUsers,
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
  ProgressBar,
} from 'react-bootstrap'
import {
  faCcAmex,
} from '@fortawesome/free-brands-svg-icons'
import React, { useEffect, useState } from 'react'
import apiGateway from '../gateway/gateways'

interface Users {
  id: number;
  name: string;
  submenu: { name: string, url: string }[]; 
}

export default function Page() {
  const [error, setError] = useState<string | null>('');
  const [users, setUsers] = useState<Users[]>([]);
  useEffect(() => {
    sideBar();
  }, []);

  const sideBar = async () => {
    try {
      const value = await apiGateway.read('users');
      setUsers(value.contents);
      console.log(value)
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
                      <th className="text-center">Phone number</th>
                      <th>Branch</th>
                      <th>Role</th>
                      <th aria-label="Action" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="align-middle">
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
                        <div>Yiorgos Avraamu</div>
                        <div className="small text-black-50">
                          <span>New</span>
                          {' '}
                          | Registered: Jan 1, 2020
                        </div>
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-start">
                            <div className="fw-semibold">50%</div>
                          </div>
                          <div className="float-end">
                            <small className="text-black-50">
                              Jun 11, 2020 - Jul 10, 2020
                            </small>
                          </div>
                        </div>
                        <ProgressBar className="progress-thin" variant="success" now={50} />
                      </td>
                      <td className="text-center" aria-label="icon">
                        <FontAwesomeIcon icon={faCcAmex} size="lg" fixedWidth />
                      </td>
                      <td>
                        <div className="small text-black-50">Last login</div>
                        <div className="fw-semibold">10 sec ago</div>
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
