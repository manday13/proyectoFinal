import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import {useEffect, useState} from "react";
import "./ButtonUp.css"

function ButtonUp (){
    const [backToTopButton, setBackToTopButton] = useState(false);

    useEffect(()=>{
        window.addEventListener("scroll", ()=>{
            if(window.scrollY > 200){
                setBackToTopButton(true)
            }else{
                setBackToTopButton(false)
            }
        })
    }, []) 

    const scrollUp = () => {
        window.scrollTo({
            top:0,
            behavior: "smooth"
        })
    }

    return(
        <> 
        {backToTopButton && (<button className="buttonup" onClick={scrollUp}><FontAwesomeIcon icon={faArrowUp} /></button>)}
        </>


    )
}

export default ButtonUp;