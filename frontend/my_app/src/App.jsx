import { useEffect, useState } from "react";
import api from "./services/api";

function App() {

    const [services, setServices] = useState([]);

    const [form, setForm] = useState({
        nom: "",
        description: "",
        prix: "",
        duree: ""
    });

    const [editId, setEditId] = useState(null);

    // GET all services
    const fetchServices = () => {
        api.get("/services")
            .then(res => {
                setServices(res.data);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        fetchServices();
    }, []);

    // handle input
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // CREATE or UPDATE
    const handleSubmit = (e) => {
        e.preventDefault();

        if (editId) {
            api.put(`/services/${editId}`, form)
                .then(() => {
                    setEditId(null);
                    setForm({ nom: "", description: "", prix: "", duree: "" });
                    fetchServices();
                });
        } else {
            api.post("/services", form)
                .then(() => {
                    setForm({ nom: "", description: "", prix: "", duree: "" });
                    fetchServices();
                });
        }
    };

    // DELETE
    const handleDelete = (id) => {
        api.delete(`/services/${id}`)
            .then(() => fetchServices());
    };

    // EDIT
    const handleEdit = (service) => {
        setForm(service);
        setEditId(service.id);
    };

    return (
        <div style={{ padding: "30px" }}>

            <h1>Gestion des Services</h1>

            {/* FORM */}
            <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>

                <input
                    name="nom"
                    placeholder="Nom"
                    value={form.nom}
                    onChange={handleChange}
                />

                <input
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleChange}
                />

                <input
                    name="prix"
                    placeholder="Prix"
                    value={form.prix}
                    onChange={handleChange}
                />

                <input
                    name="duree"
                    placeholder="Durée"
                    value={form.duree}
                    onChange={handleChange}
                />

                <button type="submit">
                    {editId ? "Modifier" : "Ajouter"}
                </button>

            </form>

            {/* LIST */}
            {services.map(service => (
                <div key={service.id} style={{
                    border: "1px solid #ddd",
                    padding: "10px",
                    marginBottom: "10px"
                }}>
                    <h3>{service.nom}</h3>
                    <p>{service.description}</p>
                    <p>{service.prix} DH</p>
                    <p>{service.duree} min</p>

                    <button onClick={() => handleEdit(service)}>
                        Modifier
                    </button>

                    <button onClick={() => handleDelete(service.id)}>
                        Supprimer
                    </button>
                </div>
            ))}

        </div>
    );
}

export default App;