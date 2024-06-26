

// 개발기간 표시
window.onload = function() {
    // 현재 날짜를 가져옵니다.
    let currentDate = new Date();

    // 날짜를 원하는 형식으로 변환합니다.
    let year = currentDate.getFullYear();
    let month = String(currentDate.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줍니다.
    let day = String(currentDate.getDate()).padStart(2, '0');

    let formattedDate = `${year}.${month}.${day}`;

    // HTML 요소를 선택하고, 텍스트 내용을 업데이트합니다.
    let developmentPeriodElement = document.querySelector('.devTime');
    developmentPeriodElement.textContent = `개발기간 : 2024.04.03 ~ ${formattedDate}`;
}

// 마우스가 페이지 최하단에 위치했을 때 footer 를 보여주는 이벤트
window.addEventListener('mousemove', function(e) {
    let isMouseInFooter = false;
    let hideFooterTimeout;

    const footer = document.querySelector('.footer-container');

    footer.addEventListener('mouseover', function() {
        isMouseInFooter = true;
        footer.classList.add('show');
    });

    footer.addEventListener('mouseout', function() {
        isMouseInFooter = false;
        // 마우스가 푸터 영역에서 벗어났을 때 500ms 후에 푸터를 숨깁니다.
        hideFooterTimeout = setTimeout(() => {
            if (!isMouseInFooter) {
                footer.classList.remove('show');
            }
        }, 1000);
    });


    window.addEventListener('mousemove', function(e) {
        if (e.clientY >= (window.innerHeight - window.innerHeight * 0.05)) { // 마우스가 페이지 하단 5vh 영역에 위치했는지 확인
            clearTimeout(hideFooterTimeout); // 푸터를 숨기는 타이머를 취소합니다.
            footer.classList.add('show'); // .show 클래스 추가
        } else if (!isMouseInFooter) {
            footer.classList.remove('show'); // .show 클래스 제거
        }
    });
});



// 페이지가 열리면 로그인 폼의 아이디 인풋칸에 커서가 자동으로 위치하게 하는 이벤트
document.addEventListener('DOMContentLoaded', (event) => {
    const useridInput = document.querySelector('.userId');
    useridInput.focus();
});

// 모든 Picture 요소를 선택합니다.
const pictures = document.querySelectorAll('.Picture');
let previousTouch = undefined;

// 이미지를 드래그하는 이벤트
function updateElementPosition(element, event) {
    let movementX, movementY;

    // 터치 이벤트와 마우스 이벤트를 구분하여 드래그 이벤트를 처리
    if (event.type === 'touchmove') {
        const touch = event.touches[0];
        movementX = previousTouch ? touch.clientX - previousTouch.clientX : 0;
        movementY = previousTouch ? touch.clientY - previousTouch.clientY : 0;
        previousTouch = touch;
    } else {
        movementX = event.movementX;
        movementY = event.movementY;
    }

    // 이미지를 드래그하는 이벤트
    const elementY = parseInt(element.style.top || 0) + movementY;
    const elementX = parseInt(element.style.left|| 0) + movementX;

    element.style.top = elementY + "px";
    element.style.left = elementX + "px";
}

// 드래그 이벤트를 시작하는 함수
function startDrag(element, event) {
    const updateFunction = (event) => updateElementPosition(element, event);
    const stopFunction = () => stopDrag({update: updateFunction, stop: stopFunction});
    document.addEventListener("mousemove", updateFunction);
    document.addEventListener("touchmove", updateFunction);
    document.addEventListener("mouseup", stopFunction);
    document.addEventListener("touchend", stopFunction);
}

// 드래그 이벤트를 멈추는 함수
function stopDrag(functions) {
    previousTouch = undefined;
    document.removeEventListener("mousemove", functions.update);
    document.removeEventListener("touchmove", functions.update);
    document.removeEventListener("mouseup", functions.stop);
    document.removeEventListener("touchend", functions.stop);
}

// 이미지를 랜덤한 방향으로 돌려주는 이벤트
pictures.forEach(picture => {
    const range = 100;
    const randomX = Math.random() * (range * 2) - range;
    const randomY = Math.random() * (range * 2) - range;
    const randomRotate = Math.random() * (range / 2) - range / 4;
    const startFunction = (event) => startDrag(picture, event);
    picture.style.top = `${randomY}px`;
    picture.style.left = `${randomX}px`;
    picture.style.transform = `translate(-50%, -50%) rotate(${randomRotate}deg)`;
    picture.addEventListener("mousedown", startFunction);
    picture.addEventListener("touchstart", startFunction);

    // 로그인 폼을 클릭하면 랜덤한 방향으로 돌아 갔던 이미지가 원래대로 돌아오게 하는 이벤트
    const loginImgDiv = document.querySelector('.Picture.login');

    loginImgDiv.addEventListener('click', () => {
        loginImgDiv.style.transform = 'translate(-50%, -50%) rotate(0deg)';

    });
});

// login-container 의 모든 input 요소를 선택합니다.
const loginInputs = document.querySelectorAll('.login-container input');
const signupInputs = document.querySelectorAll('.signup-container input');

// 각 input 요소에 mousedown 이벤트 리스너를 추가합니다.
loginInputs.forEach(input => {
    input.addEventListener('mousedown', (event) => {
        event.stopPropagation(); // mousedown 이벤트의 전파를 중단 (버블링 방지)
        // mousedown 이벤트가 부모 요소(사진)에게 전달되지 않아, 드래그 이벤트를 시작하는 것을 막을 수 있다
    });
});
signupInputs.forEach(input => {
    input.addEventListener('mousedown', (event) => {
        event.stopPropagation();
    });
});

// 로그인 화면과 회원가입 화면을 전환하는 이벤트
document.addEventListener('DOMContentLoaded', (event) => {
    const signupPencil = document.querySelector('.s-btn .bi-pencil');
    const loginPencil = document.querySelector('.l-btn .bi-pencil');
    const loginContainer = document.querySelector('.login-container');
    const signupContainer = document.querySelector('.signup-container');
    const useridInput = document.querySelector('.user_id');
    const signupIdInput = document.querySelector('.sign-id');
    const sBtn = document.querySelector('.s-btn');
    const lBtn = document.querySelector('.l-btn');

    if (signupPencil) {
        signupPencil.addEventListener('click', () => {
            loginContainer.style.opacity = '0';
            setTimeout(() => {
                loginContainer.style.display = 'none';
                signupContainer.style.display = 'block';
                setTimeout(() => {
                    signupContainer.style.opacity = '1';
                    signupIdInput.focus();
                }, 50);
            }, 500);
            sBtn.style.display = 'none';
            lBtn.style.display = 'block';
        });
    }

    if (loginPencil) {
        loginPencil.addEventListener('click', () => {
            signupContainer.style.opacity = '0';
            setTimeout(() => {
                signupContainer.style.display = 'none';
                loginContainer.style.display = 'block';
                setTimeout(() => {
                    loginContainer.style.opacity = '1';
                    useridInput.focus();
                }, 50);
            }, 500);
            sBtn.style.display = 'block';
            lBtn.style.display = 'none';

        });
    }
});


// 로그인 폼을 제출하는 이벤트

$('#loginForm').on('submit', function(e) {
    e.preventDefault();

    const userId = $('#userId').val();
    const userPwd = $('#userPwd').val();

    $.ajax({
        url: "user_login.go",
        type: "POST",
        data: {
            userId: userId,
            userPwd: userPwd
        },
        success: function(response) {
            const userName = response;
            console.log(userName);
            sessionStorage.setItem('userName', userName);
            alert('로그인 성공');
            window.location.href = "user_main.go";
        },
        error: function() {
            // 로그인 실패
            alert('아이디 또는 비밀번호가 틀렸습니다.');
        }
    });
});
