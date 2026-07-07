//==============================
// Supabase
//==============================

const supabaseUrl =
"https://fvpizeenichgijtbyqcx.supabase.co";

const supabaseKey =
"sb_publishable_EwcP2tBXaNotvNEo7rcEGA_H57flY99";

const supabaseClient =
window.supabase.createClient(
    supabaseUrl,
    supabaseKey
);

//==============================
// アルバム追加
//==============================

async function addAlbum(){

    const category =
        document.getElementById("category").value;

    const albumName =
        document.getElementById("albumName").value.trim();

    const artistName =
        document.getElementById("artistName").value.trim();

    const year =
        Number(
            document.getElementById("year").value
        );

    const chart =
        Number(
            document.getElementById("chart").value
        );

    const rank =
        document.getElementById("rank").value;

    const comment =
        document.getElementById("comment").value;

    const jacket =
        document.getElementById("jacket").files[0];

    if(albumName===""||artistName===""){

        alert("アルバム名とアーティスト名を入力してください");

        return;

    }

    let imagePath="";

    if(jacket){

        imagePath =
        await new Promise(resolve=>{

            const reader =
            new FileReader();

            reader.onload=e=>{

                resolve(e.target.result);

            };

            reader.readAsDataURL(jacket);

        });

    }

    const album={

        genre:category,

        title:albumName,

        artist:artistName,

        year:year,

        oricon:chart,

        rating:rank,

        comment:comment,

        image_url:imagePath

    };

    const {error}=

    await supabaseClient

    .from("albums")

    .insert([album]);

    if(error){

        console.error(error);

        alert(error.message);

        return;

    }

    createCard(album);

    clearForm();

}

//==============================
// 一覧取得
//==============================

async function loadAlbums(){

    const {data,error}=

    await supabaseClient

    .from("albums")

    .select("*")

    .order("id",{ascending:false});

    if(error){

        console.error(error);

        return;

    }

    document.getElementById(
        "japaneseList"
    ).innerHTML="";

    document.getElementById(
        "westernList"
    ).innerHTML="";

    data.forEach(album=>{

        createCard(album);

    });

}
//==============================
// カード表示
//==============================

function createCard(album){

    const card =
        document.createElement("div");

    card.className =
        "album-card";

    card.innerHTML = `

        ${
            album.image_url
            ?
            `<img src="${album.image_url}" alt="ジャケット画像">`
            :
            `<div class="no-image">No Image</div>`
        }

        <h3>${album.title}</h3>

        <p>アーティスト：${album.artist}</p>

        <p>発売年：${album.year}</p>

        <p>オリコン順位：${album.oricon}</p>

        <p class="rank">
            評価：${album.rating}
        </p>

        <div class="comment-box">
            ${album.comment}
        </div>
		
		<button onclick="editAlbum(${album.id})">編集</button>
			<button onclick="deleteAlbum(${album.id})">削除</button>


    `;

    if(album.genre==="japanese"){

        document
            .getElementById("japaneseList")
            .appendChild(card);

    }else{

        document
            .getElementById("westernList")
            .appendChild(card);

    }

}

//==============================
// フォーム初期化
//==============================

function clearForm(){

    document.getElementById("category").value="japanese";

    document.getElementById("albumName").value="";

    document.getElementById("artistName").value="";

    document.getElementById("year").value="";

    document.getElementById("chart").value="";

    document.getElementById("rank").value="S";

    document.getElementById("comment").value="";

    document.getElementById("jacket").value="";

}

//==============================
// 初期処理
//==============================

document.addEventListener("DOMContentLoaded",()=>{

    document
        .getElementById("addButton")
        .addEventListener("click",addAlbum);

    loadAlbums();

});

// 削除
async function deleteAlbum(id) {

    if (!confirm("このアルバムを削除しますか？")) {
        return;
    }

    const { error } = await supabase
        .from("albums")
        .delete()
        .eq("id", id);

    if (error) {
        console.log(error);
        alert(JSON.stringify(error));
        return;
    }

    loadAlbums();
}

function editAlbum(id) {
    alert("編集機能は次に作ります。\nID：" + id);
}
