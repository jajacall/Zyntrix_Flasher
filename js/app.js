document.addEventListener("DOMContentLoaded", () => {

    loadReleases();

    document
        .getElementById("refreshBtn")
        .addEventListener("click", loadReleases);

    document
        .getElementById("firmwareSelect")
        .addEventListener("change", updateManifest);

});

async function updateManifest() {

    const version =
        document.getElementById("firmwareSelect").value;

    const assets = firmwareData[version];

    const appBin =
        assets.find(a => a.name.endsWith(".ino.bin"));

    const bootloader =
        assets.find(a => a.name.includes("bootloader"));

    const partitions =
        assets.find(a => a.name.includes("partitions"));

    const manifest = {
        name: `ZYNTRIX ${version}`,
        version: version,
        builds: [{
            chipFamily: "ESP32",
            parts: [
                {
                    path: bootloader.browser_download_url,
                    offset: 4096
                },
                {
                    path: partitions.browser_download_url,
                    offset: 32768
                },
                {
                    path: appBin.browser_download_url,
                    offset: 65536
                }
            ]
        }]
    };

    const manifestUrl =
        URL.createObjectURL(
            new Blob(
                [JSON.stringify(manifest)],
                { type: "application/json" }
            )
        );

    document
        .querySelector("esp-web-install-button")
        .setAttribute("manifest", manifestUrl);
}
