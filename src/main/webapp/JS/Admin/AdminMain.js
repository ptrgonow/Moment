let currentEditingId = null; // 현재 편집 중인 공지 ID를 저장
let isFormAdded = false; // 폼이 추가되었는지 확인하는 변수를 초기화합니다.

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


// 중앙 인사이트 토글러 (다이어리 / 상점 active 추가)
document.addEventListener('DOMContentLoaded', (event) => {
    const diaryLink = document.querySelector('.breadcrumb li:nth-child(1)');
    const shopLink = document.querySelector('.breadcrumb li:nth-child(2)');
    const diaryInsights = document.querySelector('.insights-diary');
    const shopInsights = document.querySelector('.insights-product');

    diaryLink.addEventListener('click', function(e) {
        e.preventDefault();
        diaryLink.classList.add('active');
        shopLink.classList.remove('active');
        diaryInsights.style.display = 'grid';
        shopInsights.style.display = 'none';
    });

    shopLink.addEventListener('click', function(e) {
        e.preventDefault();
        shopLink.classList.add('active');
        diaryLink.classList.remove('active');
        shopInsights.style.display = 'grid';
        diaryInsights.style.display = 'none';
    });
});


// =========================== 사이드 바 액션 ======================================

function hideAll() {
    $(
        '.notice-list, .notice-sub-list,' +
        '.admin-list, .admin-cont-list,' +
        '.share-list, .share-cont-list' +
        '.admin-add-list'

    ).hide();
}

$('ul.side-menu a').click(function() {
    const text = $(this).text();
    hideAll();
    switch (text) {
        case '공지':
            $('.notice-list').show();
            break;
        case '다이어리':
            $('.share-list').show();
            break;
        case '관리자 목록':
            $('.admin-list').show();
            break;
        case '관리자 등록':
            $('.admin-add-list').show();
            break;
    }
});



// =========================== 인사이트 정보 ===============================

$(document).ready(function() {
    $.ajax({
        url: 'insight_info.go',
        type: 'GET',
        dataType: 'json',
        success: function(data) {
            // 서버에서 반환된 데이터를 사용하여 페이지 업데이트
            $('.insights-diary li:nth-child(1) h3').text(data.todayDiaryCount + ' 건');
            /*$('.insights-diary li:nth-child(2) h3').text(data.NewMember + ' 명');
            $('.insights-diary li:nth-child(3) h3').text(data.totalShare + ' 건');*/
            $('.insights-diary li:nth-child(4) h3').text(data.todayWriteCount + ' 명');

           /* $('.insights-product li:nth-child(1) h3').text(data.totalProduct + ' 개');
            $('.insights-product li:nth-child(2) h3').text(data.totalGuest + ' 명');
            $('.insights-product li:nth-child(3) h3').text(data.totalOrder + ' 건');
            $('.insights-product li:nth-child(4) h3').text(data.totalSales + ' 원');*/

            // 갱신
            
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('Error: ' + textStatus + ' ' + errorThrown);
        }
    });
});



// =========================== 공지 ======================================

$(document).ready(function () {

    let currentPage = 1;
    const pageSize = 5;
    let lastPage = 1;

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
            data: { page: currentPage, size: pageSize },
            dataType: 'json',
            success: function (data) {
                const ul = $('.notice-list ul');
                ul.empty();
                const {noticeList, currentPageSize} = data;
                $.each(noticeList, function (index, {noticeCont, noticeWriter, noticeDate, noticeNo, noticeTitle}) {
                    ul.append(`
                        <li>
                            <p class="noticeNo">${noticeNo}</p>
                            <p class="noticeTitle">${noticeTitle}</p>
                            <p class="noticeWriter">${noticeWriter}</p>
                            <p class="noticeCont">${noticeCont}</p>
                            <p class="noticeDate">${noticeDate}</p>
                            <div>
                                <button class="noticeUpdate">수정</button>
                                <button class="noticeDelete">삭제</button>
                            </div>
                        </li>
                    `);
                });
                ul.append(`
                <div class="page-btn">
                    <span id="pageNumbers"></span>
                </div>
                <div class="createNotice">
                    <span><i class="bi bi-pencil-square create-btn"></i><p class="create-btn">공지 작성</p></span>
                </div>
        `);
                ({lastPage} = data);  // 서버에서 반환한 마지막 페이지 번호를 저장
                updatePageNumbers(currentPageSize);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('Error loading notice list: ' + textStatus + ' ' + errorThrown);
            }
        });
    }

    function updatePageNumbers(currentPageSize) {
        const pageNumbers = $('#pageNumbers');
        pageNumbers.empty();

        // '처음' 버튼 추가
        pageNumbers.append(`<button class="pageNumber first" data-page="1">처음</button>`);
        // '<' 버튼 추가
        if (currentPage > 1) {
            pageNumbers.append(`<button class="pageNumber" data-page="${currentPage - 1}"><</button>`);
        }

        // 페이지 번호 버튼 추가
       let startPage = Math.max(1, (Math.ceil(currentPage / pageSize) - 1) * pageSize + 1);
	   let endPage = Math.min(startPage + pageSize - 1, lastPage);


		for (let i = startPage; i <= endPage; i++) {
        if (i <= lastPage) { // 마지막 페이지를 초과하는 페이지 번호는 출력하지 않음
            if (i === currentPage) {
                pageNumbers.append(`<button class="pageNumber current" data-page="${i}">${i}</button>`);
            } else {
                pageNumbers.append(`<button class="pageNumber other" data-page="${i}">${i}</button>`);
            }
          }
    	}

        // '>' 버튼 추가
        if (currentPageSize >= 5) {
            pageNumbers.append(`<button class="pageNumber" data-page="${currentPage + 1}">></button>`);
        }

        // '마지막' 버튼 추가
        pageNumbers.append(`<button class="pageNumber last" data-page="last">마지막</button>`);
    }

    $(document).on('click', '.pageNumber', function() {
        const page = $(this).data('page');

        if (page === 'last') {
            currentPage = lastPage;
        } else {
            currentPage = parseInt(page);
        }
        getNoticeList();
    });

    const formTemplate = `
        <div class="notice-sub-list">
            <form id="noticeForm">
                <h2>공지 작성</h2>
                <ul class="notice-sub">
                    <li>
                        <p>제목</p>
                        <input type="text" name="insertTitle" class="insertTitle">
                    </li>
                    <li>
                        <p>작성자</p>
                        <input type="text" name="insertWriter" class="insertWriter">
                    </li>
                    <li>
                        <p>내용</p>
                        <textarea name="insertCont" class="insertCont"></textarea>
                    </li>
                    <li>
                        <div class="sub-btn">
                            <input class="submit-btn" type="submit" value="등록">
                            <input class="reset-btn" type="reset" value="취소">
                        </div>
                    </li>
                </ul>
            </form>
        </div>
    `;

    function clearNoticeForm() {
        $('.notice-sub-list').find('.insertTitle').val('');
        $('.notice-sub-list').find('.insertWriter').val('');
        $('.notice-sub-list').find('.insertCont').val('');
        $('.notice-sub-list').find('.submit-btn').val('등록');
        $('.notice-sub-list').data('noticeNo', null); // 폼 관련 데이터도 초기화
    }

    $('.notice-list').after(formTemplate);

    $(document).on('click', '.create-btn', function (e) {
        e.preventDefault();
        clearNoticeForm(); // 폼 초기화 및 새 공지 작성으로 설정
        $('.notice-list').hide();
        $('.notice-sub-list').show();
    });

    $(document).on('click', '.noticeUpdate', function () {
        const row = $(this).closest('li');
        clearNoticeForm(); // 폼 초기화
        $('.notice-sub-list').find('.sub-title').text('공지 수정');
        $('.notice-sub-list').find('.insertTitle').val(row.find('.noticeTitle').text());
        $('.notice-sub-list').find('.insertWriter').val(row.find('.noticeWriter').text());
        $('.notice-sub-list').find('.insertCont').val(row.find('.noticeCont').text());
        $('.notice-sub-list').find('.submit-btn').val('수정');
        $('.notice-sub-list').data('noticeNo', row.find('.noticeNo').text());
        $('.notice-list').hide();
        $('.notice-sub-list').show();
    });

    $('#noticeForm').submit(function (e) {
        e.preventDefault();
        const formData = $(this).serialize();
        const isUpdate = $(this).find('.submit-btn').val() === '수정';
        const url = isUpdate ? 'admin_notice_update.go' : 'admin_notice_write.go';
        const noticeNo = isUpdate ? $(this).closest('.notice-sub-list').data('noticeNo') : undefined;

        $.ajax({
            url: url,
            type: 'POST',
            data: isUpdate ? formData + '&noticeNo=' + noticeNo : formData,
            success: function (data) {
                alert('공지가 ' + (isUpdate ? '수정' : '등록') + ' 되었습니다.');
                $('.notice-sub-list').hide(); // 폼 숨기기
                clearNoticeForm(); // 폼 초기화
                getNoticeList(); // 공지 목록 업데이트
                $('.notice-list').show();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(noticeNo, isUpdate)
                alert('공지 ' + (isUpdate ? '수정' : '등록') + '에 실패했습니다.');
                console.log('Error: ' + textStatus + ' ' + errorThrown);
                console.log('Server response:', jqXHR.responseText);
            }
        });
    });

    $(document).on('click', '.reset-btn', function (e) {
        e.preventDefault();
        clearNoticeForm();
        $('.notice-sub-list').hide();    // 폼의 부모 컨테이너를 숨김
        $('.notice-list').show();        // 공지 목록을 보여줌
    });

    $(document).on('click', '.noticeDelete', function () {
        const noticeNo = $(this).closest('li').find('.noticeNo').text();

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

    const memberListTemplate = `
    <div class="admin-list">
        <h2>관리자</h2>
        <ul>
        </ul>
    </div>
`;

    const AdminContTemplate = `
    <div class="admin-cont-list">
        <h2>상세 정보</h2>
        <ul>
        </ul>
    </div>
`;

    $('#insight-tbl-member').html(memberListTemplate);
    getMemberList();

    function getMemberList() {
        $.ajax({
            url: 'admin_list.go',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                const ul = $('.admin-list ul');
                ul.empty();
                $.each(data, function(index, {adminId, adminName, adminGrade, adminTeam, adminNo}) {
                    ul.append(`
                <li>
                    <p class="adminNo">${adminNo}</p>
                    <p class="adminName">${adminName}</p>
                    <p class="adminId">${adminId}</p>
                    <p class="adminGrade">${adminGrade}</p>
                    <p class="adminTeam">${adminTeam}</p>
                </li>
                `);
                });
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error loading member list: ' + textStatus + ' ' + errorThrown);
            }
        });

        $('.admin-list').after(AdminContTemplate);

        $('.admin-list').on('click', 'li', function(e) {
            e.preventDefault();
            const adminNo = $(this).find('.adminNo').text();
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
                    const ul = $('.admin-cont-list ul');
                    ul.empty();
                    ul.append(`
                        <li>
                            <p class="adminName">이름</p>${adminName}
                            <p class="adminId">아이디</p>${adminId}
                        </li>
                        <li>
                            <p class="adminTeam">부서</p>${adminTeam}
                            <p class="adminGrade">직급</p>${adminGrade}
                            
                        </li>
                        <li>
                            <p class="adminBirth">생년월일</p>${adminBirth}
                            <p class="adminPhone">연락처</p>${adminPhone}
                            <p class="adminAddr">주소</p>${adminAddr}
                        </li>
                    `);
                    $('.admin-list').hide();
                    $('.admin-cont-list').show();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log('관리자 상세정보 호출 실패: ' + textStatus + ' ' + errorThrown);
                }
            });
        }

        $(document).on('click', '.close-btn', function() {
            $('.admin-list').show();
            $('.admin-cont-list').hide();
        });

        $(document).on('click', '.memberDelete', function() {
            const memberNo = $(this).closest('li').find('.adminNo').text();

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
    const shareListTemplate = `
    <div class="share-list" >
        <h2>게시글 목록</h2>
        <ul>
        </ul>
    </div>
`;

// 공유 게시판 상세정보 폼 템플릿
    const shareContTemplate = `
    <div class="share-cont-list">
        <h2>게시글 상세 정보</h2>
        <ul>
        </ul>
    </div>
`;

    $('#insight-tbl-share').html(shareListTemplate);
    getShareList();

    function getShareList() {
        $.ajax({
            url: 'admin_board.go',
            type: 'GET',
            dateType: 'json',
            success: function (data) {
                const ul = $('.share-list ul');
                ul.empty();
                $.each(data, function (index, {boardNo, boardTitle, boardWriter, boardDate}) {
                    ul.append(`
                <li>
                    <p class="boardNo">${boardNo}</p>
                    <p class="boardTitle">${boardTitle}</p>
                    <p class="boardWriter">${boardWriter}</p>
                    <p class="boardDate">${boardDate}</p>
                </li>
                `);
                });
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log('Error loading member list: ' + textStatus + ' ' + errorThrown);
            }
        });

        $('.share-list').after(shareContTemplate);

        $('.share-list').on('click', 'li', function() {
            const boardNo = $(this).closest('li').find('.boardNo').text();
            getShareCont(boardNo);
        });

        function getShareCont(boardNo) {
            $.ajax({
                url: 'admin_board_cont.go',
                type: 'GET',
                data: { boardNo: boardNo },
                dataType: 'json',
                success: function ({boardNo, boardTitle, boardWriter, boardCont, boardDate}) {
                    const values = [
                        boardNo, boardTitle, boardWriter, boardCont, boardDate];
                    const ul = $('.share-cont-list ul');
                    ul.empty();
                    ul.append(`
                        <li>
                            <p class="boardTitle">${boardTitle}</p>
                            <p class="boardWriter">${boardWriter}</p>
                            <p class="boardDate">${boardDate}</p>
                            <p class="boardCont">${boardCont}</p>
                        </li>
                       
                `);
                    $('.share-list').hide();
                    $('.share-cont-list').show();
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log('상세 다이어리 호출 실패: ' + textStatus + ' ' + errorThrown);
                }
            });
        }
    }
});

// =========================== 관리자 등록 =================================

$(document).ready(function() {

    const adminAddTemplate = `
        <div class="admin-add-list" style="display: none;">
            <form action="admin_member_add.go" method="post">
                <h2>관리자 등록</h2>
                    <ul>
                       
                    </ul>
            </form>
    `;

    $('#insight-tbl-admin-add').html(adminAddTemplate);
    getAdminInfo();

    function getAdminInfo() {
        $.ajax({
            url: 'admin_column.go',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                const ul = $('.admin-add-list ul');
                ul.empty(); // 기존에 있는 폼 삭제

                let gradeOptions = '<option value="">등급 선택</option>';
                let teamOptions = '<option value="">팀 선택</option>';
                let uniqueTeams = [...new Set(data["teams"])]; // 중복된 팀 이름 제거
                let uniqueGrades = [...new Set(data["grades"])]; // 중복된 직급 제거

                $(document).ready(function() {
                    // 팀 선택 박스에 옵션 설정
                    $('.team').html(teamOptions);

                    // 직접입력 텍스트 박스 숨기기
                    $('#directBox').hide();

                    $('.team').change(function () {
                        if ( $(this).val() === 'custom' ) {
                            // 직접입력이 선택되면 텍스트 박스 보이기
                            $('#directBox').show();
                        } else {
                            // 그 외의 옵션이 선택되면 텍스트 박스 숨기기
                            $('#directBox').hide();
                        }
                    });
                });

                uniqueTeams.forEach(function(team) {
                    teamOptions += `<option value="team">${team}</option>`;
                });
                teamOptions += '<option value="custom">직접입력</option>'; // 직접입력 옵션 추가

                uniqueGrades.forEach(function(grade) {
                    gradeOptions += `<option value="grade">${grade}</option>`;
                });

                // 폼을 한 번만 추가
                ul.append(`
                    <li>
                        <input type="text" class="id" name="adminId" placeholder="아이디">
                    </li>
                    <li>
                        <input type="password" class="pwd" name="adminPwd" placeholder="비밀번호">
                    </li>
                    <li>
                        <input type="text" class="name" name="adminName" placeholder="이름">
                    </li>
                    <li>
                        <input type="text" class="phone" name="adminPhone" placeholder="전화번호">
                    </li>
                    <li>
                        <input type="text" class="addr" name="adminAddr" placeholder="주소">
                    </li>
                    <li>
                        <input type="date" class="birth" name="adminBirth" placeholder="생년월일">
                    </li>
                    <li>
                        <select id="selbox" class="team" name="adminTeam">
                            ${teamOptions}
                        </select>
                        <input type="text" id="directBox" class="team" name="directBoxTeam" placeholder="부서명을 입력하세요">
                    </li>
                    <li>
                        <select class="grade" name="adminGrade">
                            ${gradeOptions}
                        </select>
                    </li>
                    <li>
                        <input type="submit" value="등록">
                    </li>
                `);
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('Error loading member list: ' + textStatus + ' ' + errorThrown);
            }
        });




        $('#insight-tbl-admin-add').on('submit', 'form', function(e) {
            $.ajax({


            //     민영이가 할 부분 입니다.


            });
        });
    }





});