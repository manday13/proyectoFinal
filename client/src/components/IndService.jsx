import './IndService.css'
import { Link } from 'react-router-dom';

import Services from './Services';
function IndService() {
    return (
        <>
            <h1>Servicios</h1>
            <div>
{/*             <handleWorkshops name={myService.name} description={myService.description} date={myService.date} />
 */}            </div>
            <Link to="/Services">Volver a la página principal</Link>

        </>
    )
}

export default IndService;