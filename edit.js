const params = window.location.search;
const id = new URLSearchParams(params).get("id");
const form = document.querySelector("#editFrom");
const status = document.getElementById("status");
const delBtn = document.getElementById("delBtn");
delBtn.addEventListener("click", () => {
  deleteData(id);
});
const statusUpdate = (ele) => {
  status.innerText = ele + "......";
  setTimeout(() => {
    status.innerText = "";
  }, 1500);
  return;
};
statusUpdate("");

async function getSingle() {
  url = `https://todo-api-7t4e.onrender.com/api/v1/tasks/${id}`;
  const resp = await fetch(url);
  const data = await resp.json();
  console.log(data);
  document.getElementById("editInp").value = data.content;
  statusUpdate("rendering...");
}
form.addEventListener("submit", (e) => {
  e.preventDefault();
  content = document.getElementById("editInp").value;
  const obj = JSON.stringify({ content });
  putData(obj);
});
getSingle();

async function putData(obj) {
  try {
    const resp = await fetch(
      `https://todo-api-7t4e.onrender.com/api/v1/tasks/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: obj,
      }
    );
    const data = await resp.json();
    document.getElementById("editInp").value = "";
    console.log(data);
    statusUpdate("updating ...");
    setTimeout(() => {
      statusUpdate("redirecting to home ");
    }, 1700);
    setTimeout(() => {
      window.location.href = "./index.html";
    }, 2000);
  } catch (error) {
    console.log(error);
  }
}
async function deleteData(id) {
  try {
    await fetch(`https://todo-api-7t4e.onrender.com/api/v1/tasks/${id}`, {
      method: "DELETE",
    });
    statusUpdate("deleted successfully", "blue");
    getAll();
  } catch (error) {
    statusUpdate("error while deleting", "red");
  }
}
async function getAll() {
  try {
    const resp = await fetch("https://todo-api-7t4e.onrender.com/api/v1/tasks");
    const data = await resp.json();
    if (data.length === 0) {
      console.log("data is empty");
      main.innerHTML = `
      <div class=" bg-gray-100 flex h-[6vh] mb-1 justify-center">
      <p class="flex-1 text-center text-red-400" id="mainCont" >NO DATA IN CLOUD</p>
      </div>`;
      statusUpdate("no data available", "red");
      return;
    }
    render(data);
  } catch (error) {
    statusUpdate("error while fetching ", "red");
    // setTimeout(() => {
    //   location.reload();
    // }, 4000);
    statusUpdate("error while fetching ", "red");
    return;
  }
}
