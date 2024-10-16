const prisma = require("../config/prisma")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


exports.register = async (req, res, next) => {
    try {
        const { email, password, firstName, lastName, phone, role } = req.body
        //validation
        console.log(req.body)

        if (!email || !password || !firstName || !lastName || !phone || !role) {
            return res.status(400).json({ message: "All fields are required" })
        }
        //role validation
        if (role !== "OWNER" && role !== "CUSTOMER") {
            return res.status(400).json({ message: "Invalid role" })
        }
        //email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email" })
        }
        //password validation
        const passwordRegex = /^[a-zA-Z0-9]{6,}$/
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: "Invalid password" })
        }
        //check email
        const checkEmail = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if (checkEmail) {
            return res.status(400).json({ message: "Email already exists" })
        }
        //hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        if (role) {
            const user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    firstName,
                    lastName,
                    phone,
                    role
                }
            })
        } else {
            const user = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    firstName,
                    lastName,
                    phone,
                }
            })
        }
        res.status(201).json({ message: "User created successfully" })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        //validation
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        //email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email" })
        }
        //password validation
        const passwordRegex = /^[a-zA-Z0-9]{6,}$/
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: "Invalid password" })
        }
        //check email
        const checkEmail = await prisma.user.findUnique({
            where: {
                email
            }
        })

        const payload = {
            id: checkEmail.id,
            email: checkEmail.email,
            role: checkEmail.role
        }

        jwt.sign(payload, process.env.SECRET, { expiresIn: "1d" }, (err, token) => {
            if (err) {
                return res.status(500).json({ message: "Server Error" })
            }
           return res.json({ payload, token })
        })

        // res.json('Hello Login In Controller')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}


exports.currentUser = async (req, res) => {
    try {
        res.send('hello current user')
    }catch (err) {
        console.log(err)
        res.status(500).json({mssage : 'Sever Error'})
    }
}