const express = require ("express");
const Stripe = require ("stripe");
const bodyParser = require("body-parser");
const cors = require("cors");
const { error } = require("console");
const mongoose = require("mongoose");
const Ticket = require("./Ticket");
const Seat = require("./Seat");
const { sendReceiptEmail} = require( "./emailService");
require('dotenv').config();

const app = express();
const stripe = Stripe(process.env.secret_key);

app.use(bodyParser.json());
app.use(cors());

const mongoURL  = "mongodb+srv://abishaghimire2000:Aroma12345$$@cluster0.lm03s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect (mongoURL,{
}).then (()=> console.log("Connected to MongoDB"))
.catch(err => console.error("Could not connect to MongoDB", err));

//Payment Route
app.post("/create-payment-intent", async(req, res) =>{
    const { amount } = req.body;

    if (!amount)
    {
        return res.status(400).send({error: 'Please select at least one seat.'});
    }
    console.log("our")
    try{
        console.log("1")
        //create a payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: "usd",
            payment_method_types: ["card"]
        });
        res.send({clientSecret: paymentIntent.client_secret});
        console.log("2",{clientSecret})
    }catch(err)
    {
        console.error(err);
        res.status(500).json({error: err.message});
    }
});

//Book a seat
app.post("/book-seat", async(req, res) =>{
    const {seats, name, amount } = req.body;

    try{
        const bookedSeats =[];
        for (const seatNumber of seats){
            const existingSeat= await Seat.findOne({seatNumber});
            if(existingSeat && existingSeat.isBooked){
                return res.status(400).json({messagae: "Seat ${seatNumber} is already booked"})
            }
            //Create and save the new seat
            const newSeat = new Seat({
                seatNumber,
                isBooked: true,
                bookedBy: name,
            });
            await newSeat.save();
            bookedSeats.push(seatNumber);

            //Create and save the corresponding ticket
            const newTicket = new Ticket({
                seatNumber, 
                bookedBy: name,
                isBooked: true,
                bookingDate: new Date()
            });
            await newTicket.save()
        }
        res.json({ message: "Seats booked successfully", bookedSeats });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

});

// Retrieve booked seats
app.get('/booked-seats', async (req, res) => {
    const bookedSeats = await Seat.find({ isBooked: true });
    res.json(bookedSeats);
});


// Email sending endpoint
app.post('/send-receipt', async (req, res) => {
    const { to, seatNumber, amount } = req.body;

    try {
        await sendReceiptEmail(to, seatNumber, amount);
        res.status(200).json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ error: 'Failed to send email.' });
    }
});


// Serve static files (like CSS and JS) from the root directory
app.use(express.static(__dirname));

// Default route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


