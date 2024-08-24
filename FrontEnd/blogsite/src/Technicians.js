import React, { useEffect, useState } from 'react';
import './CssCodes.css';
import './bootstrap.min.css';

const Technicians = () => {
    const [technicians, setTechnicians] = useState([]);

    useEffect(() => {
        fetchTechnicians();
    }, []);

    const fetchTechnicians = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/technicians');
            if (!response.ok) {
                throw new Error('Something went wrong while fetching technicians.');
            }
            const data = await response.json();
            setTechnicians(data);
        } catch (error) {
            console.error('Error fetching technicians:', error);
        }
    };

    return (
        <>
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                        <h6 className="text-primary text-uppercase">// Our Technicians //</h6>
                        <h1 className="mb-5">Our Expert Technicians</h1>
                    </div>
                    <div className="row g-4">
                        
                        {technicians.map((technician) => (
                            <div key={technician.id} className="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                <div className="team-item">
                                    <div className="position-relative overflow-hidden">
                                        
                                        <img className="img-fluid" src={technician.image} alt={technician.name} />
                                        <div className="team-overlay position-absolute start-0 top-0 w-100 h-100">
                                            <a className="btn btn-square mx-1" href={technician.facebook}><i className="fab fa-facebook-f"></i></a>
                                            <a className="btn btn-square mx-1" href={technician.twitter}><i className="fab fa-twitter"></i></a>
                                            <a className="btn btn-square mx-1" href={technician.instagram}><i className="fab fa-instagram"></i></a>
                                        </div>
                                    </div>
                                    <div className="bg-light text-center p-4">
                                        <h5 className="fw-bold mb-0">{technician.name}</h5>
                                        <small>{technician.job_title}</small>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Technicians;
