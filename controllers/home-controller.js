const init = (req, res) => {
    res.status(200).json({ message: 'Employee management API is up and running...' });
}

module.exports = { init };