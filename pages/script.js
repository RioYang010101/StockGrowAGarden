const apiUrl = "https://rioo-project-web.vercel.app/stock/grow";

// Mapping emoji
const emojiMap = {
    "carrot": "🥕",
    "tomato": "🍅",
    "blueberry": "🫐",
    "strawberry": "🍓",
    "cauliflower": "🥦",
    "cleaning spray": "🧽",
    "advanced sprinkler": "⚙️",
    "basic sprinkler": "💦",
    "trowel": "🔧",
    "common egg": "🥚",
    "uncommon egg": "🥚",
    "rare egg": "🥚",
    "epic egg": "🥚",
    "legendary egg": "🥚"
};

function getEmoji(name) {
    return emojiMap[name.toLowerCase()] || "❓";
}

async function fetchStock() {
    try {
        const res = await fetch(apiUrl);
        const data = await res.json();

        if (!data || !data.data) {
            console.error("Data kosong");
            return;
        }

        const seedsList = document.querySelector("#seeds ul");
        const gearList = document.querySelector("#gear ul");
        const eggsList = document.querySelector("#eggs ul");

        seedsList.innerHTML = "";
        gearList.innerHTML = "";
        eggsList.innerHTML = "";

        data.data.forEach(item => {
            const li = document.createElement("li");
            li.textContent = `${getEmoji(item.name)} ${item.name}: ${item.stock}`;

            if (item.category.toLowerCase() === "seeds") {
                seedsList.appendChild(li);
            } else if (item.category.toLowerCase() === "gear") {
                gearList.appendChild(li);
            } else if (item.category.toLowerCase() === "eggs") {
                eggsList.appendChild(li);
            }
        });

    } catch (err) {
        console.error("Gagal fetch data:", err);
    }
}

fetchStock();
setInterval(fetchStock, 60000);