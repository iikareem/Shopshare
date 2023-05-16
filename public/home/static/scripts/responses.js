function getBotResponse(input) {

    if (input == "hello") {
        return "Hello there!";
    }
    else if (input == "goodbye") {
        return "Talk to you later!";
    }
    else if (input == "Who are the admins for this website and how can I connect with them?") {
        return "You can connect with any of these individuals Andrew Victor, Rawan Ayman, and Kareem Ashraf -- by visiting the Contact Us page";
    }
    else if (input == "How can i sell my Product") {
        return "First of all You Must Sign in, after this you can sell your product.";
    }
    else if (input == "Thank you") {
        return "You're welcome! If you have any more questions, feel free to ask.";
    }
    else if (input == "what is this website") {
        return "A peer-to-peer marketplace is a website that falls under the eCommerce umbrella. It is an online platform that connects different people who want to sell any kind of product or service and, people who need that product or service.";
    }
    else {
        return "Try asking something else!";
    }
}