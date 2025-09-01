import { Row, Button } from "react-bootstrap";
import { FaDog } from "react-icons/fa6";
import { GiJumpingDog } from "react-icons/gi";
import { MdCleanHands } from "react-icons/md";


const Activities = ({ selectedActivity, setSelectedActivity }) => {
    const activities = [
        { id: 1, name: "walking", descr: "Take animal for a walk", icon: <FaDog /> },
        { id: 2, name: "playing", descr: "Spend time with animal by playing with it", icon: <GiJumpingDog /> },
        { id: 3, name: "cleaning", descr: "Help us with cleaning animal", icon: <MdCleanHands /> }
    ];
    
    return(
        <Row className="g-4 justify-content-center">
            {activities.map((activity) => (
                <Button 
                    key={activity.id}
                    className={`btn btn-light volunteer-card d-flex align-items-center justify-content-center shadow rounded p-3
                        ${selectedActivity === String(activity.name) ? "selected" : ""}`                         
                    }
                    style={{   
                        maxWidth: "500px", height: "75px"        
                    }}
                    onClick={() => {
                        if(selectedActivity === activity.name){
                            setSelectedActivity(null);
                        }
                        else{
                            setSelectedActivity(activity.name)   
                            console.log(activity.name)
                        }
                    }}
                >
                    {/* aktywności */}
                    <span className="d-flex align-items-center">{activity.descr}</span>
                    <span className="d-flex align-items-center" style={{ fontSize: "1.5rem", marginLeft: "12px" }}>
                        {activity.icon}
                    </span> 

                </Button>
            ))}
        </Row>
    )
};

export default Activities;