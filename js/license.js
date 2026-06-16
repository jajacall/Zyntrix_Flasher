let verifiedLicense = null;

/* -------------------------
   VERIFY LICENSE
------------------------- */

async function verifyLicense() {

    const key =
        document
            .getElementById("licenseKey")
            .value
            .trim();

    if (!key) {

        alert(
            "Please enter a license key"
        );

        return;
    }

    const { data, error } =
        await sb
            .from("licenses")
            .select("*")
            .eq(
                "license_key",
                key
            )
            .maybeSingle();

    if (error) {

        console.error(error);

        alert(
            "Supabase Error"
        );

        return;
    }

    if (!data) {

        alert(
            "Invalid License"
        );

        return;
    }

    if (data.used) {

        alert(
            "License Already Used"
        );

        return;
    }

    verifiedLicense =
        data.license_key;

    document
        .getElementById(
            "flashActivate"
        )
        .disabled = false;

    document
        .getElementById(
            "status"
        )
        .innerText =
        "License Verified";

    alert(
        "License Verified"
    );
}

/* -------------------------
   CONSUME LICENSE
------------------------- */

async function consumeLicense() {

    console.log(
        "Consuming license:",
        verifiedLicense
    );

    if (!verifiedLicense) {

        console.log(
            "No verified license"
        );

        return false;
    }

    const { data, error } =
        await sb
            .from("licenses")
            .update({
                used: true,
                used_at: new Date().toISOString()
            })
            .eq(
                "license_key",
                verifiedLicense
            )
            .select();

    console.log(
        "Consume result:",
        data,
        error
    );

    if (error) {
        return false;
    }

    return true;
}

/* -------------------------
   RESET LICENSE
------------------------- */

function resetLicense() {

    verifiedLicense = null;

    document
        .getElementById(
            "licenseKey"
        )
        .value = "";

    document
        .getElementById(
            "flashActivate"
        )
        .disabled = true;

    document
        .getElementById(
            "status"
        )
        .innerText =
        "Enter New License";
}

/* -------------------------
   EVENTS
------------------------- */

document
    .getElementById(
        "verifyLicense"
    )
    .addEventListener(
        "click",
        verifyLicense
    );

document
.getElementById(
    "flashActivate"
)
.addEventListener(
    "click",
    async (e) => {

        if (!verifiedLicense) {

            e.preventDefault();

            alert(
                "Verify license first"
            );

            return;
        }

        const success =
            await consumeLicense();

        if (!success) {

            e.preventDefault();

            alert(
                "Failed to consume license"
            );

            return;
        }

        resetLicense();

        console.log(
            "License consumed"
        );
    }
);

document.addEventListener(
    "DOMContentLoaded",
    () => {

        document
            .getElementById(
                "flashActivate"
            )
            .disabled = true;
    }
);
