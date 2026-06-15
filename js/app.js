document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadReleases();

        document
            .getElementById("refreshBtn")
            .addEventListener(
                "click",
                loadReleases
            );

        document
            .getElementById("firmwareSelect")
            .addEventListener(
                "change",
                updateManifest
            );

    }
);

async function updateManifest() {

    const version =
        document.getElementById(
            "firmwareSelect"
        ).value;

    const assets =
        firmwareData[version];

    if (!assets)
        return;

    const appBin =
        assets.find(asset =>
            asset.name.endsWith(".ino.bin")
        );

    const bootloader =
        assets.find(asset =>
            asset.name.includes(
                "bootloader"
            )
        );

    const partitions =
        assets.find(asset =>
            asset.name.includes(
                "partitions"
            )
        );

    if (
        !appBin ||
        !bootloader ||
        !partitions
    ) {

        document.getElementById(
            "status"
        ).innerText =
            "Firmware files missing in release";

        return;
    }

    const manifest = {

        name:
            "ZYNTRIX Firmware",

        version:

            version,

        builds: [

            {
                chipFamily:
                    "ESP32",

                parts: [

                    {
                        path:
                            bootloader.browser_download_url,
                        offset:
                            4096
                    },

                    {
                        path:
                            partitions.browser_download_url,
                        offset:
                            32768
                    },

                    {
                        path:
                            appBin.browser_download_url,
                        offset:
                            65536
                    }

                ]
            }

        ]
    };

    const manifestBlob =
        new Blob(
            [
                JSON.stringify(
                    manifest
                )
            ],
            {
                type:
                    "application/json"
            }
        );

    const manifestURL =
        URL.createObjectURL(
            manifestBlob
        );

    document
        .querySelector(
            "esp-web-install-button"
        )
        .setAttribute(
            "manifest",
            manifestURL
        );

    document.getElementById(
        "status"
    ).innerText =
        `Selected ${version}`;
}
