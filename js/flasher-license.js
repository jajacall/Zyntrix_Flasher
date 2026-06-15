async function consumeLicense() {

    if (!verifiedLicense)
        return;

    await sb
        .from("licenses")
        .update({
            used: true,
            used_at:
                new Date()
        })
        .eq(
            "license_key",
            verifiedLicense
        );

}
