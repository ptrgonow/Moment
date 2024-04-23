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

    <!-- 구글 폰트 -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR&display=swap" rel="stylesheet">

    <!--  아이콘  -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css">

</head>


<body>

<div class="container">
    <div class="sidebar">
        <a href="#" class="logo">
            <i class="bi bi-journal-bookmark"></i>
            <div class="logo-name"><span>Our</span>Moment</div>
        </a>

        <ul class="side-menu">

            <li><a href="admin.go"><i class="bi bi-house"></i>홈</a></li>

            <li><a href="#"><i class="bi bi-megaphone"></i>공지</a></li>

            <li><a href="#"><i class="bi bi-cart4"></i>상점</a></li>

            <li><a href="#"><i class="bi bi-people"></i>회원</a></li>

            <li><a href="#"><i class="bi bi-journals"></i>다이어리</a></li>

            <li> <a href="#"><i class="bi bi-person-vcard"></i>관리자 목록</a></li>

            <li><a href="#"><i class="bi bi-person-add"></i>관리자 등록</a></li>

            <li><a href="#"><i class="bi bi-person-dash"></i>관리자 삭제</a></li>

        </ul>

        <ul class="side-menu">
            <li><a href="admin_logout.go" class="logout"><i class="bi bi-box-arrow-right"></i>로그아웃</a></li>
        </ul>
    </div>

    <div class="content">

        <nav>
            <i class="bi bi-list"></i>
            <form action="#" id="search-form">
                <div class="form-input">
                    <input type="search" placeholder="검색어를 입력하세요">
                    <button class="search-btn" type="submit"><i class="bi bi-search"></i></button>
                </div>
            </form>
            <input type="checkbox" id="theme-toggle" hidden>
            <label for="theme-toggle" class="theme-toggle"></label>
            <a href="#" class="notif">
                <i class="bi bi-bell"></i>
                <span class="count">12</span>
            </a>
            <p>${sessionScope.adminName}</p>
            <a href="#" class="profile">
<%--                <img src="/image/proooooooo.jpeg" alt="">--%>
            </a>
        </nav>

        <!-- End of Navbar -->

        <main>
            <div class="header">
                <div class="left">
                    <h1>Moment</h1>
                    <ul class="breadcrumb">
                        <li>다이어리</li>
                        /
                        <li>상점</li>
                    </ul>
                </div>
            </div>

            <!-- insights-product -->
            <ul class="insights-diary">
                <li>
                    <span class="info">
                        <h3>

                        </h3>
                        <p>등록 게시글</p>
                        <small>Last 24 Hour</small>
                    </span>
                </li>
                <li>
                    <span class="info">
                        <h3>

                        </h3>
                        <p>신규 가입자</p>
                        <small>Last 24 Hour</small>
                    </span>
                </li>
                <li>
                    <span class="info">
                        <h3>

                        </h3>
                        <p>공유 게시글</p>
                        <small>Last 24 Hour</small>
                    </span>
                </li>
                <li>
                    <span class="info">
                        <h3>

                        </h3>
                        <p>작성자</p>
                        <small>Last 24 Hour</small>
                    </span>
                </li>
            </ul>
            <!-- End of Insights -->

            <!-- insights-product -->
            <ul class="insights-product">
                <li>
                    <span class="info">
                        <h3>

                        </h3>
                        <p>등록 상품</p>
                        <small>Last 24 Hour</small>
                    </span>
                </li>
                <li>
                    <span class="info">
                        <h3>

                        </h3>
                        <p>총 방문자</p>
                        <small>Last 24 Hour</small>
                    </span>
                </li>
                <li>
                    <span class="info">
                        <h3>

                        </h3>
                        <p>총 주문량</p>
                        <small>Last 24 Hour</small>
                    </span>
                </li>
                <li>
                    <span class="info">
                        <h3>

                        </h3>
                        <p>총 판매액</p>
                        <small>Last 24 Hour</small>
                    </span>
                </li>
            </ul>
            <!-- End of Insights -->

            <div id="insight-tbl-notice" class="bottom-data"></div>
            <div id="insight-tbl-share" class="bottom-data"></div>
            <div id="insight-tbl-member" class="bottom-data"></div>
            <div id="insight-tbl-admin-add" class="bottom-data"></div>


            <div class="">
            </div>

        </main>
    </div>
</div>






<!-- Jquery -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
<script src="<c:url value="/JS/Admin/AdminMain.js"/>"></script>
<script src="<c:url value="/JS/Admin/AdminLogin.js"/>"></script>

</body>
</html>
