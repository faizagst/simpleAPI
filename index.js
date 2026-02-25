const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const createdAt = new Date().toLocaleString("id-ID", {
    timeZone: "Asia/Jakarta",
});

app.use(express.json());

let users = [
    { id: 1, name: "Karina", email: "Karina@aespa.com", age: 25, city: "Suwon-si", createdAt },
    { id: 2, name: "Giselle", email: "Giselle@aespa.com", age: 24, city: "Seoul", createdAt },
    { id: 3, name: "Winter", email: "Winter@aespa.com", age: 24, city: "Busan", createdAt },
    { id: 4, name: "Ningning", email: "Ningning@aespa.com", age: 22, city: "Harbin", createdAt },
];

// GET /users (daftar pengguna)
app.get("/users", (req, res) => {
    res.json({
        success: true,
        message: "List of users",
        total: users.length,
        data: users,
    });
});

// POST /users (tambah pengguna baru)
app.post("/users", (req, res) => {
    const { name, email, age, city } = req.body;
    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: "Name and email are required",
        });
    }

    const newUser = {
        id: users.length + 1,
        name,
        email,
        age: age || null,
        city: city || null,
        createdAt
    };

    users.push(newUser);
    res.status(201).json({
        success: true,
        message: "User created successfully",
        data: newUser,
    });
});

// GET /users/:id (detail pengguna)
app.get("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find((u) => u.id === id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    res.json({
        success: true,
        message: "User detail",
        data: user,
    });
});

// PUT /users/:id (Update user)
app.put("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    const { name, email, age, city } = req.body;

    // Update the user object while keeping the original ID and createdAt
    users[userIndex] = {
        ...users[userIndex],
        name: name || users[userIndex].name,
        email: email || users[userIndex].email,
        age: age || users[userIndex].age,
        city: city || users[userIndex].city,
        updatedAt: new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })
    };

    res.json({
        success: true,
        message: "User updated successfully",
        data: users[userIndex],
    });
});

// DELETE /users/:id (Delete user)
app.delete("/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const initialLength = users.length;
    
    // Filter out the user with the matching ID
    users = users.filter((u) => u.id !== id);

    if (users.length === initialLength) {
        return res.status(404).json({
            success: false,
            message: "User not found",
        });
    }

    res.json({
        success: true,
        message: `User with ID ${id} deleted successfully`,
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
