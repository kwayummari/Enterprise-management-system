'use client'

import {
  Alert, Button, Col, Form, FormControl, InputGroup, Row,
} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-regular-svg-icons'
import { faLock } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation'
import { SyntheticEvent, useState } from 'react'
import { deleteCookie, getCookie } from 'cookies-next'
import Link from 'next/link'
import InputGroupText from 'react-bootstrap/InputGroupText'
import { validateLoginData } from '@/app/gateway/validators'
import apiGateway from '@/app/gateway/gateways'
import { useDispatch, useSelector } from 'react-redux'

export default function Login() {
  const router = useRouter()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  interface RootState {
    counter: {
      value: number;
    };
  }
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch()

  const getRedirect = () => {
    const redirect = getCookie('redirect')
    if (redirect) {
      deleteCookie('redirect')
      return redirect.toString()
    }

    return '/'
  }

  const login = async (e: SyntheticEvent) => {
    e.stopPropagation();
    e.preventDefault();
  
    setSubmitting(true);
    try {
      const target = e.target as typeof e.target & {
        email: { value: string };
        password: { value: string };
      };
      const userData = {
        email: target.email.value,
        password: target.password.value,
      };
      
      validateLoginData(userData);
  
       const value = await apiGateway.create('login', userData);
      setSuccess(value.message)
      // router.push(getRedirect());
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };
  
  

  return (
    <>
      <Alert
        variant="success"
        show={success !== ''}
        onClose={() => setSuccess('')}
        dismissible
      >
        {success}
      </Alert>
      <Alert
        variant="danger"
        show={error !== ''}
        onClose={() => setError('')}
        dismissible
      >
        {error}
      </Alert>
      <Form onSubmit={login}>
        <InputGroup className="mb-3">
          <InputGroupText>
            <FontAwesomeIcon
              icon={faUser}
              fixedWidth
            />
          </InputGroupText>
          <FormControl
            name="email"
            required
            disabled={submitting}
            placeholder="Email"
            aria-label="Email"
            defaultValue="Email"
          />
        </InputGroup>

        <InputGroup className="mb-3">
          <InputGroupText>
            <FontAwesomeIcon
              icon={faLock}
              fixedWidth
            />
          </InputGroupText>
          <FormControl
            type="password"
            name="password"
            required
            disabled={submitting}
            placeholder="Password"
            aria-label="Password"
            defaultValue="Password"
          />
        </InputGroup>

        <Row className="align-items-center">
          <Col xs={6}>
            <Button
              className="px-4"
              variant="primary"
              type="submit"
              disabled={submitting}
            >
              Login
            </Button>
          </Col>
          <Col xs={6} className="text-end">
            <Link className="px-0" href="#">
              Forgot
              password?
            </Link>
          </Col>
        </Row>
      </Form>
    </>
  )
}
