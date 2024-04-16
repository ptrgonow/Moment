const sideMenu = document.querySelector('aside');
const menuBtn = document.querySelector('#menu_bar');
const closeBtn = document.querySelector('#close_btn');
const themeToggler = document.querySelector('.theme-toggler');

// 페이지가 로드될 때 사이드바의 상태를 설정합니다.
window.onload = () => {
    if (window.innerWidth <= 768) {
        sideMenu.style.display = "none";
    } else {
        sideMenu.style.display = "block";
    }
};

menuBtn.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
        sideMenu.style.display = "block";
    }
});

closeBtn.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
        sideMenu.style.display = "none";
    }
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        sideMenu.style.display = "block";
    } else {
        sideMenu.style.display = "none";
    }
});

themeToggler.addEventListener('click',()=>{
    document.body.classList.toggle('dark-theme-variables')
    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active')
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active')

    // 다크 모드가 활성화되어 있다면, localStorage 에 상태를 저장합니다.
    if (document.body.classList.contains('dark-theme-variables')) {
        localStorage.setItem('darkMode', 'false');
    } else {
        localStorage.setItem('darkMode', 'true');
    }
});

// 페이지가 로드될 때 다크 모드 상태를 확인하고 적용합니다.
window.onload = () => {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.remove('dark-theme-variables');
        themeToggler.querySelector('span:nth-child(1)').classList.add('active');
        themeToggler.querySelector('span:nth-child(2)').classList.remove('active');
    } else {
        document.body.classList.add('dark-theme-variables');
        themeToggler.querySelector('span:nth-child(1)').classList.remove('active');
        themeToggler.querySelector('span:nth-child(2)').classList.add('active');
    }
};

// 모든 링크를 선택합니다.
const links = document.querySelectorAll('aside .sidebar a');

// 각 링크에 이벤트 리스너를 추가합니다.
for (let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function() {
        // 먼저, 모든 링크에서 'active' 클래스를 제거합니다.
        for (let i = 0; i < links.length; i++) {
            links[i].classList.remove('active');
        }

        // 클릭된 링크에 'active' 클래스를 추가합니다.
        this.classList.add('active');
    });
}

// 공지사항 리스트를 불러오는 함수
function getNoticeList() {
    $.ajax({
        url: 'admin_notice.go',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            const tbody = $('.notice_tbl table tbody');
            tbody.empty();

            $.each(data, function(index, {noticeCont, noticeDate, noticeNo, noticeTitle}) {

                const tr =  `
                    <tr>
                        <td>${noticeNo}</td>
                        <td>${noticeTitle}</td>
                        <td>${noticeCont}</td>
                        <td>${noticeDate}</td>
                        <td id="noticeUpdate" class="main">수정</td>
                        <td id="noticeDelete" class="danger">삭제</td>
                    </tr>
                    `;

                tbody.append(tr);
            });

            // 공지사항 작성 링크 추가
            tbody.append(`
                <tr>
                    <td colspan="6">
                        <a href="notice_post">
                            <span><i class="bi bi-pencil-square"></i></span>
                            <h3>공지 작성</h3>
                        </a>
                    </td>
                </tr>
            `);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + textStatus + ' ' + errorThrown);
        }
    });
}

/*
    공지 눌렀을 때 공지사항 테이블 보이게 하기
*/

const noticeTableTemplate = `
    <div class="notice_tbl">
        <h1>공지글 목록</h1>
        <table>
            <thead>
                <tr>
                    <th>글 번호</th>
                    <th>제목</th>
                    <th>내용</th>
                    <th>작성일</th>
                </tr>
            </thead>
            <tbody>

            </tbody>
        </table>
    </div>
`;

$(document).ready(function() {

    $('.notice_tbl').hide();

    $('aside .sidebar a').click(function() {
        if ($(this).find('h3').text() === '공지') {
            $('.notice_tbl').show();
            // Hide other tables here
        } else {
            $('.notice_tbl').hide();
        }
    });

    // HTML 요소에 템플릿 삽입
    $('#insight-tbl').html(noticeTableTemplate);

    getNoticeList();

    const formTemplate = `
    <div class="notice-sub_tbl">
        <form id="noticeForm">
            <table class="notice-sub">
                <thead>
                    <tr>
                        <th colspan="2">공지 작성</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>제목</th>
                        <td><input type="text" name="insertTitle" class="insertTitle"></td>
                    </tr>
                    <tr>
                        <th>작성자</th>
                        <td><input type="text" name="insertWriter" class="insertWriter"></td>
                    </tr>
                    <tr>
                        <th>내용</th>
                        <td><textarea name="insertCont"></textarea></td>
                    </tr>
                    <tr>
                        <td><input class="notice-btn" type="submit" value="등록"></td>
                        <td><input class="notice-btn" type="reset" value="취소"></td>
                    </tr>
                </tbody>
            </table>
        </form>
    </div>
`;

    let isFormAdded = false;
    const noticeForm = $('#noticeForm');

// "공지 작성" 링크를 클릭하면 폼의 가시성 전환
    $('.notice_tbl').on('click', 'a[href="notice_post"]', function(e) {
        e.preventDefault();
        noticeForm.toggle();

        // 폼이 보이는 경우, 폼 내의 모든 입력 필드를 초기화
        if (noticeForm.is(':visible')) {
            noticeForm.find('input[type="text"], textarea').val('');
        }

        // 폼이 아직 추가되지 않았다면, 폼을 추가
        if (!isFormAdded) {
            $('.notice_tbl').append(formTemplate);
            isFormAdded = true;
        }
    });

// 폼 제출 처리
    $('body').on('submit', '#noticeForm', function(e) {
        e.preventDefault(); // 기본 폼 제출 방지

        // 폼 데이터 수집
        const formData = $(this).serialize();

        // AJAX를 사용하여 폼 데이터를 서버에 전송
        $.ajax({
            url: 'admin_notice_write.go',
            type: 'POST',
            data: formData,
            success: function(data) {
                alert('공지가 등록 되었습니다.');
                $('#noticeForm').hide();
                getNoticeList();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('공지 등록에 실패했습니다.');
                console.log('Error: ' + textStatus + ' ' + errorThrown);
            }
        });
    });

    $(document).on('click', '#noticeUpdate', function() {
        // '수정' 버튼이 클릭되면 실행할 코드를 여기에 작성합니다.
        // 아직 아무런 동작도 수행하지 않습니다.
    });

    $(document).on('click', '#noticeDelete', function() {
        const noticeNo = $(this).siblings().first().text();

        $.ajax({
            url: 'admin_notice_delete.go',
            type: 'POST',
            data: { noticeNo : noticeNo },
            success: function(data) {
                // 삭제가 성공적으로 이루어졌음을 알립니다.
                alert('공지가 성공적으로 삭제되었습니다.');
                getNoticeList();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error: ' + textStatus + ' ' + errorThrown);
            }
        });
    });
});
