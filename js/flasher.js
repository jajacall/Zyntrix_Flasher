function setStatus(text)
{
    document.getElementById("status").innerText=text;
}

window.addEventListener("error",e =>
{
    setStatus("Error: "+e.message);
});
