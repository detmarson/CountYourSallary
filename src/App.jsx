import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState } from 'react'
import { CContainer, CRow, CCol, CFormCheck, CForm, CFormInput, CButton, CInputGroup } from '@coreui/react'
function App() {
	const [ratePerHour, setRatePerHour] = useState(0)
	const [displaySalary, setDisplaySalary] = useState(0)
	const [calendar, setCalendar] = useState(Calendar())
	function Calendar() {
		const arrayOfObjects = []
		for (let id = 1; id <= 30; id++) {
			const obj = {
				id: id,
				hours: 0,
				checked: false,
			}
			arrayOfObjects.push(obj)
		}
		return arrayOfObjects
	}

	const handleCheck = id => e => {
		const checked = e.target.checked
		setCalendar(prevCalendar => prevCalendar.map(day => (day.id === id ? { ...day, checked } : day)))
	}
	const handleChangeHours = e => {
		setCalendar(calendar.map(day => (day.checked ? { ...day, hours: parseInt(e.target.value) } : day)))
	}
	const countSalary = e => {
		e.preventDefault()
		const totalHours = calendar.reduce((acc, day) => acc + day.hours, 0)
		const totalSalary = ratePerHour * totalHours
		setDisplaySalary(totalSalary)
	}
	return (
		<CContainer>
			<h1>CountYourSallary</h1>
			<CForm className="row mb-3" onSubmit={countSalary}>
				<CCol xs="auto">
					<CFormInput
						type="number"
						placeholder="Rate per hour"
						onChange={e => setRatePerHour(parseFloat(e.target.value))}
						aria-describedby="button-addon1"
					/>
				</CCol>
				<CCol>
					<CButton className="col-3" type="submit" color="primary">
						Count
					</CButton>
				</CCol>
			</CForm>
			<hr />
			<CRow>
				{calendar.map(day => (
					<CCol className="m-4" xs="1" key={day.id}>
						<CFormCheck
							button={{ color: 'primary', variant: 'outline' }}
							id={day.id}
							autoComplete="off"
							label={`${day.id}| ${day.hours}h`}
							onChange={handleCheck(day.id)}
							checked={day.checked}
						/>
					</CCol>
				))}
			</CRow>
			<hr />
			<CRow className="mb-3">
				<CCol>
					<CInputGroup>
						<CFormInput type="number" placeholder="Amount of hours worked" onChange={handleChangeHours} />
						<CButton>Deselect</CButton>
					</CInputGroup>
				</CCol>
				<CCol>
					<CButton>Clear ALL</CButton>
				</CCol>
			</CRow>
			<div>Total Salary: {displaySalary}</div>
		</CContainer>
	)
}

export default App
