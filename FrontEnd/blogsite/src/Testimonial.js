import React, { useState, useEffect } from 'react';
import './CssCodes.css';
import './bootstrap.min.css';

const Header = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5000/testimonials')
            .then(response => response.json())
            .then(data => setTestimonials(data))
            .catch(error => console.error('Error fetching testimonials:', error));
    }, []);

    return (
        <>
            <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
                <div className="container">
                    <div className="text-center">
                        <h6 className="text-primary text-uppercase">// Testimonial //</h6>
                        <h1 className="mb-5">Our Clients Say!</h1>
                    </div>
                    <div className="owl-carousel testimonial-carousel position-relative">
                        {testimonials.map(testimonial => (
                            <div className="testimonial-item text-center" key={testimonial.id}>
                                <img className="bg-light rounded-circle p-2 mx-auto mb-3" src={testimonial.image} style={{ width: "80px", height: "80px" }} alt={testimonial.client_name} />
                                <h5 className="mb-0">{testimonial.client_name}</h5>
                                <p>{testimonial.profession}</p>
                                <div className="testimonial-text bg-light text-center p-4">
                                    <p className="mb-0">{testimonial.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
