import React from 'react'
import { Link, useLocation } from 'react-router-dom'

function SlideBar() {
  const location = useLocation()

  return (
    <div className='slide-bar-container'>
        <h1 className='in-panel-slide-name'><strong>Inventory Control<br />Panel</strong></h1>
        <div className={`in-panel-slide-btn ${location.pathname === '/inventoryPanel' ? 'in-panel-slide-btn-active' : 'in-panel-slide-btn'}`}>
            <Link to='/inventoryPanel' className={location.pathname === '/inventoryPanel' ? 'inventory-panel-home-link-active' : ''}>Home</Link>
        </div>
        <div className={`in-panel-slide-btn ${location.pathname === '/inventoryPanel/addItems' ? 'in-panel-slide-btn-active' : 'in-panel-slide-btn'}`}>
            <Link to='/inventoryPanel/addItems' className={location.pathname === '/inventoryPanel/addItems' ? 'inventory-panel-add-item-link-active' : ''}>Add Items</Link>
        </div>
        <div className='in-panel-slide-btn'>
            <Link to='/AdminPanel' className='inventory-panel-admin-panel-link'>Admin Panel</Link>
        </div>
    </div>
  )
}

export default SlideBar