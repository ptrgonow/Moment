<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page contentType="text/html;charset=UTF-8" %>
<!DOCTYPE html>
<html lang="ko">
<head>
    <title>관리자 메인 페이지</title>


    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" type="text/css" href="<c:url value="/CSS/Admin/AdminMain.css"/>">

    <!-- 부트스트랩 -->
    <%--

     <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
     <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

     --%>
    <!-- 구글 폰트 -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap" rel="stylesheet">

    <!--  아이콘  -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">



</head>


<body>


<div class="container">

    <%-- aside section start --%>
    <aside>

        <%-- top start --%>
        <div class="top">
            <div class="logo">
                <h2>c<span class="main">moment</span> </h2>
            </div>

            <div class="close" id="close_btn">
                <span><i class="bi bi-x-lg"></i></span>
            </div>
        </div>

        <%-- top end --%>

        <div class="sidebar">

            <a href="admin.go">
                <span><i class="bi bi-house"></i></span>
                <h3>홈</h3>
            </a>

            <a href="#">
                <span><i class="bi bi-megaphone"></i></span>
                <h3>공지</h3>
            </a>

            <a href="#">
                <span><i class="bi bi-cart4"></i></span>
                <h3>상점</h3>
            </a>

            <a href="#">
                <span><i class="bi bi-people"></i></span>
                <h3>회원</h3>
            </a>

            <a href="#">
                <span><i class="bi bi-graph-up"></i></span>
                <h3>분석</h3>
            </a>

            <a href="#">
                <span><i class="bi bi-journals"></i></span>
                <h3>다이어리</h3>
            </a>

            <a href="#">
                <span><i class="bi bi-chat-right-dots"></i></span>
                <h3>메세지</h3>
                <span class="msg_count">15</span>
            </a>

            <a href="#">
                <span><i class="bi bi-person-vcard"></i></span>
                <h3>관리자 목록</h3>
            </a>

            <a href="#">
                <span><i class="bi bi-person-add"></i></span>
                <h3>관리자 등록</h3>
            </a>

            <a href="#">
                <span><i class="bi bi-person-dash"></i></span>
                <h3>관리자 삭제</h3>
            </a>

            <a href="#">
                <span><i class="bi bi-gear"></i></span>
                <h3>설정</h3>
            </a>

            <a href="#">
                <span><i class="bi bi-box-arrow-right"></i></span>
                <h3>로그아웃</h3>
            </a>

        </div>

    </aside>
    <%-- aside section end --%>


    <%-- main section start (Ajax)--%>
    <main>

        <h1>Moment</h1>
        <div class="date">
            <input type="date" id="currentDate">
        </div>
        <%-- insight start --%>
        <div class="insights">

            <%-- selling start --%>
            <div class="sales">
                <span><i class="bi bi-graph-up-arrow"></i></span>
                <div class="middle">
                    <div class="left">
                        <h3>총 판매액</h3>
                        <h1>2,954,500원</h1>
                    </div>

                </div>
                <small>Last 24 Hours</small>
            </div>
            <%-- selling end --%>

            <%-- selling start --%>
            <div class="expenses">
                <span><i class="bi bi-bag"></i></span>
                <div class="middle">
                    <div class="left">
                        <h3>지출액</h3>
                        <h1>1,164,500원</h1>
                    </div>

                </div>
                <small>Last 24 Hours</small>
            </div>
            <%-- selling end --%>

            <%-- selling start --%>
            <div class="income">
                <span><i class="bi bi-cash-coin"></i></span>
                <div class="middle">
                    <div class="left">
                        <h3>순 이익</h3>
                        <h1>455,500원</h1>
                    </div>

                </div>
                <small>Last 24 Hours</small>
            </div>
            <%-- selling end --%>
        </div>
        <%-- insight end --%>


        <%-- insight start --%>
        <div id="insight-tbl-notice"></div>
        <div id="insight-tbl-member"></div>
        <div id="insight-tbl-share"></div>
        <%-- insight end --%>


    </main>
    <%-- main section end --%>


    <%-- right section start --%>
    <div class="right">
        <div class="top">
            <button id="menu_bar">
                <span><i class="bi bi-three-dots"></i></span>
            </button>

            <div class="theme-toggler">
                <span class="active"><i class="bi bi-brightness-high"></i></span>
                <span><i class="bi bi-moon"></i></span>
            </div>
            <div class="profile">
                <div class="info">
                    <p><b>${sessionScope.adminName}</b></p>
                    <p>${sessionScope.adminId}</p>
                    <small class="text-muted"></small>
                </div>
                <div class="profile-photo">
                    <img src="/image/proooooooo.jpeg" height="50" width="50" alt=""/>
                </div>
            </div>
        </div>

        <div class="recent_updates">
            <h2>Recent Update</h2>
            <div class="updates">
                <div class="update">
                    <div class="profile-photo">
                        <img src="/image/profile.png" height="50" width="50" alt=""/>
                    </div>
                    <div class="message">
                        <p><b>Babar</b> Received his order of USB</p>
                    </div>
                </div>
                <div class="update">
                    <div class="profile-photo">
                        <img src="/image/profile.png" height="50" width="50" alt=""/>
                    </div>
                    <div class="message">
                        <p><b>Ali</b> Received his order of USB</p>
                    </div>
                </div>
                <div class="update">
                    <div class="profile-photo">
                        <img src="/image/profile.png" height="50" width="50" alt=""/>
                    </div>
                    <div class="message">
                        <p><b>amazon</b> Received his order of USB</p>
                    </div>
                </div>
            </div>
        </div>


        <div class="sales-analytics">
            <h2>Sales Analytics</h2>

            <div class="item online">
                <div class="icon">
                    <span><i class="bi bi-cart4"></i></span>
                </div>
                <div class="right_text">
                    <div class="info">
                        <h3>주문</h3>
                        <small class="text-muted">Last seen 2 Hours</small>
                    </div>
                    <h5 class="danger">-17%</h5>
                    <h3>3849</h3>
                </div>
            </div>
            <div class="item online">
                <div class="icon">
                    <span><i class="bi bi-cart4"></i></span>
                </div>
                <div class="right_text">
                    <div class="info">
                        <h3>주문</h3>
                        <small class="text-muted">Last seen 2 Hours</small>
                    </div>
                    <h5 class="success">-17%</h5>
                    <h3>3849</h3>
                </div>
            </div>
            <div class="item online">
                <div class="icon">
                    <span><i class="bi bi-cart4"></i></span>
                </div>
                <div class="right_text">
                    <div class="info">
                        <h3>주문</h3>
                        <small class="text-muted">Last seen 2 Hours</small>
                    </div>
                    <h5 class="danger">-17%</h5>
                    <h3>3849</h3>
                </div>
            </div>
        </div>

        <div class="item add_product">
            <div>
                <span class="material-symbols-sharp">add</span>
            </div>
        </div>

    </div>
</div>
<%-- right section end --%>

<!-- Jquery -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script src="<c:url value="/JS/Admin/AdminMain.js"/>"></script>
<script src="<c:url value="/JS/Admin/AdminLogin.js"/>"></script>

</body>
</html>
