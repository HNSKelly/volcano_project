import {React, useState, useEffect} from "react";
import {useNavigate } from "react-router-dom";
import { Container, Row, Col} from "reactstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";


export default function VolcanoList(){
    return(
        <main>
            <VolcanoContent/>
        </main>
    );
}

const API_URL = "http://sefdb02.qut.edu.au:3001/" //No longer valid

const VolcanoContent = () => {
    const [rowData, setRowData] = useState([]);
    const [chosenCountry, setChosenCountry] = useState("");
    const [chosenDistance, setChosenDistance] = useState();
    const navigate = useNavigate();
    
    
    const columns = [
        {headerName: "Name", field: "name", sortable: true},
        {headerName: "Country", field: "country"},
        {headerName: "Region", field: "region", sortable: true},
        {headerName: "Subregion", field: "subregion", sortable: true}
    ];


    function getTableData(c, d){
        try{
            if(d === undefined){
                return countryOnly(c)
            }
            else{
                return fetch(`${API_URL}volcanoes?country=${c}&populatedWithin=${d}km`)
                    .then((res) => res.json())
                    .then((works) => works.map((fetchData) =>({
                            
                        id: fetchData.id,
                        name: fetchData.name,
                        country: fetchData.country,
                        region: fetchData.region,
                        subregion: fetchData.subregion,
        
                    })
                    ))
           }
        }
        catch(err){
            console.log(err)
        }

    }

    function countryOnly(c){
        try{
            return fetch(`${API_URL}volcanoes?country=${c}`)
                .then((res) => res.json())
                .then((works) => works.map((fetchData) =>({
                    
                    id: fetchData.id,
                    name: fetchData.name,
                    country: fetchData.country,
                    region: fetchData.region,
                    subregion: fetchData.subregion

                })
                ))
        }
        catch(err){
            console.log(err)
        }

    }

    function SettingRowData(event){
        event.preventDefault();
        setChosenCountry(chosenCountry)
        setChosenDistance(chosenDistance)
        getTableData(chosenCountry, chosenDistance)
        .then(rowData => setRowData(rowData))
        useEffect(() => {
        
        }, [chosenCountry, chosenDistance])
    }


    return(
        <section className="volcano_page">
            <div className="volcano_content">
                <Container className="grid-container">
                    <h1 className="volcano_list_title">Volcano List</h1>
                    <Row className="search-group-row">
                        <Col className="search-group-col">
                            <Form className="country-search" onSubmit={SettingRowData}>
                                <Form.Group className="multi-select-group">
                                    <Form.Select aria-label="Default select example" className="multi-select-distance"
                                        value={chosenDistance}
                                        onChange={(event) => setChosenDistance(event.target.value)}>
                                        <option value="0">Distance Selection</option>
                                        <option value="5">5km</option>
                                        <option value="10">10km</option>
                                        <option value="30">30km</option>
                                        <option value="100">100km</option>
                                    </Form.Select>
                                    <Form.Group className="search-bar-group">
                                        <Form.Control type="text" placeholder="Enter Country"  value={chosenCountry} onChange={(event) => {setChosenCountry(event.target.value);}}/>
                                            <Button 
                                            type="submit"
                                            variant="primary"
                                            color="primary">
                                            Search
                                            </Button>
                                        </Form.Group>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                    <Row className="ag-grid-row">
                        <Col className="ag-grid-col">
                            <div className="ag-theme-balham"
                                style={{height: "400px", 
                                width: "75%"}}
                                >
                                    <AgGridReact columnDefs={columns} 
                                    rowData={rowData} pagination={true} 
                                    paginationPageSize={20}
                                    onRowClicked={(row) => navigate(`/volcanodata?id=${row.data.id}`)}
                                    className="ag-table"
                                    />
                            </div>
                        </Col>  
                    </Row>   
                </Container>
            </div>
        </section>
    );
}
