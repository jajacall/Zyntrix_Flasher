const SUPABASE_URL =
    "https://pukkpjluyjrdqwusskfl.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_W5-_1mnFcHtY9-FOk4IA3w_MGREKs9u";

const sb =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );

let verifiedLicense = null;

async function verifyLicense() {

    const key =
        document
        .getElementById(
            "licenseKey"
        )
        .value
        .trim();

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

    console.log(error);

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

    if (
        data.used
    ) {

        alert(
            "License Already Used"
        );

        return;
    }

    verifiedLicense =
        data.license_key;

    document
    .getElementById(
        "flashButton"
    )
    .removeAttribute(
        "disabled"
    );

    document.getElementById(
        "status"
    ).innerText =
        "License Verified";

    alert(
        "License Verified"
    );
}

document
.getElementById(
    "verifyLicense"
)
.addEventListener(
    "click",
    verifyLicense
);
