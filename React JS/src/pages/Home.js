import React from 'react'

const Home = () => {
  return (
    <div  className='fullWidth'>
      <img style={{opacity:0.8}} className='w-100' src={require('../assets/woodworking.jpg')} />
      <div>
        <h1 className='m-5'>Welcome to our workshop!</h1><br/>
        <h3 className='m-5'>Woodworking is more than just drilling wood for us. It is something we do with passion, love, and care.
           It is what defines us and gives us joy. We take pride in being able to make almost anything. As long as you 
           can imagine it we can make it!
        </h3>
        <div className='w-100 info-post mb-5'>
          <img className='w-50' src={require('../assets/info-post.jpg')} />
          <div className='p-5'>
            <h1 className='m-3 mb-5'> Our workshops story</h1>
            <h5> Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</h5>
            <button className='btn btn-outline-primary login-btn px-4 w-25 mt-5'>Log In</button>


          </div>
        </div>
      </div>
            
    </div>
  )
}

export default Home