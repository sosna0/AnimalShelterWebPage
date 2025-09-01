import { Row, Col, Form, Dropdown } from 'react-bootstrap';


const DateSelection = ({ selectedDate, setSelectedDate, selectedTime, setSelectedTime}) => {
    const times = [];

    for (let h = 8; h < 18; h++) {
        times.push(`${h.toString().padStart(2, "0")}:00`);
        if (h < 17){
            times.push(`${h.toString().padStart(2, "0")}:30`);
        } 
    }

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const minDate = tomorrow.toISOString().split("T")[0];

    return (
        <Row className="g-4 justify-content-center">
            {/* wybór daty */}
            <Col xs={12} md={6}>
                <Form.Group controlId="dateInput">
                    <Form.Label>Select a date</Form.Label>
                    <Form.Control
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={minDate} // blokada na wcześniejsze dni
                        onKeyDown={(e) => e.preventDefault()}
                    />
                </Form.Group>
            </Col>

            {/* wybór godziny */}
            <Col xs={12} md={6}>
                <Form.Group controlId="timeSelect">
                    <Form.Label>Select a time</Form.Label>
                    <Dropdown className="w-100" drop="down">
                        <Dropdown.Toggle
                            variant="light"
                            className="w-100 text-start border"
                            style={{ height: "38px" }}
                        >
                            {selectedTime || "-- choose time --"}
                        </Dropdown.Toggle>

                        <Dropdown.Menu 
                            className="w-100"
                            style={{ maxHeight: "200px", overflowY: "auto" }}
                        >
                            {times.map((t) => (
                                <Dropdown.Item
                                    key={t}
                                    onClick={() => setSelectedTime(t)}
                                >
                                    {t}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>
            </Col>
        </Row>
    );
};    

export default DateSelection;