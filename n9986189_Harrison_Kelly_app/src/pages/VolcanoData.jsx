import { React, useState, useEffect } from "react";
import { Button } from "reactstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Container, Row, Col} from "reactstrap";
import PigeonMap from "pigeon-maps";
import { Map, Marker } from 'pigeon-maps'
import Chart from 'chart.js/auto';
import { Bar } from "react-chartjs-2";
import 'mdbreact/dist/css/mdb.css'
import '@fortawesome/fontawesome-free/css/all.min.css';  
import 'bootstrap-css-only/css/bootstrap.min.css';


const token = localStorage.getItem("token");

export default function VolcDataDisplay(){
    return(
        <main>
            <VolcanoData/>
        </main>
    );
}



const VolcanoData = () => {
    const [volcData, setVolcData] = useState({});
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");
    const [authorized, setAuthorized] = useState();
    const [center, setCenter] = useState([]);
    const [zoom, setZoom] = useState(11);
    const [unauthedData, setUnauthedData] = useState({});

    useEffect(()=> {
        fetch(`http:/No longer valid/volcano/${id}`)
        .then(res => res.json())
        .then(res => {
            setUnauthedData(res)
        })
    }, [])

    useEffect(() => {
        fetch(`http:/No longer valid/volcano/${id}`,{
            method: "GET",
            headers:{
                accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.error === true){
                setAuthorized(false)
                
                
            }
            else{
                setAuthorized(true)
                setVolcData(data)
            }

        })
    }, []);
    
    if(authorized === true){
        return (
            <section>
                <Container className="volcano-data-container">
                    <Row className="volcano-data-row">
                        <Col className="volcano-data-col">
                            <h1><strong>Volcano: {volcData.name}</strong></h1>
                            <h2>Country: {volcData.country} </h2>
                            <h5>Region: {volcData.region}</h5>
                            <h5>Subregion: {volcData.subregion}</h5>
                            <h5>Last Eruption: {volcData.last_eruption}</h5>
                            <h5>Summit: {volcData.summit}</h5>
                            <h5>Elevation: {volcData.elevation}</h5>
                            <Button
                                color="info"
                                size="sm"
                                className="mt-3"
                                onClick={() => navigate("/volcanolist")}
                                >
                                    Back to Search
                            </Button>   
                        </Col>
                        <Col className="pigeon-map-col">
                            <Map className="first-map"
                                height={300}
                                center={[parseFloat(volcData.latitude), parseFloat(volcData.longitude)]}
                                zoom={zoom} 
                                onBoundsChanged={({ center, zoom }) => { 
                                setCenter(center) 
                                setZoom(zoom)}}
                            > 
                            <Marker
                                width={50}
                                anchor={[parseFloat(volcData.latitude), parseFloat(volcData.longitude)]}
                            />
                            </Map>  
                        </Col>
                    </Row>
                    <Row>
                        <Col className="population-graph-col">
                            <div style={{height:400}}>
                                <Bar
                                data={{
                                    labels: ['5km', '10km', '30km', '100km'],
                                    datasets: [{
                                        label: 'Population',
                                        data: [0, 500000, 1000000, 1500000, 2000000, 2500000,3000000,3500000,4000000,4500000],
                                        backgroundColor: [
                                            'rgba(255, 99, 132, 0.2)'
                                        ],
                                        borderColor: [
                                            'rgba(255, 99, 132, 1)'
                                        ],
                                        borderWidth: 1,
                                        label: 'Population',
                                        data: [volcData.population_5km,volcData.population_10km,volcData.population_30km,volcData.population_100km]
                                    }]
                                }}
                                
                                height={400}
                                width={600}
                                options={{
                                    maintainAspectRatio: false,
                                    scales: {
                                        y: {
                                            beginAtZero: true
                                        }
                                    }
                                }}
                                />
                            </div>
                        </Col>
                    </Row>
    
                </Container>
                    
                
        
            </section>
              
        );
    }

    else if (authorized === false){
        return (
            <section>
                <Container className="volcano-data-container">
                    <Row className="volcano-data-row">
                        <Col className="volcano-data-col">
                            <h1><strong>Volcano: {unauthedData.name}</strong></h1>
                            <h2>Country: {unauthedData.country} </h2>
                            <h5>Region: {unauthedData.region}</h5>
                            <h5>Subregion: {unauthedData.subregion}</h5>
                            <h5>Last Eruption: {unauthedData.last_eruption}</h5>
                            <h5>Summit: {unauthedData.summit}</h5>
                            <h5>Elevation: {unauthedData.elevation}</h5>
                            <Button
                                color="info"
                                size="sm"
                                className="mt-3"
                                onClick={() => navigate("/volcanolist")}
                                >
                                    Back to Search
                            </Button>   
                        </Col>
                        <Col className="pigeon-map-col">
                            <Map className="first-map"
                                height={300}
                                center={[parseFloat(unauthedData.latitude), parseFloat(unauthedData.longitude)]}
                                zoom={zoom} 
                                onBoundsChanged={({ center, zoom }) => { 
                                setCenter(center) 
                                setZoom(zoom)}}
                            > 
                            <Marker
                                width={50}
                                anchor={[parseFloat(unauthedData.latitude), parseFloat(unauthedData.longitude)]}
                            />
                            </Map>  
                        </Col>
                    </Row>   
                </Container>
        
            </section>
              
        );
    }
    
  }