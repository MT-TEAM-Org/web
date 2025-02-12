export default async function fetchNewsData() {
  try {
    const response = await fetch(
      `http://52.79.222.87:8080/api/news?page=0&size=10&category=BASEBALL&orderType=DATE,COMMENT,VIEW`
    );
    if (!response.ok) throw new Error("데이터 불러오기 실패");
    const jsonData = await response.json();
    console.log("jsonData: ", jsonData.content);
    return console.log(jsonData.content);
  } catch (error) {
    console.error(error.message);
    return [];
  }
}
