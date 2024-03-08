/* Firebase SDK 라이브러리 가져오기 */
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { getDocs } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { deleteDoc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";
import { doc } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

/* Firebase 구성 정보 설정 */
const firebaseConfig = {
    apiKey: "AIzaSyChEcGiUv2M0enJ2kcc_T2rJTJnL2X3VlI",
    authDomain: "sparta-5ee34.firebaseapp.com",
    projectId: "sparta-5ee34",
    storageBucket: "sparta-5ee34.appspot.com",
    messagingSenderId: "243124035597",
    appId: "1:243124035597:web:811f227e81c0dd1fa7f544",
    measurementId: "G-D2MZ30JYR1"
    /* Firebase 본인정보*/
};

/* Firebase 인스턴스 초기화 */
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* 초기 카드 초기화*/
$('.slides').empty();

/* 초기 가입신청서 숨기기*/
$("#Addingbox").hide();

// '우리와함께할래' 버튼을 누르면 MemberAddingBox가 toggle 되고 글자가 바뀌는 코드
$("#togglebtn").click(async function () {
    $('#Addingbox').toggle();

    // 버튼의 지금 글자를 가져오는 코드
    const buttonText = $(this).text();

    // 버튼 글자 toggle 하는 코드
    if (buttonText === "우리와 함께할래?") {
        $(this).text("가입해주길 바래!");
    } else {
        $(this).text("우리와 함께할래?");
    }
})

/* 가입하기 버튼을 누르면 데이터 추가하는 코드 및 문구 띄우기 */
$("#joinbtn").click(async function () {
    let image = $('#image').val();
    let name = $('#name').val();
    let MBTI = $('#MBTI').val().toUpperCase();
    let Introduction = $('#Introduction').val();
    let advantage = $('#advantage').val();
    let Collaboration = $('#Collaboration').val();
    let blog = $('#blog').val();

    // 데이터 유효성검사
    if (!image) {
        alert('이미지 URL이 빠져있어! 빼먹지말고 적어줘!');
        return;
    }

    // 이미지 URL 데이터 유효성검사
    function imgURLcheck(imgUrldata) {
        let imagecheck = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
        return imagecheck.test(imgUrldata);
    }

    if (!imgURLcheck(image)) {
        alert("이미지 URL이 맞는지 꼭 확인해봐!");
        return;
    }

    if (!name) {
        alert('이름이 빠져있어! 빼먹지말고 적어줘!');
        return;
    }

    // MBTI 데이터 유효성검사
    function MBTIcheck(MBTIdata) {
        const MBTILIST = [
            "ISTJ", "ISTP", "ISFJ", "ISFP",
            "INTJ", "INTP", "INFJ", "INFP",
            "ESTJ", "ESTP", "ESFJ", "ESFP",
            "ENTJ", "ENTP", "ENFJ", "ENFP"
        ]
        return MBTILIST.includes(MBTIdata.toUpperCase());
    }

    if (!MBTI) {
        alert('MBTI가 빠져있어! 빼먹지말고 적어줘!');
        return;
    }

    if (!MBTIcheck(MBTI)) {
        alert("MBTI가 아닌거 같은데? 다시 확인해줘!");
        return;
    }

    if (!Introduction) {
        alert('자기소개가 빠져있어! 빼먹지말고 적어줘!');
        return;
    }

    if (!advantage) {
        alert('장점이 빠져있어! 빼먹지말고 적어줘!');
        return;
    }

    if (!Collaboration) {
        alert('스타일이 빠져있어! 빼먹지말고 적어줘!');
        return;
    }

    if (!blog) {
        alert('블로그 주소가 빠져있어! 빼먹지말고 적어줘!');
        return;
    }

    // 블로그 주소 데이터 유효성검사
    function blogURLcheck(blogUrldata) {
        let blogcheck = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;
        return blogcheck.test(blogUrldata);
    }

    if (!blogURLcheck(blog)) {
        alert("블로그 주소가 맞는지 꼭 확인해봐!")
        return;
    }

    let doc = {
        'image': image,
        'name': name,
        'MBTI': MBTI,
        'Introduction': Introduction,
        'advantage': advantage,
        'Collaboration': Collaboration,
        'blog': blog
    };

    await addDoc(collection(db, "member"), doc);
    alert('가입신청 완료!');
    window.location.reload();
})

/* 취소 버튼을 누르면 데이터입력칸이 비워지고 가입신청서 숨기는 코드*/
$("#canclebtn").click(async function () {
    $('#image').val('');
    $('#name').val('');
    $('#MBTI').val('');
    $('#Introduction').val('');
    $('#advantage').val('');
    $('#Collaboration').val('');
    $('#blog').val('');
    $("#Addingbox").hide();
    $("#togglebtn").text("우리와 함께할래?");
})

/* 추가한 데이터를 가지고 카드 추가하는 코드*/
let docs = await getDocs(collection(db, "member"));
docs.forEach((doc) => {
    let row = doc.data();
    let image = row['image'];
    let name = row['name'];
    let MBTI = row['MBTI'];
    let Introduction = row['Introduction'];
    let advantage = row['advantage'];
    let Collaboration = row['Collaboration'];
    let blog = row['blog'];

    // data-docid="${doc.id} << Firebase에서 해당 데이터를 식별하는데 사용
    let temp = `<li class="col">
        <div class="card h-100">
            <div class="image-top-button" data-docid="${doc.id}">
                <img src="${image}"
                class="card-img-top" alt="...">
                <button id="Delbtn" type="button" class="btn-close Delbtnstyle" aria-label="Close"></button>
            </div>
            <div class="card-body">
                <h5 class="card-title">${name}<button type="button" class="btn btn-outline-danger" disabled>${MBTI}</button></h5>
                <p class="card-text">${Introduction}</p>
                <p class="card-text">${advantage}</p>
                <p class="card-text">${Collaboration}</p>
            </div>
            <div class="card-footer">
                <small class="text-body-secondary"><a href=${blog}>${blog}</a></small>
            </div>
        </div>
    </li>`;
    $('.slides').append(temp);
});

const slides = document.querySelector('.slides'); //전체 슬라이드 컨테이너
const slideImg = document.querySelectorAll('.slides li'); //모든 슬라이드들
let currentIdx = 0; //현재 슬라이드 index
const slideCount = slideImg.length; // 슬라이드 개수
const prev = document.querySelector('.prev'); //이전 버튼
const next = document.querySelector('.next'); //다음 버튼
const slideWidth = 300; //한개의 슬라이드 넓이
const slideMargin = 120; //슬라이드간의 margin 값

$(".prev").click("load", function (event) {
    //전체 슬라이드 컨테이너 넓이 설정
    slides.style.width = (slideWidth + slideMargin) * slideCount + 'px';

    if (currentIdx !== 0) {
        slides.style.left = -(currentIdx - 1) * 420 + 'px';
        currentIdx = currentIdx - 1;
    }
})

$(".next").click("load", function (event) {
    //전체 슬라이드 컨테이너 넓이 설정
    slides.style.width = (slideWidth + slideMargin) * slideCount + 'px';

    if (currentIdx !== slideCount - 1) {
        slides.style.left = -(currentIdx + 1) * 420 + 'px';
        currentIdx = currentIdx + 1;
    }
})

// card라는 id태그를 가진 요소에 클릭 이벤트 리스너를 등록.
// card 내부에 어떤요소 [ex)삭제버튼]를 클릭할 때 실행
document.getElementById('slides').addEventListener('click', function (event) {
    // 클릭이벤트 요소가 실제로 존재하고 Delbtnstyle라는 class태그를 가진 요소가 존재한다면 deleteAlbum 함수를 호출
    if (event.target && event.target.classList.contains('Delbtnstyle')) {
        deleteAlbum(event.target);
    }
});

// deleteAlbum 함수를 정의하고 Firebase에 해당하는 데이터를 삭제 및 새로고침 하는 코드
function deleteAlbum(clickedButton) {
    // data-docid 속성을 통해 문서 ID를 가져옴
    const docId = clickedButton.parentNode.getAttribute('data-docid');

    // docId가 정의되어있고 confirm()함수를 통해 확인(true)하는 경우에만 문구를 띄우고 해당하는 데이터를 삭제하는 코드
    if (docId && confirm('정말 우리팀에서 나갈꺼야?ㅠㅠ')) {
        deleteDoc(doc(db, "member", docId))
            .then(() => {
                alert('아쉽지만 기회가 된다면 또 가입해줘!');
                // 웹페이지에 데이터 요소를 제거
                clickedButton.parentNode.parentNode.remove();
                // 화면 새로고침
                window.location.reload();
            });
    }
}
