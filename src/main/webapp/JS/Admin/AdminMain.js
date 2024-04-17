
let currentEditingId = null; // 현재 편집 중인 공지 ID를 저장
let isFormAdded = false; // 폼이 추가되었는지 확인하는 변수를 초기화합니다.
// 페이지가 로드될 때 사이드바의 상태를 설정합니다.

const sideMenu = document.querySelector('aside');
const menuBtn = document.querySelector('#menu_bar');
const closeBtn = document.querySelector('#close_btn');
const themeToggler = document.querySelector('.theme-toggler');

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


/*

$('aside .sidebar a').click(function() {
    if ($(this).find('h3').text() === '공지') {
        $('.notice_tbl').show();
        // Hide other tables here
    } else {
        $('.notice_tbl').hide();
    }
});

*/

$('.notice_tbl').hide();


$('aside .sidebar a').click(function() {
    const text = $(this).find('h3').text();
    switch (text) {
        case '공지':
            $('.notice_tbl').show();
            break;
        case '회원':
            $().show();
            break
        default:
            $('.notice_tbl').hide();
            break;
    }
});

$(document).ready(function() {

    const noticeTableTemplate = `
        <div class="notice_tbl" style="display: none;">
            <h1>공지글 목록</h1>
            <table>
                <thead>
                    <tr>
                        <th>글 번호</th>
                        <th>제목</th>
                        <th>내용</th>
                        <th>작성자</th>
                        <th>작성일</th>
                        <th>수정</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                
                </tbody>
            </table>
          
        </div>
    `;
    $('#insight-tbl').html(noticeTableTemplate);
    getNoticeList();

    const formTemplate = `
        <div class="notice-sub_tbl" style="display: none;">
            <form id="noticeForm">
                <table class="notice-sub">
                    <thead>
                        <tr><th class="sub-title" colspan="2">공지 작성</th></tr>
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
                            <td><textarea name="insertCont" class="insertCont"></textarea></td>
                        </tr>
                        <tr id="no-btn">
                            <td colspan="2">
                                <input class="notice-btn submit-btn" type="submit" value="등록">
                                <input class="notice-btn reset-btn" type="reset" value="취소">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    `;
    $('.notice_tbl').after(formTemplate);

    $(document).on('click', '.createNotice', function(e) {
        e.preventDefault();
        $('#noticeForm').find('.sub-title').text('공지 작성');
        $('#noticeForm').find('.insertTitle').val('');
        $('#noticeForm').find('.insertWriter').val('');
        $('#noticeForm').find('.insertCont').val('');
        $('#noticeForm').find('.submit-btn').val('등록');
        $('#noticeForm').data('noticeNo', null);
        $('.notice-sub_tbl').show();
    });

    $(document).on('click', '.noticeUpdate', function() {
        const row = $(this).closest('tr');
        $('#noticeForm').find('.sub-title').text('공지 수정');
        $('#noticeForm').find('.insertTitle').val(row.find('td:nth-child(2)').text());
        $('#noticeForm').find('.insertWriter').val(row.find('td:nth-child(3)').text());
        $('#noticeForm').find('.insertCont').val(row.find('td:nth-child(4)').text());
        $('#noticeForm').find('.submit-btn').val('수정');
        $('#noticeForm').data('noticeNo', row.find('td:first').text());
        $('.notice-sub_tbl').show();
    });

    $('#noticeForm').submit(function(e) {
        e.preventDefault();
        const formData = $(this).serialize();
        const isUpdate = $(this).find('.submit-btn').val() === '수정';
        const url = isUpdate ? 'admin_notice_update.go' : 'admin_notice_write.go';
        const noticeNo = isUpdate ? $(this).data('noticeNo') : undefined;

        $.ajax({
            url: url,
            type: 'POST',
            data: isUpdate ? formData + '&noticeNo=' + noticeNo : formData,
            success: function(data) {
                alert('공지가 ' + (isUpdate ? '수정' : '등록') + ' 되었습니다.');
                $('.notice-sub_tbl').hide(); // 폼 숨기기
                clearNoticeForm(); // 폼 초기화
                getNoticeList(); // 공지 목록 업데이트
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('공지 ' + (isUpdate ? '수정' : '등록') + '에 실패했습니다.');
                console.log('Error: ' + textStatus + ' ' + errorThrown);
            }
        });
    });

    function clearNoticeForm() {
        $('#noticeForm').find('.insertTitle').val('');
        $('#noticeForm').find('.insertWriter').val('');
        $('#noticeForm').find('.insertCont').val('');
        $('#noticeForm').find('.submit-btn').val('등록');
        $('#noticeForm').data('noticeNo', null); // 폼 관련 데이터도 초기화
    }
    $(document).on('click', '.reset-btn' , function(e) {
        e.preventDefault();
        clearNoticeForm();
        $('#noticeForm').hide();
    });

    $(document).on('click', '.createNotice', function(e) {
        e.preventDefault();
        clearNoticeForm(); // 폼 초기화 및 새 공지 작성으로 설정
        $('.notice-sub_tbl').show(); // 폼 보이기
    });

});

function getNoticeList() {
    $.ajax({
        url: 'admin_notice.go',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            const tbody = $('.notice_tbl table tbody');
            tbody.empty();
            $.each(data, function(index, {noticeCont, noticeWriter, noticeDate, noticeNo, noticeTitle}) {
                tbody.append(`
                    <tr>
                        <td>${noticeNo}</td>
                        <td>${noticeTitle}</td>
                        <td>${noticeWriter}</td>
                        <td>${noticeCont}</td>
                        <td>${noticeDate}</td>
                        <td><button class="noticeUpdate main">수정</button></td>
                        <td><button class="noticeDelete danger">삭제</button></td>
                    </tr>
                `);
            });
            tbody.append(`
                <tr>
                    <td colspan="6">
                        <a href="notice_post" class="createNotice">
                            <span><i class="bi bi-pencil-square"></i></span>
                            <h3>공지 작성</h3>
                        </a>
                    </td>
                </tr>
            `);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error loading notice list: ' + textStatus + ' ' + errorThrown);
        }
    });

    $(document).on('click', '.noticeDelete', function() {
        const noticeNo = $(this).closest('tr').children('td:first').text();

        $.ajax({
            url: 'admin_notice_delete.go',
            type: 'POST',
            data: { noticeNo: noticeNo },
            success: function(data) {
                alert('공지가 성공적으로 삭제되었습니다.');
                getNoticeList();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert('공지 삭제에 실패했습니다.');
                console.log('Error: ' + textStatus + ' ' + errorThrown);
            }
        });
    });
// =================================================================
}
