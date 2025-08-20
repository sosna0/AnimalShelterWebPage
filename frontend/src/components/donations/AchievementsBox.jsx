import { Row, Col } from 'react-bootstrap';
import AchievementCard from './Achievement';
import { GiDogBowl, GiSittingDog, GiDogHouse } from "react-icons/gi";
import { FaCat } from "react-icons/fa";

const AchievementsCard = () => {
    return (
        <Row className="g-4 justify-content-center">
            <Col xs={6} sm={6} md={6} lg={6}>
                <AchievementCard 
                    title="24/7" 
                    description="Constant care for animals"
                    icon={GiSittingDog}
                />
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
                <AchievementCard 
                    title="300+" 
                    description="KG of food donated"
                    icon={GiDogBowl}
                />
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
                <AchievementCard 
                    title="25" 
                    description="Animals found new homes"
                    icon={GiDogHouse}
                />
            </Col>
            <Col xs={6} sm={6} md={6} lg={6}>
                <AchievementCard 
                    title="100+" 
                    description="Toys gifted by our supporters"
                    icon={FaCat}
                />
            </Col>
        </Row>
    );
};

export default AchievementsCard;
