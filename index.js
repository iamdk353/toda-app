document.addEventListener("DOMContentLoaded", getAll);
const formDom = document.getElementById("createPost");
const inputVal = document.getElementById("inputVal");
const status = document.getElementById("status");
const main = document.getElementById("allTasks");

const statusUpdate = (ele, style) => {
  if (ele !== "loading") {
    console.log("not loading");
    setTimeout(() => {
      status.innerText = "";
    }, 1000);
  }
  if (!style) style = "gray";
  status.style.color = style;
  status.innerText = ele + "......";
  return;
};

inputVal.addEventListener("keydown", (e) => {
  if (e.key.length === 1) statusUpdate("typing", "", 500);
});

formDom.addEventListener("submit", (e) => {
  e.preventDefault();
  statusUpdate("posting", "green");
  postData();
});

function render(data) {
  let text = ``;

  data.forEach((i) => {
    text += `<div class=" bg-gray-100 flex h-[6vh] mb-3 justify-center">
      <p class="flex-1 text-center  text-xs md:text-lg px-2" id="mainCont">${i.content}</p>
      <button class="w-[6vh] bg-gray-200 rounded-sm h-[5vh] hover:bg-red-600 grid place-content-center hover:text-white hidden md:grid" id="" onclick=deleteData("${i._id}")>
      <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
      <!--  delete icon -->
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z" />
      </svg>
    </button>
      <a href="./edit.html?id=${i._id}">
      <button class="w-[6vh] bg-gray-200 rounded-sm h-[5vh] ml-2 hover:bg-gray-300 grid place-content-center mr-2 hidden md:grid">
        <svg fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
        </svg>
      </button>
      <button class="w-[6vh] bg-gray-200 rounded-sm h-[5vh] ml-2 hover:bg-gray-300 grid place-content-center mr-2 md:hidden">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
</svg>

      </button>
      </a>
    </div>`;
  });
  statusUpdate("rendering tasks", "green");
  main.innerHTML = text;
}
async function getAll() {
  statusUpdate("loading");
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
    return;
  }
}
async function postData() {
  try {
    content = inputVal.value;
    const postObj = JSON.stringify({ content });
    const response = await fetch(
      `https://todo-api-7t4e.onrender.com/api/v1/tasks`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: postObj,
      }
    );
    const data = await response.json();
    console.log(data);
    statusUpdate("posted successfully", "green");
    inputVal.value = "";
    getAll();
  } catch (error) {
    statusUpdate("error while posting", "red");
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
