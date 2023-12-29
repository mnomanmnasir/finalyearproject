const db = require("../models");
const { card: Card, refreshToken: RefreshToken } = db;


exports.getAllCards = async (req, res) => {
    try {
        const cards = await Card.find().populate("user");
        res.json(cards);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve cards', error: error.message });
        console.log(error.message);
    }
};

// exports.getCard = async (req, res) => {
//     try {
//         // console.log(req);
//         const id = req.body.id;
//         const card = await Card.find({ user: id }).populate("user");
//         // if(card >= 0){
//             // console.log(card);
//             res.json(card);
//         // }
//         // res.json("User Not Have card");
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to fetch card', error: error.message });
//     }
// };
exports.getCard = async (req, res) => {
    try {
        console.log(req.body);
        const id = req.body.id;
        const card = await Card.findOne({ user: id }).populate("user").populate("connections").populate("socials");

        if (card) {
            res.json(card); // Return the found card as an object
        } else {
            res.status(404).json({ message: 'User does not have a card' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch card', error: error.message });
    }
};

exports.deleteCard = async (req, res) => {
    try {
        const cardId = req.body.id; // Assuming the user ID is sent in the request body

        const card = await Card.findById({ id: cardId });

        if (card) {
            // If a card is found for the user, you can delete it
            await Card.findByIdAndDelete(card._id);
            
            res.json({ message: 'Card deleted successfully' });
        } else {
            res.status(404).json({ message: 'User does not have a card' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete card', error: error.message });
    }
};

// exports.createCard = async (req, res) => {
//     try {
//         const card = await Card.create(req.body);
//         res.json(card);
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to create card', error: error.message });
//         console.log(error.message);
//     }
// };

exports.updateCard = async (req, res) => {
    try {
        if(req.body.id, req.body.cardId, req.body.cardType) {
            const card = await Card.findById(req.body.id);
            if (!card) {
                return res.status(404).json({ message: 'Card not found!' });
            }
            const types = ['pvc', 'metal', 'review', 'phonecard'];
            if(types.includes(req.body.cardType) == false) {
                return res.status(400).json({ message: 'Card type is not correct!' });
            }
            card.cardId = req.body.cardId;
            card.cardType = req.body.cardType;
            const newCard = await card.save();
            res.json(newCard);
        } else {
            return res.status(400).json({ message: 'Some fields are missing!' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update Card', error: error.message });
        console.log(error.message);
    }
};

// exports.deleteCard = async (req, res) => {
//     try {
//         await Card.findByIdAndRemove(req.body.id);
//         res.json({ message: 'Card deleted' });
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to delete Card', error: error.message });
//     }
// };