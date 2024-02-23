'use client'
import {
  faAddressCard, faBell, faFileLines, faStar,
} from '@fortawesome/free-regular-svg-icons'
import {
  faBug,
  faCalculator,
  faChartPie,
  faGauge,
  faLayerGroup,
  faLocationArrow,
  faPuzzlePiece,
  faRightToBracket,
} from '@fortawesome/free-solid-svg-icons'
import React, { PropsWithChildren, useState, useEffect } from 'react'
import { Alert, Badge } from 'react-bootstrap'
import SidebarNavGroup from '@/app/ui/dashboard/Sidebar/SidebarNavGroup'
import SidebarNavItem from '@/app/ui/dashboard/Sidebar/SidebarNavItem'
import apiGateway from '@/app/gateway/gateways'

const SidebarNavTitle = (props: PropsWithChildren) => {
  const { children } = props
  return (
    <li className="nav-title px-3 py-2 mt-3 text-uppercase fw-bold">{children}</li>
  )
}
interface Permissions {
  id: number;
  name: string;
}

export default function SidebarNav() {
  const [error, setError] = useState<string | null>('');
  const roleId = localStorage.getItem('roleId');
  const [permissions, setPermissions] = useState<Permissions[]>([]);

  useEffect(() => {
    sideBar();
  }, []);

  const sideBar = async () => {
    try {
      const userData = {
        id: roleId,
      };
      const value = await apiGateway.create('getPermission', userData);
      setPermissions(value.contents);
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
       <ul className="list-unstyled">
      <SidebarNavItem icon={faGauge} href="/">
        Dashboard
        <small className="ms-auto"><Badge bg="info" className="ms-auto">NEW</Badge></small>
        </SidebarNavItem>
        {permissions.map(permission => (
          <SidebarNavItem key={permission.id} href="#">
            {permission.name}
          </SidebarNavItem>
        ))}
      <SidebarNavTitle>Components</SidebarNavTitle>
      <SidebarNavGroup toggleIcon={faPuzzlePiece} toggleText="Base">
        <SidebarNavItem href="#">Accordion</SidebarNavItem>
        <SidebarNavItem href="#">Breadcrumb</SidebarNavItem>
        <SidebarNavItem href="#">Cards</SidebarNavItem>
        <SidebarNavItem href="#">Carousel</SidebarNavItem>
        <SidebarNavItem href="#">Collapse</SidebarNavItem>
        <SidebarNavItem href="#">List group</SidebarNavItem>
        <SidebarNavItem href="#">Navs</SidebarNavItem>
        <SidebarNavItem href="#">Pagination</SidebarNavItem>
        <SidebarNavItem href="#">Popovers</SidebarNavItem>
        <SidebarNavItem href="#">Progress</SidebarNavItem>
        <SidebarNavItem href="#">Scrollspy</SidebarNavItem>
        <SidebarNavItem href="#">Spinners</SidebarNavItem>
        <SidebarNavItem href="#">Tables</SidebarNavItem>
        <SidebarNavItem href="#">Tabs</SidebarNavItem>
        <SidebarNavItem href="#">Tooltips</SidebarNavItem>
      </SidebarNavGroup>

      <SidebarNavGroup toggleIcon={faLocationArrow} toggleText="Buttons">
        <SidebarNavItem href="#">Buttons</SidebarNavItem>
        <SidebarNavItem href="#">Buttons Group</SidebarNavItem>
        <SidebarNavItem href="#">Dropdowns</SidebarNavItem>
      </SidebarNavGroup>

      <SidebarNavItem icon={faChartPie} href="#">Charts</SidebarNavItem>

      <SidebarNavGroup toggleIcon={faFileLines} toggleText="Forms">
        <SidebarNavItem href="#">Form Control</SidebarNavItem>
        <SidebarNavItem href="#">Select</SidebarNavItem>
        <SidebarNavItem href="#">Checks and radios</SidebarNavItem>
        <SidebarNavItem href="#">Range</SidebarNavItem>
        <SidebarNavItem href="#">Input group</SidebarNavItem>
        <SidebarNavItem href="#">Floating labels</SidebarNavItem>
        <SidebarNavItem href="#">Layout</SidebarNavItem>
        <SidebarNavItem href="#">Validation</SidebarNavItem>
      </SidebarNavGroup>

      <SidebarNavGroup toggleIcon={faStar} toggleText="Icons">
        <SidebarNavItem href="#">CoreUI Icons</SidebarNavItem>
        <SidebarNavItem href="#">CoreUI Icons - Brand</SidebarNavItem>
        <SidebarNavItem href="#">CoreUI Icons - Flag</SidebarNavItem>
      </SidebarNavGroup>

      <SidebarNavGroup toggleIcon={faBell} toggleText="Notifications">
        <SidebarNavItem href="#">Alerts</SidebarNavItem>
        <SidebarNavItem href="#">Badge</SidebarNavItem>
        <SidebarNavItem href="#">Modals</SidebarNavItem>
        <SidebarNavItem href="#">Toasts</SidebarNavItem>
      </SidebarNavGroup>

      <SidebarNavItem icon={faCalculator} href="#">
        Widgets
        <small className="ms-auto"><Badge bg="info">NEW</Badge></small>
      </SidebarNavItem>

      <SidebarNavTitle>Extras</SidebarNavTitle>

      <SidebarNavGroup toggleIcon={faStar} toggleText="Pages">
        <SidebarNavItem icon={faRightToBracket} href="login">Login</SidebarNavItem>
        <SidebarNavItem icon={faAddressCard} href="register">Register</SidebarNavItem>
        <SidebarNavItem icon={faBug} href="#">Error 404</SidebarNavItem>
        <SidebarNavItem icon={faBug} href="#">Error 500</SidebarNavItem>
      </SidebarNavGroup>

      <SidebarNavItem icon={faFileLines} href="#">Docs</SidebarNavItem>
      <SidebarNavItem icon={faLayerGroup} href="https://coreui.io/pro/">Try CoreUI PRO</SidebarNavItem>
    </ul>
    </>
  )
}
