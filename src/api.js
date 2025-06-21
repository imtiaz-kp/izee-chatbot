// // api.js
// export async function sendMessageToBot(message) {
//     const response = await fetch("http://localhost:8000/chat", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ message }),
//     });
  
//     if (!response.ok) {
//       throw new Error("Failed to send message to the backend");
//     }
  
//     const data = await response.json();
//     return data.response; // Ensure this matches the response structure from the backend
//   }
  export async function sendMessageToBot(message) {
  const response = await fetch("https://c7ae-2409-40f3-100c-e622-5cc9-8b27-15a0-aab3.ngrok-free.app", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error("Failed to send message to the backend");
  }

  const data = await response.json();
  return data.response; // Make sure this matches your backend response structure
}
