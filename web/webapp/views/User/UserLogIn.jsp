<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--
  Created by IntelliJ IDEA.
  User: patrick
  Date: 24. 4. 9.
  Time: 오후 3:54
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Moment</title>
    <link rel="stylesheet" type="text/css" href="/CSS/User/UserLogIn.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Nanum+Pen+Script&display=swap" rel="stylesheet">

</head>

<body>


<div class="Container">

    <!-- last card -->

    <div class="Picture">
        <img class="Picture-img" src="<c:url value="/image/logoprint.svg"/>" alt=""/>
        <div class="Picture-note"><span>Moment-<a class="Network" href="admin.go" target="_top"><img src="https://cdn-icons-png.flaticon.com/512/2111/2111501.png" alt="네이버" /></a><a class="Network" href="admin_login.go" target="_top"><img src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-logo-vector-png-clipart-1.png" alt="twitter" /></a></span></div>
    </div>

    <!-- other cards -->

    <div class="Picture">
        <img class="Picture-img" src="https://images.pexels.com/photos/4353813/pexels-photo-4353813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
        <div class="Picture-note"><span>passport</span></div>
    </div>
    <div class="Picture">
        <img class="Picture-img" src="https://images.pexels.com/photos/6039252/pexels-photo-6039252.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
        <div class="Picture-note"><span>Santa Monica - burger!!</span></div>
    </div>
    <div class="Picture">
        <img class="Picture-img" src="https://images.pexels.com/photos/2122406/pexels-photo-2122406.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
        <div class="Picture-note"><span>집에..가자... #퇴근..</span></div>
    </div>
    <div class="Picture">
        <img class="Picture-img" src="https://images.pexels.com/photos/5289884/pexels-photo-5289884.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
        <div class="Picture-note"><span>다이빙 하러 갔어요 !</span></div>
    </div>
    <div class="Picture">
        <img class="Picture-img" src="https://images.pexels.com/photos/373290/pexels-photo-373290.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
        <div class="Picture-note"><span>저녁 추천 좀 👈</span></div>
    </div>
    <div class="Picture">
        <img class="Picture-img" src="https://images.pexels.com/photos/2166553/pexels-photo-2166553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
        <div class="Picture-note"><span>Bali Handara Gate</span></div>
    </div>
    <div class="Picture">
        <img class="Picture-img" src="https://images.pexels.com/photos/5905263/pexels-photo-5905263.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
        <div class="Picture-note"><span>#ootd #f4f #chinatown #we</span></div>
    </div>
    <div class="Picture">
        <img class="Picture-img" src="https://images.pexels.com/photos/5745865/pexels-photo-5745865.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
        <div class="Picture-note"><span>🙏</span></div>
    </div>
    <div class="Picture">
        <img class="Picture-img" src="https://images.pexels.com/photos/5968899/pexels-photo-5968899.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
        <div class="Picture-note"><span>뒤돌아 보기</span></div>
    </div>



    <!-- first card (login, signin) -->

    <div id="login" class="Picture login" >

        <div class="login-container">
            <img class="Picture-img" src="https://images.pexels.com/photos/7237170/pexels-photo-7237170.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
            <form action="" method="post" id="loginForm">
                <table class="login-tbl">
                    <tr>
                        <th>id</th>
                        <td><input type="text" id="userId" class="userId" name="userId" /></td>
                    </tr>
                    <tr>
                        <th>password</th>
                        <td><input type="password" id="userPwd" class="userPwd" name="userPwd" /></td>
                    </tr>
                    <tr>
                        <td colspan="2" class="sub-td">
                            <input type="submit" value="login" />
                        </td>
                    </tr>
                </table>
            </form>
        </div>
        <div class="signup-container">
            <img class="Picture-img" src="<c:url value="/image/logoprint.svg"/>" alt=""/>
            <form action="user_signup.go" method="post">
                <table class="sign-tbl">
                    <tr>
                        <th>id</th>
                        <td><input type="text" class="sign-id" name="signId" placeholder="이메일" /></td>
                    </tr>
                    <tr>
                        <th>password</th>
                        <td><input type="password" class="sign-pwd" name="signPwd" placeholder="비밀번호"/></td>
                    </tr>
                    <tr>
                        <th>name</th>
                        <td><input type="text" class="sign-name" name="signName" placeholder="이름" /></td>
                    </tr>
                    <tr>
                        <td colspan="2" class="sub-td">
                            <input type="submit" value="signup" />
                        </td>
                    </tr>
                </table>
            </form>
        </div>
        <div class="btn-control">
            <div class="Picture-note l-btn"><span>Login</span><i class="bi bi-pencil"></i></div>
            <div class="Picture-note s-btn"><span>signup</span><i class="bi bi-pencil"></i></div>
        </div>

    </div>
</div>

<footer>
    <div class="footer-container">
        <div class="footer-logo">
            <img src="<c:url value="/image/logoprint.svg"/>" alt="logo" />
        </div>
        <div class="footer-info">
            <ul>
                <li>개발자 : 강석민, 김진우, 윤태근, 김민영</li>
                <li class="devTime"></li>
            </ul>
        </div>
    </div>
</footer>

<!-- Jquery -->
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<script src="<c:url value="/JS/User/UserLogIn.js"/>"></script>
</body>
</html>

