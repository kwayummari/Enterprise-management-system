import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowDown,
  faArrowUp,
  faDownload,
  faEllipsisVertical,
  faMars,
  faSearch,
  faUsers,
  faVenus,
} from '@fortawesome/free-solid-svg-icons'
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
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
  faFacebookF,
  faLinkedinIn,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import React from 'react'
import UserChart from '@/components/Dashboard/UserChart'
import IncomeChart from '@/components/Dashboard/IncomeChart'
import ConversionChart from '@/components/Dashboard/ConversionChart'
import SessionChart from '@/components/Dashboard/SessionChart'
import TrafficChart from '@/components/Dashboard/TrafficChart'

export default function Page() {
  return (
    <>
      <div className="row">
        <div className="col-sm-6 col-lg-3">
          <Card bg="primary" text="white" className="mb-4">
            <CardBody className="pb-0 d-flex justify-content-between align-items-start">
              <div>
                <div className="fs-4 fw-semibold">
                  26K
                  <span className="fs-6 ms-2 fw-normal">
                    (-12.4%
                    <FontAwesomeIcon icon={faArrowDown} fixedWidth />
                    )
                  </span>
                </div>
                <div>Users</div>
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
                  <DropdownItem href="#/action-1">Action</DropdownItem>
                  <DropdownItem href="#/action-2">Another action</DropdownItem>
                  <DropdownItem href="#/action-3">Something else</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </CardBody>
            <div className="mt-3 mx-3" style={{ height: '70px' }}>
              <UserChart />
            </div>
          </Card>
        </div>

        <div className="col-sm-6 col-lg-3">
          <Card bg="info" text="white" className="mb-4">
            <CardBody className="pb-0 d-flex justify-content-between align-items-start">
              <div>
                <div className="fs-4 fw-semibold">
                  $6.200
                  <span className="fs-6 ms-2 fw-normal">
                    (40.9%
                    <FontAwesomeIcon icon={faArrowUp} fixedWidth />
                    )
                  </span>
                </div>
                <div>Income</div>
              </div>
              <Dropdown align="end">
                <DropdownToggle
                  as="button"
                  bsPrefix="btn"
                  className="btn-link rounded-0 text-white shadow-none p-0"
                  id="dropdown-chart2"
                >
                  <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                </DropdownToggle>

                <DropdownMenu>
                  <DropdownItem href="#/action-1">Action</DropdownItem>
                  <DropdownItem href="#/action-2">Another action</DropdownItem>
                  <DropdownItem href="#/action-3">Something else</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </CardBody>
            <div className="mt-3 mx-3" style={{ height: '70px' }}>
              <IncomeChart />
            </div>
          </Card>
        </div>

        <div className="col-sm-6 col-lg-3">
          <Card bg="warning" text="white" className="mb-4">
            <CardBody className="pb-0 d-flex justify-content-between align-items-start">
              <div>
                <div className="fs-4 fw-semibold">
                  2.49%
                  <span className="fs-6 ms-2 fw-normal">
                    (84.7%
                    <FontAwesomeIcon icon={faArrowUp} fixedWidth />
                    )
                  </span>
                </div>
                <div>Conversion Rate</div>
              </div>
              <Dropdown align="end">
                <DropdownToggle
                  as="button"
                  bsPrefix="btn"
                  className="btn-link rounded-0 text-white shadow-none p-0"
                  id="dropdown-chart3"
                >
                  <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                </DropdownToggle>

                <DropdownMenu>
                  <DropdownItem href="#/action-1">Action</DropdownItem>
                  <DropdownItem href="#/action-2">Another action</DropdownItem>
                  <DropdownItem href="#/action-3">Something else</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </CardBody>
            <div className="mt-3 mx-3" style={{ height: '70px' }}>
              <ConversionChart />
            </div>
          </Card>
        </div>

        <div className="col-sm-6 col-lg-3">
          <Card bg="danger" text="white" className="mb-4">
            <CardBody className="pb-0 d-flex justify-content-between align-items-start">
              <div>
                <div className="fs-4 fw-semibold">
                  44K
                  <span className="fs-6 ms-2 fw-normal">
                    (-23.6%
                    <FontAwesomeIcon icon={faArrowDown} fixedWidth />
                    )
                  </span>
                </div>
                <div>Sessions</div>
              </div>
              <Dropdown align="end">
                <DropdownToggle
                  as="button"
                  bsPrefix="btn"
                  className="btn-link rounded-0 text-white shadow-none p-0"
                  id="dropdown-chart4"
                >
                  <FontAwesomeIcon fixedWidth icon={faEllipsisVertical} />
                </DropdownToggle>

                <DropdownMenu>
                  <DropdownItem href="#/action-1">Action</DropdownItem>
                  <DropdownItem href="#/action-2">Another action</DropdownItem>
                  <DropdownItem href="#/action-3">Something else</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </CardBody>
            <div className="mt-3 mx-3" style={{ height: '70px' }}>
              <SessionChart />
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
