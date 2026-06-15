const REPO_OWNER = "jajacall";
const REPO_NAME = "ZYNTRIX_Firmware_Flasher";

let firmwareData = {};

async function loadReleases() {
    const select = document.getElementById("firmwareSelect");

    try {
        select.innerHTML = "<option>Loading...</option>";

        const response = await fetch(
            `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases`
        );

        if (!response.ok) {
            throw new Error("Failed to load releases");
        }

        const releases = await response.json();

        select.innerHTML = "";

        firmwareData = {};

        if (releases.length === 0) {
            select.innerHTML =
                "<option>No Firmware Releases Found</option>";
            return;
        }

        releases.forEach((release) => {
            const option = document.createElement("option");

            option.value = release.tag_name;
            option.textContent =
                release.name || release.tag_name;

            select.appendChild(option);

            firmwareData[release.tag_name] = release.assets;
        });

        select.selectedIndex = 0;

    } catch (error) {
        console.error(error);

        select.innerHTML =
            "<option>Error Loading Releases</option>";
    }
}
