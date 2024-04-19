import React, { useState } from 'react';
import axios from 'axios'; // Import Axios
import Styles from './Home.module.css';
import upload_area from "../../Components/assets/upload_area.svg"


const Home = () => {

  const [image,setImage] =React.useState(null)

  const [err, setErr] = React.useState("")
  
  const [formDetails, setformDetails] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    courses: [],
    image: ''
  });


  const imageHandler = (e) => {
    const selectedImage = e.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png'];
  
    
    if (selectedImage && allowedTypes.includes(selectedImage.type)) {
      setImage(selectedImage);
      setformDetails(prevData => ({
        ...prevData,
        image: selectedImage
      }));
      setErr("");
    } else {
      setErr("Please select a valid image file (JPG or PNG)");
    }
  };
  
  


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setformDetails(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ?
        checked ? [...prevData[name], value] : prevData[name].filter(course => course !== value) :
        value
    }));
    setErr(false)
  };


  const isEmailValid = (email) => {
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
 
  const email = "example@example.com";
  if (isEmailValid(email)) {
    console.log("Email is valid");
  } else {
    console.log("Email is invalid");
  }

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!formDetails.email || !isEmailValid(formDetails.email))
    {
      setErr("Please enter a valid email address")
      return
    }

    if(!formDetails.name)
    {
      setErr("Name is required")
      return
    }

    if(!formDetails.mobile || formDetails.mobile.length < 10 || 
      formDetails.mobile.length > 10)
    {
      setErr("Mobile number must be 10 digits")
      return
    }

    if(!formDetails.designation)
    {
      setErr("Designation is required")
      return
    }

    if(!formDetails.gender)
    {
      setErr("Gender is required")
      return
    }

    if(!formDetails.courses || formDetails.courses.length === 0) {
      setErr("Courses are required");
      return;
    }

    if(!image)
    {
      setErr("Image is required")
      return
    }

   

    try {

      const formData = new FormData()
      formData.append('product', image)

      const imageResponse = await axios.post('http://localhost:4005/upload', formData, {
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      })

      const response = await axios.post('http://localhost:4005/emp', {
        ...formDetails,
        image: imageResponse.data.image_url
    })

      if(response.data.msg)
      {
        alert(response.data.msg)
      }

      else if(response.data.success) 
      {
        alert('Form submitted successfully');
      }

      else
      {
        alert("error occurred submitting form")
      }
      

    } 
    
    catch (error) 
    {
      console.error('Error:', error);
      alert('Failed to submit form');
    }
  };

  return (
    <form className={Styles.container} onSubmit={handleSubmit}>
      <p className={Styles.create}>Create Employee</p>
      <div className={Styles.content}>

        <div className={Styles.input}>
          <p>Name</p>
          <input type='text' name='name' 
          value={formDetails.name} 
          onChange={handleChange} />
        </div>

        <div className={Styles.input}>
          <p>Email</p>
          <input type='text' name='email' 
          value={formDetails.email} 
          onChange={handleChange} />       
        </div>

        

        <div className={Styles.input}>
          <p>Mobile No</p>
          <input type='text' name='mobile' 
          value={formDetails.mobile} 
          onChange={handleChange} />
        </div>

        <div className={Styles.input}>
          <p>Designation</p>

          <select className={Styles.select} name='designation' 
          value={formDetails.designation} 
          onChange={handleChange}>
            <option>--Select--</option>
            <option value='HR'>HR</option>
            <option value='Manager'>Manager</option>
            <option value='Sales'>Sales</option>
          </select>

        </div>

        <div className={Styles.radio}>
          <p>Gender</p>
          <div className={Styles.gender}>

          <div className={Styles.male}>
            <input type='radio' id='male' name='gender' 
            value='male' checked={formDetails.gender === 'male'} 
            onChange={handleChange} />
            <label htmlFor='male'>Male</label>
          </div>
          
          <div className={Styles.female}>
            <input type='radio' name='gender' 
            id='female' value='female' 
            checked={formDetails.gender === 'female'} 
            onChange={handleChange} />
            <label htmlFor='female'>Female</label>
            </div>
          </div>
        </div>

        <div className={Styles.checkbox}>
          <p>Course</p>
          
          <div className={Styles.checkboxes}>
            
            <div>
              <input type='checkbox' id='mba' name='courses' 
              value='MBA' onChange={handleChange} />
              <label htmlFor='mba'>MBA</label>
            </div>

            <div>
              <input type='checkbox' id='bca' name='courses' 
              value='BCA' onChange={handleChange} />
              <label htmlFor='bca'>BCA</label>
            </div>

            <div>
              <input type='checkbox' id='bsc' name='courses' 
              value='BSC' onChange={handleChange} />
              <label htmlFor='bsc'>BSC</label>
            </div>

          </div>

        </div>

        <div className={Styles.input}>
          <p>Img Upload</p>
          
          <label htmlFor='file-input'> 
              <img width="100px"
                src={image ? URL.createObjectURL(image) : 
                upload_area} alt='' />
          </label>

      <input hidden type='file' 
              name='image' id='file-input' 
              onChange={imageHandler}
              />
        </div>

        {err && <p className={Styles.err}>{err}</p>}

        <button className={Styles.submit} type='submit'>Submit</button>
      
      </div>
    </form>
  );
};

export default Home;
