import '@coreui/coreui/dist/css/coreui.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useState, useEffect } from 'react'
import { CContainer, CRow, CCol, CFormCheck, CForm, CFormInput, CButton, CInputGroup } from '@coreui/react'
function App() {
	const [ratePerHour, setRatePerHour] = useState(parseFloat(localStorage.getItem('ratePerHour')) || '')
	const [hoursWorked, setHoursWorked] = useState('')
	const [displaySalary, setDisplaySalary] = useState(0)
	const [calendar, setCalendar] = useState(() => {
		const storedCalendar = JSON.parse(localStorage.getItem('calendar'))
		return storedCalendar || Calendar()
	})
	function Calendar() {
		const arrayOfObjects = []
		for (let id = 1; id <= 31; id++) {
			const obj = {
				id: id,
				hours: 0,
				checked: false,
			}
			arrayOfObjects.push(obj)
		}
		return arrayOfObjects
	}
	useEffect(() => {
		const totalHours = calendar.reduce((acc, day) => acc + day.hours, 0)
		const totalSalary = ratePerHour * totalHours
		setDisplaySalary(totalSalary.toFixed(2))
	}, [calendar, ratePerHour])

	useEffect(() => {
		localStorage.setItem('ratePerHour', ratePerHour.toString())
	}, [ratePerHour])

	useEffect(() => {
		localStorage.setItem('calendar', JSON.stringify(calendar))
	}, [calendar])

	const handleCheck = id => e => {
		const checked = e.target.checked
		setCalendar(prevCalendar => prevCalendar.map(day => (day.id === id ? { ...day, checked } : day)))
	}
	const handleChangeHours = e => {
		setHoursWorked(e.target.value)
		setCalendar(calendar.map(day => (day.checked ? { ...day, hours: parseInt(e.target.value) } : day)))
	}

	const handleSubmit = e => {
		e.preventDefault()
		setCalendar(calendar.map(day => ({ ...day, checked: false })))
		setHoursWorked('')
	}
	const handleClear = () => {
		setCalendar(calendar.map(day => ({ ...day, hours: 0 })))
		setRatePerHour('')
		setHoursWorked('')
	}
	return (
		<CContainer>
			<h1>CountYourSallary</h1>
			<CFormInput
				type="number"
				placeholder="Rate per hour"
				onChange={e => setRatePerHour(parseFloat(e.target.value))}
				aria-describedby="button-addon1"
				value={ratePerHour}
			/>
			<hr />
			<CRow xs={{ cols: 6 }}>
				{calendar.map(day => (
					<CCol key={day.id} className="mb-5">
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
					<CForm onSubmit={e => handleSubmit(e)}>
						<CInputGroup>
							<CFormInput
								type="number"
								placeholder="Amount of hours worked"
								onChange={handleChangeHours}
								value={hoursWorked}
							/>
							<CButton type="submit">Submit</CButton>
						</CInputGroup>
					</CForm>
				</CCol>
				<CCol>
					<CButton color="danger" onClick={handleClear}>
						Clear ALL
					</CButton>
				</CCol>
			</CRow>
			<div>Total Salary: {displaySalary}</div>
		</CContainer>
	)
}

export default App
