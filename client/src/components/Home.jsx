import './Home.css'


function Home() {
    return (
        <>
            <div className='one'>
                <h1>For Women, By Women...</h1>
            </div>
            <div className='rows'>
                <div className='row1'>
                    <div className='col1'>
                        <img src="./images/image1.jpeg" />
                    </div>
                    <div className='col2'>
                        <h1>Our mission</h1>
                        <p>our mission is to empower and support women who have been released from prison to successfully reintegrate into society</p>
                        <button>Read More</button>
                    </div>
                </div>
                <div className='row2'>
                    <div className='col1'>
                        <h1>Our story</h1>
                        <p>[Website Name] was founded with a deep passion for social justice and a desire to address the unique challenges that women face upon re-entry into society after incarceration.</p>
                        <button>read more</button>
                    </div>
                    <div className='col2'>
                        image1
                    </div>
                </div>
                <div className='row3'>
                    <div className='col1'>
                        <p>Be part of the good change, and sign up/ vulunteer</p>
                        <button>Read more</button>
                    </div>
                    <div className='col2'>
                        image3
                    </div>
                </div>
            </div>
            <div className="about">
                <p>About</p>
            </div>
        </>
    )
}

export default Home;