const API_URL = import.meta.env.VITE_API_URL;
export async function getProjects() {
  const res = await fetch(`${API_URL}/api/projects`);
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export async function getProjectById(id) {
  const res = await fetch(`${API_URL}/api/projects/${id}`);
  if (!res.ok) throw new Error("Failed to fetch project");
  return res.json();
}

export function getImageUrl(imagePath) {
  if (!imagePath) return null;
  if (imagePath.startsWith("http")) return imagePath;
  if (imagePath.startsWith("/uploads/")) return `${API_URL}${imagePath}`;
  return imagePath;
}
export async function sendContactMessage(formData) {
  const res = await fetch(`${API_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to send message.");

  return data;
}
