import { useEffect, useState } from "react";
import api from "./services/api";

function App() {

const [services, setServices] = useState([]);

    useEffect(() => {

        api.get("/services")
            .then((response) => {
                setServices(response.data);
               

            })
            .catch((error) => {
                console.error(error);
            });

    }, []);

    return (
        <div style={{ padding: "40px" }}>

            <h1>Nos Services</h1>

            {services.map((service) => (

                <div
                    key={service.id}
                    style={{
                        border: "1px solid #ddd",
                        padding: "20px",
                        marginBottom: "15px",
                        borderRadius: "10px"
                    }}
                >
                    <h2>{service.nom}</h2>

                    <p>{service.description}</p>

                    <strong>{service.prix} DH</strong>

                    <br />

                    <small>{service.duree} minutes</small>

                </div>

            ))}

        </div>
    );
}

export default App;