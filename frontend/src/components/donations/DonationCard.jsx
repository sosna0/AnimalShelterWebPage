import { Card } from 'react-bootstrap';

const DonationCard = ({ donation }) => {
    return (
        <Card className="mb-5"
            style={{
                borderRadius: '20px',
            }}
        >
            <Card.Header className="d-flex justify-content-between py-3 text-start">
                <div>
                    <span className="fw-bold">{donation.nickname}</span>
                    <br />
                    <small className="text-muted">
                        {new Date(donation.createdAt).toLocaleDateString()}
                    </small>
                </div>
                <span className="fw-bold">{Number(donation.amount).toFixed(2)}$</span>
            </Card.Header>
            <Card.Body className="text-start">
                <Card.Text>
                    {donation.message || ''}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default DonationCard;
