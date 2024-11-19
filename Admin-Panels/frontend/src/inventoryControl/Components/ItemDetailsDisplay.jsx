import React from 'react'
import { Box, Button, Heading, Text, Image, Stack } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

function itemDetailsDisplay({ item }) {

  // delete an item from the list and database
  const handleDelete = () => {
    if(window.confirm('Are you sure you want to delete this item?')) {
      fetch('/inventoryPanel/' + item.itemID, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
     .then(res => res.json())
     .then(data => {
          console.log(data)
          window.location.reload() // reload the page after deleting the item (but this not recommended!)
      })
    }
  }

  return (
    <div className="itemDetailsBox">
        <Box maxWidth='680px' marginBottom='30px'>
          <Stack direction='row'>
            <div className='img-box'>
              <Image 
                src={`${item.imgURL}`}
                boxSize='200px'
                objectFit='cover'
              />
            </div>

            <div className='item-detail-box'>
              <Heading size='sm'>Item ID : {item.itemID}</Heading>
              <Text fontSize='md'>Name : {item.itemName}</Text>
              <Text fontSize='md'>Brand : {item.itemBrand}</Text>
              <Text fontSize='md'>Price : Rs.{item.itemPrice}</Text>
              <Text fontSize='md'>Available Stocks : {item.stockCount}</Text>
              <Text fontSize='md'>Added Date : {item.createdAt}</Text>
              {/* <Text fontSize='md'>Last Updated Date : {item.updatedAt}</Text> */}
              
              <Link className='edit-btn' to={`/inventoryPanel/item/${item.itemID}`}>Edit</Link>
              <Button colorScheme='red' size='sm' marginTop='6px' onClick={handleDelete}>Remove</Button>
            </div>
          </Stack>
        </Box>
    </div>
  )
}

export default itemDetailsDisplay