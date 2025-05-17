const API_URL = 'https://ssa2drxb15.execute-api.us-east-1.amazonaws.com/prod/items';

async function addItem() {
  const input = document.getElementById("itemInput");
  const name = input.value.trim();
  if (!name) return;

  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });

  input.value = "";
  fetchItems();
}

async function fetchItems() {
    try {
        const response = await fetch(API_URL); 
        const data = await response.json();
        const parsed = data.Items ? data : JSON.parse(data.body);
        const items = parsed.Items || [];

        items.forEach(item => {
            console.log("Item:", item);
        });
    } catch (error) {
        console.error("Error fetching items:", error);
    }
}
window.onload = fetchItems;
