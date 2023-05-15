import React from 'react';
import "./Team.css";
import Avatar from 'react-avatar';


export default function Team() {
    return (
        <>
            <div>
                <h1 className='titleaboutTT'>Get to know us!</h1>
            </div>
            <div className='personbody'>
                <div className='personcard1'>
                    <Avatar className='pictureindiv' src="../public/penguin.jfif" square={true} size="397" />
                    <h1 className='personame'>Adria Manday</h1>
                    <p>very passionate, please hire</p>
                </div>
                <div className='personcard2'>
                    <Avatar className='pictureindiv' src="../public/julia.jpeg" square={true} size="397" />
                    <h1 className='personame'>Julia Villalba</h1>
                    <p>very passionate, please hire</p>
                </div>
                <div className='personcard3'>
                    <Avatar className='pictureindiv' src="../public/hamster.jpeg" square={true} size="397" />
                    <h1 className='personame'>Oumaima Essamadi</h1>
                    <p>very passionate, please hire</p>
                </div>
            </div>
        </>
    )
}
