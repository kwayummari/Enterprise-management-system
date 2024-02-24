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
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { useRouter } from 'next/navigation'

const SidebarNavTitle = (props: PropsWithChildren) => {
  const { children } = props
  return (
    <li className="nav-title px-3 py-2 mt-3 text-uppercase fw-bold">{children}</li>
  )
}
interface Permissions {
  id: number;
  name: string;
  icon: IconDefinition;
  submenu: { name: string, url: string }[]; 
}

export default function SidebarNav() {
  const router = useRouter();
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
    } catch (err: any) {
      setError(err.message);
    }
  };
  // const handleClick = (url: string) => {
  //   router.push(url);
  // };
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
      <SidebarNavItem icon={faGauge} href="/dashboard">
        Dashboard
        <small className="ms-auto"><Badge bg="info" className="ms-auto">NEW</Badge></small>
        </SidebarNavItem>
        {/* <SidebarNavTitle>Components</SidebarNavTitle> */}
        {permissions.map(permission => (
          // toggleIcon={permission.icon}
          <SidebarNavGroup key={permission.id} toggleIcon={faAddressCard} toggleText={permission.name}>
            {permission.submenu.map(submenu => (
              <SidebarNavItem href={submenu.url}>{submenu.name}</SidebarNavItem>
              // <li className="nav-item" onClick={() => handleClick(submenu.url)}>
      // <span className="nav-link">{submenu.name}</span>
    // </li>
            ))}
            </SidebarNavGroup>
        ))}
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
