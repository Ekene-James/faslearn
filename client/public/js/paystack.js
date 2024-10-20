const paymentForm = document.getElementById('paymentForm');
paymentForm.addEventListener("click", payWithPaystack, false);
function payWithPaystack(e) {
    alert('yes');
e.preventDefault();
let handler = PaystackPop.setup({
    key: 'pk_test_b66d0123c39e5274812de14cde47231d2011e8d9', // Replace with your public key
    email: 'cosimomichael92@gmail.com',
    amount: 3 * 100,
    ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
    // label: "Optional string that replaces customer email"
    onClose: function(){
        alert('Window closed.');
    },
    callback: function(response){
        let message = 'Payment complete! Reference: ' + response.reference;
        alert(message);
    }
});
handler.openIframe();
}