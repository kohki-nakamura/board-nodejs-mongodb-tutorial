// get
const threadSectionDOM = document.querySelector(".thread-section");
const getAllThreads = async () => {
  try {
    let allThreads = await axios.get("/api/v1/threads");
    // console.log(allThreads);
    let { data } = allThreads;
    // console.log(data);

    threads_html = data.map((thread) => {
      const { title, content } = thread;
      // console.log(title, content);
      return `
        <div class="single-thread">
          <h3>${title}</h3>
          <p>${content}</p>
        </div>
      `;
    }).join(""); // カンマ削除
    threadSectionDOM.innerHTML = threads_html;
  } catch (err) {
    console.log(err);
  }
};
getAllThreads();

// post
const formDOM = document.querySelector(".form-section");
const inputTitleDOM = document.getElementById("inputTitle");
const inputContentDOM = document.getElementById("inputContent");
const submitButtonDOM = document.getElementById("submitButton");
let inputTitleText = "";
let inputContentText = "";

inputTitleDOM.addEventListener("change", (e) => {
  inputTitleText = e.target.value;
  // console.log(inputTitleText);
});

inputContentDOM.addEventListener("change", (e) => {
  inputContentText = e.target.value;
  // console.log(inputContentText);
});

formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (inputTitleText && inputContentText) {
    // console.log("add data");
    try {
      await axios.post("/api/v1/threads", {
        title: inputTitleText,
        content: inputContentText,
      });
      getAllThreads();
    } catch (err) {
      console.log(err);
    }
  }
});