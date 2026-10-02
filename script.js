// 1. Plant Data Collection (JSON-style array of objects)
const nativePlants = [
    { name: "Purple Coneflower", scientificName: "Echinacea purpurea", sunlight: "Full Sun", soil: "Well-Drained", heightFeet: 2.5, bloomSeason: "Summer", wildlifeBenefits: "Attracts native birds, bees, and butterflies." },
    { name: "Butterfly Weed", scientificName: "Asclepias tuberosa", sunlight: "Full Sun", soil: "Dry to Medium", heightFeet: 2.0, bloomSeason: "Summer", wildlifeBenefits: "Essential host plant for monarch caterpillars." },
    { name: "Wild Bergamot", scientificName: "Monarda fistulosa", sunlight: "Full Sun to Part Shade", soil: "Moist to Dry", heightFeet: 3.0, bloomSeason: "Summer", wildlifeBenefits: "Highly attractive to hummingbirds and long-tongued bees." },
    { name: "Black-Eyed Susan", scientificName: "Rudbeckia hirta", sunlight: "Full Sun", soil: "Adaptable", heightFeet: 2.0, bloomSeason: "Summer", wildlifeBenefits: "Provides seeds for finches and pollen for native insects." },
    { name: "Switchgrass", scientificName: "Panicum virgatum", sunlight: "Full Sun to Part Shade", soil: "Clay or Sandy", heightFeet: 4.5, bloomSeason: "Late Summer", wildlifeBenefits: "Provides protective nesting cover and winter food for birds." },
    { name: "Joe Pye Weed", scientificName: "Eutrochium purpureum", sunlight: "Full Sun to Part Shade", soil: "Moist", heightFeet: 5.5, bloomSeason: "Late Summer", wildlifeBenefits: "A magnet for butterflies, bumblebees, and beneficial insects." },
    { name: "New England Aster", scientificName: "Symphyotrichum novae-angliae", sunlight: "Full Sun", soil: "Moist, Well-Drained", heightFeet: 4.0, bloomSeason: "Fall", wildlifeBenefits: "Crucial late-season nectar source for migrating monarchs." },
    { name: "Cardinal Flower", scientificName: "Lobelia cardinalis", sunlight: "Part Shade to Full Sun", soil: "Moist to Wet", heightFeet: 3.0, bloomSeason: "Summer", wildlifeBenefits: "Primary nectar source favored heavily by hummingbirds." },
    { name: "Blue Flag Iris", scientificName: "Iris versicolor", sunlight: "Full Sun to Part Shade", soil: "Wet to Moist", heightFeet: 2.5, bloomSeason: "Spring", wildlifeBenefits: "Provides early spring pollen and wetland cover." },
    { name: "Virginia Bluebells", scientificName: "Mertensia virginica", sunlight: "Part Shade to Full Shade", soil: "Rich, Moist", heightFeet: 1.5, bloomSeason: "Spring", wildlifeBenefits: "Critical early-season nectar for emerging long-tongued bees." },
    { name: "White Turtlehead", scientificName: "Chelone glabra", sunlight: "Part Shade", soil: "Wet to Moist", heightFeet: 2.5, bloomSeason: "Late Summer", wildlifeBenefits: "Sole host plant for the Baltimore checkerspot butterfly." },
    { name: "Great Blue Lobelia", scientificName: "Lobelia siphilitica", sunlight: "Full Sun to Part Shade", soil: "Moist", heightFeet: 2.5, bloomSeason: "Summer", wildlifeBenefits: "Visited frequently by bumblebees and pollinators." },
    { name: "Foxglove Beardtongue", scientificName: "Penstemon digitalis", sunlight: "Full Sun to Part Shade", soil: "Medium to Well-Drained", heightFeet: 2.5, bloomSeason: "Spring", wildlifeBenefits: "Provides heavy nectar for native bees." },
    { name: "Goldenrod", scientificName: "Solidago altissima", sunlight: "Full Sun", soil: "Adaptable", heightFeet: 4.5, bloomSeason: "Fall", wildlifeBenefits: "Essential fall food source for over 100 insect species." },
    { name: "Wild Columbine", scientificName: "Aquilegia canadensis", sunlight: "Part Shade to Shade", soil: "Rocky, Well-Drained", heightFeet: 1.5, bloomSeason: "Spring", wildlifeBenefits: "Adapted specifically for hummingbird pollination." }
];

document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.querySelector(".plant-grid");
    const searchInput = document.getElementById("keyword");
    const sortAlphabeticalBtn = document.getElementById("sort-alpha-btn");
    const sunFilterSelect = document.getElementById("sun-filter");
    const bloomFilterSelect = document.getElementById("bloom-filter");
    const heightFilterSelect = document.getElementById("height-filter");
    const statsContainer = document.getElementById("stats-container");

    // DEMO OF map()
    const plantNamesUppercase = nativePlants.map(plant => plant.name.toUpperCase());
    console.log("Mapped Plant Names (map):", plantNamesUppercase);

    // DEMO OF find()
    const featuredPlant = nativePlants.find(plant => plant.name === "Purple Coneflower");
    console.log("Found Plant (find):", featuredPlant);

    // DEMO OF reduce()
    const averageHeight = nativePlants.reduce((total, plant, index, array) => {
        total += plant.heightFeet;
        if (index === array.length - 1) {
            return (total / array.length).toFixed(1);
        }
        return total;
    }, 0);

    if (statsContainer) {
        statsContainer.innerHTML = `<p><b>Dataset Stats (reduce):</b> Total Plants: ${nativePlants.length} | Average Height: ${averageHeight} ft</p>`;
    }

    function renderPlants(plantsToDisplay) {
        if (!gridContainer) return;
        gridContainer.innerHTML = "";

        if (plantsToDisplay.length === 0) {
            gridContainer.innerHTML = `<p>No plants found matching your criteria.</p>`;
            return;
        }

        plantsToDisplay.forEach((plant, index) => {
            const card = document.createElement("article");
            card.classList.add("plant-card");
            card.innerHTML = `
                <h3>${index + 1}. ${plant.name}</h3>
                <p><b>Scientific Name:</b> <i>${plant.scientificName}</i></p>
                <p><b>Sunlight:</b> ${plant.sunlight}</p>
                <p><b>Soil:</b> ${plant.soil}</p>
                <p><b>Height:</b> ${plant.heightFeet} feet</p>
                <p><b>Bloom Season:</b> ${plant.bloomSeason}</p>
                <p><b>Wildlife Benefits:</b> ${plant.wildlifeBenefits}</p>
            `;
            gridContainer.appendChild(card);
        });
    }

    // Alphabetical Sorting using sort()
    function sortAlphabetically() {
        const sorted = [...nativePlants].sort((a, b) => a.name.localeCompare(b.name));
        renderPlants(sorted);
    }

    // Comprehensive filtering using filter() and search input
    function applyFilters() {
        const searchTerm = searchInput ? searchInput.value.toLowerCase().trim() : "";
        const selectedSun = sunFilterSelect ? sunFilterSelect.value : "all";
        const selectedBloom = bloomFilterSelect ? bloomFilterSelect.value : "all";
        const selectedHeight = heightFilterSelect ? heightFilterSelect.value : "all";

        const filtered = nativePlants.filter(plant => {
            const matchesSearch = plant.name.toLowerCase().includes(searchTerm) || 
                                  plant.scientificName.toLowerCase().includes(searchTerm);
            const matchesSun = selectedSun === "all" || plant.sunlight.toLowerCase().includes(selectedSun.toLowerCase());
            const matchesBloom = selectedBloom === "all" || plant.bloomSeason.toLowerCase().includes(selectedBloom.toLowerCase());
            
            let matchesHeight = true;
            if (selectedHeight === "short") matchesHeight = plant.heightFeet < 3;
            if (selectedHeight === "tall") matchesHeight = plant.heightFeet >= 3;

            return matchesSearch && matchesSun && matchesBloom && matchesHeight;
        });

        renderPlants(filtered);
    }

    // Event Listeners
    if (sortAlphabeticalBtn) {
        sortAlphabeticalBtn.addEventListener("click", sortAlphabetically);
    }
    if (searchInput) {
        searchInput.addEventListener("input", applyFilters);
    }
    if (sunFilterSelect) {
        sunFilterSelect.addEventListener("change", applyFilters);
    }
    if (bloomFilterSelect) {
        bloomFilterSelect.addEventListener("change", applyFilters);
    }
    if (heightFilterSelect) {
        heightFilterSelect.addEventListener("change", applyFilters);
    }

    // Initial render
    renderPlants(nativePlants);
});
