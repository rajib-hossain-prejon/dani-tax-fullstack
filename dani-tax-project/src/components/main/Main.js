
import React, { useRef } from 'react'
import "./Main.css"
import texts from "../../components/data/texts.json"
import Search from '../search/Search'
import Card from '../card/Card'
import Form from '../form/Form'
import mainImg from "../assets/main.png"

const Main = () => {
    const formRef = useRef(null);
    const { mainHeader, placeHolder, cardsData, badgeData, formData, stopData } = texts

    const scrollToForm = () => {
        if (formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    };


    const renderBadge = (badge, index) => {
        const textAlign = index % 2 === 0 ? 'text-start' : 'text-end';
        const bgColor = badgeData.bgColor[index]

        return (
            <div className={`badge-container col-6 pt-2 ${textAlign}`} key={index}>
                <span className="badge" style={{ backgroundColor: bgColor }}>
                    {badge}
                </span>
            </div>
        );
    };

    return (
        <div className='main_wrapper container-fluid d-flex'>
            <div className='container-fluid'>
                <div className='row text-center'>
                    <div className='col main_header'>
                        <h3>שכירים?</h3>
                        <h3>{mainHeader}</h3>
                    </div>
                </div>
                <div className='row text-center pb-2'>
                    <div className='col'>
                        <Search placeHolder={placeHolder} />
                    </div>
                </div>
                <div className='row pb-4'>
                    <div className='col'>
                        <Form formData={formData} formRef={formRef} />
                    </div>
                </div>
                <div className='row pb-'>
                    <div className='col-md-12 main_img_container'>
                        <img className='main_img' src={mainImg} alt={"logo"} />
                    </div>
                </div>
                {/* <div className='row' style={{ width: "100%" }}>
                    {badgeData.text.map(renderBadge)}
                </div>

                <div className='row text-center pt-2'>
                    <div className='col'>
                        <Form formData={formData} formRef={formRef} shortForm={true} />
                    </div>
                </div> */}
                <div className='row  text-center pt-3'>
                    {cardsData.title.map((val, index) => (
                        <div className='col-md-6 col-12 pb-3' key={index}>
                            <Card title={val} text={cardsData.text[index]} scrollToForm={scrollToForm} />
                        </div>
                    ))}
                </div>

            </div>

        </div>
    )
}

export default Main
