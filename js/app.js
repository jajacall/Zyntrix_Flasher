document.addEventListener("DOMContentLoaded", () => {

    loadReleases();

    document
        .getElementById("refreshBtn")
        .addEventListener("click", loadReleases);

    document
        .getElementById("firmwareSelect")
        .addEventListener("change", updateManifest);

});
