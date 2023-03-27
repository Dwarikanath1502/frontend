import React from 'react'
import { API } from '../backend';
import '../styles.css'
import Base from './Base';


const Home = () => {
  console.log("API IS: ", API);
  return (
    <Base title="Homepage" description='Welcome to the Rockx T-shirt store'>
      {/* <h1 className='text-white'>Hello front end</h1> */}
      <div className="row">
        <div className="col-4">
          <button className="btn btn-success">TEST</button>
        </div>
        <div className="col-4">
          <button className="btn btn-success">TEST</button>

        </div>
        <div className="col-4">
          <button className="btn btn-success">TEST</button>

        </div>

      </div>
    </Base>
  )
}

export default Home
