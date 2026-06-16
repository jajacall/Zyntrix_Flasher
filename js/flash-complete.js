window.addEventListener(
    "message",
    async (event) => {

        if (
            event.data?.type ===
            "flash-complete"
        ) {

            console.log(
                "Flash completed"
            );

            const success =
                await consumeLicense();

            if (success) {

                resetLicense();

                alert(
                    "Flash successful. License consumed. Enter a new license key for the next flash."
                );

            } else {

                alert(
                    "Firmware flashed but license could not be consumed."
                );
            }
        }
    }
);
