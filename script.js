const seatsContainer = document.getElementById('seats-container');
const ticketCountDisplay = document.getElementById('ticket-count');
const totalAmountDisplay = document.getElementById('total-amount');
const bookNowButton = document.getElementById('book-now');
const baseURL = 'https://banquet-ticket-booking.onrender.com/';
//for testing
//const baseURL = "http://localhost:3000/"; 

let ticketPrice = 12; // Default price is for Performer ($10)
let selectedSeatsCount = 0;
let totalAmount = 0;
let finalCharge =0;

const seatingLayout = [
['A1', 'A2', 'A3', 'A4', '', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'A11', 'A12', 'A13', 'A14', '', 'A15', 'A16', 'A17', 'A18', 'A19', 'A20', 'A21'],
['B1', 'B2', 'B3', 'B4', 'B5', '', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11', 'B12', 'B13', 'B14', 'B15', 'B16', 'B17', 'B18', 'B19', 'B20', 'B21', '', 'B22', 'B23', 'B24', 'B25', 'B26', 'B27', 'B28', 'B29', 'B30', 'B31'],
['C1', 'C2', 'C3', 'C4', 'C5', '', 'C6', 'C7', 'C8', 'C9', 'C10', 'C11', 'C12', 'C13', 'C14', 'C15', 'C16', 'C17', 'C18', 'C19', 'C20', 'C21', '', 'C22', 'C23', 'C24', 'C25', 'C26', 'C27', 'C28', 'C29', 'C30', 'C31'],
['D1', 'D2', 'D3', 'D4', 'D5', '', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12', 'D13', 'D14', 'D15', 'D16', 'D17', 'D18', 'D19', 'D20', 'D21', '', 'D22', 'D23', 'D24', 'D25', 'D26', 'D27', 'D28', 'D29', 'D30', 'D31'],
['E1', 'E2', 'E3', 'E4', 'E5', '', 'E6', 'E7', 'E8', 'E9', 'E10', 'E11', 'E12', 'E13', 'E14', 'E15', 'E16', 'E17', 'E18', 'E19', 'E20', 'E21', '', 'E22', 'E23', 'E24', 'E25', 'E26', 'E27', 'E28', 'E29', 'E30', 'E31'],
['F1', 'F2', 'F3', 'F4', 'F5', '', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'F13', 'F14', 'F15', 'F16', 'F17', 'F18', 'F19', 'F20', 'F21', '', 'F22', 'F23', 'F24', 'F25', 'F26', 'F27', 'F28', 'F29', 'F30', 'F31'],
['G1', 'G2', 'G3', 'G4', 'G5', '', 'G6', 'G7', 'G8', 'G9', 'G10', 'G11', 'G12', 'G13', 'G14', 'G15', 'G16', 'G17', 'G18', 'G19', 'G20', 'G21', '', 'G22', 'G23', 'G24', 'G25', 'G26', 'G27', 'G28', 'G29', 'G30', 'G31'],
['H1', 'H2', 'H3', '', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'H11', 'H12', 'H13', 'H14', 'H15', 'H16', 'H17', 'H18', 'H19', '', 'H20', 'H21', 'H22', 'H23', 'H24', 'H25', 'H26', 'H27', 'H28', 'H29'],
['I1', 'I2', 'I3', '', 'I4', 'I5', 'I6', 'I7', 'I8', 'I9', 'I10', 'I11', 'I12', 'I13', 'I14', 'I15', 'I16', 'I17', 'I18', 'I19', '', 'I20', 'I21', 'I22', 'I23', 'I24', 'I25', 'I26', 'I27', 'I28', 'I29'],
['K1', 'K2', 'K3', 'K4', '', 'K5', 'K6', 'K7', 'K8', 'K9', '', 'K10', 'K11', 'K12', 'K13', 'K14', '', 'K15', 'K16', 'K17', 'K18', 'K19', 'K20', 'K21', 'K22', 'K23', 'K24'],
['L1', 'L2', 'L3', '', 'L4', 'L5', 'L6', 'L7', 'L8', '', 'L9', 'L10', 'L11', '', 'L12', 'L13', 'L14', 'L15', 'L16', 'L17', 'L18', 'L19', 'L20', 'L21'],
['M1', 'M2', '', 'M3', 'M4', 'M5', 'M6', 'M7', '', 'M8', 'M9', 'M10', '', 'M11', 'M12', 'M13', 'M14', 'M15', 'M16', 'M17', 'M18', 'M19'],
['N1', 'N2', '', 'N3', 'N4', 'N5', 'N6', '', 'N7', 'N8', 'N9', 'N10', 'N11', '', 'N12', 'N13', 'N14', 'N15', 'N16', 'N17', 'N18']
];

// Example of booked seats
const bookedSeats = ['A2', 'A3', 'A8', 'A9', 'A10', 'A11','A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 'A10', 'A11', 'A12', 'A13', 'A14', 'A15', 'A16', 'A17', 'A18', 'A19', 'A20', 'A21',
'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 'B10', 'B11', 'B12', 'B13', 'B14', 'B15', 'B16', 'B17', 'B18', 'B19', 'B20', 'B21', 'B22', 'B23', 'B24', 'B25', 'B26', 'B27', 'B28', 'B29', 'B30', 'B31',
'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'C11', 'C12', 'C13', 'C14', 'C15', 'C16', 'C17', 'C18', 'C19', 'C20', 'C21', 'C22', 'C23', 'C24', 'C25', 'C26', 'C27', 'C28', 'C29', 'C30', 'C31',
'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'D11', 'D12', 'D13', 'D14', 'D15', 'D16', 'D17', 'D18', 'D19', 'D20', 'D21', 'D22', 'D23', 'D24', 'D25', 'D26', 'D27', 'D28', 'D29', 'D30', 'D31',
'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 'E10', 'E11', 'E12', 'E13', 'E14', 'E15', 'E16', 'E17', 'E18', 'E19', 'E20', 'E21', 'E22', 'E23', 'E24', 'E25', 'E26', 'E27', 'E28', 'E29', 'E30', 'E31',
'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12', 'F13', 'F14', 'F15', 'F16', 'F17', 'F18', 'F19', 'F20', 'F21', 'F22', 'F23', 'F24', 'F25', 'F26', 'F27', 'F28', 'F29', 'F30', 'F31',
'G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 'G10', 'G11', 'G12', 'G13', 'G14', 'G15', 'G16', 'G17', 'G18', 'G19', 'G20', 'G21', 'G22', 'G23', 'G24', 'G25', 'G26', 'G27', 'G28', 'G29', 'G30', 'G31'];

// Generate the seating layout properly by creating a new row for each set of seats
seatingLayout.forEach(row => {
const rowDiv = document.createElement('div'); // Create a row container
rowDiv.classList.add('row'); // Add the class 'row' to make it a flexbox container

row.forEach(seat => {
    if (seat === '') {
    // Empty space (no seat in this position)
    const emptySeat = document.createElement('div');
    emptySeat.style.visibility = 'hidden';
    emptySeat.style.width = '30px'; // Keep space
    rowDiv.appendChild(emptySeat);
    } else {
    const isBooked = bookedSeats.includes(seat);
    const seatElement = document.createElement('div');
    seatElement.classList.add('seat');
    seatElement.setAttribute('data-seat', seat);

    if (isBooked) {
        seatElement.classList.add('booked');
    }
    seatElement.innerText = seat;

    // Add click event listener when creating the seat
    seatElement.addEventListener('click', function () {
        if (seatElement.classList.contains('booked')) {
        return; // Can't select booked seats
        }
        if (seatElement.classList.contains('selected')) {
        seatElement.classList.remove('selected');
        selectedSeatsCount--;
        totalAmount -= ticketPrice;
        } else {
        seatElement.classList.add('selected');
        selectedSeatsCount++;
        totalAmount += ticketPrice;
        }
        // Update the ticket count and total amount
        ticketCountDisplay.innerText = selectedSeatsCount;
        totalAmountDisplay.innerText = totalAmount;
    });

    rowDiv.appendChild(seatElement);
    }
});

// Append the row to the seats container
seatsContainer.appendChild(rowDiv);
});

// Update ticket price based on the selected ticket type
document.querySelectorAll('input[name="ticket-type"]').forEach(radio => {
radio.addEventListener('change', function () {
    ticketPrice = parseInt(this.value);
    // Reset selection when ticket type is changed
    document.querySelectorAll('.seat.selected').forEach(seat => {
    seat.classList.remove('selected');
    });
    selectedSeatsCount = 0;
    totalAmount = 0;
    ticketCountDisplay.innerText = selectedSeatsCount;
    totalAmountDisplay.innerText = totalAmount;
});
});

async function fetchBookedSeats() {
    const response = await fetch(`${baseURL}booked-seats`);
    const bookedSeats = await response.json();

    // Mark booked seats as unavailable
    bookedSeats.forEach(seat => {
        const seatElement = document.querySelector(`[data-seat="${seat.seatNumber}"]`);
        if (seatElement) seatElement.classList.add('booked');
    });
}
fetchBookedSeats();


// Book Now button event
// Add references to the modal and its elements
const bookingModal = document.getElementById('booking-modal');
const closeButton = document.querySelector('.close-button');
const confirmPaymentButton = document.getElementById('confirm-payment');
const customerNameInput = document.getElementById('customer-name');
const customerEmailInput = document.getElementById("customerEmail");
const selectedSeats = [...document.querySelectorAll('.seat.selected')].map(seat => seat.innerText).join(', ');
const paymentMessage = document.getElementById('payment-message');

let stripe;
let card;

// Function to set up Stripe and create the card element
function setupStripe() {
    // Your Stripe setup code here
    stripe = Stripe('pk_live_51Q5plDL2c4svBG735JvaL7FRGVo1O3AVqoG8EnceV4yBusnPiXawZjWDguxiE8UeoZ7wFmybqylX3xnfLf68yKOL007Y5hu7WS');
    const elements = stripe.elements();

    // Create a card element
    const cardStyle = {
        base: {
            color: '#32325d',
            fontSize: '18px',
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
        },
    };

    card = elements.create('card', { style: cardStyle });
    card.mount('#card-element');
}

// Call the setup function
setupStripe();

// Initialize Stripe and Card Element
document.addEventListener("DOMContentLoaded", function () {
    stripe = Stripe("pk_live_51Q5plDL2c4svBG735JvaL7FRGVo1O3AVqoG8EnceV4yBusnPiXawZjWDguxiE8UeoZ7wFmybqylX3xnfLf68yKOL007Y5hu7WS");
    const elements = stripe.elements();

    card = elements.create('card');
    card.mount('#card-element');
});

// Open modal on book now button click
bookNowButton.addEventListener('click', function () {
    if (selectedSeatsCount === 0) {
        alert('Please select at least one seat.');
        return;
    }
    const modalTotalAmount = document.getElementById('modal-total-amount');
    modalTotalAmount.innerText = `$${totalAmount}`;

    const processingFee = document.getElementById('processing-fee');
    // Calculate the processing fee and round it to two decimal places
    const fee = Number((totalAmount * 0.029 + 0.32).toFixed(2));
    processingFee.innerText = `$${fee}`;

    const finalprice = document.getElementById('total-charge');
    finalCharge = totalAmount + fee;

    finalprice.innerText = `$${finalCharge}`;


    // Display selected seats in the modal
    const selectedSeatsDisplay = document.getElementById('selected-seats');
    const selectedSeats = [...document.querySelectorAll('.seat.selected')].map(seat => seat.innerText).join(', ');
    selectedSeatsDisplay.innerText = selectedSeats; // Show selected seats


    bookingModal.style.display = 'flex'; // Show the modal

});

// Close the modal
closeButton.addEventListener('click', function () {
    bookingModal.style.display = 'none';
});

// TO CLOSE THE PAYMENTS: and comment out the confirtPaymentButton
//confirmPaymentButton.addEventListener('click', () => alert("The Booking has been closed. We won't be accepting any payments!"))


// Confirm payment button click
confirmPaymentButton.addEventListener('click', async () => {
    const name = customerNameInput.value;
    const email = customerEmailInput.value;
    const selectedSeats = [...document.querySelectorAll('.seat.selected')].map(seat => seat.innerText).join(', ');

    if (!name || !email) {
        alert("Please enter your name and email.");
        return;
    } 

    const response = await fetch(`${baseURL}create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalCharge * 100 }), // amount in cents
    });

    const { clientSecret } = await response.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
            card: card,
            billing_details: {
                name: name,
                email: email,
            },
        },
    });

    if (result.error) {
        paymentMessage.innerText = result.error.message; // Show error message
    } else if (result.paymentIntent.status === "succeeded") {
        alert('Payment successful! Your seat(s) are booked.');

        //Send booking data to the server
        const bookingResponse = await fetch(`${baseURL}book-seat`, {
            method: "POST",
            headers: {
                'Content-Type' : "application/json"
            },
            body: JSON.stringify({
                seats: selectedSeats.split(", "),
                name: name,
                email:email,
                amount: finalCharge,
            })
        });

        if(bookingResponse.ok){
            console.log("Booking saved successfully")
        }else{
            console.error('Failed to save booking', await bookingResponse.json())
        }

        const emailResponse = await fetch(`${baseURL}send-receipt`,{
            method: "POST",
            headers:{
                'Content-Type': "application/json"
            },
            body: JSON.stringify({
                to: email,
                seatNumber: selectedSeats,
                amount: finalCharge,
            })
        })
        if (emailResponse.ok) {
            console.log('Receipt email sent successfully.');
        } else {
            console.error('Failed to send receipt email:', await emailResponse.json());
        }
    }


        bookingModal.style.display = 'none'; // Close modal
        // Reset selected seats
        resetBooking();
});

// Function to reset the booking state
function resetBooking() {
    selectedSeatsCount = 0;
    totalAmount = 0;
    ticketCountDisplay.innerText = selectedSeatsCount;
    totalAmountDisplay.innerText = totalAmount;
    customerNameInput.value = ''; // Clear the name input
    card.clear(); // Clear the card element
    document.querySelectorAll('.seat.selected').forEach(seat => {
        seat.classList.remove('selected');
    });
}
// Close the modal if the user clicks outside of it
window.addEventListener('click', function (event) {
    if (event.target === bookingModal) {
        bookingModal.style.display = 'none';
    }
});

