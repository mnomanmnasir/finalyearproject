const db = require("../models");
const { ticket: Ticket, refreshToken: RefreshToken } = db;


exports.getAllTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find().populate("user");
        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: 'Failed to retrieve tickets', error: error.message });
        console.log(error.message);
    }
};

exports.getTicket = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.body.id).populate("user");
        res.json(ticket);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch ticket', error: error.message });
    }
};

exports.createTicket = async (req, res) => {
    try {
        const ticket = await Ticket.create(req.body);
        res.json(ticket);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create ticket', error: error.message });
        console.log(error.message);
    }
};

exports.updateTicket = async (req, res) => {
    try {
        if(req.body.ticketId && req.body.userId && req.body.status) {
            const statusArray = ['open', 'inprogress', 'closed'];
            if(statusArray.includes(req.body.status) == false) {
                return res.status(404).json({ message: 'Status is not correct!' });
            }
            const ticket = await Ticket.findById(req.body.ticketId);
            if(ticket === null) {
                return res.status(404).json({ message: 'Ticket ID is not correct!' });
            }
            ticket.status = req.body.status;
            // const id = mongoose.Types.ObjectId(req.body.userId);
            ticket.handled_by = req.body.userId;
            try {
                const newTicket = await ticket.save();
                res.json(newTicket);
            } catch(e) {
                res.status(500).json({ message: 'Failed to update Ticket', error: e.message });
            }
        } else {
            return res.status(404).json({ message: 'Some fields are missing!' });
        }
    } catch(e) {
        res.status(500).json({ message: 'Failed to update Ticket', error: e.message });
    }
};

exports.deleteTicket = async (req, res) => {
    try {
        await Ticket.findByIdAndRemove(req.body.id);
        res.json({ message: 'Ticket deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete Ticket', error: error.message });
    }
};