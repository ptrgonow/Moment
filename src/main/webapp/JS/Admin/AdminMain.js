let currentEditingId = null; // 현재 편집 중인 공지 ID를 저장
let isFormAdded = false; // 폼이 추가되었는지 확인하는 변수를 초기화합니다.
// 페이지가 로드될 때 사이드바의 상태를 설정합니다.

// =========================== 화면 설정 ======================================
document.addEventListener('DOMContentLoaded', (event) => {
    const sideLinks = document.querySelectorAll('.sidebar .side-menu li a:not(.logout)');
    const menuBar = document.querySelector('.content nav .bi.bi-list');
    const sideBar = document.querySelector('.sidebar');
    const searchBtn = document.querySelector('.content nav form .form-input button');
    const searchBtnIcon = document.querySelector('.content nav form .form-input button .bi');
    const searchForm = document.querySelector('.content nav form');
    const toggler = document.getElementById('theme-toggle');

    if(sideLinks) {
        sideLinks.forEach(item => {
            const li = item.parentElement;
            item.addEventListener('click', () => {
                sideLinks.forEach(i => {
                    i.parentElement.classList.remove('active');
                })
                li.classList.add('active');
            })
        });
    }

    if(menuBar && sideBar) {
        menuBar.addEventListener('click', () => {
            sideBar.classList.toggle('close');
        });
    }

    if(searchBtn && searchBtnIcon && searchForm) {
        searchBtn.addEventListener('click', function (e) {
            if (window.innerWidth < 576) {
                e.preventDefault();
                searchForm.classList.toggle('show');
                searchBtnIcon.classList.toggle('bi-search');
                searchBtnIcon.classList.toggle('bi-x');
            }
        });
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth < 768) {
            sideBar.classList.add('close');
        } else {
            sideBar.classList.remove('close');
        }
        if (window.innerWidth > 576) {
            searchBtnIcon.classList.add('bi-search');
            searchBtnIcon.classList.remove('bi-x');
            searchForm.classList.remove('show');
        }
    });

    if(toggler) {
        toggler.addEventListener('change', function () {
            document.body.classList.toggle('dark', this.checked);
        });
    }
});


function hideAll() {
    $('.notice-list, .notice-sub-tbl, .admin-tbl, .admin-cont-tbl,' +
        '.share-tbl, .share-cont-tbl').hide();
}
$('ul.side-menu a').click(function() {
    const text = $(this).text();
    hideAll();
    switch (text) {
        case '공지':
            $('.notice-list').show();
            break;
        case '다이어리':
            $('.share-tbl').show();
            break;
        case '관리자 목록':
            $('.admin-tbl').show();
            break;
        // 추가적으로 필요한 경우에는 여기에 더 많은 case 문을 추가할 수 있습니다.
    }
});


// =========================== 공지 ======================================

$(document).ready(function () {

    const noticeListTemplate = `
    <div class="notice-list">
        <h2>공지사항</h2>
        <ul>
        </ul>
    </div>
    `;

    $('#insight-tbl-notice').html(noticeListTemplate);
    getNoticeList();

    function getNoticeList() {
        $.ajax({
            url: 'admin_notice.go',
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                const ul = $('.notice-list ul');
                ul.empty();
                $.each(data, function (index, {noticeCont, noticeWriter, noticeDate, noticeNo, noticeTitle}) {
                    ul.append(`
                        <li>
                            <p class="noticeNo">${noticeNo}</p>
                            <p class="noticeTitle">${noticeTitle}</p>
                            <p class="noticeWriter">${noticeWriter}</p>
                            <p class="noticeCont">${noticeCont}</p>
                            <p class="noticeDate">${noticeDate}</p>
                            <div>
                                <button class="noticeUpdate main">수정</button>
                                <button class="noticeDelete danger">삭제</button>
                            </div>
                        </li>
                    `);
                });
                ul.append(`
                        <div class="createNotice">
                             <li>
                                <span><i class="bi bi-pencil-square"></i><p>공지 작성</p></span>
                            </li>
                        </div>
                       
                    `);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('Error loading notice list: ' + textStatus + ' ' + errorThrown);
            }
        });
    }

    const formTemplate = `
        <div class="notice-sub-tbl" style="display: none;">
            <form>
                <table>
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
                            <td><textarea name="insertCont" class="insertCont"></textarea></td>
                        </tr>
                        <tr>
                            <td colspan="2">
                                <input class="submit-btn" type="submit" value="등록">
                                <input class="reset-btn" type="reset" value="취소">
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    `;
    function clearNoticeForm() {
        $('.notice-sub').find('.insertTitle').val('');
        $('.notice-sub').find('.insertWriter').val('');
        $('.notice-sub').find('.insertCont').val('');
        $('.notice-sub').find('.submit-btn').val('등록');
        $('.notice-sub').data('noticeNo', null); // 폼 관련 데이터도 초기화
    }

    $('.notice-list').after(formTemplate);

    $(document).on('click', '.createNotice', function (e) {
        e.preventDefault();
        $('.notice-sub').find('.sub-title').text('공지 작성');
        $('.notice-sub').find('.insertTitle').val('');
        $('.notice-sub').find('.insertWriter').val('');
        $('.notice-sub').find('.insertCont').val('');
        $('.notice-sub').find('.submit-btn').val('등록');
        $('.notice-sub').data('noticeNo', null);
        $('.notice-list').hide();
        $('.notice-sub-tbl').show();
    });

    $(document).on('click', '.noticeUpdate', function () {
        const row = $(this).closest('tr');
        clearNoticeForm(); // 폼 초기화
        $('.notice-sub').find('.sub-title').text('공지 수정');
        $('.notice-sub').find('.insertTitle').val(row.find('td:nth-child(2)').text());
        $('.notice-sub').find('.insertWriter').val(row.find('td:nth-child(3)').text());
        $('.notice-sub').find('.insertCont').val(row.find('td:nth-child(4)').text());
        $('.notice-sub').find('.submit-btn').val('수정');
        $('.notice-sub').data('noticeNo', row.find('td:first').text());
        $('.notice-list').hide();
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
        $('.notice-sub-tbl').hide();    // 폼의 부모 컨테이너를 숨김
        $('.notice-list').show();        // 공지 목록을 보여줌
    });

    $(document).on('click', '.createNotice', function (e) {
        e.preventDefault();
        clearNoticeForm(); // 폼 초기화 및 새 공지 작성으로 설정
        $('.notice-sub-tbl').show(); // 폼 보이기
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


// =========================== 관리자 목록 =================================


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

// =========================== 게시판 목록 =================================

$(document).ready(function() {

    // 공유 게시판 리스트 템플릿
    const shareTableTemplate = `
        <div class="share-tbl" style="display: none;">
            <h1>게시글 목록</h1>
            <table>
                <thead>
                    <tr>
                        <th>글 번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                
                </tbody>
            </table>
        </div>
    `;
    // 공유 게시판 상세정보 폼 템플릿
    const shareContTemplate = `
        <div class ="share-cont-tbl" style="display: none;">
            <h1>게시글 상세 정보</h1>
            <table>
                <tr>
                    <th>글 번호</th>
                    <td></td>
                </tr>
                <tr>
                    <th>제목</th>
                    <td></td>
                </tr>
                    <tr>
                    <th>작성자</th>
                    <td></td>
                </tr>
                <tr>
                    <th>내용</th>
                    <td></td>
                </tr>
                <tr>
                    <th>작성일</th>
                    <td></td>
                </tr>
                <tr>
                    <td colspan="2">
                        <input class="share-list-btn" type="button" value="목록">
                        <input class="share-delete-btn" type="button" value="삭제">
                    </td>
                </tr>
            </table>
        </div>
    `;

    $('#insight-tbl-share').html(shareTableTemplate);
    getShareList();

    function getShareList() {
        $.ajax({
            url: 'admin_board.go',
            type: 'GET',
            dateType: 'json',
            success: function (data) {
                const tbody = $('.share-tbl table tbody');
                tbody.empty();
                $.each(data, function (index, {boardNo, boardTitle, boardWriter, boardDate}) {

                    tbody.append(`
                    <tr>
                        <td>${boardNo}</td>
                        <td>${boardTitle}</td>
                        <td>${boardWriter}</td>
                        <td>${boardDate}</td>
                        <td><input type="button" class="board-cont-btn" value="상세정보"></td>
                    </tr>
                    `);
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('Error loading member list: ' + textStatus + ' ' + errorThrown);
            }
        });

        $('.share-tbl').after(shareContTemplate);

        $('.share-tbl').on('click', '.board-cont-btn', function() {
            // 클릭된 행의 첫 번째 셀(번호)의 텍스트를 가져옵니다.
            const boardNo = $(this).closest('tr').find('td:first').text();
            // 가져온 번호를 매개변수로 getShareCont 함수를 호출합니다.
            getShareCont(boardNo);
        });

        function getShareCont(boardNo) {
            $.ajax({
                url: 'admin_board_cont.go',
                type: 'GET',
                data: { boardNo: boardNo },
                dataType: 'json',
                success: function ({boardNo, boardTitle, boardWriter, boardCont, boardDate}) {
                    console.log(boardNo, boardTitle, boardWriter, boardDate);
                    const values = [
                        boardNo, boardTitle, boardWriter, boardCont, boardDate];
                    $('.share-cont-tbl td').each(function (index){
                        $(this).text(values[index]);
                        $('.share-tbl').hide();
                        $('.share-cont-tbl').show();
                    });

                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log('상세 다이어리 호출 실패: ' + textStatus + ' ' + errorThrown);
                }
            });
        }
    }
});
