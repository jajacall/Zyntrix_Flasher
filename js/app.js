async function updateManifest() {

    const folder =
        document.getElementById(
            "firmwareSelect"
        ).value;

    const baseName =
        `ZYNTRIX_${folder}.ino`;

    console.log(
        "Loading firmware:",
        folder
    );

    try {

        const bootloader =
            await sb.storage
                .from("firmware")
                .createSignedUrl(
                    `${folder}/${baseName}.bootloader.bin`,
                    300
                );

        const partitions =
            await sb.storage
                .from("firmware")
                .createSignedUrl(
                    `${folder}/${baseName}.partitions.bin`,
                    300
                );

        const firmware =
            await sb.storage
                .from("firmware")
                .createSignedUrl(
                    `${folder}/${baseName}.bin`,
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

        console.log(
            "Bootloader URL:",
            bootloader.data.signedUrl
        );

        console.log(
            "Firmware URL:",
            firmware.data.signedUrl
        );

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

        const installer =
            document.querySelector(
                "esp-web-install-button"
            );

        installer.removeAttribute(
            "manifest"
        );

        installer.setAttribute(
            "manifest",
            manifestURL
        );

        document.getElementById(
            "status"
        ).innerText =
            `Selected ${folder}`;

        console.log(
            "Manifest Updated:",
            folder
        );

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

        const select =
            document.getElementById(
                "firmwareSelect"
            );

        if (
            select.value
        ) {

            await updateManifest();
        }

        select.addEventListener(
            "change",
            async () => {

                await updateManifest();

                console.log(
                    "Version changed:",
                    select.value
                );
            }
        );

        document
            .getElementById(
                "refreshBtn"
            )
            .addEventListener(
                "click",
                async () => {

                    await loadReleases();

                    await updateManifest();
                }
            );
    }
);
