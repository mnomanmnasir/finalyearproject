const db = require("../models");
const { card: Card, user: User, refreshToken: RefreshToken, connection: Connection, social: Social, action: Action } = db;


exports.deleteUser = async (req, res) => {
    try {
        if(req.body.userId) {
            const userId = req.body.userId;
            // const user = await User.findById(userId);
            // if (user !== null) {
            //     await user.deleteOne();
            // }

            await User.findByIdAndDelete(userId);
            await RefreshToken.deleteMany({ user: userId });
            const cards = await Card.find({ user: userId });
            let cardsArray = [];
            if(cards) {
                cards.map(i => {
                    cardsArray.push(i._id);
                })
                await Action.deleteMany({ card: { $in: cardsArray } });
            }
            await Card.deleteMany({ user: userId });
            await Connection.deleteMany({ userId: userId });
            await Social.deleteMany({ userId: userId });
            res.json({ message: 'Successfully deleted user and all reated things!'});
        } else {
            return res.status(400).json({ message: 'User ID is missing!' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to update Card', error: error.message });
        console.log(error.message);
    }
};