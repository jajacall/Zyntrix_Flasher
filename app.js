document.addEventListener("DOMContentLoaded",()=>
{
    loadReleases();

    document
    .getElementById("refreshBtn")
    .addEventListener("click",loadReleases);
});
