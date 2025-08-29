import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Spinner } from "react-bootstrap";
import { GiPawHeart } from "react-icons/gi";

const DonationPaymentProcessing = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState("processing");

    useEffect(() => {
        if (step === "processing") {
            const timer = setTimeout(() => setStep("success"), 2500);
            return () => clearTimeout(timer);
        }
        if (step === "success") {
            const timer = setTimeout(() => setStep("redirecting"), 2000);
            return () => clearTimeout(timer);
        }
        if (step === "redirecting") {
            const timer = setTimeout(() => navigate("/donations"), 2500);
            return () => clearTimeout(timer);
        }
    }, [step, navigate]);

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="p-5 custom-container text-center" 
                style={{
                    maxWidth: "600px", width: "100%"
                }}
            >
                {step === "processing" && (
                    <div className="d-flex align-items-center justify-content-center gap-3">
                        <strong><h4>Processing your payment...</h4></strong>
                        <Spinner animation="border" role="status" />
                    </div>
                )}
        
                {step === "success" && (
                    <div>
                        <h3>Success!</h3>
                        <p className="mt-3 mb-0 d-flex align-items-center justify-content-center gap-2">
                            Thank you for your support
                            <GiPawHeart size={30} color="red" />
                        </p>
                    </div>
                )}
        
                {step === "redirecting" && (
                    <div className="d-flex align-items-center justify-content-center gap-3">
                        <strong><h4>Going back to Donations Page...</h4></strong>
                        <Spinner animation="border" role="status" />
                    </div>
                )}
            </Card>
        </Container>
    
    );
};

export default DonationPaymentProcessing;