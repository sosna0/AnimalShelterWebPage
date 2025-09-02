import React, { useState, useEffect, useRef } from "react";
import { Container, Spinner, Alert, Button, Accordion } from 'react-bootstrap';
import { getAnimals } from "../api/services/animalService";
import { RoleOnly } from "../components/access/RoleOnly";
import { useAuth } from "../hooks/use-auth";
import { getVolunteersByFilters, createVolunteer } from "../api/services/volunteerService";
import ConfirmationModal from "../components/common/ConfirmationModal";
import Activities from "../components/volunteers/Activities";
import DateSelection from "../components/volunteers/DateSelection";
import AnimalsRow from "../components/volunteers/AnimalsRow";


const Volunteer = () => {
    const { user } = useAuth();
    const [animals, setAnimals] = useState([]); 
    const [loadingAnimals, setLoadingAnimals] = useState(false);
    const [animalAvailability, setAnimalAvailability] = useState({}); // { [animalId]: true/false }

    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    const [selectedActivity, setSelectedActivity] = useState(null);

    const [selectedDate, setSelectedDate] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    const [selectedAnimal, setSelectedAnimal] = useState(null);

    
    const [activeKey, setActiveKey] = useState("0"); // kontrola aktywnego akordeonu

    const [showModal, setShowModal] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    
    const topRef = useRef(null);

    const scrollToTop = () => {
        if (topRef.current) {
            topRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    const handleVolunteerClick = () => setShowModal(true);
    const handleCancel = () => setShowModal(false);

    const handleConfirm = async () => {
        if (!user || !selectedActivity || !selectedDate || !selectedTime || !selectedAnimal) return;
    
        setSubmitting(true);
        setSubmitError(null);
    
        try {
            await createVolunteer({
                userId: user.id,
                animalId: selectedAnimal,
                activityType: selectedActivity,
                date: new Date(`${selectedDate}T${selectedTime}:00`),
                durationMinutes: 60,
                message: "",
            });
    
            setShowModal(false);

            setSelectedActivity(null);
            setSelectedDate("");
            setSelectedTime("");
            setSelectedAnimal(null);
            setActiveKey("0");
    
            alert("Volunteer created successfully!");
        } catch (err) {
            console.error(err);
            setSubmitError("Failed to create volunteer. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };
    
    const fetchAnimals = async () => {
        setLoading(true);
        setError(null);
    
        try {
            let animals = await getAnimals();
            setAnimals(animals);
            const initialAvailability = {};
            
            animals.forEach(animal => {
                initialAvailability[animal.id] = false;
            });
            
            setAnimalAvailability(initialAvailability);
    
        } catch (err) {
            setError('Failed to load animals for volunteering. Please try again later.');
            console.error('Error fetching animals:', err);
        } finally {
            setLoading(false);
        }
    };
    
    const fetchVolunteers = async (activity, date, time) => {
        if (!activity || !date || !time) return;
    
        setLoadingAnimals(true);
    
        const minDelay = new Promise(resolve => setTimeout(resolve, 2000)); // minimalny czas 2s
    
        try {
            const filters = { date }; // pobieramy wszystkie wolontariaty z tego dnia
            const data = await getVolunteersByFilters(filters);
    
            const availability = {};
            animals.forEach(a => {
                availability[a.id] = true; // domyślnie dostępne
            });
    
            const newStart = new Date(`${date}T${time}:00`);
            const newEnd = new Date(newStart.getTime() + 60 * 60000); // 60 minut
    
            data.forEach(v => {
                // blokujemy zwierzaka, jeśli aktywność się powtarza lub godziny się nakładają
                if(v.status === 'Submitted'){
                    const vStart = new Date(v.date);
                    const vEnd = new Date(vStart.getTime() + 60 * 60000); // 60 minut
                
                    if (
                        v.activityType === selectedActivity ||
                        (newStart >= vStart && newStart < vEnd) ||
                        (newEnd > vStart && newEnd <= vEnd) ||
                        (newStart <= vStart && newEnd >= vEnd)
                    ) {
                        availability[v.animalId] = false;
                    }
                }
            }); 
    
            setAnimalAvailability(availability);
            await minDelay;
        } catch (err) {
            console.error(err);
            await minDelay;
        } finally {
            setLoadingAnimals(false);
        }
    };
    

    useEffect(() => {
        fetchAnimals();
    }, []);

    useEffect(() => {
        const fetch = async () => {
            if (selectedActivity && selectedDate && selectedTime) {
                await fetchVolunteers(selectedActivity, selectedDate, selectedTime);
            }
        };

        fetch();
    }, [selectedActivity, selectedDate, selectedTime]);


    if (loading) return (
        <Container className="text-center mt-5">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Container>
    );

    if (error) return (
        <Container className="mt-4">
            <Alert variant="danger">{error}</Alert>
        </Container>
    );

    return (
        <Container className="mt-4" style={{ maxWidth: "1000px" }}>
            <div ref={topRef}></div>
            
            <h1 className="text-center mb-4">Help us by volunteering</h1>

            <Accordion defaultActiveKey={0} activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
                
                <Accordion.Item eventKey="0">
                <Accordion.Header>
                    1. Choose activity <span className="text-muted ms-2">(each takes ~ 1 hour)</span>
                </Accordion.Header>
                    <Accordion.Body>
                        <Activities selectedActivity={selectedActivity} setSelectedActivity={setSelectedActivity} />
                    </Accordion.Body>
                </Accordion.Item>

                <Accordion.Item eventKey="1">
                    <Accordion.Header>2. Select date</Accordion.Header>
                    <Accordion.Body>
                        <DateSelection 
                            selectedDate={selectedDate} selectedTime={selectedTime}
                            setSelectedDate={setSelectedDate} setSelectedTime={setSelectedTime}
                        />
                    </Accordion.Body>
                </Accordion.Item>
                
                <Accordion.Item eventKey="2">
                    <Accordion.Header>
                        <div className="d-flex align-items-center justify-content-between w-100">
                            <span>3. Pick animal you want to help</span>
                            
                            {loadingAnimals && (
                                <div className="d-flex align-items-center px-3">
                                    <span className="me-2">Updating animals...</span>
                                    <Spinner animation="border" size="sm" role="status" />
                                </div>
                            )}

                        </div>
                    </Accordion.Header>
                    <Accordion.Body>
                    <AnimalsRow
                        animals={animals}
                        selectedAnimal={selectedAnimal} setSelectedAnimal={setSelectedAnimal}
                        animalAvailability={animalAvailability}
                        selectedActivity={selectedActivity}
                        selectedDate={selectedDate}
                        selectedTime={selectedTime}
                    />
                    </Accordion.Body>
                </Accordion.Item>


            </Accordion>

            {/* przycisk floating, tylko przy aktywnej sekcji "2" */}
            {activeKey === "2" && (
                <Button
                    variant="primary"
                    onClick={scrollToTop}
                    style={{
                        position: "fixed",
                        bottom: "20px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        borderRadius: "50%",
                        width: "50px",
                        height: "50px",
                        fontSize: "20px",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.3)"
                    }}
                >
                    ↑
                </Button>
            )}

            <div className="d-flex flex-column mt-5 mb-5 gap-2">
                <RoleOnly allowedRoles={['guest', 'public']}>
                    <Button 
                        variant="primary" 
                        onClick={handleVolunteerClick}
                        disabled={ !user || !selectedActivity || !selectedDate || !selectedTime || !selectedAnimal }
                        className="w-100"
                    >
                        Volunteer
                    </Button>

                </RoleOnly>

                <RoleOnly allowedRoles={['guest']}>
                    <span className='text-danger text-center'>
                    You must be logged in to volunteer.
                    </span>
                </RoleOnly>

                <RoleOnly allowedRoles={['public']}>
                    {(!selectedActivity || !selectedDate || !selectedTime || !selectedAnimal) && (
                        <span className='text-danger text-center'>
                            You must fill in all fields to volunteer.
                        </span>
                    )}
                </RoleOnly>
            </div>

            <ConfirmationModal
                show={showModal}
                onHide={handleCancel}
                onConfirm={handleConfirm}
                title="Confirm your volunteering"
                message={
                    <>
                        <p><strong>Activity:</strong> {selectedActivity}</p>
                        <p><strong>Date:</strong> {selectedDate}</p>
                        <p><strong>Time:</strong> {selectedTime}</p>
                        <p><strong>Animal:</strong> {animals.find(a => a.id === Number(selectedAnimal))?.name || ""}</p>
                        {submitError && <Alert variant="danger">{submitError}</Alert>}
                    </>
                }
                confirmLabel={submitting ? "Submitting..." : "Submit"}
            />
            
        </Container>
    );
};

export default Volunteer;
