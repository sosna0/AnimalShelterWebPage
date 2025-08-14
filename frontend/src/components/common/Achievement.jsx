import { Card } from 'react-bootstrap';

const AchievementCard = ({ title, description, icon: Icon }) => {
    return (
        <Card
            style={{
                borderRadius: '25px',
                borderWidth: "3px",
                borderStyle: "solid",
                aspectRatio: "1 / 1",
                maxWidth: "250px",
                margin: "0 auto",
            }}
        >
            <Card.Header
                className="d-flex justify-content-center align-items-center"
                style={{ height: "75%" }}
            >
                <div className="d-flex align-items-center gap-2 flex-wrap justify-content-center">
                    {Icon && <Icon style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }} />}
                    
                    <span style={{ fontSize: "clamp(1.2rem, 4vw, 2rem)", textAlign: "center" }}>
                        {title || "Title"}
                    </span>
                </div>
            </Card.Header>
            <Card.Body className="d-flex align-items-center justify-content-center">
                <Card.Text className="text-center lead" style={{ fontSize: "clamp(1rem, 3vw, 1.25rem)" }}>
                    {description || "Description"}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default AchievementCard;
