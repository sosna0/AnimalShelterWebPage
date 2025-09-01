import { Row, Col } from "react-bootstrap";
import AnimalCard from "../animals/AnimalCard";

const AnimalsRow = ({
    animals,
    selectedAnimal,
    setSelectedAnimal,
    animalAvailability,
    selectedActivity,
    selectedDate,
    selectedTime
}) => {
    return (
        <Row className="g-4 justify-content-center">
            <div>
                <h2 className="text-center">Available Animals</h2>
                <h2 className="text-center mb-4 text-muted">
                    <small>
                        activity - {selectedActivity}, date - {selectedDate && selectedTime ? `${selectedDate}` : ""}
                    </small>
                </h2>
            </div>

            {animals.map((animal) => (
                <Col
                    key={animal.id}
                    xs={12}
                    md={10}
                    lg={8}
                    className={`volunteer-card mb-4 d-flex align-items-center shadow rounded p-3
                        ${selectedAnimal === String(animal.id) ? "selected" : ""}
                        ${animalAvailability[animal.id] === false ? "disabled" : ""}`}
                    onClick={() => {
                        if (animalAvailability[animal.id] === false) return;
                        if (selectedAnimal === String(animal.id)) {
                            setSelectedAnimal(null);
                        } else {
                            setSelectedAnimal(String(animal.id));
                        }
                    }}
                >
                    <div className="px-3 py-3">
                        <AnimalCard animal={animal} hasButton={false} />
                    </div>
                </Col>
            ))}
        </Row>
    );
};

export default AnimalsRow;
