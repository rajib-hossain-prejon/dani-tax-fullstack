import React, { useState } from 'react';
import axios from 'axios';
import "./Form.css";
import { inputIconEmail, inputIconName, inputIconPhoneNumber } from './Icons';
import { v4 as uuidv4 } from "uuid";
import { createNotification } from '../notifay/Notify';
import { generateRandomNumber } from '../utils/randomDigitsNumber';

const Form = ({ formData, formRef, shortForm = false }) => {
    const { title, fullName, phoneNumber, email, message } = formData;
    const randomSixDigitNumber = generateRandomNumber();
    const [loading, setLoading] = useState(false);
    const [formDataState, setFormDataState] = useState({
        name: "",
        phonenumber: "",
        email: "",
        message: "",
    });


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormDataState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const isSubmitDisabled = () => {
        return !formDataState.phonenumber.trim();
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        const { name, phonenumber, email, message } = formDataState;
        const data = {
            id: uuidv4(),
            name: name,
            phone: phonenumber,
            email: email,
            createdAt: new Date(),
            caseNumber: randomSixDigitNumber,
            customerStatus: "new",
            note: ""
        };

        try {
            // const response = await axios.post("http://localhost:8080/api/contact/", data);
            // const response = await axios.post("http://gytb.co.il/api/contact/", data);
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/contact/`, data);
            if (response?.statusText === "OK") {
                createNotification('success')
            }

        } catch (error) {
            console.error(error);
            createNotification('error')

        } finally {
            setLoading(false);
            setFormDataState({
                name: "",
                phonenumber: "",
                email: "",
                message: "",
            });
        }
    };


    return (
        <div className="container" ref={formRef}>

            {/* {!shortForm && (
                <div className="text-center mt-5">
                    <h1>{title}</h1>
                </div>
            )} */}

            <div className="row">
                <div className="col-lg-7 mx-auto">
                    <div
                        className={`card card_wrapper mt-2 mx-auto p-4 ${shortForm ? 'short_form_card_wrapper' : ''
                            }`}
                    >
                        <div
                            className={`card-body ${shortForm ? 'short_form_card_body' : ''
                                }`}
                        >
                            <div className="container">
                                <form
                                    id="contact-form"
                                    role="form"
                                    onSubmit={handleSubmit}
                                >
                                    <div className="controls">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group InputBox">
                                                    <div className="input-group">
                                                        <input
                                                            id="form_name"
                                                            type="text"
                                                            name="name"
                                                            className="form-control"
                                                            value={
                                                                formDataState.name
                                                            }
                                                            placeholder={
                                                                fullName.placeholder
                                                            }
                                                            onChange={
                                                                handleInputChange
                                                            }
                                                        />
                                                        <div className="input-group-icon">
                                                            {inputIconName}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group InputBox">
                                                    <div className="input-group">
                                                        <input
                                                            id="form_phonenumber"
                                                            type="text"
                                                            name="phonenumber"
                                                            className="form-control"
                                                            value={
                                                                formDataState.phonenumber
                                                            }
                                                            placeholder={
                                                                phoneNumber.placeholder
                                                            }
                                                            required
                                                            onChange={
                                                                handleInputChange
                                                            }
                                                        />
                                                        <div className="input-group-icon">
                                                            {inputIconPhoneNumber}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {!shortForm && (
                                            <>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group InputBox">
                                                            <div className="input-group">
                                                                <input
                                                                    id="form_email"
                                                                    type="email"
                                                                    name="email"
                                                                    className="form-control"
                                                                    value={
                                                                        formDataState.email
                                                                    }
                                                                    placeholder={
                                                                        email.placeholder
                                                                    }
                                                                    onChange={
                                                                        handleInputChange
                                                                    }
                                                                />
                                                                <div className="input-group-icon">
                                                                    {inputIconEmail}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className="row">
                                                    <div className="col-md-12">
                                                        <div className="form-group">
                                                            <label htmlFor="form_message">
                                                                {message.title}
                                                            </label>
                                                            <textarea
                                                                id="form_message"
                                                                name="message"
                                                                className="form-control"
                                                                placeholder={
                                                                    message.placeholder
                                                                }
                                                                value={
                                                                    formDataState.message
                                                                }
                                                                rows="4"
                                                                onChange={
                                                                    handleInputChange
                                                                }
                                                            ></textarea>
                                                        </div>
                                                    </div>
                                                </div> */}
                                            </>
                                        )}
                                        <div className="col-md-12 pt-3">
                                            <button
                                                className="btn btn-success btn-send pt-2 btn-block"
                                                type="submit"
                                                disabled={isSubmitDisabled() || loading}
                                            >
                                                {loading ? 'שולח...' : 'שלח'}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Form;
