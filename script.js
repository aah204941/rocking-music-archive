function addAlbum() {

  const category = document.getElementById("category").value;
  const albumName = document.getElementById("albumName").value;
  const artistName = document.getElementById("artistName").value;
  const year = document.getElementById("year").value;
  const chart = document.getElementById("chart").value;
  const rank = document.getElementById("rank").value;
  const comment = document.getElementById("comment").value;
  const jacket = document.getElementById("jacket").files[0];

  if (albumName === "" || artistName === "") {
    alert("アルバム名とアーティスト名は入力してね");
    return;
  }

  const reader = new FileReader();

  reader.onload = function(event) {

    const imagePath = jacket ? event.target.result : "";

    const card = document.createElement("div");
    card.className = "album-card";

    card.innerHTML = `
      ${imagePath ? `<img src="${imagePath}" alt="ジャケット画像">` : `<div class="no-image">No Image</div>`}

      <h3>${albumName}</h3>

      <p>アーティスト：${artistName}</p>
      <p>発売年：${year}</p>
      <p>オリコン：${chart}</p>
      <p class="rank">評価：${rank}</p>

      <div class="comment-box">
${comment}
      </div>
    `;

    if (category === "japanese") {
      document.getElementById("japaneseList").appendChild(card);
    } else {
      document.getElementById("westernList").appendChild(card);
    }

    clearForm();
  };

  if (jacket) {
    reader.readAsDataURL(jacket);
  } else {
    reader.onload({ target: { result: "" } });
  }
}

function clearForm() {
  document.getElementById("albumName").value = "";
  document.getElementById("artistName").value = "";
  document.getElementById("year").value = "";
  document.getElementById("chart").value = "";
  document.getElementById("jacket").value = "";
  document.getElementById("rank").value = "S";
  document.getElementById("comment").value = "";
}