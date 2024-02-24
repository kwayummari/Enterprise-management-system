'use client'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEllipsisVertical,
  faUsers,
} from '@fortawesome/free-solid-svg-icons'
import {
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
  faCcApplePay,
  faCcPaypal,
  faCcStripe,
  faCcVisa,
} from '@fortawesome/free-brands-svg-icons'
import React, { useState } from 'react'

interface Users {
  id: number;
  name: string;
  submenu: { name: string, url: string }[]; 
}

export default function Page() {
  const [users, setUsers] = useState<Users[]>([]);
  return (
    <>
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
                      <th className="text-center" aria-label="icon">
                        <FontAwesomeIcon icon={faUsers} fixedWidth />
                      </th>
                      <th>User</th>
                      <th>Usage</th>
                      <th className="text-center">Payment Method</th>
                      <th>Activity</th>
                      <th aria-label="Action" />
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="align-middle">
                      <td className="text-center">
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
                      </td>
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
                    <tr className="align-middle">
                      <td className="text-center">
                        <div className="avatar avatar-md d-inline-flex position-relative">
                          <Image
                            fill
                            sizes="40px"
                            className="rounded-circle"
                            src="/assets/img/avatars/2.jpg"
                            alt="user@email.com"
                          />
                          <span
                            className="avatar-status position-absolute d-block bottom-0 end-0 bg-danger rounded-circle border border-white"
                          />
                        </div>
                      </td>
                      <td>
                        <div>Avram Tarasios</div>
                        <div className="small text-black-50">
                          <span>Recurring</span>
                          {' '}
                          | Registered: Jan 1, 2020
                        </div>
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-start">
                            <div className="fw-semibold">10%</div>
                          </div>
                          <div className="float-end">
                            <small className="text-black-50">
                              Jun 11, 2020 - Jul 10, 2020
                            </small>
                          </div>
                        </div>
                        <ProgressBar className="progress-thin" variant="info" now={10} />
                      </td>
                      <td className="text-center" aria-label="icon">
                        <FontAwesomeIcon icon={faCcVisa} size="lg" fixedWidth />
                      </td>
                      <td>
                        <div className="small text-black-50">Last login</div>
                        <div className="fw-semibold">5 minutes ago</div>
                      </td>
                      <td>
                        <Dropdown align="end">
                          <DropdownToggle
                            as="button"
                            bsPrefix="btn"
                            className="btn-link rounded-0 text-black-50 shadow-none p-0"
                            id="action-user2"
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
                    <tr className="align-middle">
                      <td className="text-center">
                        <div className="avatar avatar-md d-inline-flex position-relative">
                          <Image
                            fill
                            sizes="40px"
                            className="rounded-circle"
                            src="/assets/img/avatars/3.jpg"
                            alt="user@email.com"
                          />
                          <span
                            className="avatar-status position-absolute d-block bottom-0 end-0 bg-warning rounded-circle border border-white"
                          />
                        </div>
                      </td>
                      <td>
                        <div>Quintin Ed</div>
                        <div className="small text-black-50">
                          <span>New</span>
                          {' '}
                          | Registered: Jan 1, 2020
                        </div>
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-start">
                            <div className="fw-semibold">74%</div>
                          </div>
                          <div className="float-end">
                            <small className="text-black-50">
                              Jun 11, 2020 - Jul 10, 2020
                            </small>
                          </div>
                        </div>
                        <ProgressBar className="progress-thin" variant="warning" now={74} />
                      </td>
                      <td className="text-center" aria-label="icon">
                        <FontAwesomeIcon icon={faCcStripe} size="lg" fixedWidth />
                      </td>
                      <td>
                        <div className="small text-black-50">Last login</div>
                        <div className="fw-semibold">1 hour ago</div>
                      </td>
                      <td>
                        <Dropdown align="end">
                          <DropdownToggle
                            as="button"
                            bsPrefix="btn"
                            className="btn-link rounded-0 text-black-50 shadow-none p-0"
                            id="action-user3"
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
                    <tr className="align-middle">
                      <td className="text-center">
                        <div className="avatar avatar-md d-inline-flex position-relative">
                          <Image
                            fill
                            sizes="40px"
                            className="rounded-circle"
                            src="/assets/img/avatars/4.jpg"
                            alt="user@email.com"
                          />
                          <span
                            className="avatar-status position-absolute d-block bottom-0 end-0 bg-secondary rounded-circle border border-white"
                          />
                        </div>
                      </td>
                      <td>
                        <div>Enéas Kwadwo</div>
                        <div className="small text-black-50">
                          <span>New</span>
                          {' '}
                          | Registered: Jan 1, 2020
                        </div>
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-start">
                            <div className="fw-semibold">98%</div>
                          </div>
                          <div className="float-end">
                            <small className="text-black-50">
                              Jun 11, 2020 - Jul 10, 2020
                            </small>
                          </div>
                        </div>
                        <ProgressBar className="progress-thin" variant="danger" now={98} />
                      </td>
                      <td className="text-center" aria-label="icon">
                        <FontAwesomeIcon icon={faCcPaypal} size="lg" fixedWidth />
                      </td>
                      <td>
                        <div className="small text-black-50">Last login</div>
                        <div className="fw-semibold">Last month</div>
                      </td>
                      <td>
                        <Dropdown align="end">
                          <DropdownToggle
                            as="button"
                            bsPrefix="btn"
                            className="btn-link rounded-0 text-black-50 shadow-none p-0"
                            id="action-user4"
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
                    <tr className="align-middle">
                      <td className="text-center">
                        <div className="avatar avatar-md d-inline-flex position-relative">
                          <Image
                            fill
                            sizes="40px"
                            className="rounded-circle"
                            src="/assets/img/avatars/5.jpg"
                            alt="user@email.com"
                          />
                          <span
                            className="avatar-status position-absolute d-block bottom-0 end-0 bg-success rounded-circle border border-white"
                          />
                        </div>
                      </td>
                      <td>
                        <div>Agapetus Tadeáš</div>
                        <div className="small text-black-50">
                          <span>New</span>
                          {' '}
                          | Registered: Jan 1, 2020
                        </div>
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-start">
                            <div className="fw-semibold">22%</div>
                          </div>
                          <div className="float-end">
                            <small className="text-black-50">
                              Jun 11, 2020 - Jul 10, 2020
                            </small>
                          </div>
                        </div>
                        <ProgressBar className="progress-thin" variant="info" now={22} />
                      </td>
                      <td className="text-center" aria-label="icon">
                        <FontAwesomeIcon icon={faCcApplePay} size="lg" fixedWidth />
                      </td>
                      <td>
                        <div className="small text-black-50">Last login</div>
                        <div className="fw-semibold">Last week</div>
                      </td>
                      <td>
                        <Dropdown align="end">
                          <DropdownToggle
                            as="button"
                            bsPrefix="btn"
                            className="btn-link rounded-0 text-black-50 shadow-none p-0"
                            id="action-user5"
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
                    <tr className="align-middle">
                      <td className="text-center">
                        <div className="avatar avatar-md d-inline-flex position-relative">
                          <Image
                            fill
                            sizes="40px"
                            className="rounded-circle"
                            src="/assets/img/avatars/6.jpg"
                            alt="user@email.com"
                          />
                          <span
                            className="avatar-status position-absolute d-block bottom-0 end-0 bg-danger rounded-circle border border-white"
                          />
                        </div>
                      </td>
                      <td>
                        <div>Friderik Dávid</div>
                        <div className="small text-black-50">
                          <span>New</span>
                          {' '}
                          | Registered: Jan 1, 2020
                        </div>
                      </td>
                      <td>
                        <div className="clearfix">
                          <div className="float-start">
                            <div className="fw-semibold">43%</div>
                          </div>
                          <div className="float-end">
                            <small className="text-black-50">
                              Jun 11, 2020 - Jul 10, 2020
                            </small>
                          </div>
                        </div>
                        <ProgressBar className="progress-thin" variant="success" now={43} />
                      </td>
                      <td className="text-center" aria-label="icon">
                        <FontAwesomeIcon icon={faCcAmex} size="lg" fixedWidth />
                      </td>
                      <td>
                        <div className="small text-black-50">Last login</div>
                        <div className="fw-semibold">Yesterday</div>
                      </td>
                      <td>
                        <Dropdown align="end">
                          <DropdownToggle
                            as="button"
                            bsPrefix="btn"
                            className="btn-link rounded-0 text-black-50 shadow-none p-0"
                            id="action-user6"
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
