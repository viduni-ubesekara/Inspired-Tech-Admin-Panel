const router= require( 'express').Router();
let order=require('../models/order')

router.route('/add').post((req, res)=>{

    const oid =req.body.oid; 
    const supplier =req.body.supplier;
    const date = req.body.date;
    const bname = req.body.bname;
    const quantity = req.body.quantity ;

    const newOrder=new order({

        oid,
        supplier,
        date,
        bname,
        quantity
    })

    newOrder.save()
     .then(()=>{
         res.json("order submitted")
     }).catch((err)=> {res.status(400).send("unable to submit order")})
})

router.route("/").get((req, res) => {

   order.find().then((orders)=>{
    res.json(orders)

   }).catch((err)=>{
       console.log(err)
   })
})



router.route("/update/:oid").put(async(req,res)=>{

    let orderId=req.params.oid;
    const{oid,supplier,date,bname,quantity}=req.body;

    const updateOrder={
        oid,
        supplier,
        date,
        bname,
        quantity
    }
    const update=await order.findOneAndUpdate({ oid: orderId }, updateOrder, { new: true });
    if(!update){
        return res.status(404).send('No order found')
    }else{

        return res.status(200).send({status:"order updated"});
    }
})


router.route("/delete/:oid").delete(async(req,res)=>{

   try{
    let orderId=req.params.oid;
    const deleteorder = await order.findOneAndDelete({oid:orderId});

    if (deleteorder) {
        res.status(200).send({ status: 'Deleted' });
        
    } else {
        res.status(404).send({ status: "Supplier not found" });
    }}
  catch (err) {
    res.status(500).send({ status: "Error in deleting" });
    console.log(err);
 }
})

// delete all
router.route('/delete'). delete(async(req, res) => {
    try {
        await order.deleteMany({}); // Delete all documents in the Order collection
        res.status(200).send({ status: 'All orders deleted' });
        console.log(res);
    } catch (err) {
        res.status(500).send({ status: 'Error in deleting' });
        console.error(err);
    }
});


router.route("/get/:oid").get(async(req,res)=>{
    let orderId = req.params.oid; // Corrected variable name
    try {
        const foundOrder = await order.findOne({ oid: orderId });

        if (!foundOrder) {
            return res.status(404).send({ status: 'Order not found' });
        }

        return res.status(200).send({ status: 'Order fetched', order: foundOrder });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ status: "Error in fetch", error: error.message });
    }
});
module.exports=router;
