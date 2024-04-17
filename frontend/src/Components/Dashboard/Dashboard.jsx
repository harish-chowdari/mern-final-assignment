import React from 'react'
import Styles from "./Dashboard.module.css"



const Dashboard = () => {
  return (
    <div className={Styles.container}>
        <p className={Styles.dashboard}>Dashboard</p>
        <p className={Styles.welcome}>Welcome admin panel</p>
    </div>
  )
}

export default Dashboard