const REPO_OWNER="jajacall";
const REPO_NAME="ZYNTRIX_Firmware_Flasher";

async function loadReleases()
{
    const select=document.getElementById("firmwareSelect");

    try
    {
        const response=
        await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/releases`
        );

        const releases=await response.json();

        select.innerHTML="";

        releases.forEach(release =>
        {
            const option=document.createElement("option");

            option.value=release.tag_name;
            option.textContent=release.tag_name;

            select.appendChild(option);
        });
    }
    catch(error)
    {
        select.innerHTML=
        "<option>Error Loading Releases</option>";
    }
}
