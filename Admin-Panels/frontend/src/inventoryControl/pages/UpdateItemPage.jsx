import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// Components
import SlideBar from '../Components/SlideBar'
import ItemUpdateForm from '../Components/ItemUpdateForm'

function UpdateItemPage() {
  
  // Get the id parameter from the URL
  const { id } = useParams();

  // State
  const [value, setValue] = useState('')

  useEffect(() => {
    const fetchItemById = async () => {
      const response = await fetch(`/inventoryPanel/${id}`)
      if(!response.ok){
        console.log('error: ' + response.status)
      }
        
      const json = await response.json()

      if(response.ok){
        setValue(json)
      }
    } 
    fetchItemById()
  }, [id])

  return (
    <>
      <SlideBar />
      <ItemUpdateForm item={value} />
    </>
  )
}

export default UpdateItemPage