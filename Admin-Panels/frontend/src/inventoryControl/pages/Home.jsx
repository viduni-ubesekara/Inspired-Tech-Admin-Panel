import React, { useEffect, useState } from 'react';
import { Container, Input, Button, Alert, AlertIcon } from '@chakra-ui/react';
import ItemDetailsDisplay from '../Components/ItemDetailsDisplay';
import SlideBar from '../Components/SlideBar';

function Home() {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('');
  const [lowStockItems, setLowStockItems] = useState([]);
  const [showLowStock, setShowLowStock] = useState(false); // State to track whether to show low stock items or all items
  
  const lowStockThreshold = 5; // Define the low stock threshold

  useEffect(() => {
    const fetchItems = async () => {
      const response = await fetch('/inventoryPanel');
      const json = await response.json();

      if (response.ok) {
        setItems(json);
        checkLowStock(json);
      }
    };
    fetchItems();
  }, []);

  const checkLowStock = (items) => {
    const lowStock = items.filter(item => item.stockCount < lowStockThreshold);
    setLowStockItems(lowStock);
  };

  const filteredItems = items.filter((item) =>
    query === '' || item.itemName.toLowerCase().includes(query.toLowerCase())
  );

  // Generate report for the low-stock items
  const generateLowStockReport = () => {
    const csvContent = [
      ['Item ID', 'Item Name', 'Brand', 'Price', 'Stock Count', 'Added Date'],
      ...lowStockItems.map((item) => [item.itemID, item.itemName, item.itemBrand, item.itemPrice, item.stockCount, item.createdAt])
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'low_stock_inventory_report.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Generate report for all fetched items
  const generateAllItemsReport = () => {
    const csvContent = [
      ['Item ID', 'Item Name', 'Brand', 'Price', 'Stock Count', 'Added Date'],
      ...filteredItems.map((item) => [item.itemID, item.itemName, item.itemBrand, item.itemPrice, item.stockCount, item.createdAt])
    ]
      .map((row) => row.join(','))
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'full_inventory_report.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <>
      <SlideBar />
      <Container>
        {/* Low Stock Reminder Alert */}
        {lowStockItems.length > 0 && (
          <Alert status="warning" mb="16px">
            <AlertIcon />
            You have {lowStockItems.length} item(s) with low stock.{' '}
            <Button 
              colorScheme="blue" 
              size="sm" 
              onClick={() => setShowLowStock(true)}
              ml="10px"
            >
              Check them out!
            </Button>
          </Alert>
        )}

        <Input
          placeholder="Search Items"
          marginTop="24px"
          marginBottom="16px"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* Generate Report Button for Low Stock Items */}
        {showLowStock && (
          <Button onClick={generateLowStockReport} colorScheme="blue" mb="24px">
            Generate Low Stock Report
          </Button>
        )}

        {/* Generate Report Button for All Items */}
        {!showLowStock && (
          <Button onClick={generateAllItemsReport} colorScheme="blue" mb="24px">
            Generate Full Report
          </Button>
        )}

        <div className="itemsDetailsSection">
          {/* Conditional rendering based on showLowStock state */}
          {(showLowStock ? lowStockItems : filteredItems).map((item) => (
            <div 
              key={item.itemID} 
              style={{ 
                border: item.stockCount < lowStockThreshold ? '2px solid red' : 'none', 
                padding: '10px', 
                borderRadius: '5px', 
                marginBottom: '10px'
              }}
            >
              <ItemDetailsDisplay item={item} />
              {item.stockCount < lowStockThreshold && (
                <span style={{ color: 'red', fontWeight: 'bold' }}>Low Stock!</span>
              )}
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}

export default Home;
