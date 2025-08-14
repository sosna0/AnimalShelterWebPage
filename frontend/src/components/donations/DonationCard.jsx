import { Card } from 'react-bootstrap';


const DonationCard = ({ donation }) => {
    return (
        <Card className="mb-5"
            style={{
                borderRadius: '20px',
            }}
        >
            <Card.Header className="d-flex justify-content-between py-3">
                <div>
                    <span className="fw-bold">{donation.nickname}</span>
                    <br />
                    <small className="text-muted">
                        {new Date(donation.createdAt).toLocaleDateString()}
                    </small>
                </div>
                <span className="fw-bold">{donation.amount}$</span>
            </Card.Header>
            <Card.Body>
                <Card.Text>
                    {donation.message || ''}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default DonationCard;
