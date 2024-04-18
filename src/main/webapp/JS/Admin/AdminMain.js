document.getElementById('currentDate').value = new Date().toISOString().substring(0, 10);

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

function hideAll() {
    $('.notice-tbl, .notice-sub-tbl, .admin-tbl, .admin-cont-tbl').hide();
}

$('aside .sidebar a').click(function() {
    const text = $(this).find('h3').text();
    hideAll();
    switch (text) {
        case '공지':
            $('.notice-tbl').show();
            break;
        case '관리자 목록':
            $('.admin-tbl').show();
            break;
    }
});

// =========================== 공지 ======================================

$(document).ready(function () {

    const noticeTableTemplate = `
        <div class="notice-tbl" style="display: none;">
            <h1>공지사항</h1>
            <table>
                <thead>
                    <tr>
                        <th>글 번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>내용</th>
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

    $('#insight-tbl-notice').html(noticeTableTemplate);
    getNoticeList();

    function getNoticeList() {
        $.ajax({
            url: 'admin_notice.go',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                const tbody = $('.notice-tbl table tbody');
                tbody.empty();
                $.each(data, function (index, {noticeCont, noticeWriter, noticeDate, noticeNo, noticeTitle}) {
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
                        <span class="createNotice"><i class="bi bi-pencil-square"></i><h3>공지 작성</h3></span>
                    </td>
                </tr>
            `);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('Error loading notice list: ' + textStatus + ' ' + errorThrown);
            }
        });

    }
    const formTemplate = `
        <div class="notice-sub-tbl" style="display: none;">
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
    function clearNoticeForm() {
        $('#noticeForm').find('.insertTitle').val('');
        $('#noticeForm').find('.insertWriter').val('');
        $('#noticeForm').find('.insertCont').val('');
        $('#noticeForm').find('.submit-btn').val('등록');
        $('#noticeForm').data('noticeNo', null); // 폼 관련 데이터도 초기화
    }

    $('.notice-tbl').after(formTemplate);

    $(document).on('click', '.createNotice', function (e) {
        e.preventDefault();
        $('#noticeForm').find('.sub-title').text('공지 작성');
        $('#noticeForm').find('.insertTitle').val('');
        $('#noticeForm').find('.insertWriter').val('');
        $('#noticeForm').find('.insertCont').val('');
        $('#noticeForm').find('.submit-btn').val('등록');
        $('#noticeForm').data('noticeNo', null);
        $('.notice-sub-tbl').show();
    });

    $(document).on('click', '.noticeUpdate', function () {
        const row = $(this).closest('tr');
        clearNoticeForm(); // 폼 초기화
        $('#noticeForm').find('.sub-title').text('공지 수정');
        $('#noticeForm').find('.insertTitle').val(row.find('td:nth-child(2)').text());
        $('#noticeForm').find('.insertWriter').val(row.find('td:nth-child(3)').text());
        $('#noticeForm').find('.insertCont').val(row.find('td:nth-child(4)').text());
        $('#noticeForm').find('.submit-btn').val('수정');
        $('#noticeForm').data('noticeNo', row.find('td:first').text());
        $('.notice-sub-tbl').show();
    });

    $('#noticeForm').submit(function (e) {
        e.preventDefault();
        const formData = $(this).serialize();
        const isUpdate = $(this).find('.submit-btn').val() === '수정';
        const url = isUpdate ? 'admin_notice_update.go' : 'admin_notice_write.go';
        const noticeNo = isUpdate ? $(this).data('noticeNo') : undefined;

        $.ajax({
            url: url,
            type: 'POST',
            data: isUpdate ? formData + '&noticeNo=' + noticeNo : formData,
            success: function (data) {
                alert('공지가 ' + (isUpdate ? '수정' : '등록') + ' 되었습니다.');
                $('.notice-sub-tbl').hide(); // 폼 숨기기
                clearNoticeForm(); // 폼 초기화
                getNoticeList(); // 공지 목록 업데이트
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('공지 ' + (isUpdate ? '수정' : '등록') + '에 실패했습니다.');
                console.log('Error: ' + textStatus + ' ' + errorThrown);
            }
        });
    });

    $(document).on('click', '.reset-btn', function (e) {
        e.preventDefault();
        clearNoticeForm();
        $('.notice-sub-tbl').hide(); // 폼의 부모 컨테이너를 숨김
    });

    $(document).on('click', '.createNotice', function (e) {
        e.preventDefault();
        clearNoticeForm(); // 폼 초기화 및 새 공지 작성으로 설정
        $('.notice-sub-tbl').show(); // 폼 보이기
        console.log('폼 제출 완료');
    });

    $(document).on('click', '.noticeDelete', function () {
        const noticeNo = $(this).closest('tr').children('td:first').text();

        $.ajax({
            url: 'admin_notice_delete.go',
            type: 'POST',
            data: {noticeNo: noticeNo},
            success: function (data) {
                alert('공지가 성공적으로 삭제되었습니다.');
                getNoticeList();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert('공지 삭제에 실패했습니다.');
                console.log('Error: ' + textStatus + ' ' + errorThrown);
            }
        });
    });
});


// =========================== 관리자 목록 ======================================


$(document).ready(function() {

    const memberTableTemplate = `
        <div class="admin-tbl" style="display: none;">
            <h1>관리자 목록</h1>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>이름</th>
                        <th>아이디</th>
                        <th>등급</th>
                        <th>팀</th>
                    </tr>
                </thead>
                <tbody>
                
                </tbody>
            </table>
          
        </div>
    `;

    const AdminContTemplate = `
   
        <div class="admin-cont-tbl" style="display: none;">
            <table>
                <tr>
                    <th>이름</th>
                    <td></td>
                </tr>
                <tr>
                    <th>아이디</th>
                    <td></td>
                </tr>
                    <tr>
                    <th>연락처</th>
                    <td></td>
                </tr>
                <tr>
                    <th>주소</th>
                    <td></td>
                </tr>
                <tr>
                    <th>생년월일</th>
                    <td></td>
                </tr>
                <tr>
                    <th>현재팀</th>
                    <td></td>
                </tr>
                <tr>
                    <th>관리등급</th>
                    <td></td>
                </tr>
                <tr>
                    <td colspan="2">
                        <input class="close-btn" type="button" value="닫기">
                    </td>
                </tr>
            </table>
        </div>
       `;

    $('#insight-tbl-member').html(memberTableTemplate);
    getMemberList();

    function getMemberList() {
        $.ajax({
            url: 'admin_list.go',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                const tbody = $('.admin-tbl table tbody');
                tbody.empty();
                $.each(data, function(index, {adminId, adminName, adminGrade, adminTeam, adminNo}) {
                    tbody.append(`
                    <tr>
                        <td>${adminNo}</td>
                        <td class="admin-cont">${adminName}</td>
                        <td>${adminId}</td>
                        <td>${adminGrade}</td>
                        <td>${adminTeam}</td>
                    </tr>
                `);
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error loading member list: ' + textStatus + ' ' + errorThrown);
            }
        });


        $('.admin-tbl').after(AdminContTemplate);

        $('.admin-tbl table tbody').on('click', 'tr', function(e) {
            e.preventDefault();
            // 클릭된 행의 관리자 번호를 가져옵니다.
            const adminNo = $(this).find('td:first').text();
            // 관리자 상세 정보를 가져옵니다.
            getAdminCont(adminNo);
        });

        function getAdminCont(adminNo) {
            $.ajax({
                url: 'admin_cont.go',
                type: 'GET',
                data: { adminNo: adminNo },
                dataType: 'json',
                success: function ({adminAddr, adminBirth, adminGrade, adminId, adminName, adminPhone, adminTeam}) {
                    const values = [
                        adminName, adminId, adminPhone, adminAddr, adminBirth, adminTeam, adminGrade
                    ];
                    // 서버로부터 받아온 관리자의 상세 정보를 HTML 템플릿에 채워 넣습니다.
                    $('.admin-cont-tbl td').each(function(index) {
                        $(this).text(values[index]);
                        // 관리자 상세 정보 테이블을 보이게 합니다.
                        $('.admin-tbl').hide();
                        $('.admin-cont-tbl').show();
                    });
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log('관리자 상세정보 호출 실패: ' + textStatus + ' ' + errorThrown);
                }
            });
        }

        $(document).on('click', '.close-btn', function() {
            $('.admin-tbl').show();
            $('.admin-cont-tbl').hide();
        });





























        $(document).on('click', '.memberDelete', function() {
            const memberNo = $(this).closest('tr').children('td:first').text();

            $.ajax({
                url: 'admin_member_delete.go',
                type: 'POST',
                data: { memberNo: memberNo },
                success: function(data) {
                    alert('관리자가 성공적으로 삭제되었습니다.');
                    getMemberList();
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    alert('관리자 삭제에 실패했습니다.');
                    console.log('Error: ' + textStatus + ' ' + errorThrown);
                }
            });
        });
    }










});
