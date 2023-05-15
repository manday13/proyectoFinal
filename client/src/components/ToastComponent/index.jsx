import { useState } from "react"
import { Container, ToastContainer, Toast} from 'react-bootstrap'

export function ToastComponent ({title = '', body = ''}) {

  console.log(title)
  const [showToast, setShowToast] = useState(true)

   return (<ToastContainer className="p-3" position={'top-center'}>
    <Toast show={showToast} onClose={()=> setShowToast(false)}>
      <Toast.Header >
        <strong className="me-auto">{title}</strong>
      </Toast.Header>
      <Toast.Body>{body}</Toast.Body>
    </Toast>
  </ToastContainer>)
}