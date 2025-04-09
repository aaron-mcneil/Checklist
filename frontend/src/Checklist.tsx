import { useParams } from 'react-router'
import { useNavigate } from 'react-router-dom'
import './Checklist.css'

function Checklist() {
  const {checklistId} = useParams()
  const navigate = useNavigate()

  function handleClick() {
    navigate("/")
  }

  return (
    <>
      <h1>Checklist {checklistId}</h1>
      <div className="card">
        <p>
          checklist ID is {checklistId}
        </p>
      </div>
      <button onClick={handleClick}>
        Back to Home
      </button>
    </>
  )
}

export default Checklist
