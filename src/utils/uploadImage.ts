export const uploadImageToImgBB = async (file: File): Promise<string> => {
  const apiKey = "ee74842f81f029fb9561e589c2fe6b60";
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  console.log(data, response);

  if (!response.ok) {
    throw new Error(data.error.message || "Failed to upload image");
  }

  return data.data.url;
};
