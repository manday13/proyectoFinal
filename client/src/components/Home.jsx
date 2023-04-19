import './Home.css'
import 'bootstrap/dist/css/bootstrap.min.css';


function Home() {
    return (
        <>
            <div className='one'>
                <h1>For Women, By Women...</h1>
            </div>
            <div className='rows'>
                <div className='row1'>
                    <div className='col1'>
                        <img src="../public/image1.jpeg" />
                    </div>
                    <div className='col2'>
                        <h1>Our mission</h1>
                        <p>our mission is to empower and support women who have been released from prison to successfully reintegrate into society</p>
                        <button className='homebutton'><a href="/about/Mission">Read more</a></button>
                    </div>
                </div>
                <div className='row2'>
                    <div className='col1'>
                        <h1>Our story</h1>
                        <p>[Website Name] was founded with a deep passion for social justice and a desire to address the unique challenges that women face upon re-entry into society after incarceration.</p>
                        <button className='homebutton'><a href="/about/Story">Read more</a></button>
                    </div>
                    <div className='col2'>
                        <img src="../public/image2.jpg" />
                    </div>
                </div>
                <div className='row3'>
                    <div className='col1'>
                        <img src="../public/image3.jpeg" />
                    </div>
                    <div className='col2'>
                        <h1>Join Us </h1>
                        <p>Be part of the good change, and sign up/ volunteer</p>
                        <button className='homebutton'><a href="/Register">Read more</a></button>
                    </div>
                </div>
            </div>
            <div className="about">
                <h1>Discover Our Badges</h1>
                <p>About</p>
                <div className='homebuttondiv'>
                    <button className='homebutton'><a href="/about/Badges">Read more</a></button>
                </div>
            </div>
        </>
    )
}

export default Home;