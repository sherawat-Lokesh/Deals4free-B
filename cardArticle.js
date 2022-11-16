

const CardArticle = ({ changeRoute: route }) => {
  fetch("http://localhost:8000/article", {
    method: "post",
    headers: { "content-Type": "application/json" },
    body: JSON.stringify({
      fileName: "../cardArticle/cardArticle",
    }),
  }).then((res) => console.log(res));

  return <div>hello welcome to react world</div>;
};
export default CardArticle;
