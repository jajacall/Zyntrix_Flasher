const flashButton =
    document.getElementById(
        "flashButton"
    );

flashButton.addEventListener(
    "state-changed",
    async (event) => {

        const state =
            event.detail.state;

        console.log(
            "ESP State:",
            state
        );

        if (
            state === "finished"
        ) {

            const success =
                await consumeLicense();

            if (success) {

                resetLicense();

                alert(
                    "Firmware flashed successfully. License consumed."
                );
            }
        }
    }
);
