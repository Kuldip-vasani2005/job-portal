import { Company } from "../models/company.model.js";
// import cloudinary from 'cloudinary'; // Uncomment if using cloudinary

// Register company
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required.",
        success: false,
      });
    }

    const existingCompany = await Company.findOne({ name: companyName });
    if (existingCompany) {
      return res.status(400).json({
        message: "You can't register the same company.",
        success: false,
      });
    }

    const newCompany = await Company.create({
      name: companyName,
      userId: req.id, // Ensure this is set in auth middleware
    });

    return res.status(201).json({
      message: "Company registered successfully.",
      company: newCompany,
      success: true,
    });

  } catch (error) {
    console.error("Error registering company:", error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

// Get all companies of logged-in user
export const getCompany = async (req, res) => {
  try {
    const userId = req.id;

    const companies = await Company.find({ userId });

    if (!companies || companies.length === 0) {
      return res.status(404).json({
        message: "No companies found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Companies fetched successfully.",
      companies,
      success: true,
    });

  } catch (error) {
    console.error("Error fetching companies:", error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

// Get single company by ID
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;

    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company fetched successfully.",
      company,
      success: true,
    });

  } catch (error) {
    console.error("Error fetching company by ID:", error);
    return res.status(500).json({
      message: "Internal server error.",
      success: false,
    });
  }
};

// Update company info
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;
    const file = req.file;

    const updateData = { name, description, website, location };

    // Optional Cloudinary logic
    /*
    if (file) {
      const result = await cloudinary.uploader.upload(file.path);
      updateData.logo = result.secure_url;
    }
    */

    const company = await Company.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!company) {
      return res.status(404).json({
        message: "Company not found.",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Company information updated.",
      company, // Return updated data
      success: true,
    });

  } catch (error) {
    console.error("Error updating company:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};
