const db = require("../models");
const { user: User, action: Action, card: Card, social: Socail, connection: Connection, refreshToken: RefreshToken } = db;

// exports.getAction = async (req, res) => {
//     try {
//         console.log(req.url)
//         const cardId = req.url.split("=")[1];
//         const action = await Action.findOne({ card: cardId, status: true });
//         if (!action) {
//             res.status(404).json({ message: "Action not Found!!" });
//         }
//         console.log(action);
//         res.json({ link: action.action });
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to fetch action', error: error.message });
//     }
// };

exports.getAction = async (req, res) => {
    try {
        console.log(req.url);
        const cardId = req.url.split("=")[1];

        // Find the action with status true for the given cardId
        const action = await Action.findOne({ card: cardId, status: true });

        if (!action) {
            return res.status(404).json({ message: "Action not Found!!" });
        }

        // Increment the count property
        action.count = (action.count || 0) + 1;

        // Save the updated action
        await action.save();

        // console.log(action);
        res.json({ link: action.action, type: action.actionType});
        // res.json({ link: action.action, count: action.count });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch action', error: error.message });
    }
};

// exports.createAction = async (req, res) => {
//     try {
//         const actionData = {
//             card: req.body.cardId,
//             action: req.body.action, // JSON || link
//             actionType: req.body.actionType,  // link || temp
//             created_by: req.body.created_by,
//             status: true
//         }
//         const card = await Card.findById(req.body.cardId);
//         if (!card) {
//             return res.status(404).json({ message: 'Card not found!!' });
//         }
//         const action = new Action(actionData);
//         await action.save();
//         res.json(action);
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to create Action', error: error.message });
//         console.log(error.message);
//     }
// };
exports.createAction = async (req, res) => {
    try {
        const cardId = req.body.cardId;

        // Check if there is any existing action with status true for the given cardId
        const existingAction = await Action.findOne({ card: cardId, status: true });

        if (existingAction) {
            // If an existing action is found, update its status to false
            existingAction.status = false;
            await existingAction.save();
        }

        // Create a new action
        const actionData = {
            card: cardId,
            action: req.body.action,
            actionType: req.body.actionType,
            created_by: req.body.created_by,
            status: true
        };

        // Save the new action
        const action = new Action(actionData);
        await action.save();

        res.json(action);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create Action', error: error.message });
        console.log(error.message);
    }
};

// exports.getAllActionsForCard = async (req, res) => {
//     try {
//         const cardId = req.params.cardId;

//         // Find all actions for the given cardId
//         const actions = await Action.find({ card: cardId });

//         if (!actions || actions.length === 0) {
//             return res.status(404).json({ message: 'No actions found for the card' });
//         }

//         res.json({ actions: actions});
//     } catch (error) {
//         res.status(500).json({ message: 'Failed to fetch actions for the card', error: error.message });
//     }
// };

exports.getAllActionsForCard = async (req, res) => {
    try {
        const cardId = req.params.cardId;

        // Find all actions for the given cardId
        const actions = await Action.find({ card: cardId });

        if (!actions || actions.length === 0) {
            return res.status(404).json({ message: 'No actions found for the card' });
        }

        // Include count property in each action
        const actionsWithCount = actions.map(action => {
            return {
                // _id: action._id,
                // card: action.card,
                action: action.action,
                actionType: action.actionType,
                // created_by: action.created_by,
                status: action.status,
                count: action.count || 0
            };
        });

        res.json({ actions: actionsWithCount });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch actions for the card', error: error.message });
    }
}


exports.createConnection = async (req, res) => {
    try {
        // const user = await User.findById(req.body.userId);
        // console.log(req.body);
        const card = await Card.findOne({ user: req.body.userId })

        if (!card) {
            // console.log(card);
            return res.status(404).json({ message: 'User not have card!!' });
        }

        const connection = await Connection.create(req.body);
        card.connections.push(connection);
        await card.save();
        res.json(connection);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create connection', error: error.message });
        console.log(error.message);
    }
};


exports.getAllConnections = async (req, res) => {
    try {
        // const connections = await Connection.find().populate("userId");
        const connections = await Connection.find();
        res.json(connections);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve connections', error: error.message });
        console.log(error.message);
    }
};

exports.getConnection = async (req, res) => {
    try {
        const connection = await Connection.findById(req.body.id);
        res.json(connection);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch connection', error: error.message });
    }
};


exports.deleteConnection = async (req, res) => {
    try {
        const connectionId = req.body.connectionId; // Assuming connection ID is sent as a URL parameter

        // Find the card that contains the connection
        const card = await Card.findOne({ connections: connectionId });

        if (!card) {
            return res.status(404).json({ message: 'Card not found for the connection' });
        }

        // Remove the connection from the card's connections array
        card.connections.pull({ _id: connectionId });

        // Save the card to apply the changes (removing the connection)
        await card.save();

        // Delete the connection document itself
        await Connection.findByIdAndDelete(connectionId);

        res.json({ message: 'Connection deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete connection', error: error.message });
    }
};

exports.updateWebsite = async (req, res) => {
    try {
        const userId = req.body.userId;
        const website = req.body.url;

        let card = await Card.findOne({ user: userId });

        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }
        // console.log(card)
        card.website = website;
        const updatedCard = await card.save();
        res.json(updatedCard);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update website', error: error.message });
    }
};
exports.updateDoc = async (req, res) => {
    try {
        const userId = req.body.userId;
        const doc = req.body.link;

        let card = await Card.findOne({ user: userId });

        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }
        // console.log(card)
        card.doc = doc;
        const updatedCard = await card.save();
        res.json(updatedCard);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update doc', error: error.message });
    }
};
exports.updateLinkedTree = async (req, res) => {
    try {
        const userId = req.body.userId;
        const linkedTree = req.body.link;

        let card = await Card.findOne({ user: userId });

        if (!card) {
            return res.status(404).json({ message: 'Card not found' });
        }
        card.linkedtree = linkedTree;
        const updatedCard = await card.save();
        res.json(updatedCard);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update linkedTree', error: error.message });
    }
};

exports.getActionCount = async (req, res) => {
    try {
        const cardId = req.body.cardId;
        if(req.body.cardId == null || req.body.cardId == undefined) {
            return res.status(400).json({ message: 'Some fields are missing!' });
        }
        const actions = await Action.find({ card: cardId });
        if (!actions || actions.length === 0) {
            return res.status(404).json({ message: 'No actions found for the card' });
        }
        const actionsWithCount = actions.map(action => {
            return {
                action: action.action,
                status: action.status,
                count: action.count || 0
            };
        });
        res.json(actionsWithCount);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch actions for the card', error: error.message });
    }
};