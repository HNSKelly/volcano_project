import React from "react";
import { Container, Col} from "reactstrap";


export default function Home(){
    return (
        <main>
            <LandingImage />
        </main>
    );
}

const LandingImage = () => {
    return(
        
            <Container className="landing-page-container">
                <Col className="landing-page-col">
                    <article className="landing_picture">
                        <div className="landing_content">
                            <h3 className="landing_title">Volcanos Around the World</h3>
                            <p className="landing_text">A place for Volcano enthusiasts</p>
                        </div>
                    </article>
                </Col>
            </Container>

    );

}

