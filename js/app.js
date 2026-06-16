async function updateManifest() {

    const folder =
        document.getElementById(
            "firmwareSelect"
        ).value;

    try {

        const bootloader =
            await sb.storage
                .from("firmware")
                .createSignedUrl(
                    `${folder}/bootloader.bin`,
                    300
                );

        const partitions =
            await sb.storage
                .from("firmware")
                .createSignedUrl(
                    `${folder}/partitions.bin`,
                    300
                );

        const firmware =
            await sb.storage
                .from("firmware")
                .createSignedUrl(
                    `${folder}/firmware.bin`,
                    300
                );

        if (
            bootloader.error ||
            partitions.error ||
            firmware.error
        ) {

            console.error(
                bootloader.error ||
                partitions.error ||
                firmware.error
            );

            document.getElementById(
                "status"
            ).innerText =
                "Failed loading firmware";

            return;
        }

        const manifest = {

            name:
                "ZYNTRIX Firmware",

            version:
                folder,

            builds: [

                {

                    chipFamily:
                        "ESP32",

                    parts: [

                        {

                            path:
                                bootloader.data.signedUrl,

                            offset:
                                4096
                        },

                        {

                            path:
                                partitions.data.signedUrl,

                            offset:
                                32768
                        },

                        {

                            path:
                                firmware.data.signedUrl,

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
            `Selected ${folder}`;

    } catch (
        error
    ) {

        console.error(
            error
        );

        document.getElementById(
            "status"
        ).innerText =
            "Firmware error";
    }
}

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        await loadReleases();

        if (
            document.getElementById(
                "firmwareSelect"
            ).value
        ) {

            updateManifest();
        }

        document
        .getElementById(
            "firmwareSelect"
        )
        .addEventListener(
            "change",
            updateManifest
        );

        document
        .getElementById(
            "refreshBtn"
        )
        .addEventListener(
            "click",
            loadReleases
        );
    }
);
