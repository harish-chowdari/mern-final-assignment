import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import Styles from './EditEmp.module.css';
import upload_area from "../../Components/assets/upload_area.svg";
import { useParams } from 'react-router-dom';

const EditEmp = () => {
  const { id } = useParams();
  const [image, setImage] = useState(null);
  const [err, setErr] = useState("");
  const [formDetails, setFormDetails] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    courses: [],
    image: ''
  });

  const [empData, setEmpData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4005/empdetails/${id}`);
        const empData = response.data;
        
        
        const coursesData = ['MBA', 'BCA', 'BSC'].filter(course => empData.courses.includes(course));
        setEmpData(empData); 
        setFormDetails({
          name: empData.name,
          email: empData.email,
          mobile: empData.mobile,
          designation: empData.designation,
          gender: empData.gender,
          courses: coursesData,
          image: empData.image
        });
        setErr(""); 
      } catch (error) {
        console.error('Error fetching employee details:', error);
        setErr("Error fetching employee details. Please try again."); 
      }
    };
    fetchData();
  }, [id]);
  
  

  


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formDetails.email) {
      setErr("Email is required");
      return;
    }
  
    if (!formDetails.name) {
      setErr("Name is required");
      return;
    }
  
    if (!formDetails.mobile || formDetails.mobile.length < 9 || formDetails.mobile.length > 10) {
      setErr("Mobile number must be 10 digits");
      return;
    }
  
    if (!formDetails.designation) {
      setErr("Designation is required");
      return;
    }
  
    if (!formDetails.gender) {
      setErr("Gender is required");
      return;
    }
  
    if (!formDetails.courses || formDetails.courses.length === 0) {
      setErr("Courses are required");
      return;
    }
  
    try {
      let imageResponse;
      if (image) {
        const formData = new FormData();
        formData.append('product', image);
        imageResponse = await axios.post('http://localhost:4005/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }
  
      const response = await axios.put(`http://localhost:4005/update/${id}`, {
        ...formDetails,
        image: imageResponse ? imageResponse.data.image_url : formDetails.image // Use uploaded image URL if available, otherwise use existing image URL
      });
  
      console.log(response.data);
      alert("Form submitted Successfully");
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // Handle 404 error (Not Found)
        console.error('Error updating employee: Employee not found');
        alert("Error updating employee: Employee not found");
      } else {
        console.error('Error updating employee:', error);
        alert("Error updating employee. Please try again.");
      }
    }
  };
  
  
  



  const imageHandler = (e) => {
    const selectedImage = e.target.files[0];
    const allowedTypes = ['image/jpeg', 'image/png'];
    
    if (selectedImage && allowedTypes.includes(selectedImage.type)) {
      setImage(selectedImage);
      setFormDetails(prevData => ({
        ...prevData,
        image: selectedImage
      }));
      setEmpData(prevEmpData => ({
        ...prevEmpData,
        image: URL.createObjectURL(selectedImage) // Update empData.image with selected image URL
      }));
      setErr("");
    } else {
      setErr("Please select a valid image file (JPG or PNG)");
    }
  };
  
  
  
  
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormDetails(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ?
        checked ? [...prevData[name], value] : prevData[name].filter(course => course !== value) :
        value
    }));
    setErr(false);
  };
  
      

  

  return (
    <form className={Styles.container} onSubmit={handleSubmit}>
      <p className={Styles.create}>Edit Employee</p>
      <div className={Styles.content}>
        <div className={Styles.input}>
          <p>Name</p>
          <input 
            type='text' 
            name='name' 
            value={formDetails.name} 
            onChange={handleChange} 
          />
        </div>

        <div className={Styles.input}>
          <p>Email</p>
          <input 
            type='text' 
            name='email' 
            value={formDetails.email} 
            onChange={handleChange} 
          />       
        </div>

        <div className={Styles.input}>
          <p>Mobile No</p>
          <input 
            type='text' 
            name='mobile' 
            value={formDetails.mobile} 
            onChange={handleChange} 
          />
        </div>

        <div className={Styles.input}>
          <p>Designation</p>
          <select 
            className={Styles.select} 
            name='designation' 
            value={formDetails.designation} 
            onChange={handleChange}
          >
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
              <input 
                type='radio' 
                id='male' 
                name='gender' 
                value='male' 
                checked={formDetails.gender === 'male'} 
                onChange={handleChange} 
              />
              <label htmlFor='male'>Male</label>
            </div>
          
            <div className={Styles.female}>
              <input 
                type='radio' 
                name='gender' 
                id='female' 
                value='female' 
                checked={formDetails.gender === 'female'} 
                onChange={handleChange} 
              />
              <label htmlFor='female'>Female</label>
            </div>
          </div>
        </div>

        <div className={Styles.checkbox}>
          <p>Course</p>
          <div className={Styles.checkboxes}>
            <div>
              <input 
                type='checkbox' 
                id='mba' 
                name='courses' 
                value='MBA' 
                onChange={handleChange} 
                checked={formDetails.courses.includes('MBA')}
              />
              <label htmlFor='mba'>MBA</label>
            </div>
            <div>
              <input 
                type='checkbox' 
                id='bca' 
                name='courses' 
                value='BCA' 
                onChange={handleChange} 
                checked={formDetails.courses.includes('BCA')}
              />
              <label htmlFor='bca'>BCA</label>
            </div>
            <div>
              <input 
                type='checkbox' 
                id='bsc' 
                name='courses' 
                value='BSC' 
                onChange={handleChange} 
                checked={formDetails.courses.includes('BSC')}
              />
              <label htmlFor='bsc'>BSC</label>
            </div>
          </div>
        </div>

        <div className={Styles.input}>
          <p>Img Upload</p>
          <label htmlFor='file-input'>
              <img width="100px"
                src={empData.image ? empData.image : upload_area} alt='' />
          </label>
          

      <input hidden
              type='file' 
              name='image' id='file-input' 
              onChange={imageHandler} />
        </div>

        {err && <p className={Styles.err}>{err}</p>}

        <button className={Styles.submit} 
        onClick={handleSubmit}
        
        type='submit'>Update</button>
      </div>
    </form>
  );
};

export default EditEmp;
