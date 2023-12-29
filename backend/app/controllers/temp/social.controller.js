const db = require("../models");
const { user: User, card: Card, social: Social, refreshToken: RefreshToken } = db;

// exports.createSocial = async (req, res) => {
//     try {
//         const user = await User.findById(req.body.userId);

//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const social = await Social.create(req.body);
//         user.socials.push(social);
//         await user.save();
//         res.json(social);
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to create social', error: error.message });
//         console.log(error.message);
//     }
// };
exports.createSocial = async (req, res) => {
    try {
        const card = await Card.findOne({ user: req.body.userId })
        // console.log(req.body)
        if (!card) {
            // console.log(card);
            return res.status(404).json({ message: 'User not have card!!' });
        }

        const social = await Social.create(req.body);
        card.socials.push(social);
        await card.save();
        res.json(social);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create social', error: error.message });
        console.log(error.message);
    }
};

// exports.getAllSocials = async (req, res) => {
//     try {
//         // const connections = await Connection.find().populate("userId");
//         const socials = await Social.find();
//         res.json(socials);
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to retrieve socials', error: error.message });
//         console.log(error.message);
//     }
// };

// exports.getSocial = async (req, res) => {
//     try {
//         const social = await Social.findById(req.params.id);
//         res.json(social);
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to fetch socials', error: error.message });
//     }
// };

// exports.updateSocial = async (req, res) => {
//     try {
//         const updatedSocial = await Social.findByIdAndUpdate(req.body.id, req.body, { new: true });
//         res.json(updatedSocial);
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to update social', error: error.message });
//     }
// };

// exports.deleteSocial = async (req, res) => {
//     try {
//         await Social.findByIdAndRemove(req.body.socialId);
//         res.json({ message: 'Social deleted' });
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to delete Social', error: error.message });
//     }
// }

exports.deleteSocial = async (req, res) => {
    try {
        const socialId = req.body.socialId; // Assuming social ID is sent as a URL parameter

        // Find the card that contains the social
        const card = await Card.findOne({ socials: socialId });

        if (!card) {
            return res.status(404).json({ message: 'Card not found for the c' });
        }

        // Remove the social from the card's socials array
        card.socials.pull({ _id: socialId });

        // Save the card to apply the changes (removing the social)
        await card.save();

        // Delete the social document itself
        await Social.findByIdAndDelete(socialId);

        res.json({ message: 'social deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete social', error: error.message });
    }
};