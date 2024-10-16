exports.listUser = async (req, res) => {
    try {
        res.send('Hello user')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}