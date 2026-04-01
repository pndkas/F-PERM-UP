import axios from "axios";

// เพิ่ม parameter 'folder' เพื่อระบุว่ารูปนี้จะไปลงที่ไหน
export const uploadToCloudinary = async (file, folder = "general") => {
  if (!file) return null;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "PERM-UP");
  formData.append("cloud_name", "pndkas");
  formData.append("folder", `perm-up/${folder}`);

  try {
    const res = await axios.post(
      "https://api.cloudinary.com/v1_1/pndkas/image/upload",
      formData,
    );
    return res.data.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
};
