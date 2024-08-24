import React, { useState } from 'react';

const Booking = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        service: '',
        date: '',
        special_request: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://127.0.0.1:5000/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                console.log('Booking successful!');
            } else {
                console.error('Booking failed!');
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    return (
        <>
            <div className="container-fluid bg-secondary booking my-5 wow fadeInUp" data-wow-delay="0.1s">
                <div className="container">
                    <div className="row gx-5">
                        <div className="col-lg-6 py-5">
                            <div className="py-5">
                                <h1 className="text-white mb-4">Certified and Award Winning Car Repair Service Provider</h1>
                                <p className="text-white mb-0">Eirmod sed tempor lorem ut dolores. Aliquyam sit sadipscing kasd ipsum. Dolor ea et dolore et at sea ea at dolor, justo ipsum duo rebum sea invidunt voluptua. Eos vero eos vero ea et dolore eirmod et. Dolores diam duo invidunt lorem. Elitr ut dolores magna sit. Sea dolore sanctus sed et. Takimata takimata sanctus sed.</p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="bg-primary h-100 d-flex flex-column justify-content-center text-center p-5 wow zoomIn" data-wow-delay="0.6s">
                                <h1 className="text-white mb-4">Book For A Service</h1>
                                <form onSubmit={handleSubmit}>
                                    <div className="row g-3">
                                        <div className="col-12 col-sm-6">
                                            <input type="text" name="name" className="form-control border-0" placeholder="Your Name" style={{ height: "55px" }} value={formData.name} onChange={handleChange} />
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <input name="email" type="email" className="form-control border-0" placeholder="Your Email" style={{ height: "55px" }} value={formData.email} onChange={handleChange} />
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <select name="service" className="form-select border-0" style={{ height: "55px" }} value={formData.service} onChange={handleChange}>
                                                <option>Select A Service</option>
                                                <option value="Arıza Tespit">Arıza Tespit</option>
                                                <option value="Motor Servisi">Motor Servisi</option>
                                                <option value="Lastik Değişim">Lastik Değişim</option>
                                                <option value="Yağ Bakımı">Yağ Bakımı</option>
                                                <option value="Araç Yıkama">Araç Yıkama</option>
                                            </select>
                                        </div>
                                        <div className="col-12 col-sm-6">
                                            <div className="date" id="date1" data-target-input="nearest">
                                                <input type="text" name="date"
                                                    className="form-control border-0 datetimepicker-input"
                                                    placeholder="Service Date" data-target="#date1" data-toggle="datetimepicker" style={{ height: "55px" }} value={formData.date} onChange={handleChange} />
                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <textarea name="special_request" className="form-control border-0" placeholder="Special Request" value={formData.special_request} onChange={handleChange}></textarea>
                                        </div>
                                        <div className="col-12">
                                            <button className="btn btn-secondary w-100 py-3" type="submit">Book Now</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Booking;
