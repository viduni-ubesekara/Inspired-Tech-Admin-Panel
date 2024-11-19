import React, { useEffect, useState } from 'react'
import { Container, Input } from '@chakra-ui/react'

// Components
import ItemDetailsDisplay from '../Components/ItemDetailsDisplay'
import SlideBar from '../Components/SlideBar'


function Home() {
  // States
  const [items, setItems] = useState(null)
  const [query, setQuery] = useState('')

  // fetch items data from server
  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch('/inventoryPanel')
      const json = await response.json()

      if(response.ok) {
        setItems(json)
      }
    }
    fetchItems()
  }, [])

  return (
    <>
      <SlideBar />
      <Container>
        <Input
          placeholder='Search Items' 
          marginTop='24px' 
          marginBottom='36px'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        
        <div className="itemsDetailsSection">
          {items && items.filter((item) => {
            if(query === '') {
              return item
            }else if(item.itemName.toLowerCase().includes(query.toLowerCase())) {
              return item
            }
          }).map((item) => (
            <ItemDetailsDisplay key={item.itemID} item={item} /> //ItemDetailsDisplay component
          ))}
        </div>
      </Container>
    </>
  )
}

export default Home