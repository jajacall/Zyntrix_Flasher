const SUPABASE_URL =
    "https://pukkpjluyjrdqwusskfl.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_W5-_1mnFcHtY9-FOk4IA3w_MGREKs9u";

const sb =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );

let firmwareData = {};

async function loadReleases() {

    const select =
        document.getElementById(
            "firmwareSelect"
        );

    try {

        select.innerHTML =
            "<option>Loading...</option>";

        const { data, error } =
            await sb
                .from(
                    "firmware_versions"
                )
                .select("*")
                .eq(
                    "active",
                    true
                )
                .order(
                    "created_at",
                    {
                        ascending: false
                    }
                );

        if (error) {

            console.error(
                error
            );

            throw error;
        }

        select.innerHTML = "";

        firmwareData = {};

        if (
            !data ||
            data.length === 0
        ) {

            select.innerHTML =
                "<option>No Firmware Available</option>";

            return;
        }

        data.forEach(
            (
                fw
            ) => {

                const option =
                    document.createElement(
                        "option"
                    );

                option.value =
                    fw.folder_name;

                option.textContent =
                    fw.version;

                select.appendChild(
                    option
                );

                firmwareData[
                    fw.folder_name
                ] = fw;
            }
        );

    } catch (
        error
    ) {

        console.error(
            error
        );

        select.innerHTML =
            "<option>Error Loading Firmware</option>";
    }
}
