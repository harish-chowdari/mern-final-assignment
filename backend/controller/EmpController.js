const EmpSchema = require("../model/EmpModel");

const port = 4005;

function uploadImage(req, res, next) {
    try {
        if (!req.file || !req.file.filename) {
            // If no file is uploaded, proceed to the next middleware
            return next();
        }
        
        return res.status(200).json({
            success: true,
            image_url: `http://localhost:${port}/images/${req.file.filename}`
        });
    } catch (error) {
        console.error("Error uploading image:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function postEmp(req, res) {
    try {
        const { name, email, mobile, designation, gender, courses, image } = req.body;
        let exist = await EmpSchema.findOne({ email });
        
        if (exist) {
            return res.status(200).json({ msg: "Email already exists" });
        }

        const data = new EmpSchema({
            name, 
            email,
            mobile, 
            designation, 
            gender, 
            courses, 
            image
        });

        const d = await data.save();
        console.log(d);
        return res.status(200).json({ success: true, d });
    } catch (error) {
        console.log({ error: "Internal server error" });
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function getEmp(req, res) {
    try {
        const data = await EmpSchema.find();
        res.json(data);
    } catch (error) {
        console.log({ error: "Internal server error" });
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function getEmpById(req, res) {
    const id = req.params.id;
    try {
        const emp = await EmpSchema.findById(id);
        if (!emp) {
            return res.status(404).json({ error: "Employee not found" });
        }
        res.json(emp);
    } catch (error) {
        console.error("Error retrieving employee:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

async function updateEmp(req, res) {
    const id = req.params.id;
    try {
        const { name, email, mobile, designation, gender, courses, image } = req.body;
        let existingEmp = await EmpSchema.findById(id);

        if (!existingEmp) {
            return res.status(200).json({ error: "Employee not found" });
        }

        // Update employee details
        existingEmp.name = name;
        existingEmp.email = email;
        existingEmp.mobile = mobile;
        existingEmp.designation = designation;
        existingEmp.gender = gender;
        existingEmp.courses = courses;
        existingEmp.image = image; 

        // Save the updated employee details
        const updatedEmp = await existingEmp.save();
        
        return res.json({ success: true, message: "Employee updated successfully", updatedEmp });
    } catch (error) {
        console.error("Error updating employee:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

async function deleteEmp(req, res) {
    const id = req.query.id;
    try {
        const deletedEmp = await EmpSchema.findByIdAndDelete(id);
        if (!deletedEmp) {
            return res.status(404).json({ error: "Employee not found" });
        }
        return res.json({ success: true, message: "Employee deleted successfully" });
    } catch (error) {
        console.error("Error deleting employee:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = {
    uploadImage,
    postEmp,
    getEmp,
    getEmpById,
    deleteEmp,
    updateEmp 
};
