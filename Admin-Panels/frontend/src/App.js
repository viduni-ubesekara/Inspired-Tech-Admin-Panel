import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";



// Admin Panel
import AdminPanel from "./adminPanel/AdminPanel";
// Inventory Panel
import Home from "./inventoryControl/pages/Home";
import AddItems from "./inventoryControl/pages/AddItems";
import UpdateItemPage from "./inventoryControl/pages/UpdateItemPage";
import Shop from "./inventoryControl/pages/shop";
import ItemDetailPage from "./inventoryControl/pages/ItemDetailPage";
import Cart from "./inventoryControl/pages/Cart";
import Checkout from "./inventoryControl/pages/Checkout";
import Payment from "./inventoryControl/pages/Payment";

// Supplier Panel
import AddSup from "./supplierPanel/components/AddSupp";
import AllSuppliers from "./supplierPanel/components/AllSup";
import UpdateSupplier from "./supplierPanel/components/UpdateSupplier";
import AddOrder from "./supplierPanel/components/AddOrder";
import AllOrders from "./supplierPanel/components/AllOrders";
import UpdateOrder from "./supplierPanel/components/UpdateOrder";
// Feedback Panel
import FeedBack from "./feedbackPanel/pages/Feedback";
import AdminTableFeedback from "./feedbackPanel/pages/AdminTableFeedback";
import AskQuestion from "./feedbackPanel/pages/Question";
import UserTable from "./feedbackPanel/pages/UserTable";
// Marketing Panel
import Promotion from "./marketingPanel/pages/Promotion";
import PromotionTable from "./marketingPanel/pages/PromotionTable";
import Promotionview from "./marketingPanel/pages/PromotionView";
import Promotionmain from "./marketingPanel/pages/main";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>

     

      <Route path="/" element={<AdminPanel />} />

      <Route path="/inventoryPanel" element={<Home />} />
      <Route path="/inventoryPanel/addItems" element={<AddItems />} />
      <Route path="/inventoryPanel/item/:id" element={<UpdateItemPage />} />
      <Route path="/inventoryPanel/shop" element={<Shop />} />
      <Route path="/item/:itemID" element={<ItemDetailPage />} />
      <Route path="/cart" element={<Cart />} /> {/* Normal navigation to Cart page */}
      <Route path="/checkout" element={<Checkout />} /> {/* Normal navigation to Checkout page */}
      <Route path="/checkout/:cart" element={<Checkout />} /> {/* Programmatic navigation to Checkout page */}
      <Route path="/payment" element={<Payment />} />

      <Route path="/supplierPanel" element={<AllSuppliers />} />
      <Route path="/supplierPanel/add" element={<AddSup />} />
      <Route path="/supplierPanel/update/:nic" element={<UpdateSupplier />} />
      <Route path="/supplierPanel/updat/:oid" element={<UpdateOrder />} />
      <Route path="/supplierPanel/addOrder" element={<AddOrder />} />
      <Route path="/supplierPanel/allOrders" element={<AllOrders />} />

      <Route path="/feedbackPanel" element={<FeedBack />} />
      <Route path="/feedbackPanel/feedbackTable" element={<AdminTableFeedback />} />
      <Route path="/feedbackPanel/askQuestion" element={<AskQuestion />} />
      <Route path="/feedbackPanel/userTable" element={<UserTable />} />

      <Route path="/marketingPanel" element={<Promotionmain />} />
      <Route path="/marketingPanel/promotionmain" element={<Promotion />} />
      <Route path="/marketingPanel/promotionTable" element={<PromotionTable />} />
      <Route path="/marketingPanel/promotionview" element={<Promotionview />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

